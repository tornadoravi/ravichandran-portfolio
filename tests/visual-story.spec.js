import { test, expect } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

const cases = [
  'powertable', 'analytics-plus', 'column-mapping', 'gantt-baselines', 'gantt-backlog',
  'gantt-conditional-formatting', 'gantt-configuration', 'resource-configuration',
  'crosstab', 'storyboard', 'gantt', 'analytics', 'presentation', 'kpi', 'analytics-spatial'
];

for (const javaScriptEnabled of [true, false]) {
  test(`every visual-story chapter has a real keyboard-accessible destination with JavaScript ${javaScriptEnabled}`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled, viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
    try {
      const page = await context.newPage();
      for (const name of cases) {
        await page.goto(`${baseURL}/${name}.html`);
        if (javaScriptEnabled) await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
        const nav = page.locator('.case-story-nav');
        await expect(nav).toHaveCount(1);
        const chapters = await nav.locator('a').all();
        expect(chapters.length).toBe(name === 'analytics-spatial' ? 3 : 5);
        const targets = new Set();
        for (const chapter of chapters) {
          const target = await chapter.getAttribute('href');
          expect(targets.has(target), `${name} repeats ${target}`).toBe(false);
          targets.add(target);
          await expect(page.locator(target)).toHaveCount(1);
          await chapter.focus();
          await page.keyboard.press('Enter');
          await expect(page.locator(target), `${name}${target}`).toBeInViewport();
          if (javaScriptEnabled) await expect(chapter).toHaveAttribute('aria-current', 'location');
          expect((await chapter.boundingBox()).height).toBeGreaterThanOrEqual(44);
        }
        await page.reload();
        await expect(page.locator([...targets].at(-1))).toBeInViewport();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    } finally {
      await context.close();
    }
  });
}

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`portfolio story cards remain concise and proportional in ${appearance} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      for (const path of ['/', '/about.html']) {
        await page.goto(path);
        await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
        await expect(page.locator('.design-approach h3')).toHaveText(['Understand', 'Structure', 'Refine']);
        await expect(page.locator('.design-approach svg')).toHaveCount(3);
        for (const point of await page.locator('.design-approach p').all()) {
          expect((await point.innerText()).trim().split(/\s+/).length).toBeLessThanOrEqual(10);
        }
        expect((await page.locator('main').innerText()).trim().split(/\s+/).length).toBeLessThanOrEqual(path === '/' ? 220 : 280);
      }
      await page.goto('/powertable.html');
      await expect(page.locator('.focus-steps > li')).toHaveCount(3);
      await expect(page.locator('.focus-explanation .story-highlight')).toHaveCount(3);
      await expect(page.locator('.workspace-grid > .workspace-group')).toHaveCount(3);
      for (const card of await page.locator('.workspace-group').all()) {
        expect((await card.boundingBox()).height).toBeLessThan(430);
        await expect(card).toHaveCSS('box-shadow', 'none');
        await expect(card.locator('figcaption')).toContainText('Official product example');
        const image = card.locator('img');
        await image.evaluate(image => image.decode());
        const dimensions = await image.evaluate(image => ({
          source: image.naturalWidth / image.naturalHeight,
          shown: image.getBoundingClientRect().width / image.getBoundingClientRect().height
        }));
        expect(dimensions.shown).toBeCloseTo(dimensions.source, 2);
      }
      for (const name of ['column-mapping', 'gantt-baselines', 'gantt-backlog', 'gantt-conditional-formatting',
        'gantt-configuration', 'resource-configuration', 'crosstab', 'storyboard', 'gantt', 'presentation', 'kpi']) {
        await page.goto(`/${name}.html`);
        await expect(page.locator('.case-snapshot .story-highlight')).toHaveCount(3);
        await expect(page.locator('.case-diagram')).toHaveCount(1);
        await expect(page.locator('#case-details')).not.toHaveAttribute('open');
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), name).toBe(true);
      }
    });
  }
}
