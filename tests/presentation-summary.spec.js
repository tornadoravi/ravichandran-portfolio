import { test, expect } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`Presentation has one clear visual and three short points in ${appearance} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      await page.goto('/presentation.html');
      await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
      await page.evaluate(() => document.fonts.ready);
      const summary = page.locator('.presentation-summary');
      await expect(summary.locator('svg')).toHaveCount(1);
      await expect(summary.locator('.case-diagram')).toBeVisible();
      await expect(summary.locator('dt')).toHaveText(['Problem', 'My decision', 'Evidence']);
      for (const point of await summary.locator('dd').all()) {
        expect((await point.innerText()).trim().split(/\s+/).length).toBeLessThanOrEqual(15);
      }
      expect((await page.locator('main').innerText()).trim().split(/\s+/).length).toBeLessThanOrEqual(130);
      await expect(page.locator('#case-details')).not.toHaveAttribute('open');
      await expect(page.locator('main img[src^="/assets/presentation-screen-"]:visible, main img[data-visual-kind="illustration"]:visible')).toHaveCount(0);
      await expect(page.locator('.decision-flow, .case-narrative')).toHaveCount(0);
      await expect(summary).toContainText('release status is not verified');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

      await page.locator('#case-details > summary').focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('#case-details')).toHaveAttribute('open', '');
      await expect(page.locator('#design-screens')).toBeVisible();
      await expect(page.locator('img[src^="/assets/presentation-screen-"]')).toHaveCount(9);
      await page.goto('/presentation.html#design-screens');
      await expect(page.locator('#case-details')).toHaveAttribute('open', '');
      await expect(page.locator('#design-screens')).toBeInViewport();
      await page.reload();
      await expect(page.locator('#case-details')).toHaveAttribute('open', '');
      await expect(page.locator('#design-screens')).toBeInViewport();
    });
  }
}

test('Presentation keeps all nine original screens, concepts, and existing bookmarks', async ({ page }) => {
  await page.goto('/presentation.html#annotations');
  await expect(page.locator('#case-details')).toHaveAttribute('open', '');
  await expect(page.locator('#annotations')).toBeInViewport();
  await expect(page.locator('img[src^="/assets/presentation-screen-"]')).toHaveCount(9);
  for (const section of ['#business-case', '#solutions', '#concept', '#overview', '#comments',
    '#presentation', '#reflection', '#references']) {
    await expect(page.locator(section)).toHaveCount(1);
  }
  await expect(page.locator('img[data-visual-kind="illustration"]')).toHaveCount(2);
  await expect(page.locator('#references a').first()).toHaveAttribute('href', 'https://docs.inforiver.com/analytics+/storyboard/annotations');
});

test('Presentation screen access and full detail work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  try {
    const page = await context.newPage();
    await page.goto(baseURL + '/presentation.html');
    await expect(page.locator('.presentation-summary .case-diagram')).toBeVisible();
    await expect(page.locator('#design-screens')).toBeHidden();
    await page.locator('#case-details > summary').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#design-screens')).toBeVisible();
    await expect(page.locator('img[src^="/assets/presentation-screen-"]')).toHaveCount(9);
    await page.locator('#design-screens').scrollIntoViewIfNeeded();
    await expect(page.locator('#design-screens')).toBeInViewport();
  } finally {
    await context.close();
  }
});
