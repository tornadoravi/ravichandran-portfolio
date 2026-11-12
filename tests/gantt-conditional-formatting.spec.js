import { test, expect, openCaseDetails, openWorkspaceNavigation } from './fixtures.js';
import sharp from 'sharp';

test.use({ reducedMotion: 'reduce' });

const crops = [
  ['rule', 612, 823],
  ['summary', 445, 39],
  ['timeline', 1076, 732]
];

for (const width of [320, 390, 768, 1440]) {
  test(`formatting evidence is readable and native-sized at ${width}px`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    expect((await page.goto('/gantt-conditional-formatting.html')).status()).toBe(200);
    await openCaseDetails(page);
    await expect(page.locator('h1')).toHaveText('Conditional Formatting.');
    await expect(page).toHaveTitle('Gantt Resources — Conditional Formatting — Ravichandran V');
    await expect(page.locator('.workspace-switcher [aria-current]')).toHaveText('Resources');
    await expect(page.locator('#main-nav a[aria-current]')).toHaveText('Work');
    await expect(page.locator('body')).toHaveAttribute('data-native-cursor', '');
    const images = page.locator('main .product-screenshot img');
    expect(await images.evaluateAll(nodes => nodes.map(node => node.getAttribute('src'))))
      .toEqual(crops.map(([name]) => `/assets/fabric-conditional-${name}.png`));
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
    for (const label of await page.locator('.case-hero > .eyebrow').all()) {
      expect(await label.evaluate(node => parseFloat(getComputedStyle(node).fontSize))).toBeGreaterThanOrEqual(12);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    expect(errors).toEqual([]);
  });
}

test('only approved formatting crops are served at native resolution', async ({ request }) => {
  for (const [name, width, height] of crops) {
    const response = await request.get(`/assets/fabric-conditional-${name}.png`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    const metadata = await sharp(await response.body()).metadata();
    expect([metadata.width, metadata.height]).toEqual([width, height]);
  }
  for (const path of ['/assets/fabric-conditional-original.png', '/attachments/104f7590-c649-4aa7-9eac-6515fbb2f41e-41bd329f-a83e-4806-b5dd-dc3380b256e9-clipboard.png', '/tests/gantt-conditional-formatting.spec.js']) {
    expect((await request.get(path)).status()).toBe(404);
  }
});

test('formatting case distinguishes the configured rule from an applied result', async ({ page }) => {
  await page.goto('/gantt-conditional-formatting.html');
  await openCaseDetails(page);
  await expect(page.locator('.metadata')).toContainText('One rule-editing design state');
  await expect(page.locator('#overview')).toContainText('Schedule Hours > 0');
  await expect(page.locator('#overview')).toContainText('Hidden selections are not inferred');
  await expect(page.locator('#overview')).toContainText('not over-allocation against capacity');
  await expect(page.locator('#timeline')).toContainText('not an after-Apply result');
  await expect(page.locator('#timeline')).toContainText('Summary Bar — Scheduled Hours');
  await expect(page.locator('#timeline figcaption').last()).toContainText('not a second state');
  await expect(page.locator('#timeline img').last()).toHaveAttribute('alt', /resource names are excluded/);
  await expect(page.locator('#evidence')).toContainText('Resource formatting is documented');
  await expect(page.locator('#evidence a[href^="https://learn.microsoft.com/"]')).toHaveCount(2);
  await expect(page.locator('#evidence a').first()).toHaveAttribute('href', 'https://learn.microsoft.com/en-us/fabric/iq/plan/powertable-layouts/how-to-customize-resource-layout#create-formatting-rules');
  await page.locator('#evidence summary').click();
  await expect(page.locator('#evidence')).toContainText('three native-resolution crops');
  await expect(page.locator('#evidence')).toContainText('Scheduled Hours > 8 example is separate');
  await expect(page.locator('#evidence')).toContainText('official product documentation, not customer reviews');
  await expect(page.locator('#evidence')).toContainText('not an interactive rule engine');
  await expect(page.locator('#evidence')).toContainText('Cropping is not publication clearance');
  await expect(page.locator('#evidence')).toContainText('no independently verified feature-specific review');
  await expect(page.locator('#evidence')).toContainText('not imply Microsoft employment');
});

test('Home, parent, and baseline sibling link the new feature without adding a product', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.project')).toHaveCount(2);
  await expect(page.locator('.case-link')).toHaveCount(2);
  await page.locator('#project-planning .case-link').click();
  await page.locator('.workspace-grid a[href="/gantt-conditional-formatting.html"]').click();
  await expect(page).toHaveURL(/gantt-conditional-formatting\.html$/);
  await page.locator('.back-link').click();
  await expect(page).toHaveURL(/powertable\.html#resource-features$/);
  const featureLinks = page.locator('.feature-case-link');
  await expect(featureLinks).toHaveCount(0);
  await expect(page.locator('#resource-features')).toContainText('Gantt Resources');
  await expect(page.locator('#resource-features a')).toHaveCount(1);
  await page.getByRole('link', { name: 'Explore Gantt Resources', exact: true }).click();
  await page.locator('.back-link').click();
  await page.getByRole('link', { name: 'Explore Gantt', exact: true }).click();
  await openWorkspaceNavigation(page);
  await page.getByRole('navigation', { name: 'PowerTable Gantt features' }).getByRole('link', { name: 'Baselines', exact: true }).click();
  await expect(page).toHaveURL(/gantt-baselines\.html$/);
  await openCaseDetails(page);
  await page.getByRole('link', { name: 'Related case / Gantt Resources — Conditional Formatting', exact: true }).click();
  await expect(page).toHaveURL(/gantt-conditional-formatting\.html$/);
});

test('keyboard section navigation and mobile actual-size inspection return focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/gantt-conditional-formatting.html');
  await openCaseDetails(page);
  await page.locator('.case-nav a[href="#timeline"]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#timeline')).toBeInViewport();
  const opener = page.locator('#timeline .inspect-button').last();
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

test('formatting evidence and sources remain accessible without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(baseURL + '/gantt-conditional-formatting.html');
  await openCaseDetails(page);
  for (const [name, width] of crops) {
    const image = page.locator(`img[src="/assets/fabric-conditional-${name}.png"]`);
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
  await expect(page.locator('#resource-features')).toBeInViewport();
  await context.close();
});
