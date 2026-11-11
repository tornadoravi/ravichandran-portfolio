import { test, expect } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

test('Chart Wizard leads with supported decisions, trade-offs and delivery rather than a screen catalogue', async ({ page }) => {
  await page.goto('/analytics.html');
  await expect(page.locator('#decisions .decision-ledger > li')).toHaveCount(3);
  await expect(page.locator('.decision-tradeoff')).toHaveCount(3);
  await expect(page.locator('.edge-state')).toContainText('Boxes disabled');
  await expect(page.locator('#feature-walkthrough')).not.toHaveAttribute('open');
  await expect(page.locator('#reflection')).toContainText('Chart Wizard shipped');
  await expect(page.locator('#reflection')).toContainText('customer-impact measurements are not included');
  await page.locator('#reflection .evidence-note > summary').click();
  await expect(page.locator('#reflection .evidence-note')).toContainText('No historical before/after iteration log');
  await expect(page.locator('#reflection .evidence-note')).toContainText('not an undocumented alternatives study');
  const words = await page.locator('main').evaluate(main => main.innerText.trim().split(/\s+/).length);
  expect(words).toBeLessThan(800);
});

for (const width of [320, 390, 768, 1440]) {
  test(`decision evidence opens by keyboard at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/analytics.html');
    const link = page.locator('.edge-state a');
    await link.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#feature-walkthrough')).toHaveAttribute('open');
    await expect(page.locator('#visual-form')).toBeInViewport();
    const image = page.locator('#visual-form img');
    await expect(image).toHaveJSProperty('naturalWidth', 540);
    expect(await image.evaluate(element => element.clientWidth)).toBeLessThanOrEqual(540);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('official PowerTable product context stays separate from personal feature evidence', async ({ page }) => {
  await page.goto('/powertable.html');
  await expect(page.locator('.case-evidence .screen-pin, .case-evidence .screen-key')).toHaveCount(0);
  await expect(page.locator('.case-evidence figcaption')).toContainText('Official product screenshot');
  await expect(page.locator('.case-brief')).toContainText('resource, and cost configuration screens');
  await expect(page.locator('.case-evidence img')).toHaveAttribute('src', '/assets/powertable-official-gantt.webp');
  await expect(page.locator('.workspace-preview figcaption').filter({ hasText: /My .* UX\/UI/ })).toHaveCount(2);
  await expect(page.locator('.review-grid')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Explore Gantt', exact: true })).toHaveAttribute('href', '/column-mapping.html');
});

test('full case details remain natively accessible without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(baseURL + '/analytics.html');
  await expect(page.locator('#decisions')).toBeVisible();
  await page.locator('#feature-walkthrough > summary').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#visual-form')).toBeVisible();
  await expect(page.locator('img[src^="/assets/wizard-"]')).toHaveCount(8);
  await page.locator('#reflection .evidence-note > summary').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#reflection .evidence-note')).toContainText('formal user-study results');
  await context.close();
});
