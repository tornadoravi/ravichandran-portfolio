import { test, expect, openListeningControls } from './fixtures.js';

test('About and case pages retain the native pointer', async ({ page }) => {
  for (const path of ['/about.html', '/powertable.html', '/analytics-plus.html', '/analytics.html', '/column-mapping.html']) {
    await page.goto(path);
    await page.mouse.move(150, 200);
    await expect(page.locator('html')).not.toHaveClass(/has-custom-cursor/);
    await expect(page.locator('html')).toHaveCSS('cursor', 'auto');
    await expect(page.locator('.portfolio-cursor')).toHaveCSS('opacity', '0');
    await expect(page.locator('.portfolio-cursor')).toHaveCSS('pointer-events', 'none');
  }
  await page.locator('#main-nav').getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/about\.html$/);
});

test('Home follows live reduced-motion preferences', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.portfolio-cursor')).toHaveCount(1);
  for (const reducedMotion of ['reduce', 'no-preference', 'reduce']) {
    await page.emulateMedia({ reducedMotion });
    await page.mouse.move(350, 300);
    if (reducedMotion === 'reduce') {
      await expect(page.locator('html')).not.toHaveClass(/has-custom-cursor/);
      await expect(page.locator('html')).toHaveCSS('cursor', 'auto');
    } else await expect(page.locator('html')).toHaveClass(/has-custom-cursor/);
  }
});

test('the decorative You arrow tracks the pointer exactly and keeps its label inside the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('.portfolio-cursor')).toHaveCount(1);
  await page.evaluate(() => document.fonts.ready);
  await page.mouse.move(350, 300);
  const cursor = page.locator('.portfolio-cursor');
  await expect(page.locator('html')).toHaveClass(/has-custom-cursor/);
  await expect(cursor).toHaveAttribute('aria-hidden', 'true');
  await expect(cursor.locator('.cursor-name')).toHaveText('You');
  await expect(cursor).toHaveCSS('pointer-events', 'none');
  const pointer = await cursor.locator('.cursor-pointer').boundingBox();
  expect(pointer.x + 3).toBe(350);
  expect(pointer.y + 2).toBe(300);
  await page.mouse.move(1438, 898);
  await expect(cursor).toHaveClass(/is-left/);
  await expect(cursor).toHaveClass(/is-above/);
  const label = await cursor.locator('.cursor-name').boundingBox();
  expect(label.x).toBeGreaterThanOrEqual(0);
  expect(label.y).toBeGreaterThanOrEqual(0);
  expect(label.x + label.width).toBeLessThanOrEqual(1440);
  expect(label.y + label.height).toBeLessThanOrEqual(900);
});

test('the Home cursor yields to header, keyboard, controls, nested opt-outs and route cleanup', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('.portfolio-cursor')).toHaveCount(1);
  await page.evaluate(() => document.fonts.ready);
  await page.mouse.move(350, 300);
  await expect(page.locator('html')).toHaveClass(/has-custom-cursor/);
  await page.mouse.move(100, 40);
  await expect(page.locator('html')).not.toHaveClass(/has-custom-cursor/);
  await page.mouse.move(350, 300);
  await expect(page.locator('html')).toHaveClass(/has-custom-cursor/);
  await page.keyboard.press('Tab');
  await expect(page.locator('html')).not.toHaveClass(/has-custom-cursor/);
  await openListeningControls(page);
  await page.getByRole('button', { name: 'Soundroom Mode', exact: true }).click();
  await page.getByRole('slider', { name: 'Volume', exact: true }).hover();
  await expect(page.locator('html')).not.toHaveClass(/has-custom-cursor/);
  await page.locator('.hero-identity').evaluate(element => element.setAttribute('data-native-cursor', ''));
  await page.locator('.hero-identity').hover();
  await expect(page.locator('html')).not.toHaveClass(/has-custom-cursor/);
  await page.locator('.hero-identity').evaluate(element => element.removeAttribute('data-native-cursor'));
  await page.locator('.hero-identity').hover();
  await expect(page.locator('html')).toHaveClass(/has-custom-cursor/);
  await page.locator('.product-context-card[href="/powertable.html"]').click();
  await expect(page).toHaveURL(/powertable\.html$/);
  await expect(page.locator('html')).not.toHaveClass(/has-custom-cursor/);
  await expect(page.locator('.portfolio-cursor')).toHaveCount(1);
});

test('touch browsing and keyboard navigation preserve native behavior', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto(baseURL);
    await page.dispatchEvent('body', 'pointermove', { pointerType: 'touch', clientX: 100, clientY: 200 });
    await expect(page.locator('html')).not.toHaveClass(/has-custom-cursor/);
    await page.locator('.hero-work-link').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#work')).toBeInViewport();
  } finally {
    await context.close();
  }
});

test('screenshot inspection remains keyboard-usable with the native cursor', async ({ page }) => {
  await page.goto('/analytics.html');
  const inspect = page.getByRole('button', { name: 'Inspect screenshot', exact: true }).first();
  await inspect.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('html')).toHaveCSS('cursor', 'auto');
  await page.keyboard.press('Escape');
  await expect(inspect).toBeFocused();
  await page.mouse.move(450, 200);
  await expect(page.locator('html')).not.toHaveClass(/has-custom-cursor/);
});
