import { test, expect } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

const resourceFeatures = [
  ['/gantt-conditional-formatting.html', 'Conditional Formatting'],
  ['/resource-configuration.html', 'Side Panel']
];

for (const mode of ['focus', 'soundroom']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`Resources and Cross-tab use clean workspace entries and top tabs in ${mode} at ${width}px`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(mode => sessionStorage.setItem('portfolio-listening-mode', mode), mode);
      await page.goto('/powertable.html');
      for (const id of ['gantt-features', 'resource-features', 'crosstab-features']) {
        await expect(page.locator(`#${id} a`)).toHaveCount(1);
        await expect(page.locator(`#${id} .feature-case-link, #${id} .workspace-contribution`)).toHaveCount(0);
      }
      await page.getByRole('link', { name: 'Explore Gantt Resources', exact: true }).click();
      for (const [path, name] of resourceFeatures) {
        const nav = page.getByRole('navigation', { name: 'PowerTable Gantt Resources features' });
        await nav.getByRole('link', { name, exact: true }).focus();
        await page.keyboard.press('Enter');
        await expect(page).toHaveURL(new RegExp(path.replace('.', '\\.') + '$'));
        await expect(nav.getByRole('link')).toHaveText(resourceFeatures.map(([, label]) => label));
        await expect(nav.locator('[aria-current]')).toHaveCount(1);
        await expect(nav.locator('[aria-current]')).toHaveText(name);
        const heading = await page.locator('h1').boundingBox();
        for (const link of await nav.getByRole('link').all()) {
          const box = await link.boundingBox();
          expect(box.height).toBeGreaterThanOrEqual(44);
          expect(box.y + box.height).toBeLessThanOrEqual(heading.y);
          expect(box.x + box.width).toBeLessThanOrEqual(width);
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
      await page.locator('.back-link').click();
      await expect(page.locator('#resource-features')).toBeInViewport();
      await page.getByRole('link', { name: 'Explore Cross-tab', exact: true }).click();
      await expect(page).toHaveURL(/crosstab\.html$/);
      const tabs = page.getByRole('navigation', { name: 'PowerTable Cross-tab sections' });
      await expect(tabs.getByRole('link')).toHaveText(['Overview', 'Structure', 'Evidence']);
      await expect(page.locator('h1')).toContainText('Cross-tab.');
      await expect(page.locator('.metadata')).toContainText('Cross-tab design contributions');
      await expect(page.locator('#evidence')).toContainText('not end-to-end ownership');
      await expect(page.locator('#evidence')).toContainText('No dedicated Cross-tab design screens');
      await expect(page.locator('figcaption')).toContainText('Not a product screenshot');
      await expect(page.locator('.project-identity img')).toHaveCount(3);
      await expect(page.locator('main img:not(.brand-image)')).toHaveCount(0);
      for (const [id, label] of [['contribution', 'Overview'], ['configuration', 'Structure'], ['evidence', 'Evidence']]) {
        const tab = tabs.getByRole('link', { name: label, exact: true });
        expect((await tab.boundingBox()).height).toBeGreaterThanOrEqual(44);
        await tab.focus();
        await page.keyboard.press('Enter');
        await expect(page).toHaveURL(new RegExp(`#${id}$`));
        await expect(page.locator(`#${id}`)).toBeInViewport();
        await expect(tabs.locator('[aria-current]')).toHaveCount(1);
        await expect(tabs.locator('[aria-current]')).toHaveText(label);
      }
      await page.goBack();
      await expect(tabs.locator('[aria-current]')).toHaveText('Structure');
      await page.reload();
      await expect(tabs.locator('[aria-current]')).toHaveText('Structure');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.locator('.back-link').click();
      await expect(page.locator('#crosstab-features')).toBeInViewport();
      expect(errors).toEqual([]);
    });
  }
}

test('Resources and Cross-tab keep their entry, tabs and return paths without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  try {
    const page = await context.newPage();
    await page.goto(baseURL + '/powertable.html');
    await page.getByRole('link', { name: 'Explore Gantt Resources', exact: true }).click();
    await page.getByRole('navigation', { name: 'PowerTable Gantt Resources features' }).getByRole('link', { name: 'Side Panel', exact: true }).click();
    await expect(page).toHaveURL(baseURL + '/resource-configuration.html');
    await page.locator('.back-link').click();
    await expect(page.locator('#resource-features')).toBeInViewport();
    await page.getByRole('link', { name: 'Explore Cross-tab', exact: true }).click();
    const tabs = page.getByRole('navigation', { name: 'PowerTable Cross-tab sections' });
    for (const id of ['contribution', 'configuration', 'evidence']) {
      await tabs.locator(`a[href="#${id}"]`).click();
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }
    await expect(page.locator('#evidence')).toContainText('No dedicated Cross-tab design screens');
    await page.locator('.back-link').click();
    await expect(page.locator('#crosstab-features')).toBeInViewport();
  } finally {
    await context.close();
  }
});
