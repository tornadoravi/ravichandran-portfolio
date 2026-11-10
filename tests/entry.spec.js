import { test, expect } from '@playwright/test';

for (const [width, height] of [[1920, 1080], [1440, 1080], [1440, 600], [768, 1024], [390, 844], [320, 568]]) {
  test(`Home introduction fills the first screen without clipping at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const hero = await page.locator('.portrait-hero').boundingBox();
    const work = await page.locator('#work').boundingBox();
    expect(hero.y + hero.height).toBeGreaterThanOrEqual(height);
    expect(work.y).toBeGreaterThanOrEqual(height);
    if (width > 1050) expect(work.y).toBeCloseTo(height, 0);
    for (const selector of ['.hero-role', '.portrait-title', '.hero-introduction', '.portrait-art']) {
      const content = await page.locator(selector).boundingBox();
      expect(content.y).toBeGreaterThanOrEqual(hero.y);
      expect(content.y + content.height).toBeLessThanOrEqual(hero.y + hero.height);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

for (const width of [320, 390, 1440]) {
  test(`editorial Home opens directly with a visible route to work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('.portfolio-intro, .intro-skip')).toHaveCount(0);
    await expect(page.locator('html')).not.toHaveClass(/intro-active/);
    await expect(page.locator('.hero-role')).toContainText('Product Designer II at Lumel');
    await expect(page.locator('.hero-role')).toBeInViewport();
    await expect(page.locator('.portrait-footer, .portrait-work-link')).toHaveCount(0);
    const hero = await page.locator('.portrait-hero').boundingBox();
    const workTop = await page.locator('#work').evaluate(element => element.getBoundingClientRect().top + scrollY);
    expect(workTop).toBeGreaterThanOrEqual(hero.y + hero.height);
    expect(workTop - hero.y - hero.height).toBeLessThanOrEqual(24);
    const imageTop = await page.locator('#project-planning .product-screenshot img')
      .evaluate(image => image.getBoundingClientRect().top + scrollY);
    expect(imageTop - workTop).toBeLessThanOrEqual(500);
    await expect(page.locator('#work .flagship-link')).toHaveCount(0);
    if (width <= 700) await page.locator('.menu-toggle').click();
    await page.locator('#main-nav a[href="/#work"]').click();
    await expect(page.locator('#work')).toBeInViewport();
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

test('former Home feature bookmarks still reach Analytics+ without restoring the removed link section', async ({ browser, baseURL }) => {
  for (const javaScriptEnabled of [true, false]) {
    const context = await browser.newContext({ javaScriptEnabled, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
    try {
      const page = await context.newPage();
      for (const id of ['project-storyboard', 'project-gantt', 'project-wizard', 'project-presentation', 'project-kpi']) {
        await page.goto(baseURL + '/#' + id);
        await expect(page.locator('#' + id)).toBeInViewport();
        await expect(page.locator('#project-analytics .project-visual')).toBeInViewport();
        await expect(page.locator('.project-features')).toHaveCount(0);
      }
    } finally {
      await context.close();
    }
  }
});
