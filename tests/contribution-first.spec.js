import { test, expect } from './fixtures.js';

const cases = [
  { path: '/analytics-plus.html', image: '/assets/wizard-function.png', detail: '/analytics.html', role: 'End-to-end Chart Wizard UX/UI' },
  { path: '/powertable.html', image: '/assets/fabric-mapping-time-entries.png', detail: '/column-mapping.html', role: 'End-to-end Gantt & resource UX/UI' }
];

for (const appearance of ['light', 'dark']) {
  for (const width of [390, 1440]) {
    for (const item of cases) {
      test(`full evidence retains contribution context on ${item.path} at ${width}px in ${appearance}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
        await page.goto(item.path);
        await expect(page.locator('#full-case-evidence')).not.toHaveAttribute('open');
        await page.locator('#full-case-evidence > summary').click();
        const evidence = page.locator('#contribution-evidence');
        await evidence.scrollIntoViewIfNeeded();
        await expect(page.locator('.case-context > summary')).toContainText(item.role);
        await expect(page.locator('.case-context')).not.toHaveAttribute('open');
        await expect(page.locator('.product-overview img')).toHaveAttribute('loading', 'lazy');
        await expect(page.locator('.product-overview figcaption')).toContainText('Official');
        await expect(page.locator('.product-overview figcaption a').first()).toHaveAttribute('href', /^https:/);
        const lead = await evidence.boundingBox();
        const official = await page.locator('.product-overview').boundingBox();
        expect(official.y).toBeGreaterThan(lead.y + lead.height);
        await expect(page.locator('.case-story-nav a').first()).toHaveAttribute('href', '#contribution-evidence');
        if (item.path === '/analytics-plus.html') {
          await expect(page.locator('.case-evidence').first()).toHaveAttribute('id', 'contribution-evidence');
          await expect(evidence.getByRole('link', { name: /screen full-size/ })).toHaveAttribute('href', item.image);
          await expect(evidence.locator('img')).toHaveAttribute('fetchpriority', 'high');
          await expect(evidence.locator('.product-overview-copy')).toHaveCSS('color', await evidence.evaluate(element => getComputedStyle(element).color));
          const image = evidence.locator('img');
          await image.evaluate(element => element.decode());
          const size = await image.evaluate(element => ({
            width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height,
            nativeWidth: element.naturalWidth, nativeHeight: element.naturalHeight
          }));
          expect(size.width / size.height).toBeCloseTo(size.nativeWidth / size.nativeHeight, 2);
          expect(size.width).toBeLessThanOrEqual(size.nativeWidth);
          expect((await image.boundingBox()).y).toBeLessThan(width < 700 ? 1050 : 900);
          await expect(evidence.locator('a.text-link')).toHaveAttribute('href', item.detail);
          await expect(evidence.locator('figcaption')).toContainText(/not.*(measured|outcome)/);
          await expect(page.locator('#features .album-card').first()).toHaveAttribute('id', 'feature-wizard');
          await expect(page.locator('#review-brief')).toContainText('Chart Wizard and reusable KPI templates shipped');
        } else {
          await expect(evidence).toHaveJSProperty('tagName', 'SECTION');
          await expect(evidence.locator('.eyebrow')).toHaveText('Product overview / Microsoft Fabric');
          await expect(evidence.locator('h2')).toHaveText('What is PowerTable?');
          await expect(evidence.locator('.product-explanation-copy')).toHaveText('PowerTable brings no-code data apps and planning to Microsoft Fabric. Teams can organize business data, plan tasks with Gantt timelines, review resource assignments, and summarize information in Cross-tab views.');
          await expect(evidence.locator('.product-explanation-copy')).toHaveCSS('color', await evidence.evaluate(element => getComputedStyle(element).color));
          await expect(evidence.locator('img, figcaption, .inspect-button, a')).toHaveCount(0);
          await expect(page.getByRole('heading', { name: 'Link logged hours to the right task.' })).toHaveCount(0);
          await expect(evidence.locator(`img[src="${item.image}"]`)).toHaveCount(0);
          await expect(page.locator('.case-story-nav a').first()).toContainText('Product overview');
          await expect(page.locator('.case-context > summary')).toContainText('Cross-tab contribution');
          await expect(page.locator('#workspaces .workspace-group')).toHaveCount(3);
        }
        await page.locator('.case-context > summary').click();
        await expect(page.locator('.case-context .project-identity')).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      });
    }
  }
}

for (const item of cases) {
  test(`contribution and direct feature links remain native without JavaScript on ${item.path}`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
    try {
      const page = await context.newPage();
      await page.goto(baseURL);
      const product = page.locator(`.product-context-card[href="${item.path}"]`);
      await expect(product).toBeVisible();
      await product.click();
      await expect(page).toHaveURL(new URL(item.path, baseURL).href);
      if (item.path === '/powertable.html') {
        await expect(page.getByRole('heading', { name: 'A workspace for planning work.' })).toBeVisible();
      }
      await page.locator('#full-case-evidence > summary').click();
      await page.locator('.case-story-nav a').first().click();
      await expect(page.locator('#contribution-evidence')).toBeInViewport();
      if (item.path === '/powertable.html') {
        await page.getByRole('link', { name: 'Explore Gantt', exact: true }).click();
      } else {
        await page.locator('#contribution-evidence a.text-link').click();
      }
      await expect(page).toHaveURL(new URL(item.detail, baseURL).href);
      await expect(page.locator(`img[src="${item.image}"]`).first()).toHaveCount(1);
    } finally {
      await context.close();
    }
  });
}
