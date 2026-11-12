import { test, expect, openWorkspaceNavigation } from './fixtures.js';
import { readFile } from 'node:fs/promises';

const features = [
  ['/column-mapping.html', '#cost-mapping'],
  ['/gantt-baselines.html', '#comparison'],
  ['/gantt-backlog.html', '#pending-changes'],
  ['/gantt-conditional-formatting.html', '#timeline'],
  ['/gantt-configuration.html', '#dependency'],
  ['/resource-configuration.html', '#label'],
  ['/storyboard.html', '#templates'],
  ['/gantt.html', '#mapping'],
  ['/analytics.html', '#visual-form'],
  ['/presentation.html', '#annotations'],
  ['/kpi.html', '#variance']
];
const analytics = [
  ['/storyboard.html', 'Storyboard'],
  ['/gantt.html', 'Gantt'],
  ['/analytics.html', 'Chart Wizard'],
  ['/presentation.html', 'Annotations'],
  ['/kpi.html', 'KPI Presets']
];

test.use({ reducedMotion: 'reduce' });

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`recruiter summaries and verified branding are concise and usable in ${appearance} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(appearance => localStorage.setItem('portfolio-appearance', appearance), appearance);
      const errors = [];
      const sceneSignatures = new Set();
      page.on('pageerror', error => errors.push(error.message));
      for (const path of ['/', '/about.html', '/powertable.html', '/analytics-plus.html', '/crosstab.html', ...features.map(([path]) => path)]) {
        await page.goto(path);
        await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
        await page.evaluate(() => document.fonts.ready);
        const identity = page.getByRole('group', { name: 'Employer and product platform' });
        await expect(identity).toBeInViewport();
        await expect(identity.locator('.identity-company')).toContainText('Designed at');
        await expect(identity.locator('.identity-platform')).toContainText('Built for');
        await expect(identity.getByAltText('Lumel Technologies', { exact: true })).toBeVisible();
        await expect(identity.getByAltText('Microsoft', { exact: true })).toBeVisible();
        for (const image of await identity.locator('img').all()) {
          expect(await image.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
          await expect(image).toHaveCSS('filter', 'none');
          const ratios = await image.evaluate(image => ({
            source: image.naturalWidth / image.naturalHeight,
            rendered: image.getBoundingClientRect().width / image.getBoundingClientRect().height
          }));
          expect(ratios.rendered).toBeCloseTo(ratios.source, 2);
          if (await image.getAttribute('alt') === 'Microsoft') expect((await image.boundingBox()).width).toBeGreaterThanOrEqual(132);
          if (await image.getAttribute('alt') === 'Lumel Technologies') expect((await image.boundingBox()).width).toBeGreaterThanOrEqual(88);
        }
        const words = await page.locator('main').evaluate(element => element.innerText.trim().split(/\s+/).length);
        const budgets = {
          '/': 240, '/about.html': 300, '/powertable.html': 300, '/analytics-plus.html': 330,
          '/gantt-backlog.html': 200, '/analytics.html': 220, '/presentation.html': 130
        };
        expect(words, path).toBeLessThanOrEqual(budgets[path] || 180);
        if (path !== '/' && path !== '/about.html') {
          const overview = ['/powertable.html', '/analytics-plus.html'].includes(path);
          const focused = ['/powertable.html', '/analytics.html'].includes(path);
          const compact = path === '/presentation.html';
          await expect(page.locator('.case-diagram')).toHaveCount(overview || focused ? 0 : 1);
          if (!overview && !focused) {
            await expect(page.locator('.case-diagram')).toBeVisible();
            await expect(page.locator('.case-diagram')).toHaveAttribute('aria-label', /.+/);
            await expect(page.locator('.decision-illustration figcaption')).toHaveText('Illustrative problem & design flow · Not a product screenshot.');
          }
          await expect(page.locator('.decision-flow > li')).toHaveCount(focused || compact ? 0 : 3);
          await expect(page.locator('.case-topic-art')).toHaveCount(focused || compact ? 0 : 3);
          if (compact) {
            await expect(page.locator('.presentation-key-points dt')).toHaveText(['Problem', 'My decision', 'Evidence']);
            await expect(page.locator('#design-screens')).toBeHidden();
          }
          if (focused) {
            await expect(page.locator('.case-focus')).toBeVisible();
            await expect(page.locator('.focus-illustration')).toHaveCount(1);
            await expect(page.locator('.focus-steps > li')).toHaveCount(3);
            await expect(page.locator('.focus-explanation dt')).toHaveText(['My ownership', 'Key design decision', 'Delivery & evidence']);
            await expect(page.locator('.focus-illustration figcaption')).toContainText('Not product UI or an observed session');
          }
          for (const illustration of await page.locator('.case-topic-art').all()) {
            await expect(illustration).toBeHidden();
            const signature = await illustration.locator('.case-topic-scene').evaluate(scene => scene.innerHTML);
            expect(sceneSignatures.has(signature), `Repeated illustration on ${path}`).toBe(false);
            sceneSignatures.add(signature);
          }
          if (!focused && !compact) await expect(page.locator('.story-art-note')).toContainText('Not research participants or measured outcomes');
          if (!overview && !focused && !compact) {
            await expect(page.locator('.case-key-facts dt')).toHaveText(['Problem', 'My decision', 'Evidence']);
            for (const point of await page.locator('.case-key-facts dd > p').all()) {
              expect((await point.innerText()).trim().split(/\s+/).length).toBeLessThanOrEqual(22);
            }
            await expect(page.locator('.case-scenario')).toBeHidden();
            await expect(page.locator('.scenario-visual')).toBeHidden();
            expect(await page.locator('.scenario-visual').getAttribute('data-use-case')).toBeTruthy();
            await expect(page.locator('.case-choice tbody tr')).toHaveCount(2);
          }
          await expect(page.locator('.case-context')).not.toHaveAttribute('open');
          await expect(page.locator('.case-ownership')).toBeVisible();
          const hero = await page.locator('.case-hero').boundingBox();
          expect(hero.height, path).toBeLessThan(width < 700 ? 510 : 420);
          const outsideLabels = await page.locator('.case-diagram').evaluateAll(svgs =>
            svgs.flatMap(svg => [...svg.querySelectorAll('text')].filter(text => {
              const box = text.getBBox();
              return box.x < 0 || box.x + box.width > svg.viewBox.baseVal.width;
            }).map(text => text.textContent)));
          expect(outsideLabels, path).toEqual([]);
          for (const image of await page.locator('main > .mapping-lead img, main > .case-evidence img, main > .mapping-evidence img').all()) {
            if (!await image.isVisible()) continue;
            await expect(image).toHaveJSProperty('complete', true);
            const size = await image.evaluate(image => {
              const rect = image.getBoundingClientRect();
              const style = getComputedStyle(image);
              const width = rect.width - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth) - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
              const height = rect.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
              return { sourceRatio: image.naturalWidth / image.naturalHeight, renderedRatio: width / height, height: rect.height };
            });
            expect(size.renderedRatio, path).toBeCloseTo(size.sourceRatio, 2);
            expect(size.height, path).toBeLessThanOrEqual(420);
          }
        }
        if (features.some(([feature]) => feature === path)) {
          expect(words, path).toBeLessThanOrEqual(budgets[path] || 180);
          await expect(page.locator('#case-details')).not.toHaveAttribute('open');
          const compact = path === '/presentation.html';
          await expect(page.locator('.decision-flow > li')).toHaveCount(path === '/analytics.html' || compact ? 0 : 3);
          if (path !== '/analytics.html' && !compact) await expect(page.locator('.decision-flow .small-index')).toHaveText(['01 / Challenge', '02 / Design', '03 / Evidence']);
          if (compact) await expect(page.locator('.presentation-summary .case-diagram')).toBeVisible();
          else await expect(page.locator('main > .mapping-lead img, main > .case-evidence img, main > .mapping-evidence img').first()).toBeVisible();
          for (const item of await page.locator('.case-key-facts > div').all()) {
            const box = await item.boundingBox();
            expect(box.x).toBeGreaterThanOrEqual(0);
            expect(box.x + box.width).toBeLessThanOrEqual(width);
          }
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path).toBe(true);
      }
      expect(errors).toEqual([]);
      expect(sceneSignatures.size).toBe(33);
    });

  }
}

test('role context and original screen notes remain native keyboard disclosures', async ({ page }) => {
  for (const path of ['/powertable.html', '/analytics-plus.html', '/crosstab.html', ...features.map(([path]) => path)]) {
    await page.goto(path);
    for (const disclosure of await page.locator('.case-context, .interface-notes').all()) {
      await expect(disclosure).not.toHaveAttribute('open');
      const summary = disclosure.locator(':scope > summary');
      await summary.focus();
      await page.keyboard.press('Enter');
      await expect(disclosure).toHaveAttribute('open');
      expect(await disclosure.evaluate(element => element.innerText.length)).toBeGreaterThan(50);
      await summary.focus();
      await page.keyboard.press('Enter');
      await expect(disclosure).not.toHaveAttribute('open');
    }
  }
});

test('all detailed evidence remains keyboard-accessible and bookmarked sections open their parent disclosures', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  for (const [path, hash] of features) {
    await page.goto(path);
    const summary = page.locator('#case-details > summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#case-details')).toHaveAttribute('open');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#case-details')).not.toHaveAttribute('open');
    await page.goto(path + hash);
    await expect(page.locator('#case-details')).toHaveAttribute('open');
    await expect(page.locator(hash)).toBeInViewport();
    await page.reload();
    await expect(page.locator(hash)).toBeInViewport();
  }
  await page.goto('/about.html#experience');
  await expect(page.locator('#experience-details')).toHaveAttribute('open');
  await expect(page.locator('#experience')).toBeInViewport();
});

test('Analytics+ feature tabs provide consistent keyboard navigation and a direct return to the product', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/storyboard.html');
  for (const [path, label] of analytics) {
    await openWorkspaceNavigation(page);
    const tabs = page.getByRole('navigation', { name: 'Analytics+ features', exact: true });
    await tabs.getByRole('link', { name: label, exact: true }).focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new RegExp(path.replace('.', '\\.') + '$'));
    await openWorkspaceNavigation(page);
    await expect(tabs.locator('[aria-current="page"]')).toHaveText(label);
    for (const link of await tabs.getByRole('link').all()) {
      expect((await link.boundingBox()).height).toBeGreaterThanOrEqual(44);
    }
    await expect(page.locator('.back-link')).toHaveAttribute('href', '/analytics-plus.html#features');
  }
  await page.locator('.back-link').click();
  await expect(page.locator('#features')).toBeInViewport();
});

test('recruiter summaries, branding, evidence disclosures and feature navigation work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 900 } });
  try {
    const page = await context.newPage();
    for (const [path] of features) {
      await page.goto(baseURL + path);
      await expect(page.locator('.case-snapshot')).toBeVisible();
      await expect(page.locator('.case-topic-art')).toHaveCount(['/analytics.html', '/presentation.html'].includes(path) ? 0 : 3);
      if (path === '/analytics.html') await expect(page.locator('.focus-task')).toBeVisible();
      else if (path === '/presentation.html') await expect(page.locator('.presentation-key-points')).toBeVisible();
      else {
        await expect(page.locator('.case-key-facts')).toBeVisible();
        await expect(page.locator('.case-scenario')).toBeHidden();
      }
      await page.locator('.case-context > summary').focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('.case-context .metadata')).toBeVisible();
      await page.locator('#case-details > summary').focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('#case-details .case-nav')).toBeVisible();
      await expect(page.getByAltText('Lumel Technologies', { exact: true })).toBeVisible();
    }
    await page.goto(baseURL + '/storyboard.html');
    await openWorkspaceNavigation(page);
    await page.getByRole('navigation', { name: 'Analytics+ features' }).getByRole('link', { name: 'KPI Presets', exact: true }).click();
    await expect(page).toHaveURL(baseURL + '/kpi.html');
  } finally {
    await context.close();
  }
});

test('company logos are served unchanged from their allowlisted local assets', async ({ request }) => {
  for (const name of ['lumel-logo.svg', 'microsoft-logo.png']) {
    const response = await request.get('/assets/' + name);
    expect(response.status()).toBe(200);
    expect((await response.body()).equals(await readFile(new URL('../assets/' + name, import.meta.url)))).toBe(true);
  }
});
