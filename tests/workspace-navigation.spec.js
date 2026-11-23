import { test, expect, openWorkspaceNavigation } from './fixtures.js';

const pages = [
  ['/column-mapping.html', 'PowerTable Gantt features', 'Column Mapping'],
  ['/gantt-baselines.html', 'PowerTable Gantt features', 'Baselines'],
  ['/gantt-backlog.html', 'PowerTable Gantt features', 'Backlog'],
  ['/gantt-configuration.html', 'PowerTable Gantt features', 'Side Panel'],
  ['/gantt-conditional-formatting.html', 'PowerTable Gantt Resources features', 'Conditional Formatting'],
  ['/resource-configuration.html', 'PowerTable Gantt Resources features', 'Side Panel'],
  ['/crosstab.html', 'PowerTable Cross-tab sections', 'Overview'],
  ['/storyboard.html', 'Analytics+ features', 'Storyboard'],
  ['/gantt.html', 'Analytics+ features', 'Gantt'],
  ['/analytics.html', 'Analytics+ features', 'Chart Wizard'],
  ['/presentation.html', 'Analytics+ features', 'Annotations'],
  ['/kpi.html', 'Analytics+ features', 'KPI Presets']
];

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`feature navigation expands on demand in ${appearance} at ${width}px`, async ({ page }) => {
      test.setTimeout(60000);
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      for (const [path, label, active] of pages) {
        await page.goto(path);
        const directory = page.locator('.workspace-navigation');
        await expect(directory).toBeVisible();
        await expect(directory).not.toHaveAttribute('open');
        await openWorkspaceNavigation(page);
        const navigation = page.getByRole('navigation', { name: label, exact: true });
        const selected = navigation.locator('[aria-current]');
        await expect(selected).toHaveText(active);
        await expect(selected).toHaveAttribute('aria-current', path === '/crosstab.html' ? 'location' : 'page');
        for (const link of await directory.getByRole('link').all()) {
          await expect(link).toBeVisible();
          expect((await link.boundingBox()).height).toBeGreaterThanOrEqual(44);
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path).toBe(true);
      }
    });
  }
}

for (const javaScriptEnabled of [true, false]) {
  test(`Gantt tabs work directly with JavaScript ${javaScriptEnabled}`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled, viewport: { width: 390, height: 900 } });
    try {
      const page = await context.newPage();
      await page.goto(baseURL + '/column-mapping.html');
      for (const [path, , name] of [pages[1], pages[2], pages[3], pages[0]]) {
        await openWorkspaceNavigation(page);
        const link = page.getByRole('navigation', { name: 'PowerTable Gantt features', exact: true }).getByRole('link', { name, exact: true });
        await expect(link).toBeVisible();
        await link.focus();
        await page.keyboard.press('Enter');
        await expect(page).toHaveURL(baseURL + path);
        await expect(page.locator('.gantt-feature-tabs [aria-current="page"]')).toHaveText(name);
      }

    } finally {
      await context.close();
    }
  });
}

test('Cross-tab section selection follows its destination even while evidence is collapsed', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('/crosstab.html');
  await expect(page.locator('.appearance-trigger')).toBeEnabled();
  await page.evaluate(() => document.fonts.ready);
  await openWorkspaceNavigation(page);
  const navigation = page.getByRole('navigation', { name: 'PowerTable Cross-tab sections', exact: true });
  await expect(page.locator('#contribution')).toBeHidden();
  await expect(navigation.locator('[aria-current]')).toHaveText('Overview');
  await navigation.getByRole('link', { name: 'Structure', exact: true }).click();
  await expect(page).toHaveURL(/crosstab\.html#configuration$/);
  await expect(page.locator('#configuration')).toBeVisible();
  await expect(navigation.locator('[aria-current]')).toHaveText('Structure');
});
