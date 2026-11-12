import { test, expect } from './fixtures.js';

const features = [
  ['feature-storyboard', '/storyboard.html', '01'],
  ['feature-gantt', '/gantt.html', '02'],
  ['feature-wizard', '/analytics.html', '03'],
  ['feature-annotations', '/presentation.html', '04'],
  ['feature-kpi', '/kpi.html', '05']
];

for (const javaScriptEnabled of [true, false]) {
  test(`dimensional feature illustrations retain complete, local SVG scenes with JavaScript ${javaScriptEnabled}`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled, viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    try {
      const page = await context.newPage();
      await page.goto(baseURL + '/analytics-plus.html#features');
      if (javaScriptEnabled) await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
      await page.evaluate(() => document.fonts.ready);
      const illustrations = page.locator('.feature-review-index .feature-illustration');
      await expect(illustrations).toHaveCount(5);
      const ids = await illustrations.locator('[id]').evaluateAll(elements => elements.map(element => element.id));
      expect(new Set(ids).size).toBe(ids.length);
      for (const illustration of await illustrations.all()) {
        await expect(illustration).toHaveAttribute('role', 'img');
        await expect(illustration).toHaveAttribute('aria-label', /^Concept illustration: .+/);
        await expect(illustration).toHaveAttribute('preserveAspectRatio', 'xMidYMid meet');
        await expect(illustration.locator('feDropShadow')).toHaveCount(1);
        const scene = await illustration.evaluate(svg => {
          const { x, y, width, height } = svg.querySelector('.case-topic-scene').getBBox();
          const references = [...svg.querySelectorAll('[fill], [filter]')]
            .flatMap(element => ['fill', 'filter'].map(name => element.getAttribute(name)))
            .filter(value => value?.startsWith('url(#'));
          return {
            x, y, width, height,
            localReferences: references.every(value => svg.contains(document.getElementById(value.slice(5, -1))))
          };
        });
        expect(scene.localReferences).toBe(true);
        expect(scene.x).toBeGreaterThanOrEqual(0);
        expect(scene.y).toBeGreaterThanOrEqual(0);
        expect(scene.x + scene.width).toBeLessThanOrEqual(480);
        expect(scene.y + scene.height).toBeLessThanOrEqual(236);
      }
    } finally {
      await context.close();
    }
  });
}

test('Analytics+ is one product with five ordered feature stories and official brand context', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.project')).toHaveCount(2);
  await expect(page.locator('#project-analytics .platform-pill img')).toHaveAttribute('src', '/assets/microsoft-logo.png');
  await expect(page.locator('#project-analytics .project-features')).toHaveCount(0);
  await page.getByRole('link', { name: 'Read Inforiver Analytics+ case study' }).click();
  await expect(page.locator('h1')).toContainText('Inforiver Analytics+');
  await expect(page.locator('.analytics-logo-plate img')).toHaveAttribute('src', '/assets/inforiver-analytics-logo.svg');
  expect(await page.locator('.feature-card-grid > a').evaluateAll((items) => items.map((item) => item.id))).toEqual(features.map(([id]) => id));
  await expect(page.locator('.feature-card-grid h3')).toHaveText(['Storyboard', 'Gantt for Power BI', 'Chart Wizard', 'Annotations & Presentation', 'KPI Presets']);
  await expect(page.locator('#feature-storyboard .album-description')).toContainText('Multiple starting routes');
  await expect(page.locator('#feature-gantt .album-description')).toContainText('Map source fields');
  await expect(page.locator('#feature-wizard .album-description')).toContainText('Two discovery routes');
  await expect(page.locator('#feature-annotations .album-description')).toContainText('without leaving the report');
  await expect(page.locator('#feature-kpi .album-description')).toContainText('Reusable layouts');
  await expect(page.locator('.feature-review-index img')).toHaveCount(0);
  expect(await page.locator('.feature-review-index svg').evaluateAll(items => items.map(item => item.dataset.caseScene))).toEqual([
    'storyboard-design', 'gantt-design', 'wizard-design', 'presentation-design', 'kpi-design'
  ]);
  await expect(page.locator('.feature-review-index .album-footer')).toHaveText(Array(5).fill('Original concept illustration ↗'));
  await expect(page.locator('.metadata')).toContainText('Competitive analysis, developer handoff & implementation review');
  const overview = page.locator('.analytics-lead-screen');
  await expect(overview.locator('h2')).toHaveText('Analytics+ in action.');
  await expect(overview.locator('.product-overview-copy')).toHaveText('Charts, KPI cards, tables, and storytelling in Power BI.');
  await expect(overview.locator('.product-screenshot img')).toHaveAttribute('src', '/assets/analytics-plus-official-dashboard.webp');
  await expect(overview.locator('figcaption')).toContainText('Official template preview · Lumel Inc.');
  await expect(page.locator('#references')).toContainText('Planning Report | IBCS Theme template by Lumel Inc.');
  await expect(overview.locator('figcaption')).toContainText('not my design deliverable');
  await expect(overview.locator('figcaption a').first()).toHaveAttribute('href', 'https://store-ap.inforiver.com/dashboard-templates/7a651090-a2a0-4148-a8ce-e2c8be161eab');
  await expect(page.locator('.product-marketplace')).toContainText('dashboard and standalone templates, visual components, bundles, and data apps');
  await expect(page.locator('.product-marketplace')).toBeHidden();
  await page.locator('#design-details > summary').click();
  await expect(page.locator('.product-marketplace')).not.toHaveAttribute('open');
  await page.locator('.product-marketplace > summary').click();
  await expect(page.getByRole('link', { name: /Explore the Marketplace/ })).toHaveAttribute('href', 'https://store-ap.inforiver.com/');
  await expect(page.getByRole('link', { name: /Explore the Marketplace/ })).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(page.locator('#role')).toContainText('end-to-end UX/UI');
  await expect(page.locator('#business-case h2')).toContainText('More visual power');
  await expect(page.locator('.analytics-official-figure figcaption')).toContainText('not my design deliverable');
  await expect(page.locator('#competitive-analysis')).toContainText('current public product documentation');
  await expect(page.locator('.comparison-table tbody tr')).toHaveCount(3);
  await expect(page.locator('.identity-platform')).toContainText('Analytics+ · Power BI');
  await expect(page.locator('.identity-platform img[alt="Microsoft"]')).toBeVisible();
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

test('official feature references open the existing evidence disclosure and preserve source attribution', async ({ page }) => {
  await page.goto('/analytics-plus.html#features');
  await expect(page.locator('#evidence-notes')).not.toHaveAttribute('open');
  await page.getByRole('link', { name: 'Official feature references →', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#feature-references$/);
  await expect(page.locator('#evidence-notes')).toHaveAttribute('open');
  const references = page.locator('#feature-references');
  await expect(references).toBeInViewport();
  for (const source of [
    'https://docs.inforiver.com/analytics+/storyboard',
    'https://docs.inforiver.com/analytics+/gantt-chart',
    'https://inforiver.com/blog/inforiver-analytics-plus/inforiver-analytics-flexible-kpi-containers/#Chart-wizard',
    'https://docs.inforiver.com/analytics+/storyboard/annotations',
    'https://docs.inforiver.com/analytics+/working-with-analytics+/4.-cards/4.2.-quick-options-cards/kpi-customizations'
  ]) {
    const link = references.locator(`a[href="${source}"]`);
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(link).toHaveAttribute('target', '_blank');
  }
  await expect(references).toContainText('not individual design ownership');
  await expect(references).toContainText('not PowerTable in Fabric');
  await expect(references).toContainText('not my design deliverable');
  await page.reload();
  await expect(page.locator('#evidence-notes')).toHaveAttribute('open');
  await expect(references).toBeInViewport();
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
    await expect(page.locator('#feature-wizard [data-case-scene="wizard-design"]')).toBeVisible();
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
  await page.locator('#design-details > summary').click();
  await page.locator('.product-marketplace > summary').click();
  await expect(page.getByRole('link', { name: /Explore the Marketplace/ })).toHaveAttribute('href', 'https://store-ap.inforiver.com/');
  await page.locator('#evidence-notes > summary').click();
  await page.getByRole('link', { name: 'Official feature references →', exact: true }).click();
  await expect(page.locator('#feature-references')).toBeInViewport();
  await expect(page.locator('#feature-references')).toContainText('Simple and Variance presets');
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
