import { test, expect } from './fixtures.js';
import sharp from 'sharp';

test.use({ reducedMotion: 'reduce' });

for (const width of [320, 390, 680, 1440]) {
  test(`default review stays within an 875-word editorial budget at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    let words = 0;
    for (const path of ['/', '/powertable.html', '/analytics-plus.html']) {
      await page.goto(path);
      words += await page.locator('main').evaluate(element => element.innerText.trim().split(/\s+/).length);
      await expect(page.locator('.case-deep-dive[open], .feature-previews[open]')).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      if (path !== '/') {
        await expect(page.locator('.review-grid > li')).toHaveCount(3);
        await expect(page.locator('.review-takeaway')).toBeVisible();
        await expect(page.locator('.case-evidence img')).toHaveJSProperty('complete', true);
        expect(await page.locator('.case-evidence img').evaluate(image => image.naturalWidth)).toBeGreaterThan(0);
        for (const card of await page.locator('.review-grid > li').all()) {
          await card.scrollIntoViewIfNeeded();
          const image = card.locator('.story-media img');
          await expect(image).toHaveJSProperty('complete', true);
          expect(await image.evaluate(element => element.naturalWidth)).toBeGreaterThan(0);
          expect((await image.boundingBox()).width).toBeLessThanOrEqual(await image.evaluate(element => element.naturalWidth));
          await expect(image).toHaveAttribute('alt', /.+/);
          await expect(card.locator('.story-source')).toHaveText(/Supplied (product|design) screen|Original concept illustration/);
          await expect(card.locator('a')).toHaveCount(1);
          await expect(card.locator('a')).toHaveAttribute('href', /^#/);
          expect((await card.locator('h3').innerText()).split(/\s+/).length).toBeLessThanOrEqual(7);
          expect((await card.locator('p').innerText()).split(/\s+/).length).toBeLessThanOrEqual(12);
          expect((await card.locator('.story-media').boundingBox()).height).toBeGreaterThan((await card.boundingBox()).height * .55);
          const target = await card.locator('a').getAttribute('href');
          await expect(page.locator(target)).toHaveCount(1);
        }
        await expect(page.locator('.case-brief p strong')).toHaveCount(3);
        await expect(page.locator('.metadata .scan-emphasis')).toHaveText('End-to-end UX/UI');
        await expect(page.locator('.review-takeaway')).toContainText('Design direction');
        await expect(page.locator('.review-takeaway b')).toBeVisible();
      } else {
        await expect(page.locator('.project-description .scan-highlight')).toHaveCount(2);
      }
    }
    expect(words).toBeLessThanOrEqual(875);
  });
}

test('tablet visuals sit beside their captions without overflow', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  for (const path of ['/powertable.html', '/analytics-plus.html']) {
    await page.goto(path);
    for (const card of await page.locator('.review-grid > li').all()) {
      const media = await card.locator('.story-media').boundingBox();
      const caption = await card.locator('.story-caption').boundingBox();
      expect(caption.x).toBeGreaterThan(media.x + media.width);
      expect(caption.y).toBeLessThan(media.y + media.height);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

for (const [path, names, targets, disclosure] of [
  ['/powertable.html', ['configuration detail', 'Gantt design scope', 'resource planning scope'], ['gantt-configuration', 'gantt', 'resources'], '#study-details'],
  ['/analytics-plus.html', ['Chart Wizard', 'Storyboard', 'annotations'], ['feature-wizard', 'feature-storyboard', 'feature-annotations'], '.feature-previews']
]) {
  test(`all visual story cards on ${path} open their evidence with the keyboard`, async ({ page }) => {
    for (const [index, name] of names.entries()) {
      await page.goto(path);
      const link = page.locator('.review-grid').getByRole('link', { name: `Explore ${name}`, exact: true });
      await link.focus();
      await expect(link).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.locator(disclosure)).toHaveAttribute('open');
      await expect(page.locator('#' + targets[index])).toBeInViewport();
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

test('visual stories and their source labels work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  for (const path of ['/powertable.html', '/analytics-plus.html']) {
    await page.goto(baseURL + path);
    for (const card of await page.locator('.review-grid > li').all()) {
      await card.scrollIntoViewIfNeeded();
      await expect(card.locator('img')).toHaveJSProperty('complete', true);
      expect(await card.locator('img').evaluate(image => image.naturalWidth)).toBeGreaterThan(0);
      await expect(card.locator('.story-source')).toBeVisible();
    }
  }
  await page.goto(baseURL + '/powertable.html');
  await expect(page.locator('.review-grid .story-source').filter({ hasText: 'Supplied design screen' })).toHaveCount(3);
  await context.close();
});

test('highlights reveal the supporting story and history reopens a collapsed destination', async ({ page }) => {
  await page.goto('/powertable.html');
  await expect(page.locator('#study-details')).not.toHaveAttribute('open');
  await page.locator('.review-grid').getByRole('link', { name: /configuration detail/ }).click();
  await expect(page.locator('#study-details')).toHaveAttribute('open');
  await expect(page.locator('#gantt-configuration')).toBeInViewport();
  await page.locator('.case-nav a[href="#resources"]').click();
  await expect(page.locator('#resources')).toBeInViewport();
  await page.locator('#study-details > summary').click();
  await expect(page.locator('#study-details')).not.toHaveAttribute('open');
  await page.goBack();
  await expect(page.locator('#study-details')).toHaveAttribute('open');
  await expect(page.locator('#gantt-configuration')).toBeInViewport();
});

for (const [path, target, disclosure] of [
  ['/powertable.html', '#competitive-analysis', '#study-details'],
  ['/analytics-plus.html', '#platform-context', '#design-details'],
  ['/analytics-plus.html', '#feature-gantt', '.feature-previews'],
  ['/analytics-plus.html', '#references', '#evidence-notes']
]) {
  test(`direct bookmark ${path}${target} reveals the preserved detail`, async ({ page }) => {
    await page.goto(path + target);
    await expect(page.locator(disclosure)).toHaveAttribute('open');
    await expect(page.locator(target)).toBeInViewport();
  });
}

test('all five Analytics+ feature shortcuts reveal their previews in the original order', async ({ page }) => {
  await page.goto('/analytics-plus.html');
  const index = page.getByRole('navigation', { name: 'Analytics+ feature index' });
  const ids = ['feature-storyboard', 'feature-gantt', 'feature-wizard', 'feature-annotations', 'feature-kpi'];
  expect(await index.locator('a').evaluateAll(links => links.map(link => link.hash))).toEqual(ids.map(id => '#' + id));
  for (const id of ids) {
    await index.locator(`a[href="#${id}"]`).click();
    await expect(page.locator('.feature-previews')).toHaveAttribute('open');
    await expect(page.locator('#' + id)).toBeInViewport();
    await expect(page.locator('#' + id + ' .text-link')).toHaveAttribute('href', /\.html$/);
  }
  await expect(page.getByRole('link', { name: 'Experience & recommendations' })).toHaveAttribute('href', '/about.html#experience');
});

test('optional detail uses native keyboard disclosure without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  for (const [path, disclosure, target] of [
    ['/powertable.html', '#study-details', '#gantt-configuration'],
    ['/analytics-plus.html', '#design-details', '#competitive-analysis'],
    ['/analytics-plus.html', '.feature-previews', '#feature-storyboard']
  ]) {
    await page.goto(baseURL + path);
    await expect(page.locator(disclosure)).not.toHaveAttribute('open');
    await page.locator(disclosure + ' > summary').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator(disclosure)).toHaveAttribute('open');
    await expect(page.locator(target)).toBeVisible();
    if (path === '/powertable.html') {
      await page.locator('.review-grid a[href="#gantt-configuration"]').click();
      await expect(page.locator(target)).toBeInViewport();
    }
  }
  await context.close();
});
