import { test, expect } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

async function openReady(page, path) {
  await page.goto(path);
  await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
  await page.evaluate(() => document.fonts.ready);
}

for (const width of [320, 390, 768, 1440, 1920]) {
  test(`Home prioritizes work and contact without oversized secondary controls at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await openReady(page, '/');
    const workLink = page.getByRole('link', { name: 'View selected work', exact: true });
    await expect(workLink).toHaveAttribute('href', '#work');
    const hero = await page.locator('.portrait-hero').boundingBox();
    const action = await workLink.boundingBox();
    expect(action.height).toBeGreaterThanOrEqual(44);
    expect(action.y + action.height).toBeLessThanOrEqual(hero.y + hero.height);
    await workLink.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#work')).toBeInViewport();
    await expect(page.locator('#main-nav a[aria-current]')).toHaveText('Work');
    for (const control of await page.locator('.listening-modes button').all()) {
      expect((await control.boundingBox()).height).toBeGreaterThanOrEqual(44);
      await expect(control).toHaveCSS('font-size', '13px');
    }
    const contact = page.getByRole('link', { name: /Discuss a product design role/ });
    await expect(contact).toHaveAttribute('href', 'https://www.linkedin.com/in/ravichandran-uxui/');
    await expect(contact).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(page.locator('.home-about .home-contact')).toHaveCount(1);
    await expect(page.locator('.project .home-contact')).toHaveCount(0);
    const contactTop = await page.locator('.home-contact').evaluate(element => element.getBoundingClientRect().top + scrollY);
    const workBottom = await page.locator('#work').evaluate(element => element.getBoundingClientRect().bottom + scrollY);
    expect(contactTop).toBeGreaterThan(workBottom);
    await expect(page.locator('.home-about')).toContainText('Microsoft Fabric design system');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });

  test(`product overviews lead into supported feature cases at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const [path, destination, focus] of [
      ['/powertable.html', '/column-mapping.html', 'PowerTable in action.'],
      ['/analytics-plus.html', '/storyboard.html', 'Choose a starting path.']
    ]) {
      await openReady(page, path);
      const figure = page.locator('main > .case-evidence');
      const recommendation = path === '/powertable.html'
        ? page.getByRole('link', { name: 'Explore Gantt', exact: true })
        : figure.getByRole('link', { name: /Recommended first read/ });
      await expect(recommendation).toHaveAttribute('href', destination);
      await expect(figure.locator('.figure-label')).toContainText(focus);
      expect(await recommendation.evaluate(element => element.closest('details') === null)).toBe(true);
      const action = await recommendation.boundingBox();
      const image = await figure.locator('.product-screenshot img').boundingBox();
      expect(action.height).toBeGreaterThanOrEqual(44);
      await expect(page.locator('.metadata .scan-emphasis')).toHaveText('End-to-end UX/UI');
      if (path === '/powertable.html') {
        await expect(figure.locator('figcaption')).toContainText('Official product screenshot');
        await expect(figure.locator('.product-overview-copy')).toContainText('No-code data apps');
        await expect(page.locator('.case-brief')).toContainText('remain explorations');
        await expect(page.locator('#crosstab-features')).toContainText('Contribution overview');
      } else {
        expect(action.y + action.height).toBeLessThanOrEqual(image.y);
        await expect(page.locator('.case-brief')).toContainText('Chart Wizard shipped');
        await expect(figure.locator('figcaption')).toContainText('alternative starting routes');
        await expect(figure.locator('.product-screenshot')).toHaveAttribute('href', '/assets/storyboard-start.png');
        await expect(figure.locator('img')).toHaveAttribute('src', '/assets/storyboard-start.png');
      }
      await recommendation.focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(new RegExp(destination.replace('.', '\\.') + '$'));
      await expect(page.locator('h1')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });
}

test('public product sources and colleague feedback are not presented as personal project outcomes', async ({ page }) => {
  for (const [path, disclosure, source] of [
    ['/powertable.html', '#study-details', 'https://www.linkedin.com/feed/update/urn:li:activity:7270117667141742592/'],
    ['/analytics-plus.html', '#evidence-notes', 'https://www.linkedin.com/posts/info-river_powerbi-datastorytelling-dashboarddesign-activity-7449433719045537792-W7XT']
  ]) {
    await openReady(page, path);
    await page.locator(`${disclosure} > summary`).click();
    const link = page.locator(`a[href="${source}"]`);
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(link.locator('..')).toContainText(/not independent/);
    await expect(page.locator('a[href="/about.html#recommendations"]').first()).toBeVisible();
  }
});

test('artifact captions identify the work rather than the file handoff', async ({ page }) => {
  for (const route of ['/', '/powertable.html', '/analytics-plus.html', '/column-mapping.html',
    '/gantt-baselines.html', '/gantt-backlog.html', '/gantt-conditional-formatting.html',
    '/gantt-configuration.html', '/resource-configuration.html', '/storyboard.html',
    '/gantt.html', '/analytics.html', '/presentation.html', '/kpi.html']) {
    await openReady(page, route);
    const captions = await page.locator('figcaption, .figure-label, .visual-bottom, .album-footer').allTextContents();
    for (const caption of captions) expect(caption.trim()).not.toMatch(/^supplied /i);
  }
});

test('the recommended reading route and Home work link work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 900 } });
  try {
    const page = await context.newPage();
    await page.goto(baseURL + '/');
    await page.getByRole('link', { name: 'View selected work', exact: true }).click();
    await expect(page).toHaveURL(/#work$/);
    await expect(page.locator('#work')).toBeInViewport();
    for (const [path, destination] of [['/powertable.html', '/column-mapping.html'], ['/analytics-plus.html', '/storyboard.html']]) {
      await page.goto(baseURL + path);
      const firstRead = path === '/powertable.html'
        ? page.getByRole('link', { name: 'Explore Gantt', exact: true })
        : page.getByRole('link', { name: /Recommended first read/ });
      await firstRead.click();
      await expect(page).toHaveURL(baseURL + destination);
      await expect(page.locator('h1')).toBeVisible();
    }
  } finally {
    await context.close();
  }
});
