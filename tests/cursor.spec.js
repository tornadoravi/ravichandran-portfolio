import { test, expect } from './fixtures.js';

test('editorial pages keep the native pointer across Home, About and case navigation', async ({ page }) => {
  for (const path of ['/', '/about.html', '/powertable.html', '/analytics-plus.html', '/analytics.html', '/column-mapping.html']) {
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

test('live motion preferences never re-enable a decorative cursor on editorial pages', async ({ page }) => {
  await page.goto('/');
  for (const reducedMotion of ['reduce', 'no-preference']) {
    await page.emulateMedia({ reducedMotion });
    await page.mouse.move(250, 200);
    await expect(page.locator('html')).not.toHaveClass(/has-custom-cursor/);
    await expect(page.locator('html')).toHaveCSS('cursor', 'auto');
  }
});

test('touch browsing and keyboard navigation preserve native behavior', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto(baseURL);
    await page.dispatchEvent('body', 'pointermove', { pointerType: 'touch', clientX: 100, clientY: 200 });
    await expect(page.locator('html')).not.toHaveClass(/has-custom-cursor/);
    await page.locator('.menu-toggle').click();
    await page.locator('#main-nav a[href="/#work"]').focus();
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
