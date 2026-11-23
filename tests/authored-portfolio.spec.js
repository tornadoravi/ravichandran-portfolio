import { test, expect, openCaseDetails, openWorkspaceNavigation } from './fixtures.js';

const features = [
  '/column-mapping.html', '/gantt-baselines.html', '/gantt-backlog.html',
  '/gantt-configuration.html', '/gantt-conditional-formatting.html',
  '/resource-configuration.html', '/crosstab.html', '/analytics.html',
  '/gantt.html', '/storyboard.html', '/presentation.html', '/kpi.html'
];

test.use({ reducedMotion: 'reduce' });

for (const appearance of ['light', 'dark']) {
  for (const width of [390, 1440]) {
    test(`feature headers prioritize the work and retain native context in ${appearance} at ${width}px`, async ({ page }) => {
      test.setTimeout(60000);
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      for (const path of features) {
        await page.goto(path);
        const hero = page.locator('.case-hero');
        const heading = hero.locator('h1');
        const context = hero.locator('.case-context');
        const identity = context.locator('.project-identity');
        const navigation = hero.locator('.workspace-navigation');
        await expect(context).not.toHaveAttribute('open');
        await expect(identity).toBeHidden();
        await expect(navigation).not.toHaveAttribute('open');
        await expect(navigation.locator('summary')).toBeVisible();
        expect(await heading.evaluate(element =>
          Boolean(element.compareDocumentPosition(element.parentElement.querySelector('.workspace-navigation')) & Node.DOCUMENT_POSITION_FOLLOWING)
        ), path).toBe(true);
        const title = await heading.boundingBox();
        const role = await context.locator('summary').boundingBox();
        expect(role.y, path).toBeGreaterThanOrEqual(title.y + title.height);
        await context.locator('summary').click();
        await openWorkspaceNavigation(page);
        await expect(identity).toBeVisible();
        for (const image of await identity.locator('img').all()) {
          await image.evaluate(element => element.decode());
          await expect(image).toHaveCSS('filter', 'none');
          const ratio = await image.evaluate(element => ({
            original: element.naturalWidth / element.naturalHeight,
            rendered: element.getBoundingClientRect().width / element.getBoundingClientRect().height
          }));
          expect(ratio.rendered, path).toBeCloseTo(ratio.original, 2);
        }

        await context.locator('summary').click();
        await navigation.getByRole('navigation').last().getByRole('link').first().focus();
        await expect(navigation.getByRole('navigation').last().getByRole('link').first()).toBeFocused();
        await expect(navigation.getByRole('navigation').last().getByRole('link').first()).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path).toBe(true);
      }
    });
  }
}

test('the authored feature layout keeps its context and original images available without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  try {
    const page = await context.newPage();
    for (const path of ['/column-mapping.html', '/analytics.html']) {
      await page.goto(new URL(path, baseURL).href);
      await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#f4f2ee');
      const details = page.locator('.case-hero .case-context');
      await expect(details.locator('.project-identity')).toBeHidden();
      await details.locator('summary').click();
      await expect(details.locator('.project-identity')).toBeVisible();
      const navigation = page.locator('.workspace-navigation');
      await expect(navigation.locator('summary')).toBeVisible();
      await openWorkspaceNavigation(page);
      await expect(navigation.getByRole('navigation').last().getByRole('link').first()).toBeVisible();
      const evidenceDetails = page.locator('#case-details');
      if (await evidenceDetails.count()) await openCaseDetails(page);
      const image = page.locator('main a.product-screenshot img').first();
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();
      expect(await image.evaluate(element => element.complete && element.naturalWidth > 0)).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  } finally {
    await context.close();
  }
});
