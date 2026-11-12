import { test, expect, openWorkspaceNavigation } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

for (const javaScriptEnabled of [true, false]) {
  for (const width of [320, 1440]) {
    test(`recruiter shortcuts and workspace changes work at ${width}px with JavaScript ${javaScriptEnabled}`, async ({ browser, baseURL }) => {
      const context = await browser.newContext({ javaScriptEnabled, viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      try {
        const page = await context.newPage();
        for (const [path, name, directory, evidence] of [
          ['/powertable.html', 'PowerTable quick navigation', '#workspaces', '#study-details'],
          ['/analytics-plus.html', 'Analytics+ quick navigation', '#features', '#evidence-notes']
        ]) {
          await page.goto(baseURL + path);
          const shortcuts = page.getByRole('navigation', { name, exact: true });
          await shortcuts.getByRole('link', { name: 'Browse features', exact: true }).focus();
          await page.keyboard.press('Enter');
          await expect(page.locator(directory)).toBeInViewport();
          await shortcuts.getByRole('link', { name: 'Full evidence', exact: true }).focus();
          await page.keyboard.press('Enter');
          await expect(page.locator(`${evidence} > summary`)).toBeInViewport();
          if (javaScriptEnabled) await expect(page.locator(evidence)).toHaveAttribute('open', '');
          else {
            if (!await page.locator(evidence).evaluate(element => element.open)) {
              await page.locator(`${evidence} > summary`).focus();
              await page.keyboard.press('Enter');
            }
            await expect(page.locator(evidence)).toHaveAttribute('open', '');
          }
        }
        await page.goto(baseURL + '/column-mapping.html');
        for (const [label, path, workspace] of [
          ['Resources', '/gantt-conditional-formatting.html', 'PowerTable Gantt Resources features'],
          ['Cross-tab', '/crosstab.html', 'PowerTable Cross-tab sections'],
          ['Gantt', '/column-mapping.html', 'PowerTable Gantt features']
        ]) {
          await openWorkspaceNavigation(page);
          const navigation = page.getByRole('navigation', { name: 'PowerTable workspaces', exact: true });
          await expect(navigation.getByRole('link')).toHaveText(['Gantt', 'Resources', 'Cross-tab']);
          await navigation.getByRole('link', { name: label, exact: true }).focus();
          await page.keyboard.press('Enter');
          await expect(page).toHaveURL(baseURL + path);
          await openWorkspaceNavigation(page);
          await expect(navigation.locator('[aria-current]')).toHaveText(label);
          await expect(page.getByRole('navigation', { name: workspace, exact: true })).toBeVisible();
          for (const link of await navigation.getByRole('link').all()) {
            const box = await link.boundingBox();
            expect(box.height).toBeGreaterThanOrEqual(44);
            expect(box.x).toBeGreaterThanOrEqual(0);
            expect(box.x + box.width).toBeLessThanOrEqual(width);
          }
        }
        await page.goBack();
        await expect(page).toHaveURL(baseURL + '/crosstab.html');
        await page.reload();
        await expect(page.locator('.workspace-switcher [aria-current]')).toHaveText('Cross-tab');
        await page.locator('.back-link').click();
        await expect(page.locator('#crosstab-features')).toBeInViewport();
      } finally {
        await context.close();
      }
    });
  }
}

test('Home covers identify Lumel and the spatial case keeps branding separate from release claims', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.project-visual .cover-maker img')).toHaveCount(2);
  for (const image of await page.locator('.cover-maker img').all()) {
    await expect(image).toHaveAttribute('src', '/assets/lumel-logo.svg');
    await expect(image).toHaveAttribute('alt', 'Lumel');
  }
  await page.goto('/analytics-spatial.html');
  await expect(page.getByAltText('Microsoft', { exact: true })).toBeInViewport();
  await expect(page.getByAltText('Lumel Technologies', { exact: true })).toBeInViewport();
  await expect(page.locator('.case-hero')).toContainText('Prototype only—not a shipped Vision Pro product.');
});
