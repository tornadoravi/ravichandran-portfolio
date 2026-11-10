import { test, expect } from './fixtures.js';

const center = (locator) => locator.evaluate((element) => {
  const bounds = element.getBoundingClientRect();
  return { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };
});

test('mint dot tracks the mouse and the ring eases into place', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await page.clock.pauseAt(await page.evaluate(() => Date.now() + 1000));
  const cursor = page.locator('.portfolio-cursor');
  const dot = page.locator('.cursor-dot');
  const ring = page.locator('.cursor-ring');
  await expect(cursor).toHaveAttribute('aria-hidden', 'true');
  await expect(cursor).toHaveCSS('pointer-events', 'none');
  await page.mouse.move(100, 220);
  await page.clock.runFor(32);
  await expect(page.locator('html')).toHaveClass(/has-custom-cursor/);
  await expect(page.locator('html')).toHaveCSS('cursor', 'none');
  await page.mouse.move(900, 400);
  await page.clock.runFor(16);
  await expect.poll(async () => (await center(dot)).x).toBe(900);
  expect((await center(ring)).x).toBeLessThan(899);
  await page.clock.runFor(1000);
  await expect.poll(async () => Math.hypot((await center(ring)).x - 900, (await center(ring)).y - 400)).toBeLessThan(.25);
  await expect(cursor).toHaveCSS('opacity', '1');
  const viewport = page.viewportSize();
  await page.mouse.move(viewport.width - 1, viewport.height - 1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('ring responds to links without blocking their navigation', async ({ page }) => {
  await page.goto('/');
  const about = page.locator('#main-nav').getByRole('link', { name: 'About', exact: true });
  await about.hover();
  await expect(page.locator('.portfolio-cursor')).toHaveClass(/is-interactive/);
  await expect(page.locator('.cursor-ring')).toHaveCSS('width', '46px');
  await about.click();
  await expect(page).toHaveURL(/about\.html$/);
  await page.mouse.move(350, 240);
  await expect(page.locator('.portfolio-cursor')).toHaveCSS('opacity', '1');
});

test('reduced motion restores the native cursor, including live preference changes', async ({ page }) => {
  await page.goto('/');
  await page.mouse.move(150, 200);
  await expect(page.locator('html')).toHaveClass(/has-custom-cursor/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('html')).not.toHaveClass(/has-custom-cursor/);
  await expect(page.locator('.portfolio-cursor')).toHaveCSS('opacity', '0');
  await page.mouse.move(200, 200);
  await expect(page.locator('html')).not.toHaveClass(/has-custom-cursor/);
  await expect(page.locator('html')).toHaveCSS('cursor', 'auto');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.mouse.move(250, 200);
  await expect(page.locator('html')).toHaveClass(/has-custom-cursor/);
});

test('touch and coarse-pointer browsing keep the native cursor', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(baseURL);
  await page.dispatchEvent('body', 'pointermove', { pointerType: 'touch', clientX: 100, clientY: 200 });
  await page.dispatchEvent('body', 'pointermove', { pointerType: 'mouse', clientX: 100, clientY: 200 });
  await expect(page.locator('html')).not.toHaveClass(/has-custom-cursor/);
  await expect(page.locator('.portfolio-cursor')).toHaveCSS('opacity', '0');
  await context.close();
});

test('dialogs, text inputs, keyboard use, and pointer exit restore native behavior', async ({ page }) => {
  await page.goto('/analytics.html');
  await page.mouse.move(150, 200);
  await expect(page.locator('html')).toHaveClass(/has-custom-cursor/);
  const inspect = page.getByRole('button', { name: 'Inspect screenshot', exact: true }).first();
  await inspect.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('.portfolio-cursor')).toHaveCSS('opacity', '0');
  await expect(page.locator('html')).toHaveCSS('cursor', 'auto');
  await page.keyboard.press('Escape');
  await page.evaluate(() => {
    const input = document.createElement('input');
    input.id = 'cursor-test-input';
    input.style.cssText = 'position:fixed;top:150px;left:100px;z-index:10';
    document.body.append(input);
  });
  await page.locator('#cursor-test-input').hover();
  await expect(page.locator('html')).not.toHaveClass(/has-custom-cursor/);
  await page.mouse.move(400, 200);
  await expect(page.locator('html')).toHaveClass(/has-custom-cursor/);
  await page.keyboard.press('Tab');
  await expect(page.locator('html')).not.toHaveClass(/has-custom-cursor/);
  await page.mouse.move(450, 200);
  await expect(page.locator('html')).toHaveClass(/has-custom-cursor/);
  await page.dispatchEvent('html', 'pointerleave', { pointerType: 'mouse' });
  await expect(page.locator('html')).not.toHaveClass(/has-custom-cursor/);
});
