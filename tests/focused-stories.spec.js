import { test, expect } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`two focused stories explain ownership and decisions in ${appearance} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      const scenes = new Set();
      for (const [path, story, labels, delivery] of [
        ['/powertable.html', 'planning', ['Map the task data', 'Schedule the work', 'Connect the people'], 'remain explorations'],
        ['/analytics.html', 'wizard', ['Start with the need', 'Choose a suitable chart', 'Shape the result'], 'Chart Wizard shipped']
      ]) {
        await page.goto(path);
        await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
        await page.evaluate(() => document.fonts.ready);
        const focus = page.locator('.case-focus');
        await expect(focus).toHaveAttribute('data-focus-story', story);
        await expect(focus.locator('.focus-illustration')).toHaveCount(1);
        await expect(focus.locator('.focus-steps h3')).toHaveText(labels);
        await expect(focus.locator('.focus-explanation dt')).toHaveText(['My ownership', 'Key design decision', 'Delivery & evidence']);
        await expect(focus.locator('.focus-explanation')).toContainText(delivery);
        await expect(focus.locator('img')).toHaveCount(0);
        expect((await focus.innerText()).trim().split(/\s+/).length).toBeLessThanOrEqual(150);
        for (const svg of await focus.locator('svg').all()) {
          await expect(svg).toBeVisible();
          const signature = await svg.innerHTML();
          expect(scenes.has(signature)).toBe(false);
          scenes.add(signature);
        }
        const layout = await focus.evaluate(section => ({
          position: section.dataset.focusStory === 'planning'
            ? section.getBoundingClientRect().top >= document.querySelector('.case-story-content > .case-evidence').getBoundingClientRect().bottom &&
              section.getBoundingClientRect().bottom <= document.querySelector('#workspaces').getBoundingClientRect().top
            : section.getBoundingClientRect().bottom <= document.querySelector('.case-story-content > .case-evidence').getBoundingClientRect().top,
          overflow: [...section.querySelectorAll('li, svg, h3, dd')].some(element => {
            const rect = element.getBoundingClientRect();
            return rect.left < 0 || rect.right > innerWidth;
          })
        }));
        expect(layout.position).toBe(true);
        expect(layout.overflow).toBe(false);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await expect(page.locator('.decision-flow')).toHaveCount(0);
        const evidenceLink = focus.locator('.focus-explanation').getByRole('link');
        await evidenceLink.focus();
        await page.keyboard.press('Enter');
        if (story === 'planning') await expect(page).toHaveURL(/column-mapping\.html$/);
        else await expect(page.locator('#browse-function')).toBeInViewport();
      }
      expect(scenes.size).toBe(6);
    });
  }
}

test('Home and Analytics+ prioritize Chart Wizard while breadth stays optional', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#work > .project')).toHaveCount(2);
  await expect(page.locator('.portfolio-scope, .contribution-map')).toHaveCount(0);
  await expect(page.locator('#project-planning .project-role')).toContainText('End-to-end Gantt & resource UX/UI');
  await expect(page.locator('#project-analytics .project-role')).toContainText('End-to-end Chart Wizard UX/UI');
  await page.locator('#project-analytics .case-link').click();
  await expect(page).toHaveURL(/analytics-plus\.html$/);
  await page.getByRole('link', { name: 'Recommended first read: Chart Wizard' }).click();
  await expect(page).toHaveURL(/analytics\.html$/);
  await page.goto('/analytics-plus.html');
  await expect(page.getByRole('link', { name: 'Recommended first read: Chart Wizard' })).toHaveAttribute('href', '/analytics.html');
  await expect(page.locator('.feature-card-grid > a')).toHaveCount(5);
  await expect(page.locator('#design-details')).not.toHaveAttribute('open');
  await expect(page.locator('#design-details .case-rationale')).toBeHidden();
  await expect(page.locator('#supporting-work')).not.toHaveAttribute('open');
  await page.locator('#supporting-work > summary').focus();
  await page.keyboard.press('Enter');
  for (const phrase of ['30+ KPI layouts', '20+ chart/matrix KPI presets', '70+ unique chart/matrix icons',
    'Implemented side-panel revamp', 'Excel Add-In', 'AI Genie', 'PowerPoint visualization templates',
    'Text-to-Visual', 'Super App', 'not a claim that every variation shipped']) {
    await expect(page.locator('#supporting-work')).toContainText(phrase);
  }
  await page.goto('/analytics-plus.html#supporting-work');
  await expect(page.locator('#supporting-work')).toHaveAttribute('open', '');
  await expect(page.locator('#supporting-work')).toBeInViewport();
});

test('focused scenarios and optional supporting work remain usable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  try {
    const page = await context.newPage();
    for (const path of ['/powertable.html', '/analytics.html']) {
      await page.goto(baseURL + path);
      await expect(page.locator('.case-focus')).toBeVisible();
      await expect(page.locator('.focus-steps h3')).toHaveCount(3);
      await expect(page.locator('.focus-explanation')).toContainText('Key design decision');
    }
    await page.goto(baseURL + '/analytics-plus.html');
    await page.locator('#supporting-work > summary').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#supporting-work dd').filter({ hasText: 'PowerPoint' })).toBeVisible();
    await page.getByRole('link', { name: 'Recommended first read: Chart Wizard' }).click();
    await expect(page).toHaveURL(baseURL + '/analytics.html');
  } finally {
    await context.close();
  }
});
