import { test, expect, openCaseDetails, followLink } from './fixtures.js';

test('centered hero remains still during pointer browsing and live reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.locator('.hero-portrait-art').evaluate((image) =>
    Promise.all(image.getAnimations().map((animation) => animation.finished)));
  const hero = page.locator('.reference-hero');
  const portrait = page.locator('.hero-portrait-art');
  const bounds = await hero.boundingBox();
  await page.mouse.move(bounds.x + bounds.width - 30, bounds.y + 120);
  await expect(portrait).toHaveCSS('transform', 'none');
  const values = await portrait.evaluate(element => {
    const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
    return [matrix.m41, matrix.m42];
  });
  expect(values).toEqual([0, 0]);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.hero-portrait-art')).toHaveCSS('transform', 'none');
  await expect(page.locator('.hero-portrait-art')).toHaveCSS('animation-name', 'none');
  expect(await portrait.evaluate(element => element.style.transform)).toBe('');
  await page.mouse.move(300, 240);
  expect(await portrait.evaluate(element => element.style.transform)).toBe('');
  expect(await hero.evaluate(element => element.style.cssText)).toBe('');
});

test('touch browsing keeps the portrait still and calls to action usable', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(baseURL);
  await page.dispatchEvent('.reference-hero', 'pointermove', { pointerType: 'touch', clientX: 350, clientY: 400 });
  expect(await page.locator('.hero-portrait-art').evaluate(element => element.style.transform)).toBe('');
  await page.locator('.hero-work-link').tap();
  await expect(page.locator('#work')).toBeInViewport();
  await context.close();
});

test('case cards are readable immediately without scroll-triggered fades', async ({ page }) => {
  await page.goto('/analytics-plus.html');
  await followLink(page, '/analytics.html');
  await openCaseDetails(page);
  await page.locator('#feature-walkthrough > summary').click();
  const card = page.locator('.solution-grid > li').last();
  await expect(page.locator('.reveal-target')).toHaveCount(0);
  await expect(card).toHaveCSS('opacity', '1');
  await expect(card).toHaveCSS('transform', 'none');
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveCSS('opacity', '1');
  await expect(card).toHaveCSS('transform', 'none');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.concept-node').first()).toHaveCSS('transform', 'none');
  await expect(page.locator('.concept-node').first()).toHaveCSS('opacity', '1');
});
