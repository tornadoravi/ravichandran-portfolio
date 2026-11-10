import { test, expect } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

for (const width of [320, 390, 768, 1440, 1920]) {
  test(`Home and About keep identical header dimensions and gutters at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = [];
    for (const path of ['/', '/about.html', '/powertable.html']) {
      await page.goto(path);
      await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
      dimensions.push(await page.evaluate(() => {
        const selectors = ['.site-header', '.header-brand', '.header-contacts', '.wordmark', '.companion-button'];
        return selectors.map(selector => {
          const { x, y, width, height } = document.querySelector(selector).getBoundingClientRect();
          return { x, y, width, height };
        });
      }));
      const header = await page.locator('.site-header').boundingBox();
      const content = await page.locator('main > .wrap').first().boundingBox();
      expect(content.x).toBeCloseTo(header.x, 1);
      expect(content.width).toBeCloseTo(header.width, 1);
    }
    expect(dimensions[1]).toEqual(dimensions[0]);
    expect(dimensions[2]).toEqual(dimensions[0]);
  });
}

test('all React pages hydrate without errors and preserve the Focus default', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  for (const path of ['/', '/about.html', '/powertable.html', '/analytics-plus.html',
    '/column-mapping.html', '/gantt-baselines.html', '/gantt-backlog.html',
    '/gantt-conditional-formatting.html', '/gantt-configuration.html', '/resource-configuration.html',
    '/storyboard.html', '/gantt.html', '/analytics.html', '/presentation.html', '/kpi.html']) {
    await page.goto(path);
    await expect(page.locator('#root > .site-header')).toBeVisible();
    await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('data-listening-mode', 'focus');
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(250, 249, 246)');
    await expect(page.locator('script[src="/app.js"], script[src="/soundroom.js"]')).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});

test('supplied screenshot cases reflect confirmed publication permission without removing source disclosures', async ({ page }) => {
  for (const path of ['/column-mapping.html', '/gantt-baselines.html', '/gantt-backlog.html',
    '/gantt-conditional-formatting.html', '/gantt-configuration.html', '/resource-configuration.html']) {
    await page.goto(path);
    const evidence = page.locator('#evidence');
    await expect(evidence).toContainText('Permission to publish these supplied screenshots has been confirmed.');
    await expect(evidence).toContainText(/internal.only/i);
    await expect(evidence).not.toContainText(/local preview|pending permission|confirm permission before/i);
  }
});
