import { test, expect, openCaseDetails, openWorkspaceNavigation } from './fixtures.js';
import sharp from 'sharp';

test.use({ reducedMotion: 'reduce' });

const states = ['timeline', 'milestone', 'dependency', 'data-color', 'label'];

for (const width of [320, 390, 768, 1440]) {
  test(`Gantt configuration preserves native evidence at ${width}px`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    expect((await page.goto('/gantt-configuration.html')).status()).toBe(200);
    await openCaseDetails(page);
    await expect(page.locator('h1')).toHaveText('Gantt Side Panel.');
    await expect(page.locator('#main-nav a[aria-current]')).toHaveText('Work');
    await expect(page.locator('body')).toHaveAttribute('data-native-cursor', '');
    await expect(page.locator('#panel-walkthrough')).not.toHaveAttribute('open');
    await page.locator('#panel-walkthrough > summary').click();
    const images = page.locator('main .product-screenshot img');
    expect(await images.evaluateAll(nodes => nodes.map(node => node.getAttribute('src'))))
      .toEqual(states.map(name => `/assets/fabric-gantt-config-${name}.png`));
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(image => image.decode());
      await expect(image).toHaveJSProperty('naturalWidth', 602);
      await expect(image).toHaveJSProperty('naturalHeight', 823);
      const box = await image.boundingBox();
      expect(box.width).toBeLessThanOrEqual(602);
      expect(box.width / box.height).toBeCloseTo(602 / 823, 2);
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

test('only the five panel crops are served at their unchanged dimensions', async ({ request }) => {
  for (const name of states) {
    const response = await request.get(`/assets/fabric-gantt-config-${name}.png`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    const metadata = await sharp(await response.body()).metadata();
    expect([metadata.width, metadata.height]).toEqual([602, 823]);
  }
  for (const path of ['/assets/fabric-gantt-config-original.png', '/attachments/e9bc5c80-7597-407b-bc7c-f52a1f03d021-80de54ac-2e28-48b3-8f50-a3484dad3c0d-clipboard.png', '/tests/gantt-configuration.spec.js']) {
    expect((await request.get(path)).status()).toBe(404);
  }
});

test('Gantt settings remain distinct from Resource settings and demonstrated outcomes', async ({ page }) => {
  await page.goto('/gantt-configuration.html');
  await openCaseDetails(page);
  await expect(page.locator('.metadata')).toContainText('Five configuration tab states');
  await expect(page.locator('#timeline')).toContainText('Daily Capacity: 8 hrs');
  await expect(page.locator('#decisions')).toContainText('not its scheduling relationship');
  await page.locator('#panel-walkthrough > summary').click();
  await expect(page.locator('#milestone')).toContainText('not evidence that these exact values are factory defaults');
  await expect(page.locator('#dependency')).toContainText('Auto Scheduling is On');
  await expect(page.locator('#dependency')).toContainText('Successor is Off');
  await expect(page.locator('#dependency')).toContainText('not a demonstration of rescheduling');
  await expect(page.locator('#dependency')).toContainText('does not establish that the tasks have no successors');
  await expect(page.locator('#data-color')).toContainText('does not show the separate Summary Bar controls');
  await expect(page.locator('#label')).toContainText('Adaptive label and summary-label controls are not shown');
  await expect(page.locator('img[src*="fabric-resource-config"]')).toHaveCount(0);
  await expect(page.locator('#evidence a[href^="https://learn.microsoft.com/"]')).toHaveCount(2);
  await page.locator('#evidence summary').click();
  await expect(page.locator('#evidence')).toContainText('no exact-panel public guide');
  await expect(page.locator('#evidence')).toContainText('Resource layout and Intelligence Gantt documentation are not substituted');
  await expect(page.locator('#evidence')).toContainText('Cropping is not publication clearance');
  await expect(page.locator('#evidence')).toContainText('does not imply Microsoft employment');
});

test('Home, grouped parent, baseline and resource siblings reach the correct case', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.project')).toHaveCount(2);
  await page.locator('#project-planning .case-link').click();
  await expect(page.locator('#gantt-configuration')).toHaveCount(1);
  expect(await page.locator('[id]').evaluateAll(nodes => {
    const ids = nodes.map(node => node.id);
    return ids.length === new Set(ids).size;
  })).toBe(true);
  await page.getByRole('link', { name: 'Explore Gantt', exact: true }).click();
  await openWorkspaceNavigation(page);
  await page.getByRole('navigation', { name: 'PowerTable Gantt features' }).getByRole('link', { name: 'Side Panel', exact: true }).click();
  await expect(page).toHaveURL(/gantt-configuration\.html$/);
  await page.locator('.back-link').click();
  await expect(page).toHaveURL(/powertable\.html#gantt-features$/);
  await expect(page.locator('#gantt-features')).toBeInViewport();
  await page.goto('/powertable.html#gantt-configuration');
  await expect(page.locator('#study-details')).toHaveAttribute('open');
  await expect(page.locator('#gantt-configuration')).toBeInViewport();
  await page.goto('/gantt-baselines.html');
  await openWorkspaceNavigation(page);
  await page.locator('.gantt-feature-tabs a[href="/gantt-configuration.html"]').click();
  await page.locator('.back-link').click();
  await page.getByRole('link', { name: 'Explore Gantt Resources', exact: true }).click();
  await openWorkspaceNavigation(page);
  await page.getByRole('navigation', { name: 'PowerTable Gantt Resources features' }).getByRole('link', { name: 'Side Panel', exact: true }).click();
  await expect(page).toHaveURL(/resource-configuration\.html$/);
  await openCaseDetails(page);
  await page.locator('a[href="/gantt-configuration.html"]').click();
  await expect(page).toHaveURL(/gantt-configuration\.html$/);
});

test('keyboard shortcuts, bookmarks and mobile inspection reveal the correct Gantt panel', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/gantt-configuration.html');
  await openCaseDetails(page);
  await page.locator('.case-nav a[href="#dependency"]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#panel-walkthrough')).toHaveAttribute('open');
  await expect(page.locator('#dependency')).toBeInViewport();
  const opener = page.locator('#dependency .inspect-button');
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
  for (const name of states.slice(1)) {
    await page.goto('/gantt-configuration.html#' + name);
    await expect(page.locator('#panel-walkthrough')).toHaveAttribute('open');
    await expect(page.locator('#' + name)).toBeInViewport();
  }
});

test('Gantt evidence, disclosure and parent links work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(baseURL + '/gantt-configuration.html');
  await openCaseDetails(page);
  await page.locator('#panel-walkthrough > summary').focus();
  await page.keyboard.press('Enter');
  for (const name of states) {
    const image = page.locator(`img[src="/assets/fabric-gantt-config-${name}.png"]`);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty('naturalWidth', 602);
    await expect(image.locator('..')).toHaveAttribute('target', '_blank');
  }
  await page.locator('#evidence summary').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#evidence details')).toHaveAttribute('open');
  await expect(page.locator('.inspect-button')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('.back-link').click();
  await expect(page.locator('#gantt-features')).toBeInViewport();
  await context.close();
});
