import { test, expect, openCaseDetails, openWorkspaceNavigation } from './fixtures.js';
import sharp from 'sharp';

test.use({ reducedMotion: 'reduce' });

const crops = [
  ['compare-menu', 452, 281],
  ['timeline', 918, 692],
  ['manager', 350, 360]
];

for (const width of [320, 390, 768, 1440]) {
  test(`baseline evidence stays native-sized and navigable at ${width}px`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    expect((await page.goto('/gantt-baselines.html')).status()).toBe(200);
    await openCaseDetails(page);
    await expect(page.locator('h1')).toHaveText('Gantt Baselines.');
    await expect(page.locator('#main-nav a[aria-current]')).toHaveText('Work');
    await expect(page.locator('body')).toHaveAttribute('data-native-cursor', '');
    const images = page.locator('main .product-screenshot img');
    expect(await images.evaluateAll(nodes => nodes.map(node => node.getAttribute('src'))))
      .toEqual(crops.map(([name]) => `/assets/fabric-baseline-${name}.png`));
    for (const [index, [, nativeWidth, nativeHeight]] of crops.entries()) {
      const image = images.nth(index);
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(image => image.decode());
      await expect(image).toHaveJSProperty('naturalWidth', nativeWidth);
      await expect(image).toHaveJSProperty('naturalHeight', nativeHeight);
      const box = await image.boundingBox();
      expect(box.width).toBeLessThanOrEqual(nativeWidth);
      expect(box.width / box.height).toBeCloseTo(nativeWidth / nativeHeight, 2);
      await expect(image).toHaveAttribute('alt', /.+/);
      await expect(image.locator('..')).toHaveAttribute('target', '_blank');
    }
    for (const link of await page.locator('.case-nav a').all()) {
      await expect(page.locator(await link.getAttribute('href'))).toHaveCount(1);
      expect((await link.boundingBox()).height).toBeGreaterThanOrEqual(44);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    expect(errors).toEqual([]);
  });
}

test('baseline crops are allowlisted, native resolution, and privacy redacted', async ({ request }) => {
  for (const [name, width, height] of crops) {
    const response = await request.get(`/assets/fabric-baseline-${name}.png`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    const image = sharp(await response.body());
    const metadata = await image.metadata();
    expect([metadata.width, metadata.height]).toEqual([width, height]);
    if (name === 'manager') {
      for (const top of [121, 220, 319]) {
        const region = await image.clone().extract({ left: 16, top, width: 317, height: 32 }).toBuffer();
        const { channels } = await sharp(region).stats();
        for (const channel of channels.slice(0, 3)) {
          expect(channel.min).toBe(255);
          expect(channel.max).toBe(255);
        }
      }
    }
  }
  expect((await request.get('/assets/fabric-baseline-original.png')).status()).toBe(404);
  expect((await request.get('/gantt-baselines.spec.js')).status()).toBe(404);
});

test('baseline content distinguishes observed controls from unverified behavior', async ({ page }) => {
  await page.goto('/gantt-baselines.html');
  await openCaseDetails(page);
  await expect(page.locator('.metadata')).toContainText('Two comparison design states');
  await expect(page.locator('#overview')).toContainText('two total selections, not two baselines plus current data');
  await expect(page.locator('#overview')).toContainText('configuration dialog is not supplied');
  await expect(page.locator('#management')).toContainText('Author metadata rows have been redacted');
  await expect(page.locator('#comparison')).toContainText('not an additional state');
  await expect(page.locator('#evidence')).toContainText('do not document these Set Baseline controls');
  await expect(page.locator('#evidence a[href^="https://learn.microsoft.com/"]')).toHaveCount(2);
  await page.locator('#evidence summary').click();
  await expect(page.locator('#evidence')).toContainText('not publication clearance');
  await expect(page.locator('#evidence')).toContainText('Resource Gantt baseline planning remains a separate exploration');
  await expect(page.locator('#evidence')).toContainText('not an interactive planning tool');
});

test('Home, parent, and sibling connect both feature cases without changing product order', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.project')).toHaveCount(2);
  await expect(page.locator('.project').first()).toHaveAttribute('id', 'project-planning');
  await page.locator('#project-planning .case-link').click();
  await page.getByRole('link', { name: 'Explore Gantt', exact: true }).click();
  await openWorkspaceNavigation(page);
  await page.getByRole('navigation', { name: 'PowerTable Gantt features' }).getByRole('link', { name: 'Baselines', exact: true }).click();
  await expect(page).toHaveURL(/gantt-baselines\.html$/);
  await page.locator('.back-link').click();
  await expect(page).toHaveURL(/powertable\.html#gantt-features$/);
  await page.getByRole('link', { name: 'Explore Gantt', exact: true }).click();
  await openWorkspaceNavigation(page);
  await page.getByRole('navigation', { name: 'PowerTable Gantt features' }).getByRole('link', { name: 'Baselines', exact: true }).click();
  await expect(page).toHaveURL(/gantt-baselines\.html$/);
  await page.locator('.next-project').click();
  await expect(page).toHaveURL(/column-mapping\.html$/);
  await page.locator('.next-project').click();
  await expect(page).toHaveURL(/gantt-baselines\.html$/);
});

test('mobile timeline inspection supports panning, Escape, and focus return', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/gantt-baselines.html#comparison');
  const opener = page.locator('#comparison .inspect-button');
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
});

test('baseline evidence and source disclosure work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(baseURL + '/gantt-baselines.html');
  await openCaseDetails(page);
  for (const [name, width] of crops) {
    const image = page.locator(`img[src="/assets/fabric-baseline-${name}.png"]`);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty('naturalWidth', width);
    await expect(image.locator('..')).toHaveAttribute('target', '_blank');
  }
  await page.locator('#evidence summary').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#evidence details')).toHaveAttribute('open');
  await expect(page.locator('.inspect-button')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});
