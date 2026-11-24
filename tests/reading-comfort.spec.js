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
      const image = page.locator('.case-hero-preview .case-demo-image img').first();
      await expect(image).toBeVisible();
      const top = await image.evaluate(element => element.getBoundingClientRect().top + scrollY);
      expect(top, `${path} first product screen`).toBeLessThan(limit);
      expect(await image.evaluate(element => element.naturalWidth)).toBeGreaterThan(0);
      await expect(page.locator('.case-context > summary')).toContainText(path === '/powertable.html' ? 'End-to-end Gantt & resource UX/UI' : 'End-to-end Analytics+ UX/UI');
      expect(await page.locator('.case-summary').evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(17);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });

  test(`narrative prose has a comfortable measure without narrowing the outer grid at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/about.html', '/']) {
      await openReady(page, path);
      if (path === '/about.html') {
        await page.locator('#experience-details > summary').click();
        await page.locator('.recommendation-full').first().evaluate(element => { element.open = true; });
      }
      const selector = path === '/about.html'
        ? '.about-reference-copy > p, .recommendation-full[open] blockquote p'
        : '.hero-introduction';
      const paragraphs = await page.locator(selector).evaluateAll(elements => elements.map(element => {
        const style = getComputedStyle(element);
        const context = document.createElement('canvas').getContext('2d');
        context.font = `${style.fontSize} ${style.fontFamily}`;
        return {
          measure: element.getBoundingClientRect().width / context.measureText('0').width,
          fontSize: parseFloat(style.fontSize),
          displayProse: Boolean(element.closest('.about-reference-copy')),
          leading: parseFloat(style.lineHeight) / parseFloat(style.fontSize)
        };
      }));
      expect(paragraphs.length).toBeGreaterThan(0);
      for (const paragraph of paragraphs) {
        expect(paragraph.measure).toBeLessThanOrEqual(67);
        expect(paragraph.fontSize).toBeGreaterThanOrEqual(16);
        expect(Number(paragraph.leading.toFixed(2))).toBeGreaterThanOrEqual(paragraph.displayProse ? 1.35 : 1.65);
      }
      if (path === '/about.html') {
        expect(await page.locator('.about-reference-copy > p').first().evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(18);
      }
      const header = await page.locator('.site-header').boundingBox();
      const content = await page.locator('main > .wrap:visible, main > .about-reference-width:visible').first().boundingBox();
      expect(content.x + content.width / 2).toBeCloseTo(header.x + header.width / 2, 1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });
}
