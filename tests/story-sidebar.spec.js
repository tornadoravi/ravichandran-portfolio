import { test, expect } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

const cases = [
  'powertable', 'analytics-plus', 'column-mapping', 'gantt-baselines', 'gantt-backlog',
  'gantt-conditional-formatting', 'gantt-configuration', 'resource-configuration',
  'crosstab', 'storyboard', 'gantt', 'analytics', 'presentation', 'kpi', 'analytics-spatial'
];

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1100, 1280, 1440, 1920]) {
    test(`story sidebar and reading column align in ${appearance} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      for (const name of cases) {
        await page.goto(`/${name}.html`);
        await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
        const layout = page.locator('main > .case-story-layout');
        const nav = layout.locator(':scope > .case-story-nav');
        const content = layout.locator(':scope > .case-story-content');
        await expect(page.locator('.case-story-nav')).toHaveCount(1);
        await expect(nav).toBeVisible();
        const [menu, body, frame] = await Promise.all([nav.boundingBox(), content.boundingBox(), layout.boundingBox()]);
        expect(menu.x).toBeCloseTo(frame.x, 1);
        expect(body.x + body.width).toBeCloseTo(frame.x + frame.width, 1);
        if (width > 1100) {
          expect(menu.y).toBeCloseTo(body.y, 1);
          expect(body.x - menu.x - menu.width).toBeCloseTo(56, 1);
          expect(body.width).toBeGreaterThan(menu.width * 2);
          await expect(nav).toHaveCSS('position', 'sticky');
          const links = await nav.locator('a').all();
          for (let index = 1; index < links.length; index++) {
            const previous = await links[index - 1].boundingBox();
            const next = await links[index].boundingBox();
            expect(next.x).toBeCloseTo(previous.x, 1);
            expect(next.y).toBeGreaterThanOrEqual(previous.y + previous.height);
          }
        } else {
          expect(body.x).toBeCloseTo(menu.x, 1);
          expect(body.y).toBeGreaterThanOrEqual(menu.y + menu.height);
          await expect(nav).toHaveCSS('position', 'static');
        }
        if (await content.locator('.case-key-facts').count()) {
          const problem = await content.locator('.case-problem-scene').boundingBox();
          const decision = await content.locator('.case-diagram').boundingBox();
          expect(problem.height).toBeCloseTo(decision.height, 0);
          if (width > 700) expect(problem.y).toBeCloseTo(decision.y, 0);
        }
        for (const link of await nav.locator('a').all()) {
          expect((await link.boundingBox()).height).toBeGreaterThanOrEqual(44);
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), name).toBe(true);
      }
    });
  }
}

for (const javaScriptEnabled of [true, false]) {
  test(`compact story index reveals keyboard-focused chapters with JavaScript ${javaScriptEnabled}`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled, viewport: { width: 320, height: 900 }, reducedMotion: 'reduce' });
    try {
      const page = await context.newPage();
      await page.goto(`${baseURL}/storyboard.html`);
      if (javaScriptEnabled) await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
      const nav = page.locator('.case-story-nav');
      const links = nav.locator('a');
      await links.first().focus();
      for (let index = 1; index < await links.count(); index++) await page.keyboard.press('Tab');
      const last = links.last();
      await expect(last).toBeFocused();
      const [list, focused] = await Promise.all([nav.locator('ol').boundingBox(), last.boundingBox()]);
      expect(focused.x).toBeGreaterThanOrEqual(list.x);
      expect(focused.x + focused.width).toBeLessThanOrEqual(list.x + list.width + 1);
      expect(await nav.locator('ol').evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
      const target = await last.getAttribute('href');
      await page.keyboard.press('Enter');
      await expect(page.locator(target)).toBeInViewport();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    } finally {
      await context.close();
    }
  });

  test(`desktop sidebar keeps native chapter navigation with JavaScript ${javaScriptEnabled}`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled, viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    try {
      const page = await context.newPage();
      for (const name of ['powertable', 'analytics-plus', 'storyboard']) {
        await page.goto(`${baseURL}/${name}.html`);
        if (javaScriptEnabled) await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
        const nav = page.locator('.case-story-nav');
        for (const link of await nav.locator('a').all()) {
          const target = await link.getAttribute('href');
          await link.focus();
          await page.keyboard.press('Enter');
          await expect(page.locator(target)).toBeInViewport();
          if (javaScriptEnabled) await expect(link).toHaveAttribute('aria-current', 'location');
          const menu = await nav.boundingBox();
          expect(menu.y).toBeGreaterThanOrEqual(23);
          expect(menu.y).toBeLessThanOrEqual(25);
        }
      }
    } finally {
      await context.close();
    }
  });
}
