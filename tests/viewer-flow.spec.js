import { test, expect, openProductDetails, openLinkDetails, openListeningControls } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

const overviewReturns = [
  ['/powertable.html', '/#work'],
  ['/analytics-plus.html', '/#work'],
  ['/column-mapping.html', '/powertable.html#gantt-features'],
  ['/gantt-baselines.html', '/powertable.html#gantt-features'],
  ['/gantt-backlog.html', '/powertable.html#gantt-features'],
  ['/gantt-configuration.html', '/powertable.html#gantt-features'],
  ['/gantt-conditional-formatting.html', '/powertable.html#resource-features'],
  ['/resource-configuration.html', '/powertable.html#resource-features'],
  ['/crosstab.html', '/powertable.html#crosstab-features'],
  ['/storyboard.html', '/analytics-plus.html#features'],
  ['/gantt.html', '/analytics-plus.html#features'],
  ['/analytics.html', '/analytics-plus.html#features'],
  ['/presentation.html', '/analytics-plus.html#features'],
  ['/kpi.html', '/analytics-plus.html#features'],
  ['/analytics-spatial.html', '/analytics-plus.html#spatial-exploration']
];

for (const javaScriptEnabled of [true, false]) {
  for (const width of [390, 1440]) {
    test(`cases return to a viewer-chosen overview without next-topic shortcuts at ${width}px with JavaScript ${javaScriptEnabled}`, async ({ browser, baseURL }) => {
      const context = await browser.newContext({ javaScriptEnabled, viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      try {
        const page = await context.newPage();
        for (const [route, destination] of overviewReturns) {
          await page.goto(baseURL + route);
          await expect(page.locator('.next-project, .next-title, .next-arrow')).toHaveCount(0);
          const back = page.locator('.back-link');
          await expect(back).toHaveAttribute('href', destination);
          await back.focus();
          await page.keyboard.press('Enter');
          await expect(page).toHaveURL(baseURL + destination);
          await expect(page.locator(destination.slice(destination.indexOf('#')))).toBeInViewport();
        }
      } finally {
        await context.close();
      }
    });
  }
}

async function openReady(page, path) {
  await page.goto(path);
  await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
  await page.evaluate(() => document.fonts.ready);
}

for (const width of [320, 390, 768, 1440, 1920]) {
  test(`Home prioritizes work and a concise About link without a contact pitch at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await openReady(page, '/');
    await expect(page.locator('.hero-introduction')).toContainText('Four years of enterprise UX');
    await expect(page.locator('#project-planning')).toHaveAttribute('href', '/powertable.html');
    await expect(page.locator('#project-analytics')).toHaveAttribute('href', '/analytics-plus.html');
    await expect(page.locator('.showcase-case')).toHaveCount(0);
    const workLink = page.getByRole('link', { name: 'View enterprise product design', exact: true });
    await expect(workLink).toHaveAttribute('href', '#work');
    const hero = await page.locator('.reference-hero').boundingBox();
    const action = await workLink.boundingBox();
    expect(action.height).toBeGreaterThanOrEqual(44);
    expect(action.y + action.height).toBeLessThanOrEqual(hero.y + hero.height);
    await workLink.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#work')).toBeInViewport();
    await expect(page.locator('#main-nav a[aria-current]')).toHaveText('Home');
    await openListeningControls(page);
    for (const control of await page.locator('.listening-modes button').all()) {
      expect((await control.boundingBox()).height).toBeGreaterThanOrEqual(44);
      await expect(control).toHaveCSS('font-size', '14px');
    }
    await expect(page.getByRole('link', { name: /Discuss a product design role/ })).toHaveCount(0);
    await expect(page.locator('.home-contact')).toHaveCount(0);
    await expect(page.locator('#main-nav a[href="/about.html"]')).toHaveAttribute('href', '/about.html');
    await expect(page.locator('.studio-notes')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });

  test(`product overviews lead into supported feature cases at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const [path, destination, focus] of [
      ['/powertable.html', '/column-mapping.html', 'PowerTable in action.'],
      ['/analytics-plus.html', '/analytics.html', 'Analytics+ in action.']
    ]) {
      await openReady(page, path);
      await openProductDetails(page);
      const figure = page.locator(path === '/powertable.html'
        ? '.case-story-content > .product-overview'
        : '.case-story-content > .analytics-lead-screen');
      const recommendation = path === '/powertable.html'
        ? page.getByRole('link', { name: 'Explore Gantt', exact: true })
        : figure.getByRole('link', { name: /Recommended first read/ });
      await expect(recommendation).toHaveAttribute('href', destination);
      await expect(figure.locator('.figure-label')).toContainText(focus);
      expect(await recommendation.evaluate(element => element.closest('#full-case-evidence')?.open)).toBe(true);
      const action = await recommendation.boundingBox();
      const image = await figure.locator('.product-screenshot img').boundingBox();
      expect(action.height).toBeGreaterThanOrEqual(44);
      await expect(page.locator('.metadata .scan-emphasis')).toHaveText(path === '/powertable.html' ? 'End-to-end Gantt & resource UX/UI' : 'End-to-end Analytics+ UX/UI');
      if (path === '/powertable.html') {
        await expect(page.locator('h1')).toHaveText('PowerTable.');
        await expect(page.locator('.case-summary')).toContainText('task schedules and team assignments');
        await expect(page.locator('.case-focus')).toContainText('Microsoft Fabric design system');
        await expect(figure.locator('figcaption')).toContainText('Official product screenshot');
        await expect(figure.locator('.product-overview-copy')).toContainText('No-code data apps');
        await expect(page.locator('.case-brief')).toContainText('remain explorations');
        await expect(page.getByRole('link', { name: 'Explore Cross-tab', exact: true })).toHaveAttribute('href', '/crosstab.html');
      } else {
        await expect(page.locator('h1')).toHaveText('Inforiver Analytics+.');
        await expect(page.locator('.case-summary')).toContainText('End-to-end UX/UI for a Power BI product.');
        await expect(page.locator('.case-summary')).toContainText('Selected feature stories from discovery to presentation.');
        await expect(page.locator('.case-brief')).toContainText('Reusable KPI templates shipped');
        expect(action.y).toBeGreaterThanOrEqual(image.y + image.height);
        await expect(page.locator('.case-brief')).toContainText('Chart Wizard shipped');
        await expect(figure.locator('figcaption')).toContainText('Official');
        await expect(figure.locator('.product-screenshot')).toHaveAttribute('href', '/assets/analytics-plus-official-dashboard.webp');
        await expect(figure.locator('img')).toHaveAttribute('src', '/assets/analytics-plus-official-dashboard.webp');
      }
      await recommendation.focus();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(new RegExp(destination.replace('.', '\\.') + '$'));
      await expect(page.locator('h1')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });
}

test('public product sources and colleague feedback are not presented as personal project outcomes', async ({ page }) => {
  for (const [path, disclosure, source] of [
    ['/powertable.html', '#study-details', 'https://www.linkedin.com/feed/update/urn:li:activity:7270117667141742592/'],
    ['/analytics-plus.html', '#evidence-notes', 'https://www.linkedin.com/posts/info-river_powerbi-datastorytelling-dashboarddesign-activity-7449433719045537792-W7XT']
  ]) {
    await openReady(page, path);
    const summary = page.locator(`${disclosure} > summary`);
    await openLinkDetails(summary);
    if (await page.locator(disclosure).getAttribute('open') === null) await summary.click();
    const link = page.locator(`a[href="${source}"]`);
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(link.locator('..')).toContainText(/not independent/);
    await expect(page.locator('#main-nav a[href="/about.html"]')).toHaveCount(1);
    await page.goto('/about.html#recommendations');
    await expect(page.locator('#recommendations')).toBeInViewport();
  }
});

test('artifact captions identify the work rather than the file handoff', async ({ page }) => {
  for (const route of ['/', '/powertable.html', '/analytics-plus.html', '/column-mapping.html',
    '/gantt-baselines.html', '/gantt-backlog.html', '/gantt-conditional-formatting.html',
    '/gantt-configuration.html', '/resource-configuration.html', '/crosstab.html', '/storyboard.html',
    '/gantt.html', '/analytics.html', '/presentation.html', '/kpi.html']) {
    await openReady(page, route);
    const captions = await page.locator('figcaption, .figure-label, .visual-bottom, .album-footer').allTextContents();
    for (const caption of captions) expect(caption.trim()).not.toMatch(/^supplied /i);
  }
});

test('the recommended reading route and Home work link work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 900 } });
  try {
    const page = await context.newPage();
    await page.goto(baseURL + '/');
    await page.getByRole('link', { name: 'View enterprise product design', exact: true }).click();
    await expect(page).toHaveURL(/#work$/);
    await expect(page.locator('#work')).toBeInViewport();
    for (const [path, destination] of [['/powertable.html', '/column-mapping.html'], ['/analytics-plus.html', '/analytics.html']]) {
      await page.goto(baseURL + path);
      await openProductDetails(page);
      const firstRead = path === '/powertable.html'
        ? page.getByRole('link', { name: 'Explore Gantt', exact: true })
        : page.getByRole('link', { name: /Recommended first read/ });
      await firstRead.click();
      await expect(page).toHaveURL(baseURL + destination);
      await expect(page.locator('h1')).toBeVisible();
    }
  } finally {
    await context.close();
  }
});
