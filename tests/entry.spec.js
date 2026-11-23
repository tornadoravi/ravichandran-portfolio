import { test, expect } from '@playwright/test';

for (const [width, height] of [[1920, 1080], [1440, 1080], [1440, 600], [768, 1024], [390, 844], [320, 568]]) {
  test(`Home introduction keeps every element inside its section at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const hero = await page.locator('.reference-hero').boundingBox();
    const work = await page.locator('#work').boundingBox();
    expect(hero.height).toBeGreaterThan(0);
    expect(work.y).toBeGreaterThanOrEqual(hero.y + hero.height);
    for (const selector of ['.hero-role', '.portrait-title', '.hero-introduction', '.hero-portrait-frame']) {
      const content = await page.locator(selector).boundingBox();
      expect(content.y).toBeGreaterThanOrEqual(hero.y);
      expect(content.y + content.height).toBeLessThanOrEqual(hero.y + hero.height);
    }
    await expect(page.locator('.hero-portrait-frame')).toHaveCSS('overflow', 'clip');
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
    const hero = await page.locator('.reference-hero').boundingBox();
    const workTop = await page.locator('#work').evaluate(element => element.getBoundingClientRect().top + scrollY);
    expect(workTop).toBeGreaterThanOrEqual(hero.y + hero.height);
    expect(workTop - hero.y - hero.height).toBeLessThanOrEqual(24);
    const imageTop = await page.locator('#project-planning .cover-screen img')
      .evaluate(image => image.getBoundingClientRect().top + scrollY);
    expect(imageTop).toBeGreaterThanOrEqual(workTop);
    await expect(page.locator('#work .flagship-link')).toHaveCount(0);
    await page.locator('.hero-work-link').click();
    await expect(page.locator('#work')).toBeInViewport();
    await expect(page.locator('#project-planning .cover-screen img')).toBeInViewport();
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
  await expect(page.locator('.reference-hero')).toBeVisible();
});

test('direct work bookmarks remain intact without an intro intercept', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const hash of ['#work', '#project-planning', '#project-analytics']) {
    await page.goto('/' + hash);
    await expect(page).toHaveURL(new RegExp(hash + '$'));
    await expect(page.locator(hash)).toBeInViewport();
    await expect(page.locator('#main-nav a[aria-current]')).toHaveText('Home');
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
        await expect(page.locator('#project-analytics .product-cover-art')).toBeInViewport();
        await expect(page.locator('.project-features')).toHaveCount(0);
      }
    } finally {
      await context.close();
    }
  }
});
