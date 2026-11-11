import { test, expect } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

async function openReady(page, path) {
  await page.goto(path);
  await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
  await page.evaluate(() => document.fonts.ready);
}

for (const width of [320, 390, 768, 1440, 1920]) {
  test(`primary case studies reach product evidence sooner at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const limit = width === 320 ? 1000 : width === 390 ? 825 : 700;
    for (const path of ['/powertable.html', '/analytics-plus.html']) {
      await openReady(page, path);
      const image = page.locator('main > .case-evidence .product-screenshot img').first();
      await expect(image).toBeVisible();
      const top = await image.evaluate(element => element.getBoundingClientRect().top + scrollY);
      expect(top, `${path} first product screen`).toBeLessThan(limit);
      expect(await image.evaluate(element => element.naturalWidth)).toBeGreaterThan(0);
      await expect(page.locator('.case-summary')).toContainText('End-to-end');
      await expect(page.locator('.case-summary')).toHaveCSS('font-size', '18px');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });

  test(`narrative prose has a comfortable measure without narrowing the outer grid at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/about.html', '/']) {
      await openReady(page, path);
      if (path === '/about.html') {
        await page.locator('.recommendation-full').first().evaluate(element => { element.open = true; });
      }
      const selector = path === '/about.html'
        ? '.about-intro > div:last-child > p:not(.large-copy), .recommendation-full[open] blockquote p'
        : '.home-about p:not(.eyebrow)';
      const paragraphs = await page.locator(selector).evaluateAll(elements => elements.map(element => {
        const style = getComputedStyle(element);
        const context = document.createElement('canvas').getContext('2d');
        context.font = `${style.fontSize} ${style.fontFamily}`;
        return {
          measure: element.getBoundingClientRect().width / context.measureText('0').width,
          fontSize: parseFloat(style.fontSize),
          leading: parseFloat(style.lineHeight) / parseFloat(style.fontSize)
        };
      }));
      expect(paragraphs.length).toBeGreaterThan(0);
      for (const paragraph of paragraphs) {
        expect(paragraph.measure).toBeLessThanOrEqual(67);
        expect(paragraph.fontSize).toBeGreaterThanOrEqual(16);
        expect(paragraph.leading).toBeGreaterThanOrEqual(1.65);
      }
      if (path === '/about.html') {
        await expect(page.locator('.about-intro > div:last-child > p:not(.large-copy)').first()).toHaveCSS('font-size', '17px');
      }
      const header = await page.locator('.site-header').boundingBox();
      const content = await page.locator('main > .wrap').first().boundingBox();
      expect(content.x).toBeCloseTo(header.x, 1);
      expect(content.width).toBeCloseTo(header.width, 1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });
}
