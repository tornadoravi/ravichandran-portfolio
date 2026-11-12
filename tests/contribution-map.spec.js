import { test, expect } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

const charts = ['IBCS bullet', 'Comparative bullet', 'Progress bar', 'Quantitative bullet',
  'Single measure bullet', 'Marimekko chart', 'Tornado chart', 'Waterfall chart',
  'Vertical measure breakdown', 'Box plot', 'Histogram', 'Quadrant', 'Parallel coordination charts',
  'Radar chart', 'Polar chart', 'Radial chart', 'Pie chart', 'Donut chart', 'Data table'];

const analyticsScope = ['charts, cards, tables, shapes, comments, slicers, images, and play-axis',
  'Two landing-page designs', 'floating toolbar', 'managing series', 'managing data', 'onboarding',
  'video and interactive elements', 'user scenario, use case, or chart group', 'Decomposition',
  'network chart settings', 'data label panel', 'chart color system', 'No Data', 'freehand progress bar',
  'filter context', 'Side-panel design system', 'implemented and is in use', 'component-based and standalone',
  'Color picker', 'theme palette', 'Storyboard theme colors', 'dropdowns', 'standard-size dialog',
  '70+ unique icons', 'matrix', '30+ KPI layouts', '20+ KPI presets', 'Template builder',
  'Reusable table templates', 'slideshow', 'PowerPoint compatibility', 'PowerPoint visualization templates',
  'Text-to-Visual', 'Excel Add-In', 'Excel Analytics & AI Genie', 'Super App', 'Research and wireframes'];

const planningScope = ['End-to-end design ownership', 'Layout canvas', 'column mapping',
  'timescale management', 'effort tracking', 'scroll-to-task', 'add/drive column flow', 'Baseline features',
  'time entries/logs', 'history comments', 'PDF/Excel export', 'summary-bar', 'Split By', 'Data Form Query',
  'Sheet Flow', 'Planning Comments', 'Cross-tab', 'Bulk row insert', 'row edit form',
  'BI PowerTable form', 'bookmark flow', 'Ad-hoc Analysis', 'bar-style layout', 'Super Filter',
  'end-to-end prototype', 'BI Fabric base layout', 'Color picker', 'visualization panel', 'filter panel',
  'control panel', 'View Options', 'data source panel', 'Footer zoom', 'data and visual loading',
  'Measures as Category', 'Category by Measure'];

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`contribution maps remain concise, readable, and complete in ${appearance} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      for (const [path, count, scope] of [
        ['/analytics-plus.html', 6, analyticsScope], ['/powertable.html', 4, planningScope]
      ]) {
        await page.goto(path);
        await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
        const map = page.locator('#contributions');
        const groups = map.locator('.contribution-group');
        await expect(groups).toHaveCount(count);
        await expect(map.locator('.contribution-group[open]')).toHaveCount(0);
        expect((await map.innerText()).trim().split(/\s+/).length).toBeLessThanOrEqual(95);
        for (const group of await groups.all()) {
          await group.locator(':scope > summary').click();
          await expect(group).toHaveAttribute('open', '');
          for (const image of await group.locator('img').all()) {
            await image.evaluate(image => image.decode());
            const size = await image.evaluate(image => ({
              width: image.getBoundingClientRect().width, height: image.getBoundingClientRect().height,
              naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight
            }));
            expect(size.naturalWidth).toBeGreaterThan(0);
            expect(size.width).toBeLessThanOrEqual(size.naturalWidth);
            expect(size.width / size.height).toBeCloseTo(size.naturalWidth / size.naturalHeight, 2);
          }
          for (const detail of await group.locator('dd').all()) {
            expect((await detail.innerText()).trim().split(/\s+/).length).toBeLessThanOrEqual(30);
          }
        }
        const text = (await map.innerText()).toLowerCase();
        for (const term of scope) expect(text, term).toContain(term.toLowerCase());
        if (path === '/analytics-plus.html') {
          await page.locator('#chart-contributions > summary').click();
          await expect(page.locator('#chart-contributions li')).toHaveText(charts);
          await expect(page.locator('#contribution-charts')).toContainText('not a claim that every chart was implemented');
          await expect(page.locator('#contribution-templates')).toContainText('not a claim that every variation shipped');
          await expect(page.locator('#contribution-platforms')).toContainText('not presented as a shipped product');
        } else {
          await expect(groups.first()).toHaveAttribute('id', 'contribution-gantt-ownership');
          await expect(groups.first()).toContainText('not a blanket release claim');
          await expect(page.locator('#contribution-forms')).toContainText('not labeled as a confirmed release');
        }
        await map.locator('.contribution-sources > summary').click();
        await expect(map.locator('.contribution-sources')).toContainText('not my authorship');
        for (const link of await map.locator('.contribution-sources a').all()) {
          await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
          expect(new URL(await link.getAttribute('href')).hostname).toMatch(/^(inforiver\.com|docs\.inforiver\.com|docs\.powertable\.com)$/);
        }
        const issues = await map.evaluate(map => [...map.querySelectorAll('summary, dd, img, svg')]
          .filter(element => element.checkVisibility())
          .filter(element => element.getBoundingClientRect().left < 0 || element.getBoundingClientRect().right > innerWidth)
          .map(element => element.tagName));
        expect(issues).toEqual([]);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    });
  }
}

test('Home scope links reveal the correct contribution, including after reload', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.portfolio-scope dt')).toHaveText(['Experience', 'Icons', 'KPI layouts', 'KPI presets']);
  await expect(page.locator('.portfolio-scope dd')).toHaveText(['4 years', '70+', '30+', '20+']);
  const placement = await page.locator('.portfolio-scope').evaluate(scope => ({
    afterProjects: [...document.querySelectorAll('#work > .project')]
      .every(project => project.getBoundingClientRect().bottom <= scope.getBoundingClientRect().top),
    width: scope.getBoundingClientRect().width,
    workWidth: document.querySelector('#work').getBoundingClientRect().width
  }));
  expect(placement.afterProjects).toBe(true);
  expect(placement.width).toBeCloseTo(placement.workWidth, 0);
  await page.getByRole('link', { name: '70+ icons: explore contribution' }).click();
  await expect(page).toHaveURL(/analytics-plus\.html#contribution-templates$/);
  await expect(page.locator('#contribution-templates')).toHaveAttribute('open', '');
  await expect(page.locator('#contribution-templates')).toBeInViewport();
  await page.reload();
  await expect(page.locator('#contribution-templates')).toHaveAttribute('open', '');
  await page.goto('/analytics-plus.html#chart-contributions');
  await expect(page.locator('#contribution-charts')).toHaveAttribute('open', '');
  await expect(page.locator('#chart-contributions')).toHaveAttribute('open', '');
  await expect(page.locator('#chart-contributions')).toBeInViewport();
});

test('contribution maps and the chart inventory work with the keyboard without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  try {
    const page = await context.newPage();
    await page.goto(baseURL + '/analytics-plus.html');
    await page.locator('#contribution-charts > summary').focus();
    await page.keyboard.press('Enter');
    await page.locator('#chart-contributions > summary').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#chart-contributions li')).toHaveText(charts);
    await page.locator('#contribution-charts a[href="/analytics.html"]').click();
    await expect(page).toHaveURL(/\/analytics\.html$/);
    await page.goto(baseURL + '/powertable.html');
    await page.locator('#contribution-forms > summary').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#contribution-forms')).toContainText('end-to-end prototype');
  } finally {
    await context.close();
  }
});
