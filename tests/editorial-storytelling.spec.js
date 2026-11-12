import { test, expect, openWorkspaceNavigation } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

const features = [
  'column-mapping', 'gantt-baselines', 'gantt-backlog', 'gantt-conditional-formatting',
  'gantt-configuration', 'resource-configuration', 'crosstab', 'storyboard', 'gantt',
  'presentation', 'kpi'
];

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`editorial stories explain the problem without stacked navigation in ${appearance} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      for (const name of features) {
        await page.goto(`/${name}.html`);
        await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
        const directory = page.locator('details.workspace-navigation');
        await expect(directory).not.toHaveAttribute('open');
        await expect(directory.locator('summary')).toContainText('Browse features');
        await expect(directory.locator('nav').first()).toBeHidden();
        await expect(page.locator('.case-story-nav')).toBeVisible();
        const facts = page.locator('.case-key-facts');
        await expect(facts.locator('dt')).toHaveText(['Problem', 'My decision', 'Evidence']);
        await expect(facts.locator('.case-problem-scene')).toBeVisible();
        await expect(facts.locator('.case-problem-scene')).toHaveAttribute('aria-label', /Illustrative problem: .+ Not a historical product screen\./);
        await expect(facts.locator('.case-diagram')).toBeVisible();
        await expect(facts.locator('figcaption')).toContainText('Not a product screenshot');
        for (const point of await facts.locator('dd > p').all()) {
          expect((await point.innerText()).trim().split(/\s+/).length).toBeLessThanOrEqual(17);
        }
        const cards = await facts.locator('.story-highlight').all();
        for (const card of cards.slice(0, 2)) {
          await expect(card).toHaveCSS('background-color', appearance === 'light' ? 'rgb(255, 255, 255)' : 'rgb(19, 36, 42)');
        }
        const [problem, decision] = await Promise.all(cards.slice(0, 2).map(card => card.boundingBox()));
        if (width > 700) expect(problem.y).toBeCloseTo(decision.y, 0);
        else expect(decision.y).toBeGreaterThanOrEqual(problem.y + problem.height);
        await expect(page.locator('h1')).toHaveCSS('font-style', 'normal');
        expect(await page.locator('h1').evaluate(node => getComputedStyle(node).fontFamily)).toContain('Segoe UI');
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), name).toBe(true);
      }
    });
  }
}

for (const javaScriptEnabled of [true, false]) {
  test(`feature switching is explicit and keyboard accessible with JavaScript ${javaScriptEnabled}`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled, viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
    try {
      const page = await context.newPage();
      await page.goto(baseURL + '/crosstab.html');
      const summary = page.locator('.workspace-navigation > summary');
      await summary.focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('.workspace-navigation')).toHaveAttribute('open', '');
      const resources = page.getByRole('navigation', { name: 'PowerTable workspaces' }).getByRole('link', { name: 'Resources', exact: true });
      await resources.focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(baseURL + '/gantt-conditional-formatting.html');
      await expect(page.locator('.workspace-navigation')).not.toHaveAttribute('open');
      await openWorkspaceNavigation(page);
      await page.getByRole('navigation', { name: 'PowerTable Gantt Resources features' }).getByRole('link', { name: 'Side Panel', exact: true }).click();
      await expect(page).toHaveURL(baseURL + '/resource-configuration.html');
      await page.getByRole('navigation', { name: 'The visual story', exact: true }).getByRole('link', { name: 'Evidence', exact: true }).click();
      await expect(page.locator('#evidence')).toBeInViewport();
    } finally {
      await context.close();
    }
  });
}
