import { test, expect } from './fixtures.js';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

test('derived portrait has transparent background and preserves the source dimensions', async () => {
  const { data, info } = await sharp('assets/portrait-3d.webp').raw().toBuffer({ resolveWithObject: true });
  expect(info.width).toBe(1254);
  expect(info.height).toBe(1254);
  expect(info.channels).toBe(4);
  expect(data[3]).toBe(0);
  expect(data[(650 * info.width + 625) * 4 + 3]).toBe(255);
  expect(data[(240 * info.width + 490) * 4 + 3]).toBe(255);
  const chestAlpha = [850, 950, 1050, 1130].map((y) => data[(y * info.width + 625) * 4 + 3]);
  expect(chestAlpha[0]).toBeGreaterThan(240);
  expect(chestAlpha[1]).toBeLessThan(chestAlpha[0]);
  expect(chestAlpha[2]).toBeLessThan(chestAlpha[1]);
  expect(chestAlpha[2]).toBeLessThan(30);
  expect(chestAlpha[3]).toBe(0);
  const bottom = data.subarray(Math.ceil(info.height * .9) * info.width * 4);
  expect(bottom.every((value, index) => index % 4 !== 3 || value === 0)).toBe(true);
});

test('jaw and beard retain a continuous cut-out without horizontal notches', async () => {
  const { data, info } = await sharp('assets/portrait-3d.webp').raw().toBuffer({ resolveWithObject: true });
  let previous;
  for (let y = 550; y <= 620; y++) {
    let left = 0;
    while (left < info.width && data[(y * info.width + left) * 4 + 3] < 128) left++;
    expect(left).toBeLessThan(info.width);
    if (previous !== undefined) {
      expect(left - previous).toBeGreaterThanOrEqual(0);
      expect(left - previous).toBeLessThanOrEqual(4);
    }
    previous = left;
  }
  expect(data[(598 * info.width + 495) * 4 + 3]).toBeGreaterThanOrEqual(240);
  expect(data[(590 * info.width + 450) * 4 + 3]).toBe(0);
});

test('shirt edges do not retain the black source-background outline', async () => {
  const { data, info } = await sharp('assets/portrait-3d.webp').raw().toBuffer({ resolveWithObject: true });
  for (let y = 700; y <= 790; y += 5) {
    let left = 0;
    let right = info.width - 1;
    while (left < info.width && data[(y * info.width + left) * 4 + 3] < 128) left++;
    while (right > left && data[(y * info.width + right) * 4 + 3] < 128) right--;
    for (const x of [left, right]) {
      const pixel = (y * info.width + x) * 4;
      const brightness = (data[pixel] + data[pixel + 1] + data[pixel + 2]) / 3;
      expect(brightness).toBeGreaterThan(90);
    }
  }
});

for (const width of [320, 390, 768, 1440]) {
  test(`3D-style portrait replaces the dot sculpture at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    const requests = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('request', (request) => requests.push(request.url()));
    await page.goto('/');
    const hero = page.locator('.portrait-hero');
    await expect(hero).toBeVisible();
    await expect(hero.getByRole('heading', { level: 1 })).toHaveAccessibleName('Complex products. Considered experiences.');
    const portrait = hero.getByRole('img', { name: /3D-style illustrated portrait/ });
    await expect(portrait).toBeVisible();
    await expect(portrait).toHaveJSProperty('complete', true);
    expect(await portrait.evaluate((image) => image.naturalWidth)).toBe(1254);
    expect(await portrait.evaluate(image => {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);
      return context.getImageData(495, 598, 1, 1).data[3];
    })).toBeGreaterThanOrEqual(240);
    await expect(hero.locator('canvas, button, [role="progressbar"]')).toHaveCount(0);
    expect(requests.some((url) => /portrait-dots|hero\.bundle/.test(url))).toBe(false);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(hero.getByRole('link')).toHaveCount(0);
    if (width <= 700) await page.locator('.menu-toggle').click();
    await page.locator('#main-nav a[href="/#work"]').click();
    await expect(page.locator('#work')).toBeInViewport();
    expect(errors).toEqual([]);
  });
}

test('portrait works without JavaScript, with reduced motion, and without WebGL', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(baseURL);
  await expect(page.locator('.portrait-art')).toBeVisible();
  await expect(page.locator('.portrait-art')).toHaveJSProperty('complete', true);
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await context.close();
});

test('standalone opens offline with its illustrated portrait embedded', async ({ page }) => {
  const requests = [];
  const errors = [];
  page.on('request', (request) => { if (/^https?:/.test(request.url())) requests.push(request.url()); });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(pathToFileURL(path.resolve('portrait-standalone.html')).href);
  await expect(page.locator('.portrait-art')).toBeVisible();
  expect(await page.locator('.portrait-art').evaluate((image) => image.naturalWidth)).toBe(1254);
  const embedded = await page.locator('.portrait-art').getAttribute('src');
  expect(Buffer.from(embedded.split(',')[1], 'base64').equals(await readFile('assets/portrait-3d.webp'))).toBe(true);
  await expect(page.locator('canvas, button, script')).toHaveCount(0);
  expect(requests).toEqual([]);
  expect(errors).toEqual([]);
});
