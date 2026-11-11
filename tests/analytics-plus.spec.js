import { test, expect } from './fixtures.js';

const features = [
  ['feature-storyboard', '/storyboard.html', '01'],
  ['feature-gantt', '/gantt.html', '02'],
  ['feature-wizard', '/analytics.html', '03'],
  ['feature-annotations', '/presentation.html', '04'],
  ['feature-kpi', '/kpi.html', '05']
];

test('Analytics+ is one product with five ordered feature stories and official brand context', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.project')).toHaveCount(2);
  await expect(page.locator('#project-analytics .platform-pill img')).toHaveAttribute('src', '/assets/microsoft-power-bi.svg');
  await expect(page.locator('#project-analytics .project-features')).toHaveCount(0);
  await page.getByRole('link', { name: 'Read Inforiver Analytics+ case study' }).click();
  await expect(page.locator('h1')).toContainText('Inforiver Analytics+');
  await expect(page.locator('.analytics-logo-plate img')).toHaveAttribute('src', '/assets/inforiver-analytics-logo.svg');
  expect(await page.locator('.feature-card-grid > a').evaluateAll((items) => items.map((item) => item.id))).toEqual(features.map(([id]) => id));
  await expect(page.locator('.metadata')).toContainText('Competitive analysis, developer handoff & implementation review');
  const overview = page.locator('.analytics-lead-screen');
  await expect(overview.locator('h2')).toHaveText('Analytics+ in action.');
  await expect(overview.locator('.product-overview-copy')).toHaveText('Charts, KPI cards, tables, and storytelling in Power BI.');
  await expect(overview.locator('.product-screenshot img')).toHaveAttribute('src', '/assets/analytics-plus-official-dashboard.webp');
  await expect(overview.locator('figcaption')).toContainText('Planning Report | IBCS Theme by Lumel Inc.');
  await expect(overview.locator('figcaption')).toContainText('not my design deliverable');
  await expect(overview.locator('figcaption a').first()).toHaveAttribute('href', 'https://store-ap.inforiver.com/dashboard-templates/7a651090-a2a0-4148-a8ce-e2c8be161eab');
  await expect(overview.locator('.product-marketplace')).toContainText('dashboard and standalone templates, visual components, bundles, and data apps');
  await expect(overview.getByRole('link', { name: /Explore the Marketplace/ })).toHaveAttribute('href', 'https://store-ap.inforiver.com/');
  await expect(overview.getByRole('link', { name: /Explore the Marketplace/ })).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(page.locator('#role')).toContainText('end-to-end UX/UI');
  await expect(page.locator('#business-case h2')).toContainText('More visual power');
  await expect(page.locator('.analytics-official-figure figcaption')).toContainText('not my design deliverable');
  await expect(page.locator('#competitive-analysis')).toContainText('current public product documentation');
  await expect(page.locator('.comparison-table tbody tr')).toHaveCount(3);
  await expect(page.locator('.analytics-host')).toContainText('Runs inside Microsoft Power BI');
  await expect(page.locator('.platform-stack h3')).toHaveText(['Microsoft Fabric', 'Microsoft Power BI', 'Inforiver Analytics+']);
  await expect(page.locator('#platform-context')).toContainText('custom visual from Lumel');
  await expect(page.locator('#platform-context')).toContainText('not a required setup sequence');
  await expect(page.locator('#comparison-title')).toHaveText('What should authors and viewers be able to do?');
  await expect(page.locator('.comparison-person')).toHaveText(['Report author', 'Report author', 'Report viewer']);
  await expect(page.locator('.comparison-takeaway')).toContainText('help the viewer make sense of it');
  await expect(page.locator('#competitive-analysis')).toContainText('Comparison basis: author/viewer tasks');
  for (const [id, path, number] of features) {
    await expect(page.locator(`#${id} .album-kicker`)).toContainText(`${number} /`);
    await expect(page.locator(`#${id}`)).toHaveAttribute('href', path);
    const target = await page.request.get(path);
    expect(await target.text()).toContain(`href="/analytics-plus.html#features"`);
  }
});

for (const width of [320, 390, 768, 1440]) {
  test(`product context and feature navigation remain usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/analytics-plus.html');
    const overviewImage = page.locator('.analytics-lead-screen .product-screenshot img');
    await expect(overviewImage).toHaveJSProperty('complete', true);
    await expect(overviewImage).toHaveJSProperty('naturalWidth', 1920);
    await page.locator('#design-details > summary').click();
    await page.getByRole('navigation', { name: 'Case study sections' }).getByRole('link', { name: 'Platform context', exact: true }).click();
    await expect(page.locator('#platform-context')).toBeInViewport();
    for (const image of await page.locator('#platform-context img, .analytics-host img').all()) {
      await expect(image).toHaveJSProperty('complete', true);
      expect(await image.evaluate((element) => element.naturalWidth)).toBeGreaterThan(0);
    }
    await page.getByRole('navigation', { name: 'Case study sections' }).getByRole('link', { name: 'Competitive analysis', exact: true }).click();
    await expect(page.locator('#competitive-analysis')).toBeInViewport();
    await expect(page.locator('.comparison-table-wrap')).toBeVisible();
    await expect(page.locator('.analytics-official-figure > img')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(page.locator('.platform-inforiver-logo')).toHaveCSS('background-color', 'rgb(243, 245, 242)');
    const table = page.locator('.comparison-table-wrap');
    if (width < 700) {
      expect(await table.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
      await table.focus();
      await page.keyboard.press('ArrowRight');
      await expect.poll(() => table.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
    }
    await page.goto('/analytics-plus.html#feature-wizard');
    await expect(page.locator('#feature-wizard')).toBeInViewport();
    await expect(page.locator('#feature-wizard h3')).toHaveText('Chart Wizard');
    expect(await page.locator('#feature-wizard img').evaluate((image) => image.clientWidth)).toBeLessThanOrEqual(540);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole('navigation', { name: 'Analytics+ feature index' }).getByRole('link', { name: 'Read Chart Wizard case study', exact: true }).click();
    await expect(page).toHaveURL(/analytics\.html$/);
  });
}

test('product overview, supplied feature evidence, and full cases work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(baseURL + '/');
  await page.getByRole('link', { name: 'Read Inforiver Analytics+ case study', exact: true }).click();
  await expect(page).toHaveURL(/analytics-plus\.html$/);
  await expect(page.locator('.analytics-lead-screen .product-screenshot img')).toBeVisible();
  await expect(page.getByRole('link', { name: /Explore the Marketplace/ })).toHaveAttribute('href', 'https://store-ap.inforiver.com/');
  await page.getByRole('link', { name: 'Read Power BI Gantt case study' }).click();
  await expect(page).toHaveURL(/gantt\.html$/);
  await page.locator('.back-link').click();
  await expect(page).toHaveURL(/analytics-plus\.html#features$/);
  await expect(page.locator('#platform-context')).toContainText('Power BI is its reporting and visualization experience');
  await page.locator('#design-details > summary').click();
  await page.locator('#user-flow summary').click();
  await expect(page.getByRole('navigation', { name: 'Analytics+ product user flow' })).toBeVisible();
  await context.close();
});
