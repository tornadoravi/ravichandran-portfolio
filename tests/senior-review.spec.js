import { test, expect } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

const cases = ['analytics-plus', 'analytics', 'storyboard', 'gantt', 'presentation', 'kpi'];

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`senior review is restrained and evidence-led in ${appearance} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      for (const name of cases) {
        await page.goto(`/${name}.html`);
        await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
        await page.evaluate(() => document.fonts.ready);
        const main = page.locator('main.design-review');
        await expect(main).toBeVisible();
        await expect(page.getByAltText('Microsoft', { exact: true })).toBeVisible();
        await expect(page.getByAltText('Lumel Technologies', { exact: true })).toBeVisible();
        if (name === 'analytics-plus') {
          const brief = page.getByRole('region', { name: 'Design contribution at a glance' });
          await expect(brief.locator('dt')).toHaveText(['Design challenge', 'My scope', 'Confirmed delivery']);
          await expect(brief).toContainText('Chart Wizard and reusable KPI templates shipped.');
          expect((await brief.innerText()).trim().split(/\s+/).length).toBeLessThanOrEqual(40);
          expect((await main.innerText()).trim().split(/\s+/).length).toBeLessThanOrEqual(280);
          expect((await main.boundingBox()).height).toBeLessThanOrEqual(width <= 700 ? 3600 : 2800);
          await expect(page.getByRole('link', { name: 'Recommended first read: Chart Wizard' })).toBeVisible();
          await expect(page.locator('.product-marketplace')).toBeHidden();
          await expect(page.locator('#spatial-exploration')).toBeHidden();
          const rows = page.locator('.feature-review-index > a');
          await expect(rows).toHaveCount(5);
          await expect(rows.locator('img')).toHaveCount(0);
          await expect(rows.locator('svg.case-topic-art')).toHaveCount(5);
          const boxes = [];
          for (const row of await rows.all()) {
            await expect(row).toHaveCSS('border-top-width', '1px');
            await expect(row).toHaveCSS('border-radius', '8px');
            await expect(row).toHaveCSS('box-shadow', 'none');
            const illustration = row.locator('svg.case-topic-art');
            await expect(illustration).toBeVisible();
            await expect(illustration).toHaveAttribute('viewBox', '0 0 480 236');
            await expect(row.locator('.album-footer')).toContainText('Original concept illustration');
            const frame = await row.locator('.album-media').boundingBox();
            const art = await illustration.boundingBox();
            expect(art.height).toBeCloseTo(frame.height - 2, 1);
            expect(art.width).toBeCloseTo(frame.width - 2, 1);
            boxes.push(await row.boundingBox());
          }
          if (width > 700) {
            for (const [left, right] of [[boxes[0], boxes[1]], [boxes[2], boxes[3]]]) {
              expect(left.y).toBeCloseTo(right.y, 1);
              expect(left.height).toBeCloseTo(right.height, 1);
              expect(right.x).toBeGreaterThan(left.x + left.width);
            }
            expect(boxes[2].y).toBeGreaterThan(boxes[0].y + boxes[0].height);
            expect(boxes[4].y).toBeGreaterThan(boxes[2].y + boxes[2].height);
            expect(boxes[4].width).toBeCloseTo(boxes[1].x + boxes[1].width - boxes[0].x, 1);
          } else {
            for (let index = 1; index < boxes.length; index++) {
              expect(boxes[index].y).toBeGreaterThanOrEqual(boxes[index - 1].y + boxes[index - 1].height);
            }
          }
        } else {
          for (const illustration of await page.locator('.decision-illustration').all()) {
            await expect(illustration).toHaveCSS('border-top-width', '0px');
            await expect(illustration).toHaveCSS('box-shadow', 'none');
          }
          for (const illustration of await page.locator('.focus-illustration').all()) {
            await expect(illustration).toHaveCSS('border-top-width', '0px');
            await expect(illustration.locator('.focus-steps > li')).toHaveCount(3);
          }
          await expect(page.locator('.next-project')).toHaveCount(0);
          await expect(page.locator('#case-details')).not.toHaveAttribute('open');
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), name).toBe(true);
      }
    });
  }
}

for (const javaScriptEnabled of [true, false]) {
  test(`compact review preserves evidence and prototype boundaries with JavaScript ${javaScriptEnabled}`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled, viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
    try {
      const page = await context.newPage();
      await page.goto(baseURL + '/analytics-plus.html');
      await page.locator('#supporting-work > summary').focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('#spatial-exploration')).toContainText('Prototype only—not a shipped Vision Pro product.');
      await expect(page.locator('#supporting-work')).toContainText('Excel Add-In');
      await expect(page.locator('#supporting-work')).toContainText('PowerPoint visualization templates');
      await page.goto(baseURL + '/analytics-plus.html#spatial-exploration');
      await expect(page.locator('#spatial-exploration')).toBeInViewport();
      await page.locator('#design-details > summary').focus();
      await page.keyboard.press('Enter');
      await page.locator('.product-marketplace > summary').focus();
      await page.keyboard.press('Enter');
      await expect(page.getByRole('link', { name: /Explore the Marketplace/ })).toHaveAttribute('href', 'https://store-ap.inforiver.com/');
      await page.getByRole('link', { name: 'Read Chart Wizard case study', exact: true }).click();
      await expect(page).toHaveURL(baseURL + '/analytics.html');
      await expect(page.locator('#browse-chart img, #browse-function img')).toHaveCount(2);
      await expect(page.locator('.focus-explanation')).toContainText('Chart Wizard shipped');
    } finally {
      await context.close();
    }
  });
}
