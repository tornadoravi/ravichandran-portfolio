import { test, expect } from './fixtures.js';

test('role and title are immediately readable without decorative entrances', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const timing = await page.locator('.hero-role, .portrait-title')
    .evaluateAll(elements => elements.map(element => element.getAnimations().map(animation => {
      const { duration, delay, iterations } = animation.effect.getTiming();
      return { duration, delay, iterations };
    })));
  expect(timing).toEqual([[], []]);
  await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished)));
  await expect(page.locator('.portrait-title')).toHaveCSS('opacity', '1');
  await expect(page.locator('.portrait-title')).toHaveCSS('clip-path', 'none');
  await expect.poll(() => page.evaluate(() => document.getAnimations().length)).toBe(0);
  await expect(page.locator('.reference-hero')).toHaveCSS('border-radius', '0px');
  await expect(page.locator('.portrait-title')).toHaveText('I’m a product designer making complex products easier to use.');
});

test('motion preference changes keep every project chapter visible', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.locator('.hero-role, .portrait-title')
    .evaluateAll(elements => elements.flatMap(element => element.getAnimations()).length)).toBe(0);
  await expect(page.locator('.hero-portrait-art')).toHaveCSS('animation-name', 'none');
  expect(await page.locator('.reference-hero').evaluate(element => getComputedStyle(element, '::before').animationName)).toBe('none');
  await expect(page.locator('#project-analytics')).toHaveCSS('opacity', '1');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('#project-analytics')).toHaveCSS('opacity', '1');
});

test('a direct work bookmark skips cinematic entrances', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/#work');
  await expect(page.locator('#work')).toBeInViewport();
  expect(await page.locator('.hero-role, .portrait-title')
    .evaluateAll(elements => elements.flatMap(element => element.getAnimations()).length)).toBe(0);
  await expect(page.locator('.hero-portrait-art')).toHaveCSS('animation-name', 'none');
  expect(await page.locator('.reference-hero').evaluate(element => getComputedStyle(element, '::before').animationName)).toBe('none');
  await page.goto('/');
  await page.locator('.hero-work-link').click();
  await expect(page.locator('.hero-portrait-stage')).toHaveClass(/is-settled/);
  await expect(page.locator('.hero-portrait-art')).toHaveCSS('animation-name', 'none');
});

test('the cinematic composition is readable without scripts', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 900 } });
  const page = await context.newPage();
  await page.goto(baseURL);
  await expect(page.locator('.portrait-title')).toHaveText('I’m a product designer making complex products easier to use.');
  await expect(page.locator('.hero-role')).toBeVisible();
  await expect(page.locator('.hero-portrait-art')).toHaveJSProperty('complete', true);
  await expect(page.locator('#project-analytics')).toHaveCSS('opacity', '1');
  await page.locator('.hero-work-link').click();
  await expect(page.locator('#work')).toBeInViewport();
  await context.close();
});
