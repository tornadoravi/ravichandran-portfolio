import { test, expect } from './fixtures.js';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

for (const width of [320, 390, 768, 1440]) {
  test(`Home keeps product cards minimal without separate feature-work sections at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('.project-features, .project-feature-group')).toHaveCount(0);
    for (const [id, path] of [['project-planning', '/powertable.html'], ['project-analytics', '/analytics-plus.html']]) {
      const card = page.locator('#' + id);
      await expect(card.locator('.project-categories li')).toHaveCount(2);
      await expect(card.locator('.project-role')).toHaveCount(1);
      await expect(card.locator('.project-description a')).toHaveCount(1);
      await expect(card.locator('.case-link')).toHaveAttribute('href', path);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });

  test(`PowerTable groups feature cases by workspace at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/powertable.html');
    await expect(page.locator('#workspaces-title')).toHaveText('My feature work.');
    await expect(page.locator('.workspace-group > h2')).toHaveText(['Gantt', 'Gantt Resources', 'Cross-tab']);
    await expect(page.locator('#gantt-features .feature-case-link, #gantt-features .workspace-contribution')).toHaveCount(0);
    await expect(page.locator('.workspace-grid .feature-case-link, .workspace-grid .workspace-contribution')).toHaveCount(0);
    await expect(page.locator('#gantt-features a')).toHaveCount(1);
    await expect(page.getByRole('link', { name: 'Explore Gantt', exact: true })).toHaveAttribute('href', '/column-mapping.html');
    await expect(page.locator('#resource-features a')).toHaveCount(1);
    await expect(page.locator('#resource-features a')).toHaveAttribute('href', '/gantt-conditional-formatting.html');
    await expect(page.locator('#resource-features #backlog')).toHaveCount(0);
    await expect(page.locator('#crosstab-features a')).toHaveCount(1);
    await expect(page.locator('#crosstab-features a')).toHaveAttribute('href', '/crosstab.html');
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
    await expect(page).toHaveURL(/crosstab\.html$/);
    await expect(page.locator('h1')).toContainText('Cross-tab.');
  });
}

test('workspace groups and feature links remain available without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(baseURL + '/');
  await page.locator('#project-planning .case-link').click();
  await page.getByRole('link', { name: 'Explore Gantt', exact: true }).click();
  await page.getByRole('navigation', { name: 'PowerTable Gantt features' }).getByRole('link', { name: 'Backlog', exact: true }).click();
  await expect(page).toHaveURL(/gantt-backlog\.html$/);
  await page.goto(baseURL + '/powertable.html');
  await expect(page.locator('.workspace-group > h2')).toHaveText(['Gantt', 'Gantt Resources', 'Cross-tab']);
  await page.getByRole('link', { name: 'Explore Gantt', exact: true }).click();
  await page.getByRole('navigation', { name: 'PowerTable Gantt features' }).getByRole('link', { name: 'Backlog', exact: true }).click();
  await expect(page).toHaveURL(/gantt-backlog\.html$/);
  await page.locator('.back-link').click();
  await expect(page.locator('#gantt-features')).toBeInViewport();
  await page.locator('#study-details > summary').click();
  await page.locator('#crosstab-features a').click();
  await expect(page).toHaveURL(/crosstab\.html$/);
  await expect(page.locator('#contribution')).toBeVisible();
  await context.close();
});

test('official PowerTable overview is attributed and original design evidence stays intact', async ({ page }) => {
  const image = await sharp(fileURLToPath(new URL('../assets/fabric-gantt-configuration.png', import.meta.url))).metadata();
  expect([image.width, image.height]).toEqual([1912, 1038]);
  const official = await sharp(fileURLToPath(new URL('../assets/powertable-official-gantt.webp', import.meta.url))).metadata();
  expect([official.width, official.height]).toEqual([2944, 1570]);
  await page.goto('/powertable.html');
  await expect(page.locator('.case-evidence img')).toHaveCount(1);
  await expect(page.locator('.case-evidence img')).toHaveAttribute('src', '/assets/powertable-official-gantt.webp');
  await expect(page.locator('.case-evidence h2')).toHaveText('PowerTable in action.');
  await expect(page.locator('.product-overview-copy')).toHaveText('No-code data apps for managing data, approvals, and project plans in Microsoft Fabric.');
  await expect(page.locator('.case-evidence figcaption')).toContainText('PowerTable in Microsoft Fabric');
  await expect(page.locator('.case-evidence figcaption')).toContainText('Official product screenshot');
  await expect(page.locator('.case-evidence a[href^="https://docs.powertable.com/"]')).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(page.locator('.case-evidence .annotated-screen, .case-evidence .screen-key, .case-evidence .screen-pin')).toHaveCount(0);
  await expect(page.locator('#gantt-features img')).toHaveAttribute('src', '/assets/fabric-gantt-configuration.png');
  await expect(page.locator('img[src^="/assets/gantt-"], img[src^="/assets/wizard-"], img[src^="/assets/storyboard-"]')).toHaveCount(0);
  const response = await page.request.get('/assets/powertable-official-gantt.webp');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('image/webp');
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
    expect(await image.evaluate(node => node.naturalWidth)).toBe(2944);
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

test('Home uses the PowerTable implementation and leaves feature navigation inside the case study', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#project-planning .product-screenshot img')).toHaveAttribute('src', '/assets/powertable-official-gantt.webp');
  await expect(page.locator('#project-planning .visual-bottom')).toContainText('Official PowerTable implementation');
  await expect(page.locator('#project-planning .platform-pill img')).toHaveAttribute('src', '/assets/microsoft-fabric.svg');
  await expect(page.locator('.project-features')).toHaveCount(0);
  await page.getByRole('link', { name: 'Read PowerTable case study', exact: true }).click();
  await expect(page).toHaveURL(/powertable\.html$/);
  await expect(page.locator('.metadata')).toContainText('implementation review');
});

test('Home leads into keyboard-usable PowerTable workspace and feature links', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const target of ['/column-mapping.html', '/gantt-baselines.html', '/gantt-backlog.html', '/gantt-conditional-formatting.html', '/crosstab.html']) {
    await page.goto('/');
    const productLink = page.locator('#project-planning .case-link');
    await productLink.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/powertable\.html$/);
    const ganttTargets = ['/column-mapping.html', '/gantt-baselines.html', '/gantt-backlog.html'];
    if (ganttTargets.includes(target)) {
      await page.getByRole('link', { name: 'Explore Gantt', exact: true }).click();
    }
    const link = page.locator(ganttTargets.includes(target) ? '.gantt-feature-tabs' : '.workspace-grid')
      .locator(`a[href="${target}"]`);
    await link.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new URL(target, page.url()).href);
  }
});

test('Fabric screenshot and new case sections remain available without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(baseURL + '/powertable.html');
  await expect(page.locator('.case-evidence img')).toHaveJSProperty('naturalWidth', 2944);
  await expect(page.locator('#process .concept-node')).toHaveCount(5);
  await page.locator('#study-details > summary').click();
  await page.getByRole('navigation', { name: 'Case study sections' }).getByRole('link', { name: 'Handoff & implementation', exact: true }).click();
  await expect(page.locator('#delivery')).toBeInViewport();
  await expect(page.locator('.case-evidence .image-link').filter({ hasText: 'View full-size' })).toHaveAttribute('href', '/assets/powertable-official-gantt.webp');
  await expect(page.locator('.case-evidence a[href^="https://docs.powertable.com/"]')).toBeVisible();
  await context.close();
});
