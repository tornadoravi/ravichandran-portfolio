import { test, expect } from './fixtures.js';

test('hero adds bounded pointer depth and resets when motion is reduced', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.locator('.portrait-art').evaluate((image) =>
    Promise.all(image.getAnimations().map((animation) => animation.finished)));
  const hero = page.locator('.portrait-hero');
  const bounds = await hero.boundingBox();
  await page.mouse.move(bounds.x + bounds.width - 30, bounds.y + 120);
  await expect.poll(() => hero.evaluate((element) => parseFloat(element.style.getPropertyValue('--portrait-x')))).toBeGreaterThan(6);
  const values = await hero.evaluate((element) => ['--portrait-x', '--portrait-y'].map((name) => parseFloat(element.style.getPropertyValue(name))));
  expect(Math.abs(values[0])).toBeLessThanOrEqual(8);
  expect(Math.abs(values[1])).toBeLessThanOrEqual(5);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.portrait-art')).toHaveCSS('transform', 'none');
  await expect(page.locator('.portrait-art')).toHaveCSS('animation-name', 'none');
  expect(await hero.evaluate((element) => element.style.getPropertyValue('--portrait-x'))).toBe('0px');
  await page.mouse.move(300, 240);
  expect(await hero.evaluate((element) => element.style.getPropertyValue('--portrait-x'))).toBe('0px');
});

test('touch browsing keeps the portrait still and calls to action usable', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(baseURL);
  await page.dispatchEvent('.portrait-hero', 'pointermove', { pointerType: 'touch', clientX: 350, clientY: 400 });
  expect(await page.locator('.portrait-hero').evaluate((element) => element.style.getPropertyValue('--portrait-x'))).toBe('');
  await page.getByRole('link', { name: 'Selected work', exact: true }).tap();
  await expect(page.locator('#work')).toBeInViewport();
  await context.close();
});

test('new case cards reveal once without nesting existing section fades', async ({ page }) => {
  await page.goto('/analytics.html');
  await page.locator('#feature-walkthrough > summary').click();
  const card = page.locator('.solution-grid > li').last();
  await expect(card).toHaveClass(/reveal-target/);
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveClass(/is-revealed/);
  await expect(card).toHaveCSS('opacity', '1');
  await expect(card).toHaveCSS('transform', 'none');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.concept-node').first()).toHaveCSS('transform', 'none');
  await expect(page.locator('.concept-node').first()).toHaveCSS('opacity', '1');
});
