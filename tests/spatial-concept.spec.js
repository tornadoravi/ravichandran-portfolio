import { test, expect } from './fixtures.js';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`spatial prototype stays separate, proportional, and concise in ${appearance} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript(appearance => localStorage.setItem('portfolio-appearance', appearance), appearance);
      await page.goto('/analytics-plus.html#spatial-exploration');
      const section = page.locator('#spatial-exploration');
      await expect(section).toBeInViewport();
      await expect(section).toContainText('Concept exploration · Apple Vision Pro-inspired');
      await expect(section).toContainText('Prototype only—not a shipped Vision Pro product.');
      await expect(page.locator('.feature-card-grid > a')).toHaveCount(5);
      await expect(section.locator('figure')).toHaveCount(3);
      await expect(section.locator('.inspect-button')).toHaveCount(3);
      for (const image of await section.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(image => image.decode());
        const size = await image.evaluate(image => ({
          nativeWidth: image.naturalWidth, nativeHeight: image.naturalHeight,
          width: image.getBoundingClientRect().width, height: image.getBoundingClientRect().height
        }));
        expect(size.width).toBeLessThanOrEqual(size.nativeWidth);
        expect(size.width / size.height).toBeCloseTo(size.nativeWidth / size.nativeHeight, 2);
      }
      expect(await section.evaluate(element => element.innerText.trim().split(/\s+/).length)).toBeLessThanOrEqual(50);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await section.locator('.inspect-button').last().click();
      await expect(page.locator('dialog[open] img')).toHaveJSProperty('naturalWidth', 276);
      await page.keyboard.press('Escape');
    });
  }
}

test('spatial frame crops preserve the supplied pixels and are served through the public allowlist', async ({ request }) => {
  const source = await readFile(new URL('../assets/analytics-spatial-sequence.png', import.meta.url));
  const original = await request.get('/assets/analytics-spatial-sequence.png');
  expect(original.status()).toBe(200);
  expect(await original.body()).toEqual(source);
  for (const [name, left, width] of [['launch', 0, 275], ['entry', 865, 280], ['report', 1724, 276]]) {
    const expected = await sharp(source).extract({ left, top: 0, width, height: 156 }).raw().toBuffer();
    const response = await request.get(`/assets/analytics-spatial-${name}.png`);
    expect(response.status()).toBe(200);
    expect(await sharp(await response.body()).raw().toBuffer()).toEqual(expected);
  }
});

test('the spatial exploration remains available with native image links and no JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  try {
    const page = await context.newPage();
    await page.goto(baseURL + '/analytics-plus.html#spatial-exploration');
    await expect(page.locator('#spatial-exploration')).toBeInViewport();
    await expect(page.locator('#spatial-exploration img')).toHaveCount(3);
    await expect(page.getByRole('link', { name: 'View original concept sequence (opens in a new tab)', exact: true })).toHaveAttribute('href', '/assets/analytics-spatial-sequence.png');
  } finally {
    await context.close();
  }
});
