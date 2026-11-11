import { test, expect } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

test('one audio element continues through every case family with matching controls and no reload', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'Soundroom Mode', exact: true }).click();
  await expect.poll(() => page.locator('audio').evaluate(audio => !audio.paused && audio.currentTime > 0)).toBe(true);
  await page.evaluate(() => {
    window.originalDocument = document;
    window.originalAudio = document.querySelector('audio');
    window.navigationPauses = 0;
    window.originalAudio.addEventListener('pause', () => window.navigationPauses++);
  });
  await page.getByRole('slider', { name: 'Volume', exact: true }).fill('27');
  async function follow(href, name) {
    await page.locator(`a[href="${href}"]:visible`).first().click();
    await expect(page.locator('body')).toHaveAttribute('data-page', name);
    await expect(page.getByRole('button', { name: 'Pause ambience', exact: true })).toBeVisible();
    await expect(page.locator('.soundroom-volume output')).toHaveText('27%');
    await expect(page.locator('[data-soundroom]')).toHaveCount(1);
    await expect(page.locator('audio')).toHaveCount(1);
    await expect(page.locator('.site-header,.skip-link')).toHaveCount(2);
    await expect(page.locator('main')).toHaveCount(1);
    expect(await page.evaluate(() => document === window.originalDocument &&
      document.querySelector('audio') === window.originalAudio && !window.originalAudio.paused && window.navigationPauses === 0)).toBe(true);
    expect(await page.locator('.portfolio-cursor').count()).toBe(1);
    expect(await page.locator('.back-to-top').count()).toBe(1);
  }
  await follow('/powertable.html', 'powertable');
  await follow('/column-mapping.html', 'column-mapping');
  await follow('/gantt-baselines.html', 'gantt-baselines');
  await follow('/gantt-backlog.html', 'gantt-backlog');
  await follow('/gantt-configuration.html', 'gantt-configuration');
  await follow('/', 'index');
  await follow('/powertable.html', 'powertable');
  await follow('/gantt-conditional-formatting.html', 'gantt-conditional-formatting');
  await follow('/resource-configuration.html', 'resource-configuration');
  await follow('/', 'index');
  await follow('/powertable.html', 'powertable');
  await follow('/crosstab.html', 'crosstab');
  await follow('/about.html', 'about');
  await follow('/', 'index');
  await follow('/analytics-plus.html', 'analytics-plus');
  await follow('/storyboard.html', 'storyboard');
  await follow('/gantt.html', 'gantt');
  await follow('/analytics.html', 'analytics');
  await follow('/presentation.html', 'presentation');
  await follow('/kpi.html', 'kpi');
  await page.getByRole('button', { name: 'Focus Mode', exact: true }).click();
  expect(await page.locator('audio').evaluate(audio => audio.paused)).toBe(true);
  expect(errors).toEqual([]);
});

test('back and forward preserve the song, expanded evidence, and reading position', async ({ page }) => {
  await page.goto('/column-mapping.html');
  await page.getByRole('button', { name: 'Soundroom Mode', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Pause ambience', exact: true })).toBeEnabled();
  await page.locator('#case-details > summary').click();
  await page.locator('#mapping-walkthrough > summary').click();
  await page.locator('#cost-mapping').scrollIntoViewIfNeeded();
  const position = await page.evaluate(() => scrollY);
  await page.evaluate(() => {
    window.originalAudio = document.querySelector('audio');
    document.querySelector('#main-nav a[href="/about.html"]').click();
  });
  await expect(page.locator('body')).toHaveAttribute('data-page', 'about');
  await expect(page.locator('#main')).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBe(0);
  await page.goBack();
  await expect(page.locator('body')).toHaveAttribute('data-page', 'column-mapping');
  await expect(page.locator('#mapping-walkthrough')).toHaveAttribute('open');
  await expect.poll(() => page.evaluate(() => scrollY)).toBeCloseTo(position, 0);
  expect(await page.locator('audio').evaluate(audio => audio === window.originalAudio && !audio.paused)).toBe(true);
  await page.goForward();
  await expect(page.locator('body')).toHaveAttribute('data-page', 'about');
  await expect(page.locator('h1')).toContainText('Product design for');
  expect(await page.locator('audio').evaluate(audio => audio === window.originalAudio && !audio.paused)).toBe(true);
});

test('page metadata, body classes, hash disclosures, and screenshot inspection update after navigation', async ({ page }) => {
  await page.goto('/powertable.html');
  await page.locator('a[href="/column-mapping.html"]:visible').first().click();
  await expect(page).toHaveTitle('Column Mapping & Configuration — Ravichandran V');
  await expect(page.locator('body')).toHaveClass(/mapping-case/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Column Mapping & Configuration/);
  await page.locator('#case-details > summary').click();
  await page.locator('#mapping-walkthrough > summary').click();
  await page.locator('a[href="#cost-mapping"]:visible').first().click();
  await expect(page.locator('#cost-mapping')).toBeInViewport();
  await page.locator('.inspect-button').first().click();
  await expect(page.locator('dialog[open]')).toBeVisible();
  await page.getByRole('button', { name: 'Close screenshot preview', exact: true }).click();
  await expect(page.locator('dialog[open]')).toHaveCount(0);
  await page.locator('#main-nav a[href="/about.html"]').click();
  await expect(page.locator('body')).toHaveClass('editorial-home editorial-about');
  await expect(page).toHaveTitle('About — Ravichandran V');
  await expect(page.locator('.inspect-button,.reading-progress')).toHaveCount(0);
});

test('rapid navigation cancels a stale destination without restarting the player', async ({ page }) => {
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  await page.route('**/about.html', async route => { await gate; await route.continue(); });
  await page.goto('/');
  await page.getByRole('button', { name: 'Soundroom Mode', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Pause ambience', exact: true })).toBeEnabled();
  await page.locator('#main-nav a[href="/about.html"]').click();
  await page.locator('a[href="/powertable.html"]:visible').first().click();
  await expect(page.locator('body')).toHaveAttribute('data-page', 'powertable');
  release();
  await expect(page.locator('#main')).not.toHaveAttribute('aria-busy');
  await expect(page).toHaveURL(/\/powertable\.html$/);
  expect(await page.locator('audio').evaluate(audio => audio.paused)).toBe(false);
});

test('case-page entry and refresh never autoplay, even when Soundroom was selected earlier', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('portfolio-listening-mode', 'soundroom'));
  const requests = [];
  page.on('request', request => { if (request.url().endsWith('.mp3')) requests.push(request.url()); });
  await page.goto('/kpi.html');
  await expect(page.getByRole('button', { name: 'Play ambience', exact: true })).toBeVisible();
  expect(await page.locator('audio').evaluate(audio => audio.paused)).toBe(true);
  await page.reload();
  await expect(page.getByRole('button', { name: 'Play ambience', exact: true })).toBeVisible();
  expect(requests).toEqual([]);
});

test('Home and Work bookmarks keep the same song and native history', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Soundroom Mode', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Pause ambience', exact: true })).toBeEnabled();
  await page.evaluate(() => { window.originalAudio = document.querySelector('audio'); });
  await page.locator('#main-nav a[href="/#work"]').click();
  await expect(page.locator('#work')).toBeInViewport();
  await page.locator('#main-nav a[href="/"]').click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('.hero-role')).toBeInViewport();
  await page.goBack();
  await expect(page).toHaveURL(/\/#work$/);
  await expect(page.locator('#work')).toBeInViewport();
  expect(await page.locator('audio').evaluate(audio => audio === window.originalAudio && !audio.paused)).toBe(true);
});
