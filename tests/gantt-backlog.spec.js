import { test, expect } from './fixtures.js';
import sharp from 'sharp';

test.use({ reducedMotion: 'reduce' });

const crops = [
  ['empty', 350, 550],
  ['list', 350, 550],
  ['pending', 500, 40]
];

for (const width of [320, 390, 768, 1440]) {
  test(`backlog evidence remains native-sized and navigable at ${width}px`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    expect((await page.goto('/gantt-backlog.html')).status()).toBe(200);
    await expect(page.locator('h1')).toHaveText('Gantt Backlog.Keep unscheduled work in view.');
    await expect(page.locator('#main-nav a[aria-current]')).toHaveText('Work');
    await expect(page.locator('body')).toHaveAttribute('data-native-cursor', '');
    const images = page.locator('main .product-screenshot img');
    expect(await images.evaluateAll(nodes => nodes.map(node => node.getAttribute('src'))))
      .toEqual(crops.map(([name]) => `/assets/fabric-backlog-${name}.png`));
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
    const [empty, list] = await page.locator('.backlog-state').all();
    const emptyBox = await empty.boundingBox();
    const listBox = await list.boundingBox();
    if (width > 900) {
      expect(listBox.x).toBeGreaterThan(emptyBox.x + emptyBox.width);
      expect(listBox.y).toBeCloseTo(emptyBox.y, 0);
    } else {
      expect(listBox.y).toBeGreaterThan(emptyBox.y + emptyBox.height);
    }
    expect(await page.locator('.case-hero > .eyebrow').evaluate(node => parseFloat(getComputedStyle(node).fontSize)))
      .toBeGreaterThanOrEqual(12);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    expect(errors).toEqual([]);
  });
}

test('only the three native backlog crops are served', async ({ request }) => {
  for (const [name, width, height] of crops) {
    const response = await request.get(`/assets/fabric-backlog-${name}.png`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    const metadata = await sharp(await response.body()).metadata();
    expect([metadata.width, metadata.height]).toEqual([width, height]);
  }
  for (const path of ['/assets/fabric-backlog-original.png', '/attachments/1f8bfbb6-0f29-430c-8305-36330810fb3e-36a783a3-3b03-4a7b-b903-cc0d15cf10d1-clipboard.png', '/tests/gantt-backlog.spec.js']) {
    expect((await request.get(path)).status()).toBe(404);
  }
});

test('backlog states, pending changes, and resource-layout documentation remain distinct', async ({ page }) => {
  await page.goto('/gantt-backlog.html');
  await expect(page.locator('.metadata')).toContainText('Two supplied backlog states');
  await expect(page.locator('#empty-state')).toContainText('No Task Available');
  await expect(page.locator('#empty-state')).toContainText('+ Add Task');
  await expect(page.locator('#backlog-list')).toContainText('Backlog List (1)');
  await expect(page.locator('#backlog-list')).toContainText('T0011');
  await expect(page.locator('#backlog-list')).toContainText('task form itself is not supplied');
  await expect(page.locator('#pending-changes')).toContainText('Preview Changes (1)');
  await expect(page.locator('#pending-changes')).toContainText('No save confirmation or database result is supplied');
  await expect(page.locator('#pending-changes figcaption')).toContainText('not a third state');
  await expect(page.locator('#evidence')).toContainText('Resource layout');
  await expect(page.locator('#evidence a[href^="https://learn.microsoft.com/"]')).toHaveCount(2);
  await expect(page.locator('#evidence a').first()).toHaveAttribute('href', /how-to-manage-tasks-resource#create-a-backlog-task$/);
  await page.locator('#evidence summary').click();
  await expect(page.locator('#evidence')).toContainText('Cropping is not publication clearance');
  await expect(page.locator('#evidence')).toContainText('not an interactive backlog application');
  await expect(page.locator('#evidence')).toContainText('No independently verified feature-specific customer review');
  await expect(page.locator('#evidence')).toContainText('do not establish T0011');
});

test('Home, parent, and formatting sibling expose backlog without adding another product', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.project')).toHaveCount(2);
  await expect(page.locator('.case-link')).toHaveCount(2);
  await page.locator('#project-planning .case-link').click();
  await page.locator('.workspace-grid a[href="/gantt-backlog.html"]').click();
  await expect(page).toHaveURL(/gantt-backlog\.html$/);
  await page.locator('.back-link').click();
  await expect(page).toHaveURL(/powertable\.html#backlog$/);
  await page.locator('#backlog a').click();
  await page.locator('.next-project').click();
  await expect(page).toHaveURL(/gantt-conditional-formatting\.html$/);
  await page.locator('a[href="/gantt-backlog.html"]').click();
  await expect(page).toHaveURL(/gantt-backlog\.html$/);
});

test('keyboard section links and screenshot inspection support focus return and native panning', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/gantt-backlog.html');
  await page.locator('.case-nav a[href="#backlog-list"]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#backlog-list')).toBeInViewport();
  const listOpener = page.locator('#backlog-list .inspect-button');
  await listOpener.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(listOpener).toBeFocused();
  const opener = page.locator('#pending-changes .inspect-button');
  await opener.click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('button', { name: 'Actual size', exact: true }).click();
  const viewport = dialog.getByRole('region', { name: 'Screenshot image' });
  await viewport.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => viewport.evaluate(node => node.scrollLeft)).toBeGreaterThan(0);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test('backlog images, source disclosure, and parent navigation work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(baseURL + '/gantt-backlog.html');
  for (const [name, width] of crops) {
    const image = page.locator(`img[src="/assets/fabric-backlog-${name}.png"]`);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty('naturalWidth', width);
    await expect(image.locator('..')).toHaveAttribute('target', '_blank');
  }
  await page.locator('#evidence summary').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#evidence details')).toHaveAttribute('open');
  await expect(page.locator('.inspect-button')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('.back-link').click();
  await expect(page.locator('#backlog')).toBeInViewport();
  await context.close();
});
