import { test, expect } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

const features = [
  ['/column-mapping.html', 'Column Mapping'],
  ['/gantt-baselines.html', 'Baselines'],
  ['/gantt-backlog.html', 'Backlog'],
  ['/gantt-configuration.html', 'Side Panel']
];

for (const mode of ['focus', 'soundroom']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`Gantt has one entry and top-level feature tabs in ${mode} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(mode => sessionStorage.setItem('portfolio-listening-mode', mode), mode);
      await page.goto('/powertable.html');
      await expect(page.locator('#gantt-features a')).toHaveCount(1);
      await expect(page.locator('#gantt-features .feature-case-link, #gantt-features .workspace-contribution')).toHaveCount(0);
      await page.getByRole('link', { name: 'Explore Gantt', exact: true }).click();
      for (const [path, name] of features) {
        const nav = page.getByRole('navigation', { name: 'PowerTable Gantt features' });
        await nav.getByRole('link', { name, exact: true }).focus();
        await page.keyboard.press('Enter');
        await expect(page).toHaveURL(new RegExp(path.replace('.', '\\.') + '$'));
        await expect(nav.getByRole('link')).toHaveText(features.map(([, label]) => label));
        await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
        await expect(nav.locator('[aria-current="page"]')).toHaveText(name);
        expect(await nav.evaluate(element => element.closest('details') === null)).toBe(true);
        const heading = await page.locator('h1').boundingBox();
        for (const link of await nav.getByRole('link').all()) {
          const box = await link.boundingBox();
          expect(box.height).toBeGreaterThanOrEqual(44);
          expect(box.y + box.height).toBeLessThanOrEqual(heading.y);
          expect(box.x).toBeGreaterThanOrEqual(0);
          expect(box.x + box.width).toBeLessThanOrEqual(width);
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await expect(page.locator('.back-link')).toHaveAttribute('href', '/powertable.html#gantt-features');
      }
      await page.goBack();
      await expect(page.locator('.gantt-feature-tabs [aria-current]')).toHaveText('Backlog');
      await page.locator('.back-link').click();
      await expect(page.locator('#gantt-features')).toBeInViewport();
    });
  }
}

test('Gantt feature tabs and return navigation work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  try {
    const page = await context.newPage();
    await page.goto(baseURL + '/powertable.html');
    await page.getByRole('link', { name: 'Explore Gantt', exact: true }).click();
    for (const [path, name] of features) {
      await page.getByRole('navigation', { name: 'PowerTable Gantt features' }).getByRole('link', { name, exact: true }).click();
      await expect(page).toHaveURL(baseURL + path);
      await expect(page.locator('.gantt-feature-tabs [aria-current]')).toHaveText(name);
      await expect(page.locator('h1')).toBeVisible();
    }
    await page.locator('.back-link').click();
    await expect(page).toHaveURL(baseURL + '/powertable.html#gantt-features');
    await expect(page.locator('#gantt-features')).toBeInViewport();
  } finally {
    await context.close();
  }
});
