import { test, expect } from './fixtures.js';

for (const width of [320, 390, 768, 1060, 1440, 1920]) {
  test(`headline stays static and stable at ${width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width, height: 900 });
    await page.clock.install();
    await page.goto('/');
    await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
    await page.evaluate(() => document.fonts.ready);
    const title = page.locator('.portrait-title');
    const initial = await title.boundingBox();
    await page.clock.fastForward(2500);
    const portrait = await page.locator('.hero-portrait-stage').boundingBox();
    const work = await page.locator('#work').boundingBox();
    await page.clock.fastForward(20000);
    await expect(title).toHaveText('I’m a product designer making complex products easier to use.');
    await expect(title).toHaveAccessibleName('I’m a product designer making complex products easier to use.');
    await expect(title).toHaveCSS('animation-name', 'none');
    expect(await title.boundingBox()).toEqual(initial);
    expect(await page.locator('.hero-portrait-stage').boundingBox()).toEqual(portrait);
    expect(await page.locator('#work').boundingBox()).toEqual(work);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('headline remains still across live motion preference changes', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
  for (const reducedMotion of ['reduce', 'no-preference', 'reduce']) {
    await page.emulateMedia({ reducedMotion });
    await page.clock.fastForward(16000);
    await expect(page.locator('.portrait-title')).toHaveText('I’m a product designer making complex products easier to use.');
    await expect(page.locator('.portrait-title')).toHaveCSS('animation-name', 'none');
  }
});

test('the same headline is available without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(baseURL);
    await expect(page.locator('h1')).toHaveText('I’m a product designer making complex products easier to use.');
  } finally {
    await context.close();
  }
});
