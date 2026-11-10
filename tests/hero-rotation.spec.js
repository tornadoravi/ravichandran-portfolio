import { test, expect } from './fixtures.js';

const phrases = [
  'Considered experiences.',
  'Intuitive workflows.',
  'Clear interactions.',
  'Confident decisions.'
];

for (const width of [320, 390, 768, 1060, 1440, 1920]) {
  test(`four professional phrases rotate without shifting the hero at ${width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width, height: 900 });
    await page.clock.install();
    await page.goto('/');
    await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
    await expect(page.locator('.hero-copy button')).toHaveCount(0);
    await page.evaluate(() => document.fonts.ready);
    const title = page.locator('.portrait-title');
    await title.evaluate(element => Promise.all(element.getAnimations().map(animation => animation.finished)));
    const initial = await title.boundingBox();
    const portrait = await page.locator('.hero-portrait').boundingBox();
    const work = await page.locator('#work').boundingBox();
    for (const phrase of [...phrases, phrases[0]]) {
      await expect(title.locator('.headline-phrase')).toHaveText(phrase);
      await expect(title).toHaveAccessibleName('Complex products. Considered experiences.');
      expect(await title.evaluate(element => element.firstChild.textContent)).toBe('Complex products.');
      const current = await title.boundingBox();
      expect(current.x).toBeCloseTo(initial.x, 1);
      expect(current.y).toBeCloseTo(initial.y, 1);
      expect(current.height).toBeCloseTo(initial.height, 1);
      expect((await page.locator('.hero-portrait').boundingBox()).y).toBeCloseTo(portrait.y, 1);
      expect((await page.locator('#work').boundingBox()).y).toBeCloseTo(work.y, 1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.clock.fastForward(4000);
    }
  });
}

test('reduced motion keeps the original headline still, including preference changes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.clock.install();
  await page.goto('/');
  await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
  const phrase = page.locator('.headline-phrase');
  await expect(page.locator('.hero-copy button')).toHaveCount(0);
  await page.clock.fastForward(16000);
  await expect(phrase).toHaveText(phrases[0]);
  await expect(phrase).toHaveCSS('animation-name', 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('.rotating-headline')).toHaveAttribute('data-rotating', 'true');
  await page.clock.fastForward(4000);
  await expect(phrase).toHaveText(phrases[1]);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(phrase).toHaveText(phrases[0]);
  await page.clock.fastForward(16000);
  await expect(phrase).toHaveText(phrases[0]);
});

test('the original headline remains available without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(baseURL);
    await expect(page.locator('h1')).toHaveText('Complex products.Considered experiences.');
    await expect(page.locator('.hero-copy button')).toHaveCount(0);
  } finally {
    await context.close();
  }
});
