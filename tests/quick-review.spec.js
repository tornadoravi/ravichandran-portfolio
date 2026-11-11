import { test, expect } from './fixtures.js';
import sharp from 'sharp';

test.use({ reducedMotion: 'reduce' });

const analyticsFeatures = [
  ['feature-storyboard', '/storyboard.html'],
  ['feature-gantt', '/gantt.html'],
  ['feature-wizard', '/analytics.html'],
  ['feature-annotations', '/presentation.html'],
  ['feature-kpi', '/kpi.html']
];

for (const mode of ['focus', 'soundroom']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`feature cards keep their screenshots and hierarchy clear in ${mode} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(mode => sessionStorage.setItem('portfolio-listening-mode', mode), mode);
      for (const path of ['/powertable.html', '/analytics-plus.html']) {
        await page.goto(path);
        const cards = page.locator('.workspace-grid > .album-card, .feature-card-grid > .album-card');
        await expect(cards).toHaveCount(path === '/powertable.html' ? 3 : 5);
        for (const card of await cards.all()) {
          await card.scrollIntoViewIfNeeded();
          await expect(card).toBeVisible();
          await expect(card.locator(':scope > h2, :scope > h3')).toBeVisible();
          expect((await card.locator('.album-description').innerText()).split(/\s+/).length).toBeLessThanOrEqual(10);
          for (const image of await card.locator('img').all()) {
            await image.evaluate(image => image.decode());
            const dimensions = await image.evaluate(image => ({
              width: image.getBoundingClientRect().width, height: image.getBoundingClientRect().height,
              nativeWidth: image.naturalWidth, nativeHeight: image.naturalHeight
            }));
            expect(dimensions.width).toBeLessThanOrEqual(dimensions.nativeWidth);
            expect(Math.abs(dimensions.width / dimensions.height - dimensions.nativeWidth / dimensions.nativeHeight)).toBeLessThan(.01);
            await expect(image).toHaveCSS('transform', 'none');
            await expect(image).toHaveCSS('filter', 'none');
          }
          expect((await card.boundingBox()).x).toBeGreaterThanOrEqual(0);
          expect((await card.boundingBox()).width).toBeLessThanOrEqual(width - 40);
        }
        await expect(page.locator('.overview-moments, .feature-previews, .analytics-feature')).toHaveCount(0);
        if (path === '/powertable.html') {
          await expect(page.locator('#crosstab-features figcaption')).toHaveText('Original concept diagram');
          await expect(page.locator('#crosstab-features img')).toHaveCount(0);
        } else {
          const boxes = await cards.evaluateAll(cards => cards.map(card => ({ x: card.getBoundingClientRect().x, y: card.getBoundingClientRect().y })));
          if (width > 700) {
            expect(boxes[1].y).toBe(boxes[0].y);
            expect(boxes[1].x).toBeGreaterThan(boxes[0].x);
          } else {
            expect(boxes[1].y).toBeGreaterThan(boxes[0].y);
          }
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    });
  }
}

for (const width of [320, 390, 680, 1440]) {
  test(`default review stays within an 875-word editorial budget at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    let words = 0;
    for (const path of ['/', '/powertable.html', '/analytics-plus.html']) {
      await page.goto(path);
      words += await page.locator('main').evaluate(element => element.innerText.trim().split(/\s+/).length);
      await expect(page.locator('.case-deep-dive[open]')).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      if (path !== '/') {
        await expect(page.locator('.workspace-grid > .album-card, .feature-card-grid > .album-card')).toHaveCount(path === '/powertable.html' ? 3 : 5);
        await expect(page.locator('.review-grid, .feature-previews')).toHaveCount(0);
        await expect(page.locator('.case-evidence img')).toHaveJSProperty('complete', true);
        expect(await page.locator('.case-evidence img').evaluate(image => image.naturalWidth)).toBeGreaterThan(0);
        await expect(page.locator('.case-brief p strong')).toHaveCount(3);
        await expect(page.locator('.metadata .scan-emphasis')).toHaveText('End-to-end UX/UI');
      } else {
        await expect(page.locator('.project-description .scan-highlight')).toHaveCount(2);
      }
    }
    expect(words).toBeLessThanOrEqual(875);
  });
}

for (const [overview, paths] of [
  ['/powertable.html', ['/column-mapping.html', '/gantt-baselines.html', '/gantt-backlog.html', '/gantt-conditional-formatting.html', '/gantt-configuration.html', '/resource-configuration.html']],
  ['/analytics-plus.html', analyticsFeatures.map(([, path]) => path)]
]) {
  test(`feature cards on ${overview} open full cases directly with the keyboard`, async ({ page, baseURL }) => {
    for (const path of paths) {
      await page.goto(overview);
      const ganttPaths = ['/column-mapping.html', '/gantt-baselines.html', '/gantt-backlog.html', '/gantt-configuration.html'];
      if (overview === '/powertable.html' && ganttPaths.includes(path)) {
        await page.getByRole('link', { name: 'Explore Gantt', exact: true }).click();
      } else if (path === '/resource-configuration.html') {
        await page.getByRole('link', { name: 'Explore Gantt Resources', exact: true }).click();
      }
      const link = page.locator(`.workspace-feature-tabs a[href="${path}"], .workspace-grid a[href="${path}"], .feature-card-grid a[href="${path}"]`);
      await link.focus();
      await expect(link).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(new URL(path, baseURL).href);
      await expect(page.locator('h1')).toBeVisible();
    }
  });
}

test('overview detail crops preserve the supplied screen pixels', async ({ request }) => {
  for (const [source, detail, crop] of [
    ['fabric-gantt-configuration', 'fabric-configuration-detail', { left: 552, top: 54, width: 806, height: 600 }],
    ['presentation-screen-07', 'annotation-detail', { left: 150, top: 330, width: 700, height: 420 }]
  ]) {
    const original = await request.get(`/assets/${source}.png`);
    const cropped = await request.get(`/assets/${detail}.png`);
    expect(original.ok()).toBe(true);
    expect(cropped.ok()).toBe(true);
    const expected = await sharp(await original.body()).extract(crop).raw().toBuffer();
    const actual = await sharp(await cropped.body()).raw().toBuffer();
    expect(actual.equals(expected)).toBe(true);
  }
});

test('feature cards and their source labels work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  for (const path of ['/powertable.html', '/analytics-plus.html']) {
    await page.goto(baseURL + path);
    await expect(page.locator('.overview-moments, .feature-previews, .analytics-feature')).toHaveCount(0);
    const cards = page.locator('.workspace-grid > .album-card, .feature-card-grid > .album-card');
    await expect(cards).toHaveCount(path === '/powertable.html' ? 3 : 5);
    for (const card of await cards.all()) {
      await card.scrollIntoViewIfNeeded();
      for (const image of await card.locator('img').all()) {
        await expect(image).toHaveJSProperty('complete', true);
        expect(await image.evaluate(image => image.naturalWidth)).toBeGreaterThan(0);
      }
      await expect(card.locator('figcaption, .album-footer')).toBeVisible();
      await expect(card.locator('figcaption, .album-footer')).toHaveText(/My .* UX\/UI|product (workspace|screen)|design screen|Original concept diagram/i);
    }
  }
  for (const [id, path] of analyticsFeatures) {
    await page.goto(baseURL + '/analytics-plus.html#' + id);
    await expect(page.locator('#' + id)).toBeInViewport();
    await page.locator('#' + id).focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new URL(path, baseURL).href);
  }
  await context.close();
});

test('Cross-tab card opens its workspace while old full-story bookmarks still reopen the disclosure', async ({ page }) => {
  await page.goto('/powertable.html');
  await expect(page.locator('#study-details')).not.toHaveAttribute('open');
  await page.getByRole('link', { name: 'Explore Cross-tab', exact: true }).click();
  await expect(page).toHaveURL(/crosstab\.html$/);
  await page.locator('.back-link').click();
  await expect(page.locator('#crosstab-features')).toBeInViewport();
  await page.goto('/powertable.html#crosstab');
  await expect(page.locator('#study-details')).toHaveAttribute('open');
  await expect(page.locator('#crosstab')).toBeInViewport();
  await page.locator('.case-nav a[href="#overview"]').click();
  await expect(page.locator('#overview')).toBeInViewport();
  await page.locator('#study-details > summary').click();
  await expect(page.locator('#study-details')).not.toHaveAttribute('open');
  await page.goBack();
  await expect(page.locator('#study-details')).toHaveAttribute('open');
  await expect(page.locator('#crosstab')).toBeInViewport();
});

for (const [path, target, disclosure] of [
  ['/powertable.html', '#competitive-analysis', '#study-details'],
  ['/analytics-plus.html', '#platform-context', '#design-details'],
  ['/analytics-plus.html', '#references', '#evidence-notes']
]) {
  test(`direct bookmark ${path}${target} reveals the preserved detail`, async ({ page }) => {
    await page.goto(path + target);
    await expect(page.locator(disclosure)).toHaveAttribute('open');
    await expect(page.locator(target)).toBeInViewport();
  });
}

test('all five Analytics+ cards link directly to full cases in the original order', async ({ page }) => {
  await page.goto('/analytics-plus.html');
  const index = page.getByRole('navigation', { name: 'Analytics+ feature index' });
  expect(await index.locator('a').evaluateAll(links => links.map(link => [link.id, link.getAttribute('href')]))).toEqual(analyticsFeatures);
  await expect(page.locator('.feature-previews, .analytics-feature')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Experience & recommendations' })).toHaveAttribute('href', '/about.html#experience');
});

for (const [id, path] of analyticsFeatures) {
  test(`existing Analytics+ bookmark #${id} targets its visible card`, async ({ page }) => {
    await page.goto('/analytics-plus.html#' + id);
    await expect(page.locator('#' + id)).toBeInViewport();
    await expect(page.locator('#' + id)).toHaveAttribute('href', path);
    await expect(page.locator('.case-deep-dive[open], .feature-previews')).toHaveCount(0);
  });
}

test('optional detail uses native keyboard disclosure without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  for (const [path, disclosure, target] of [
    ['/powertable.html', '#study-details', '#gantt-configuration'],
    ['/analytics-plus.html', '#design-details', '#competitive-analysis']
  ]) {
    await page.goto(baseURL + path);
    await expect(page.locator(disclosure)).not.toHaveAttribute('open');
    await page.locator(disclosure + ' > summary').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator(disclosure)).toHaveAttribute('open');
    await expect(page.locator(target)).toBeVisible();
    if (path === '/powertable.html') {
      await page.locator('.comparison-table a[href="#gantt-configuration"]').click();
      await expect(page.locator(target)).toBeInViewport();
    }
  }
  await context.close();
});
