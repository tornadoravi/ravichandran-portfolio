import { test, expect } from './fixtures.js';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

for (const width of [320, 390, 768, 1440]) {
  test(`PowerTable groups feature cases by workspace at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/powertable.html');
    await expect(page.locator('.workspace-group > h2')).toHaveText(['Gantt', 'Gantt Resources', 'Cross-tab']);
    await expect(page.locator('#gantt-features .feature-case-link')).toHaveCount(3);
    await expect(page.locator('#resource-features .feature-case-link')).toHaveCount(3);
    expect(await page.locator('#gantt-features a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href'))))
      .toEqual(['/column-mapping.html', '/gantt-baselines.html', '/gantt-configuration.html']);
    expect(await page.locator('#resource-features a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href'))))
      .toEqual(['/gantt-conditional-formatting.html', '/gantt-backlog.html', '/resource-configuration.html']);
    await expect(page.locator('#crosstab-features')).toContainText('Contribution overview');
    const groups = await page.locator('.workspace-group').all();
    const boxes = await Promise.all(groups.map(group => group.boundingBox()));
    if (width > 900) {
      expect(boxes[0].y).toBe(boxes[1].y);
      expect(boxes[1].y).toBe(boxes[2].y);
    } else {
      expect(boxes[1].y).toBeGreaterThanOrEqual(boxes[0].y + boxes[0].height);
      expect(boxes[2].y).toBeGreaterThanOrEqual(boxes[1].y + boxes[1].height);
    }
    for (const link of await page.locator('.workspace-group a').all()) {
      expect((await link.boundingBox()).height).toBeGreaterThanOrEqual(44);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator('#crosstab-features a').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#study-details')).toHaveAttribute('open');
    await expect(page.locator('#crosstab')).toBeInViewport();
  });
}

test('workspace groups and feature links remain available without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(baseURL + '/powertable.html');
  await expect(page.locator('.workspace-group > h2')).toHaveText(['Gantt', 'Gantt Resources', 'Cross-tab']);
  await page.locator('#resource-features #backlog a').click();
  await expect(page).toHaveURL(/gantt-backlog\.html$/);
  await page.locator('.back-link').click();
  await expect(page.locator('#backlog')).toBeInViewport();
  await page.locator('#study-details > summary').click();
  await page.locator('#crosstab-features a').click();
  await expect(page.locator('#crosstab')).toBeInViewport();
  await context.close();
});

test('Fabric evidence retains native crop dimensions and is separate from Analytics+ evidence', async ({ page }) => {
  const image = await sharp(fileURLToPath(new URL('../assets/fabric-gantt-configuration.png', import.meta.url))).metadata();
  expect([image.width, image.height]).toEqual([1912, 1038]);
  await page.goto('/powertable.html');
  await expect(page.locator('.case-evidence img')).toHaveCount(1);
  await expect(page.locator('.case-evidence img')).toHaveAttribute('src', '/assets/fabric-gantt-configuration.png');
  await expect(page.locator('.case-evidence figcaption')).toContainText('PowerTable in Microsoft Fabric');
  await expect(page.locator('.case-evidence figcaption')).toContainText('portfolio annotations');
  await expect(page.locator('img[src^="/assets/gantt-"], img[src^="/assets/wizard-"], img[src^="/assets/storyboard-"]')).toHaveCount(0);
  const response = await page.request.get('/assets/fabric-gantt-configuration.png');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('image/png');
});

test('PowerTable explains the product before personal scope, comparison, and delivery', async ({ page }) => {
  await page.goto('/powertable.html');
  expect(await page.locator('#business-case, #platform-context, #role, #competitive-analysis, #process, #gantt, #resources, #crosstab, #delivery, #references').evaluateAll(nodes => nodes.map(node => node.id))).toEqual([
    'business-case', 'platform-context', 'role', 'competitive-analysis', 'process', 'gantt', 'resources', 'crosstab', 'delivery', 'references'
  ]);
  await expect(page.locator('.platform-stack h3')).toHaveText(['Microsoft Fabric', 'Planning in Fabric', 'PowerTable']);
  await expect(page.locator('.case-hero .platform-pill img')).toHaveAttribute('src', '/assets/microsoft-fabric.svg');
  await expect(page.locator('#role')).toContainText('end-to-end UX/UI');
  await expect(page.locator('#role')).toContainText('developer handoff and implementation review');
  await expect(page.locator('#delivery')).toContainText('not production-code ownership');
  await expect(page.locator('.comparison-table tbody tr')).toHaveCount(3);
  await expect(page.locator('#competitive-analysis')).toContainText('current public product documentation');
  await expect(page.locator('#gantt-configuration')).toContainText('does not verify cross-view synchronization');
  await expect(page.locator('#references a[href="https://learn.microsoft.com/en-us/fabric/iq/plan/overview"]')).toHaveCount(1);
  await expect(page.locator('#resources')).toContainText('exploratory');
  for (const link of await page.locator('.case-nav a').all()) {
    const target = await link.getAttribute('href');
    await expect(page.locator(target)).toHaveCount(1);
  }
});

for (const width of [320, 390, 768, 1440]) {
  test(`Fabric story, comparison and image inspection work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/powertable.html');
    const image = page.locator('.case-evidence img');
    await expect(image).toHaveJSProperty('complete', true);
    expect(await image.evaluate(node => node.naturalWidth)).toBe(1912);
    await page.locator('.case-evidence').getByRole('button', { name: 'Inspect screenshot' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Actual size', exact: true }).click();
    const viewport = dialog.getByRole('region', { name: 'Screenshot image' });
    await viewport.focus();
    await page.keyboard.press('ArrowRight');
    if (width < 1440) {
      await expect.poll(() => viewport.evaluate(node => node.scrollLeft)).toBeGreaterThan(0);
    }
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(page.locator('.case-evidence .inspect-button')).toBeFocused();
    await page.locator('#study-details > summary').click();
    await page.getByRole('navigation', { name: 'Case study sections' }).getByRole('link', { name: 'Competitive analysis', exact: true }).click();
    await expect(page.locator('#competitive-analysis')).toBeInViewport();
    const table = page.locator('.comparison-table-wrap');
    if (width < 700) {
      await table.focus();
      await page.keyboard.press('ArrowRight');
      await expect.poll(() => table.evaluate(node => node.scrollLeft)).toBeGreaterThan(0);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('Home uses the Fabric screen and preserves Analytics+ feature ordering', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#project-planning img[src="/assets/fabric-gantt-configuration.png"]')).toHaveCount(1);
  await expect(page.locator('#project-planning .platform-pill img')).toHaveAttribute('src', '/assets/microsoft-fabric.svg');
  expect(await page.locator('.project-features a').evaluateAll(links => links.map(link => link.id))).toEqual([
    'project-storyboard', 'project-gantt', 'project-wizard', 'project-presentation', 'project-kpi'
  ]);
  await page.getByRole('link', { name: 'Read PowerTable case study', exact: true }).click();
  await expect(page).toHaveURL(/powertable\.html$/);
  await expect(page.locator('.metadata')).toContainText('implementation review');
});

test('Fabric screenshot and new case sections remain available without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(baseURL + '/powertable.html');
  await expect(page.locator('.case-evidence img')).toHaveJSProperty('naturalWidth', 1912);
  await expect(page.locator('#process .concept-node')).toHaveCount(5);
  await page.locator('#study-details > summary').click();
  await page.getByRole('navigation', { name: 'Case study sections' }).getByRole('link', { name: 'Handoff & implementation', exact: true }).click();
  await expect(page.locator('#delivery')).toBeInViewport();
  await expect(page.locator('.case-evidence .image-link')).toHaveAttribute('href', '/assets/fabric-gantt-configuration.png');
  await context.close();
});
