import { test, expect } from '@playwright/test';

for (const width of [320, 390, 1440]) {
  test(`full-screen Home opens directly with a visible route to work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('.portfolio-intro, .intro-skip')).toHaveCount(0);
    await expect(page.locator('html')).not.toHaveClass(/intro-active/);
    await expect(page.locator('.portrait-footer')).toContainText('Product Designer II at Lumel');
    await expect(page.locator('.portrait-work-link')).toBeInViewport();
    const hero = await page.locator('.portrait-hero').boundingBox();
    const workTop = await page.locator('#work').evaluate(element => element.getBoundingClientRect().top + scrollY);
    expect(workTop).toBeGreaterThanOrEqual(hero.y + hero.height);
    expect(workTop - hero.y - hero.height).toBeLessThanOrEqual(24);
    const imageTop = await page.locator('#project-planning .product-screenshot img')
      .evaluate(image => image.getBoundingClientRect().top + scrollY);
    expect(imageTop - workTop).toBeLessThanOrEqual(width === 1440 ? 340 : 500);
    await expect(page.locator('#work .flagship-link')).toHaveAttribute('href', '/analytics.html');
    await expect(page.locator('.portrait-work-link')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('opening, refreshing and restoring Home never starts a countdown', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await page.clock.fastForward(5000);
  await expect(page.locator('dialog[open], .portfolio-intro')).toHaveCount(0);
  await page.reload();
  await page.clock.fastForward(5000);
  await page.evaluate(() => dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
  await expect(page.locator('dialog[open], .portfolio-intro')).toHaveCount(0);
  await expect(page.locator('.portrait-hero')).toBeVisible();
});

test('direct work bookmarks remain intact without an intro intercept', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const hash of ['#work', '#project-planning', '#project-analytics']) {
    await page.goto('/' + hash);
    await expect(page).toHaveURL(new RegExp(hash + '$'));
    await expect(page.locator(hash)).toBeInViewport();
    await expect(page.locator('#main-nav a[aria-current]')).toHaveText('Work');
  }
  await page.locator('#main-nav').getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('#main-nav a[aria-current]')).toHaveText('Home');
  await expect(page.locator('.portfolio-intro')).toHaveCount(0);
});
