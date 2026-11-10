import { test, expect } from './fixtures.js';

test('cinematic title and footer entrances are finite and settle into readable content', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const timing = await page.locator('.portrait-title, .portrait-footer')
    .evaluateAll(elements => elements.map(element => element.getAnimations().map(animation => {
      const { duration, delay, iterations } = animation.effect.getTiming();
      return { duration, delay, iterations };
    })));
  expect(timing).toEqual([0, 110].map(delay => [{ duration: 1000, delay, iterations: 1 }]));
  await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished)));
  await expect(page.locator('.portrait-title')).toHaveCSS('opacity', '1');
  await expect(page.locator('.portrait-title')).toHaveCSS('clip-path', 'none');
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  await expect(page.locator('.portrait-hero')).toHaveCSS('border-radius', '0px');
  await expect(page.locator('.portrait-title > span')).toHaveCSS('background-clip', 'text');
});

test('motion changes cancel cinematic effects and keep pending project chapters visible', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.locator('.portrait-title, .portrait-footer')
    .evaluateAll(elements => elements.flatMap(element => element.getAnimations()).length)).toBe(0);
  await expect(page.locator('.portrait-art')).toHaveCSS('animation-name', 'none');
  expect(await page.locator('.portrait-hero').evaluate(element => getComputedStyle(element, '::before').animationName)).toBe('none');
  await expect(page.locator('#project-analytics')).toHaveCSS('opacity', '1');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('#project-analytics')).toHaveCSS('opacity', '1');
});

test('a direct work bookmark skips cinematic entrances', async ({ page }) => {
  await page.goto('/#work');
  await expect(page.locator('#work')).toBeInViewport();
  expect(await page.locator('.portrait-title, .portrait-footer')
    .evaluateAll(elements => elements.flatMap(element => element.getAnimations()).length)).toBe(0);
  await expect(page.locator('.portrait-art')).toHaveCSS('animation-name', 'none');
  expect(await page.locator('.portrait-hero').evaluate(element => getComputedStyle(element, '::before').animationName)).toBe('none');
});

test('the cinematic composition is readable without scripts', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 900 } });
  const page = await context.newPage();
  await page.goto(baseURL);
  await expect(page.locator('.portrait-title')).toHaveText('PRODUCT DESIGNER');
  await expect(page.locator('.portrait-footer')).toBeVisible();
  await expect(page.locator('.portrait-art')).toHaveJSProperty('complete', true);
  await expect(page.locator('#project-analytics')).toHaveCSS('opacity', '1');
  await page.getByRole('link', { name: 'Selected work', exact: true }).click();
  await expect(page.locator('#work')).toBeInViewport();
  await context.close();
});
