import { test, expect } from './fixtures.js';

const cases = ['powertable', 'analytics-plus', 'column-mapping', 'gantt-baselines',
  'gantt-backlog', 'gantt-conditional-formatting', 'gantt-configuration', 'resource-configuration',
  'crosstab', 'storyboard', 'gantt', 'analytics', 'presentation', 'kpi', 'analytics-spatial'];
const flowCases = ['powertable', 'analytics-plus', 'storyboard', 'gantt', 'analytics', 'presentation', 'kpi'];

test.use({ reducedMotion: 'reduce' });

for (const appearance of ['light', 'dark']) {
  for (const width of [390, 1440]) {
    test(`all cases convey the key points without paragraph walls in ${appearance} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      for (const name of cases) {
        await page.goto(`/${name}.html`);
        await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
        await page.locator('main details').evaluateAll(details => details.forEach(detail => { detail.open = true; }));
        const longCopy = await page.locator('main').evaluate(main =>
          [...main.querySelectorAll('.section-copy > p, .case-key-points > li, .solution-highlight, .mapping-step-copy > p, .mapping-lead-copy > p')]
            .filter(element => !element.closest('.evidence-note, #references, #evidence, #feature-references, #supporting, #platform-context, .flow-overview'))
            .map(element => ({ section: element.closest('section')?.id, words: element.innerText.trim().split(/\s+/).length }))
            .filter(item => item.words > 30));
        expect(longCopy, name).toEqual([]);
        if (flowCases.includes(name)) {
          const flow = page.locator('#business-case .case-highlight-flow');
          await expect(flow.locator('li')).toHaveCount(3);
          await expect(flow).toHaveAttribute('aria-label', 'Design intent');
          const boxes = await flow.locator('li').evaluateAll(items => items.map(item => item.getBoundingClientRect().toJSON()));
          if (width > 700) expect(boxes[0].y).toBe(boxes[2].y);
          else expect(boxes[2].y).toBeGreaterThan(boxes[0].y);
          const rows = page.locator('.solution-grid > li');
          await expect(rows).toHaveCount(3);
          for (const row of await rows.all()) {
            const text = await row.innerText();
            expect(text.trim().split(/\s+/).length, name).toBeLessThanOrEqual(45);
            await expect(row.locator('.solution-problem h3')).not.toBeEmpty();
            const href = await row.locator('a').getAttribute('href');
            expect(await page.evaluate(hash => Boolean(document.getElementById(hash.slice(1))), href)).toBe(true);
          }
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), name).toBe(true);
      }
    });
  }
}

test('key points, comparison rows, and flows are prerendered without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  try {
    const page = await context.newPage();
    await page.goto(baseURL + '/kpi.html');
    await page.locator('#case-details > summary').click();
    await expect(page.locator('#business-case .case-highlight-flow li')).toHaveCount(3);
    await expect(page.locator('#solutions .solution-grid > li')).toHaveCount(3);
    await expect(page.locator('#overview .case-key-points')).toBeVisible();
    await page.locator('#solutions a[href="#variance"]').click();
    await expect(page.locator('#variance')).toBeInViewport();
    await expect(page.locator('#variance .case-key-points')).toContainText('not a matched before-and-after');
  } finally {
    await context.close();
  }
});
