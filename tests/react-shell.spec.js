import { test, expect } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

for (const width of [320, 390, 768, 1440, 1920]) {
  test(`Home and About keep identical header dimensions and gutters at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = [];
    for (const path of ['/', '/about.html', '/powertable.html']) {
      await page.goto(path);
      await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
      dimensions.push(await page.evaluate(() => {
        const selectors = ['.site-header', '.header-brand', '.header-contacts', '.wordmark', '.companion-button'];
        return selectors.map(selector => {
          const { x, y, width, height } = document.querySelector(selector).getBoundingClientRect();
          return { x, y, width, height };
        });
      }));
      const header = await page.locator('.site-header').boundingBox();
      const content = await page.locator('main > .wrap').first().boundingBox();
      expect(content.x).toBeCloseTo(header.x, 1);
      expect(content.width).toBeCloseTo(header.width, 1);
    }
    expect(dimensions[1]).toEqual(dimensions[0]);
    expect(dimensions[2]).toEqual(dimensions[0]);
  });
}

test('all React pages hydrate without errors and preserve the Focus default', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  for (const path of ['/', '/about.html', '/powertable.html', '/analytics-plus.html', '/analytics-spatial.html',
    '/column-mapping.html', '/gantt-baselines.html', '/gantt-backlog.html',
    '/gantt-conditional-formatting.html', '/gantt-configuration.html', '/resource-configuration.html', '/crosstab.html',
    '/storyboard.html', '/gantt.html', '/analytics.html', '/presentation.html', '/kpi.html']) {
    await page.goto(path);
    await expect(page.locator('#root > .site-header')).toBeVisible();
    await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('data-listening-mode', 'focus');
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(250, 249, 246)');
    await expect(page.locator('script[src="/app.js"], script[src="/soundroom.js"]')).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});

test('supplied screenshot cases reflect confirmed publication permission without removing source disclosures', async ({ page }) => {
  for (const path of ['/column-mapping.html', '/gantt-baselines.html', '/gantt-backlog.html',
    '/gantt-conditional-formatting.html', '/gantt-configuration.html', '/resource-configuration.html']) {
    await page.goto(path);
    const evidence = page.locator('#evidence');
    await expect(evidence).toContainText('Permission to publish these supplied screenshots has been confirmed.');
    await expect(evidence).toContainText(/internal.only/i);
    await expect(evidence).not.toContainText(/local preview|pending permission|confirm permission before/i);
  }
});

for (const width of [390, 1440]) {
  test(`Home approach stays distinct from the full About introduction at ${width}px`, async ({ page }) => {
    const statement = 'My design work on PowerTable was based entirely on the Microsoft Fabric design system.';
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('.hero-introduction')).toContainText('Four years');
    await expect(page.locator('.home-about > .eyebrow')).toHaveText('Behind the work');
    await expect(page.locator('.home-about')).toContainText('Business goals, user needs & realistic use cases');
    await expect(page.locator('.home-about')).toContainText('Everyday tasks, edge cases & reusable patterns');
    await expect(page.locator('.home-about > div > p')).toHaveCount(0);
    await expect(page.locator('.home-about .design-approach h3')).toHaveText(['Understand', 'Structure', 'Refine']);
    await expect(page.locator('.home-about .design-approach svg')).toHaveCount(3);
    await expect(page.locator('.home-about .profile-links a')).toHaveCount(1);
    await expect(page.getByRole('link', { name: 'More about me' })).toHaveAttribute('href', '/about.html');
    await expect(page.locator('.home-about dl')).toHaveCount(0);
    for (const paragraph of await page.locator('.home-about .design-approach p').all()) {
      expect((await paragraph.innerText()).trim().split(/\s+/).length).toBeLessThanOrEqual(28);
    }
    await expect(page.locator('.home-about')).not.toContainText('Microsoft Fabric design system');
    await expect(page.locator('.home-about')).not.toContainText('Product Designer II');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator('.home-about a[href="/about.html"]').click();
    await expect(page.locator('.about-intro')).toContainText('Product Designer II at Lumel, with four years');
    await expect(page.locator('.about-intro')).toContainText('I think in workflows, not isolated screens');
    await expect(page.locator('.about-intro .profile-highlights dt')).toHaveText(['PowerTable', 'Analytics+']);
    await expect(page.locator('.about-intro .profile-highlights')).toContainText('Chart Wizard & reusable KPI templates shipped');
    await expect(page.locator('.about-intro')).toContainText('product managers and developers');
    for (const paragraph of await page.locator('.about-intro > div:last-child > p').all()) {
      expect((await paragraph.innerText()).trim().split(/\s+/).length).toBeLessThanOrEqual(28);
    }
    await expect(page.locator('#experience-details')).toContainText(statement);
    await expect(page.locator('#experience-details')).toContainText('Across PowerTable and Inforiver Analytics+');
    await expect(page.locator('#experience-details')).toContainText('product iconography');
    await expect(page.locator('.about-intro')).not.toContainText('contributions to the Microsoft Fabric design system');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
