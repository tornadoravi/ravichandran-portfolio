import { test, expect } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

for (const width of [320, 390, 650, 768, 1440]) {
  test(`Home centers the reference portrait over a full-width title at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('.portrait-intro')).toHaveCount(0);
    await expect(page.locator('.portrait-kicker')).toContainText('From complexity to clarity');
    const hero = await page.locator('.portrait-hero').boundingBox();
    const portrait = await page.locator('.portrait-art').boundingBox();
    expect(Math.abs(portrait.x + portrait.width / 2 - hero.x - hero.width / 2)).toBeLessThan(1);
    expect(hero.width).toBe(width);
    expect(hero.y + hero.height).toBeCloseTo(900, 1);
    expect(portrait.width).toBeLessThanOrEqual(width <= 700 ? Math.min(width * 1.16, 600) + 1 : Math.min(width * .78, 1000) + 1);
    expect(portrait.width / portrait.height).toBeCloseTo(1, 2);
    const kicker = await page.locator('.portrait-kicker').boundingBox();
    const footer = await page.locator('.portrait-footer').boundingBox();
    expect(portrait.y).toBeGreaterThan(kicker.y + kicker.height + 16);
    expect(portrait.y + portrait.height * .9).toBeLessThan(footer.y);
    const title = await page.locator('.portrait-title > span').boundingBox();
    expect(title.x).toBeGreaterThanOrEqual(0);
    expect(title.x + title.width).toBeLessThanOrEqual(width + 1);
    await expect(page.locator('.portrait-title')).toHaveCSS('z-index', '0');
    await expect(page.locator('.portrait-stage')).toHaveCSS('z-index', '1');
    await expect(page.locator('.portrait-title > span')).toHaveCSS('background-clip', 'text');
    await expect(page.locator('.portrait-title em')).toHaveCSS('display', width > 700 ? 'inline' : 'block');
    expect(await page.locator('.portrait-stage').evaluate(element =>
      getComputedStyle(element, '::before').borderRadius)).toBe('50%');
    for (const project of await page.locator('#work > .project').all()) {
      const preview = await project.locator('.project-visual').boundingBox();
      const caption = await project.locator('.project-caption').boundingBox();
      expect(Math.abs(preview.x - caption.x)).toBeLessThan(1);
      expect(Math.abs(preview.width - caption.width)).toBeLessThan(1);
      expect(caption.y).toBeGreaterThanOrEqual(preview.y + preview.height - 1);
      const image = project.locator('.product-screenshot img');
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(image => image.decode());
      const dimensions = await image.evaluate(image => ({
        width: image.clientWidth, height: image.clientHeight,
        nativeWidth: image.naturalWidth, nativeHeight: image.naturalHeight
      }));
      expect(dimensions.width).toBeLessThanOrEqual(dimensions.nativeWidth);
      expect(Math.abs(dimensions.width / dimensions.height - dimensions.nativeWidth / dimensions.nativeHeight)).toBeLessThan(.02);
      if (width === 1440) expect(dimensions.width).toBeGreaterThan(1000);
    }

    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await expect(page.locator('#project-planning h3')).toHaveText('Connected planning');
    await expect(page.locator('#project-analytics h3')).toHaveText('Inforiver Analytics+');
  });
}

test('short screens keep the portrait fade clear of the role and work action', async ({ page }) => {
  for (const [width, height] of [[320, 640], [390, 700], [650, 700], [1440, 768]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const portrait = await page.locator('.portrait-art').boundingBox();
    const footer = await page.locator('.portrait-footer').boundingBox();
    expect(portrait.y + portrait.height * .9).toBeLessThan(footer.y);
    await expect(page.locator('.portrait-work-link')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
});

test('wide Home preserves the reference composition with a smaller, balanced portrait', async ({ page }) => {
  await page.setViewportSize({ width: 2000, height: 1426 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const header = await page.locator('.site-header').boundingBox();
  const hero = await page.locator('.portrait-hero').boundingBox();
  const portrait = await page.locator('.portrait-art').boundingBox();
  const title = await page.locator('.portrait-title > span').boundingBox();
  expect(header.height).toBe(148);
  expect(hero.height).toBe(1278);
  expect(portrait.width).toBe(1000);
  expect(portrait.x + portrait.width / 2).toBe(1000);
  expect(title.width / 2000).toBeGreaterThan(.93);
  expect(title.width / 2000).toBeLessThan(.98);
  await expect(page.locator('.portrait-title')).toHaveCSS('white-space', 'nowrap');
  await expect(page.locator('.portrait-art')).toHaveAttribute('src', '/assets/portrait-3d.webp');
  await expect(page.locator('.portrait-hero h1')).toHaveCount(1);
});
