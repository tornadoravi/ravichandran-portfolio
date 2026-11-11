import { test, expect, openCaseDetails } from './fixtures.js';
import sharp from 'sharp';

test.use({ reducedMotion: 'reduce' });

const states = ['timeline', 'milestone', 'data-color', 'label'];

for (const width of [320, 390, 768, 1440]) {
  test(`resource configuration preserves native evidence at ${width}px`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    expect((await page.goto('/resource-configuration.html')).status()).toBe(200);
    await openCaseDetails(page);
    await expect(page.locator('h1')).toHaveText('Resource Configuration.One panel. Four contexts.');
    await expect(page.locator('#main-nav a[aria-current]')).toHaveText('Work');
    await expect(page.locator('body')).toHaveAttribute('data-native-cursor', '');
    await expect(page.locator('#panel-walkthrough')).not.toHaveAttribute('open');
    await page.locator('#panel-walkthrough > summary').click();
    const images = page.locator('main .product-screenshot img');
    expect(await images.evaluateAll(nodes => nodes.map(node => node.getAttribute('src'))))
      .toEqual(states.map(name => `/assets/fabric-resource-config-${name}.png`));
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(image => image.decode());
      await expect(image).toHaveJSProperty('naturalWidth', 604);
      await expect(image).toHaveJSProperty('naturalHeight', 825);
      const box = await image.boundingBox();
      expect(box.width).toBeLessThanOrEqual(604);
      expect(box.width / box.height).toBeCloseTo(604 / 825, 2);
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

test('only panel crops are served at their unchanged dimensions', async ({ request }) => {
  for (const name of states) {
    const response = await request.get(`/assets/fabric-resource-config-${name}.png`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    const metadata = await sharp(await response.body()).metadata();
    expect([metadata.width, metadata.height]).toEqual([604, 825]);
  }
  for (const path of ['/assets/fabric-resource-config-original.png', '/attachments/ecaecee7-a395-4266-8cca-47e7f49fcb17-bad6c987-53f8-4cc4-a9ae-9ddc0c29b084-clipboard.png', '/tests/resource-configuration.spec.js']) {
    expect((await request.get(path)).status()).toBe(404);
  }
});

test('source boundaries and all four configuration states remain explicit', async ({ page }) => {
  await page.goto('/resource-configuration.html');
  await openCaseDetails(page);
  await expect(page.locator('.metadata')).toContainText('Four configuration tab states');
  await expect(page.locator('#timeline')).toContainText('Daily Capacity: 8 hrs');
  await expect(page.locator('#timeline')).toContainText('Configuration, not a conditional rule');
  await page.locator('#panel-walkthrough > summary').click();
  await expect(page.locator('#milestone')).toContainText('flag icon');
  await expect(page.locator('#milestone')).toContainText('not evidence of an applied milestone change');
  await expect(page.locator('#data-color')).toContainText('All');
  await expect(page.locator('#data-color')).toContainText('not a before/after sequence');
  await expect(page.locator('#label')).toContainText('Adaptive label');
  await expect(page.locator('#label')).toContainText('No responsive-label behavior');
  await expect(page.locator('#evidence a[href^="https://learn.microsoft.com/"]')).toHaveCount(2);
  await expect(page.locator('#evidence a').first()).toHaveAttribute('href', /#customize-resource-layout-components$/);
  await page.locator('#evidence summary').click();
  await expect(page.locator('#evidence')).toContainText('No conditional-rule builder is shown');
  await expect(page.locator('#evidence')).toContainText('no independently verified feature-specific customer review');
  await expect(page.locator('#evidence')).toContainText('Cropping is not publication clearance');
  await expect(page.locator('#evidence')).toContainText('does not imply Microsoft employment');
});

test('grouped parent and related formatting case connect the new case', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.project')).toHaveCount(2);
  await page.locator('#project-planning .case-link').click();
  await page.getByRole('link', { name: 'Explore Gantt Resources', exact: true }).click();
  await page.getByRole('navigation', { name: 'PowerTable Gantt Resources features' }).getByRole('link', { name: 'Side Panel', exact: true }).click();
  await expect(page).toHaveURL(/resource-configuration\.html$/);
  await page.locator('.back-link').click();
  await expect(page).toHaveURL(/powertable\.html#resource-features$/);
  await expect(page.locator('#resource-features')).toBeInViewport();
  await page.getByRole('link', { name: 'Explore Gantt Resources', exact: true }).click();
  await page.getByRole('navigation', { name: 'PowerTable Gantt Resources features' }).getByRole('link', { name: 'Side Panel', exact: true }).click();
  await page.locator('.next-project').click();
  await expect(page).toHaveURL(/gantt-conditional-formatting\.html$/);
  await page.locator('.workspace-feature-tabs a[href="/resource-configuration.html"]').click();
  await expect(page).toHaveURL(/resource-configuration\.html$/);
});

test('keyboard shortcuts, bookmarks and screenshot inspection reveal the correct panel', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/resource-configuration.html');
  await openCaseDetails(page);
  await page.locator('.case-nav a[href="#label"]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#panel-walkthrough')).toHaveAttribute('open');
  await expect(page.locator('#label')).toBeInViewport();
  const opener = page.locator('#label .inspect-button');
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
    await page.goto('/resource-configuration.html#' + name);
    await expect(page.locator('#panel-walkthrough')).toHaveAttribute('open');
    await expect(page.locator('#' + name)).toBeInViewport();
  }
});

test('panel evidence, disclosure and parent links work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(baseURL + '/resource-configuration.html');
  await openCaseDetails(page);
  await page.locator('#panel-walkthrough > summary').focus();
  await page.keyboard.press('Enter');
  for (const name of states) {
    const image = page.locator(`img[src="/assets/fabric-resource-config-${name}.png"]`);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty('naturalWidth', 604);
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
