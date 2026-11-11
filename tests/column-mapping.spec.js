import { test, expect } from './fixtures.js';
import sharp from 'sharp';

test.use({ reducedMotion: 'reduce' });

const states = [
  ['task', 312, 235],
  ['time-entries', 780, 588],
  ['resource', 780, 588],
  ['cost', 778, 586],
  ['resource-layout', 779, 586]
];

for (const width of [320, 390, 768, 1440]) {
  test(`mapping evidence stays readable, native-sized and navigable at ${width}px`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    expect((await page.goto('/column-mapping.html')).status()).toBe(200);
    await expect(page.locator('h1')).toHaveText('Column Mapping& Configuration.');
    await expect(page.locator('#main-nav a[aria-current]')).toHaveText('Work');
    await expect(page.locator('#mapping-walkthrough')).not.toHaveAttribute('open');
    await expect(page.locator('.mapping-preview img')).toHaveJSProperty('naturalWidth', 780);
    await expect(page.locator('.mapping-preview .inspect-button')).toHaveCSS('color', 'rgb(41, 45, 41)');
    expect(await page.locator('.case-hero > .eyebrow').evaluate(node => parseFloat(getComputedStyle(node).fontSize))).toBeGreaterThanOrEqual(12);
    await page.locator('#mapping-walkthrough > summary').click();
    const images = page.locator('#mapping-walkthrough img');
    expect(await images.evaluateAll(nodes => nodes.map(node => node.getAttribute('src')))).toEqual(
      states.map(([name]) => `/assets/fabric-mapping-${name}.png`));
    for (const [index, [, nativeWidth, nativeHeight]] of states.entries()) {
      const image = images.nth(index);
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(image => image.decode());
      await expect(image).toHaveJSProperty('naturalWidth', nativeWidth);
      await expect(image).toHaveJSProperty('naturalHeight', nativeHeight);
      const box = await image.boundingBox();
      expect(box.width).toBeLessThanOrEqual(nativeWidth);
      expect(box.width / box.height).toBeCloseTo(nativeWidth / nativeHeight, 2);
      await expect(image).toHaveAttribute('alt', /.+/);
    }
    for (const link of await page.locator('.case-nav a').all()) {
      await expect(page.locator(await link.getAttribute('href'))).toHaveCount(1);
      expect((await link.boundingBox()).height).toBeGreaterThanOrEqual(44);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    expect(errors).toEqual([]);
  });
}

test('mapping crops are served at their native dimensions and sources remain distinct', async ({ request, page }) => {
  for (const [name, width, height] of states) {
    const response = await request.get(`/assets/fabric-mapping-${name}.png`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    const metadata = await sharp(await response.body()).metadata();
    expect([metadata.width, metadata.height]).toEqual([width, height]);
  }
  await page.goto('/column-mapping.html');
  await expect(page.locator('.metadata')).toContainText('Five configuration design states');
  await expect(page.locator('#evidence')).toContainText('does not independently verify every Time Entries, Resource, or Cost state');
  await expect(page.locator('#evidence')).toContainText('cropping is not publication clearance');
  await expect(page.locator('#evidence a[href^="https://learn.microsoft.com/"]')).toHaveCount(2);
  await expect(page.locator('#cost-mapping')).toContainText('does not establish calculation formulas');
  await expect(page.locator('#resource-layout')).toContainText('not a mandatory fifth step');
  expect((await request.get('/assets/fabric-mapping-original.png')).status()).toBe(404);
});

test('Home and PowerTable link to the new feature without changing the product order', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.project')).toHaveCount(2);
  await expect(page.locator('.project').first()).toHaveAttribute('id', 'project-planning');
  await page.locator('#project-planning .case-link').click();
  await page.locator('#column-mapping a[href="/column-mapping.html"]').click();
  await expect(page).toHaveURL(/column-mapping\.html$/);
  await page.locator('.back-link').click();
  await expect(page).toHaveURL(/powertable\.html#column-mapping$/);
  await page.locator('#column-mapping a').click();
  await expect(page).toHaveURL(/column-mapping\.html$/);
});

test('section shortcuts open the walkthrough and screenshot inspection returns focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/column-mapping.html');
  const costLink = page.locator('.case-nav a[href="#cost-mapping"]');
  await costLink.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#mapping-walkthrough')).toHaveAttribute('open');
  await expect(page.locator('#cost-mapping')).toBeInViewport();
  const opener = page.locator('#cost-mapping .inspect-button');
  await opener.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Actual size', exact: true }).click();
  const viewport = dialog.getByRole('region', { name: 'Screenshot image' });
  await viewport.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => viewport.evaluate(node => node.scrollLeft)).toBeGreaterThan(0);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
  for (const id of ['task-mapping', 'time-mapping', 'resource-mapping', 'cost-mapping', 'resource-layout']) {
    await page.goto('/column-mapping.html#' + id);
    await expect(page.locator('#mapping-walkthrough')).toHaveAttribute('open');
    await expect(page.locator('#' + id)).toBeInViewport();
  }
});

test('mapping screens and full-size links remain available without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(baseURL + '/column-mapping.html');
  await expect(page.locator('.mapping-preview img')).toHaveJSProperty('naturalWidth', 780);
  await page.locator('#mapping-walkthrough > summary').focus();
  await page.keyboard.press('Enter');
  for (const [name, width] of states) {
    const image = page.locator(`#mapping-walkthrough img[src="/assets/fabric-mapping-${name}.png"]`);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty('naturalWidth', width);
    await expect(image.locator('..')).toHaveAttribute('target', '_blank');
  }
  await expect(page.locator('.inspect-button')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});
