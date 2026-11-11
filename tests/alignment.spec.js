import { test, expect } from './fixtures.js';

const routes = ['/', '/about.html', '/powertable.html', '/analytics-plus.html',
  '/column-mapping.html', '/gantt-baselines.html', '/gantt-backlog.html',
  '/gantt-conditional-formatting.html', '/gantt-configuration.html', '/resource-configuration.html',
  '/crosstab.html', '/storyboard.html', '/gantt.html', '/analytics.html', '/presentation.html', '/kpi.html'];

test.use({ reducedMotion: 'reduce' });

for (const width of [1060, 1440, 1920]) {
  test(`Home role, badges, headline, and portrait fit a short ${width}px desktop`, async ({ page }) => {
    await page.setViewportSize({ width, height: 600 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const hero = await page.locator('.portrait-hero').boundingBox();
    expect((await page.locator('#work').boundingBox()).y).toBeCloseTo(600, 0);
    for (const selector of ['.hero-context', '.portrait-title', '.hero-introduction', '.hero-work-link', '.hero-portrait']) {
      const bounds = await page.locator(selector).boundingBox();
      expect(bounds.y, selector).toBeGreaterThanOrEqual(hero.y);
      expect(bounds.y + bounds.height, selector).toBeLessThanOrEqual(hero.y + hero.height);
    }
  });
}

async function alignmentIssues(page) {
  return page.evaluate(() => {
    const issues = [];
    const visible = element => element.checkVisibility({ checkVisibilityCSS: true }) && element.getBoundingClientRect().width > 0;
    const label = element => `${element.tagName.toLowerCase()}${element.id ? '#' + element.id : ''}.${element.className}`;
    function insideScroller(element) {
      for (let parent = element.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
        if (['auto', 'scroll'].includes(getComputedStyle(parent).overflowX) && parent.scrollWidth > parent.clientWidth + 1) return true;
      }
      return false;
    }
    for (const element of document.querySelectorAll('header,main,footer,main section,main figure,main nav,main h1,main h2,main h3,main p,main button,main summary,.project-identity,.decision-flow>li,.album-card,.page-listening,.listening-room,.soundroom-panel')) {
      if (!visible(element) || element.closest('svg') || element.classList.contains('sr-only') || insideScroller(element)) continue;
      const bounds = element.getBoundingClientRect();
      if (bounds.left < -1 || bounds.right > innerWidth + 1) issues.push(`${label(element)} is outside the viewport`);
      if (element.clientWidth > 0 && element.scrollWidth > element.clientWidth + 2 && getComputedStyle(element).overflowX === 'visible') {
        issues.push(`${label(element)} overflows by ${element.scrollWidth - element.clientWidth}px`);
      }
    }
    const header = document.querySelector('.site-header.wrap').getBoundingClientRect();
    for (const element of document.querySelectorAll('main .wrap,footer.wrap,.page-listening.wrap')) {
      if (!visible(element) || element.parentElement.closest('.wrap')) continue;
      const bounds = element.getBoundingClientRect();
      if (Math.abs(bounds.left - header.left) > 1 || Math.abs(bounds.right - header.right) > 1) {
        issues.push(`${label(element)} does not align with the shared gutters`);
      }
    }
    for (const grid of document.querySelectorAll('.decision-flow,.feature-card-grid,.wizard-gallery,.presentation-gallery,.spatial-sequence')) {
      if (!visible(grid) || !['normal', 'stretch'].includes(getComputedStyle(grid).alignItems)) continue;
      const children = [...grid.children].filter(visible).map(element => element.getBoundingClientRect());
      for (let index = 1; index < children.length; index++) {
        const previous = children[index - 1], current = children[index];
        if (Math.abs(previous.top - current.top) < 1 && Math.abs(previous.bottom - current.bottom) > 2) {
          issues.push(`${label(grid)} has uneven card edges`);
        }
      }
    }
    if (document.documentElement.scrollWidth > innerWidth) issues.push('The page scrolls horizontally');
    return issues;
  });
}

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 701, 768, 1024, 1440, 1920]) {
    test(`all page elements align in ${appearance} at ${width}px, including expanded evidence`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(appearance => localStorage.setItem('portfolio-appearance', appearance), appearance);
      for (const route of routes) {
        await page.goto(route);
        await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator('[data-soundroom]')).toHaveCount(1);
        await expect(page.getByRole('button', { name: 'Soundroom Mode', exact: true })).toBeVisible();
        expect(await alignmentIssues(page), `${route}, collapsed`).toEqual([]);
        await page.locator('main details').evaluateAll(details => details.forEach(detail => { detail.open = true; }));
        expect(await alignmentIssues(page), `${route}, expanded`).toEqual([]);
      }
    });
  }
}

for (const width of [320, 390, 768, 1440]) {
  test(`expanded music controls align on every page at ${width}px without requesting playback`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(() => sessionStorage.setItem('portfolio-listening-mode', 'soundroom'));
    const mediaRequests = [];
    page.on('request', request => { if (request.url().endsWith('.mp3')) mediaRequests.push(request.url()); });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.getByRole('button', { name: 'Play ambience', exact: true })).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(await alignmentIssues(page), route).toEqual([]);
      const controls = await page.locator('.listening-modes button,.ambience-play,.soundroom-volume input').all();
      for (const control of controls) expect((await control.boundingBox()).height).toBeGreaterThanOrEqual(44);
    }
    expect(mediaRequests).toEqual([]);
  });
}
