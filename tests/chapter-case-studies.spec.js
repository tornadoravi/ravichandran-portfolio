import { test, expect } from './fixtures.js';

const routes = [
  'powertable', 'column-mapping', 'gantt-baselines', 'gantt-backlog', 'gantt-configuration',
  'gantt-conditional-formatting', 'resource-configuration', 'crosstab', 'analytics-plus',
  'analytics', 'storyboard', 'gantt', 'presentation', 'kpi'
];
const chapterIds = ['case-overview', 'case-problem', 'case-approach', 'case-flow', 'case-screens', 'case-delivery'];
const productRoutes = ['powertable', 'analytics-plus'];
const productChapterIds = ['case-overview', 'case-approach', 'case-delivery'];

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`all case studies use simple chapters in ${appearance} at ${width}px`, async ({ page }) => {
      test.setTimeout(60000);
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      for (const route of routes) {
        await page.goto(`/${route}.html`);
        await expect(page.locator('.case-presentation-layout')).toHaveCount(1);
        const product = productRoutes.includes(route);
        expect(await page.locator('.case-chapter').evaluateAll(nodes => nodes.map(node => node.id))).toEqual(product ? productChapterIds : chapterIds);
        await expect(page.locator('.case-chapter-label')).toHaveCount(product ? 3 : 6);
        for (const [index, label] of (await page.locator('.case-chapter-label').all()).entries()) {
          await expect(label).toContainText(`Chapter ${String(index + 1).padStart(2, '0')}`);
        }
        await expect(page.locator('#full-case-evidence')).not.toHaveAttribute('open');
        await expect(page.locator('#full-case-evidence > summary')).toHaveAccessibleName('Explore full evidence and sources');
        await expect(page.locator('.case-evidence-topics > span')).toHaveCount(product ? 0 : 3);
        await expect(page.locator('#full-case-evidence .case-story-nav')).toBeHidden();
        await expect(page.getByRole('heading', { name: 'Thanks for reading!', exact: true })).toBeVisible();
        await expect(page.getByRole('navigation', { name: 'Continue exploring case studies' })).toBeVisible();
        await expect(page.getByRole('group', { name: 'Delivery and contribution summary' })).toBeVisible();
        await expect(page.locator('.case-outcome-highlights > div')).toHaveCount(3);
        if (await page.locator('.workspace-navigation').count()) {
          await expect(page.locator('.workspace-feature-tabs')).toBeHidden();
          await expect(page.locator('.workspace-navigation summary')).toHaveText('Related features and workspaces');
        }
        const layout = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth,
          words: document.querySelector('main').innerText.trim().split(/\s+/).length
        }));
        expect(layout.overflow, route).toBe(false);
        expect(layout.words, route).toBeLessThan(product ? 1200 : 1000);
        expect(await page.locator('.case-fast-read').innerText().then(text => text.split(/\s+/).length), route).toBeLessThan(100);
        await expect(page.locator('.case-fast-read .case-my-work dt')).toHaveText('My work');
        await expect(page.locator('.case-fast-read .case-my-work dd')).not.toBeEmpty();
        await expect(page.locator('.case-film-panel:visible')).toHaveCount(0);
      }
      expect(errors).toEqual([]);
    });
  }
}

test('original rationale is visible without opening evidence and keeps a single bookmark', async ({ page, browser, baseURL }) => {
  for (const [route, id, text] of [
    ['analytics', 'decisions', 'More flexibility introduces an entry choice'],
    ['column-mapping', 'decisions', 'Clearer relationships cost extra label space'],
    ['gantt-baselines', 'decisions', 'Separate the choice from the administration'],
    ['gantt-backlog', 'decisions', 'Support the work before it reaches the schedule'],
    ['gantt-configuration', 'decisions', 'Separate scheduling behavior from appearance'],
    ['gantt-conditional-formatting', 'decisions', 'not measured usability findings'],
    ['resource-configuration', 'decisions', 'Separate what changes, retain the context'],
    ['kpi', 'solutions', 'Simple presets establish the value and label'],
    ['storyboard', 'solutions', 'Solution highlight'],
    ['gantt', 'solutions', 'Solution highlight'],
    ['presentation', 'solutions', 'Solution highlight']
  ]) {
    await page.goto(`/${route}.html`);
    await expect(page.locator(`#${id}`)).toHaveCount(1);
    await expect(page.locator(`#case-approach #${id}`)).toBeVisible();
    await expect(page.locator('#case-approach')).toContainText(text);
    await expect(page.locator('#full-case-evidence')).not.toHaveAttribute('open');
  }
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const offlinePage = await context.newPage();
    await offlinePage.goto(`${baseURL}/analytics.html#decisions`);
    await expect(offlinePage.locator('#decisions')).toBeInViewport();
    await expect(offlinePage.locator('#decisions .decision-ledger > li')).toHaveCount(3);
    await expect(offlinePage.locator('#full-case-evidence')).not.toHaveAttribute('open');
  } finally {
    await context.close();
  }
});

test('delivery surfaces documented internal checks without implying customer impact', async ({ page }) => {
  await page.goto('/analytics.html#case-delivery');
  const review = page.getByRole('region', { name: 'Documented implementation review' });
  await expect(review).toBeVisible();
  await expect(review).toContainText('PM, developer, and stakeholder walkthroughs');
  await expect(review).toContainText('customer-impact measurements are not included');
  await expect(page.locator('#full-case-evidence')).not.toHaveAttribute('open');
});

for (const route of routes) {
  test(`walkthrough preserves original screens and captions on ${route}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`/${route}.html`);
    const sources = await page.locator('#full-case-evidence a.product-screenshot img').evaluateAll(images => images.map(image => image.getAttribute('src')));
    const tabs = page.getByRole('tablist', { name: 'Original design screens' }).getByRole('tab');
    if (productRoutes.includes(route)) {
      await expect(tabs).toHaveCount(0);
      expect(sources.length).toBeGreaterThan(0);
      await expect(page.locator('.case-hero-preview img')).toBeVisible();
      await expect(page.locator('.case-product-feature')).toHaveCount(route === 'powertable' ? 7 : 5);
      return;
    }
    if (route === 'crosstab') {
      await expect(tabs).toHaveCount(0);
      await expect(page.locator('#case-screens .case-concept-evidence')).toContainText('Dedicated design screens were not supplied');
      return;
    }
    const count = await tabs.count();
    expect(count).toBeGreaterThan(0);
    for (let index = 0; index < count; index++) {
      await tabs.nth(index).click();
      await expect(tabs.nth(index)).toHaveAttribute('aria-selected', 'true');
      const panel = page.getByRole('tabpanel');
      await expect(panel).toHaveCount(1);
      const image = panel.locator('img');
      await image.evaluate(element => element.decode());
      expect(sources).toContain(await image.getAttribute('src'));
      const size = await image.evaluate(element => ({
        width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height,
        nativeWidth: element.naturalWidth, nativeHeight: element.naturalHeight
      }));
      expect(size.width).toBeLessThanOrEqual(size.nativeWidth);
      expect(size.width / size.height).toBeCloseTo(size.nativeWidth / size.nativeHeight, 2);
      await expect(image).toHaveCSS('filter', 'none');
      await expect(image).toHaveCSS('transform', 'none');
      await expect(panel.locator('figcaption')).not.toBeEmpty();
      await expect(panel.locator('a.product-screenshot')).toHaveAttribute('href', await image.getAttribute('src'));
    }
  });
}

test('screen tabs support arrow keys and original-size inspection', async ({ page }) => {
  await page.goto('/column-mapping.html#case-screens');
  const tabs = page.getByRole('tablist', { name: 'Original design screens' }).getByRole('tab');
  await tabs.first().focus();
  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('End');
  await expect(tabs.last()).toBeFocused();
  await page.keyboard.press('Home');
  await expect(tabs.first()).toBeFocused();
  await page.getByRole('tabpanel').getByRole('button', { name: 'Inspect screenshot' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('the evidence preview uses original sources and its whole card opens the details', async ({ page }) => {
  await page.goto('/analytics-plus.html');
  const disclosure = page.locator('#full-case-evidence');
  const preview = disclosure.locator(':scope > summary');
  const originals = await disclosure.locator('.case-story-content a.product-screenshot img').evaluateAll(images => images.map(image => image.getAttribute('src')));
  const images = preview.locator('img');
  await expect(images).toHaveCount(2);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(element => element.decode());
    expect(originals).toContain(await image.getAttribute('src'));
    await expect(image).toHaveCSS('object-fit', 'contain');
    await expect(image).toHaveCSS('filter', 'none');
  }
  await expect(preview.locator('.case-evidence-caption').first()).toHaveText('Original design screen');
  await expect(preview.locator('.case-evidence-caption').last()).toHaveText('Official product context');
  await preview.focus();
  await preview.press('Enter');
  await expect(disclosure).toHaveAttribute('open', '');
  await expect(preview.locator('.evidence-open-label')).toBeVisible();
  await expect(disclosure.locator('.case-story-content')).toBeVisible();
  await expect(disclosure.locator('.case-story-content')).toContainText('Original Chart Wizard design');
  await expect(disclosure.locator('.case-story-content')).toContainText('Official template preview · Lumel Inc.');
  await preview.press('Space');
  await expect(disclosure).not.toHaveAttribute('open');
});

test('product openings use attributed official canvases rather than feature dialogs', async ({ page }) => {
  for (const [route, source] of [
    ['analytics-plus', '/assets/analytics-plus-official-dashboard.webp'],
    ['powertable', '/assets/powertable-official-gantt.webp']
  ]) {
    await page.goto(`/${route}.html`);
    const hero = page.locator('.case-hero-preview');
    await expect(hero.locator('img')).toHaveAttribute('src', source);
    await expect(hero.locator('img')).toHaveAttribute('loading', 'eager');
    await expect(hero.locator('figcaption')).toContainText('Official');
    await expect(hero.locator('figcaption a').first()).toHaveAttribute('href', /^https:/);
    await expect(hero.locator('a.product-screenshot')).toHaveAttribute('href', source);
  }
  await page.goto('/analytics.html');
  await expect(page.locator('.case-hero-preview img')).toHaveAttribute('src', '/assets/wizard-chart-family.png');
});

for (const route of ['powertable', 'column-mapping', 'analytics-plus', 'analytics', 'crosstab']) {
  test(`chapters, evidence and end links work without JavaScript on ${route}`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
    try {
      const page = await context.newPage();
      await page.goto(`${baseURL}/${route}.html`);
      const product = productRoutes.includes(route);
      await page.getByRole('navigation', { name: 'Case study chapters' }).getByRole('link', { name: product ? /Find my feature work/ : /Interface walkthrough/ }).click();
      await expect(page).toHaveURL(product ? /#case-approach$/ : /#case-screens$/);
      await expect(page.locator(product ? '#case-approach' : '#case-screens')).toBeInViewport();
      await expect(page.locator('.case-demo-tabs')).toBeHidden();
      await expect(page.locator('.case-film-controls')).toBeHidden();
      await page.getByText('Explore the illustrated workflow', { exact: true }).click();
      await expect(page.locator('.case-film-panel:visible')).toHaveCount(3);
      for (const summary of await page.locator('.case-screen-more > summary').all()) await summary.click();
      for (const panel of await page.locator('.case-demo-panel').all()) await expect(panel).toBeVisible();
      await page.locator('#full-case-evidence > summary').click();
      await expect(page.locator('#full-case-evidence .case-story-nav')).toBeVisible();
      const back = await page.locator('.case-endcap-back').getAttribute('href');
      await page.locator('.case-endcap-back').click();
      await expect(page).toHaveURL(`${baseURL}${back}`);
    } finally {
      await context.close();
    }
  });
}

test('original bookmarks still open the full evidence and keep the case source', async ({ page }) => {
  await page.goto('/column-mapping.html#task-mapping');
  await expect(page.locator('#full-case-evidence')).toHaveAttribute('open', '');
  await expect(page.locator('#case-details')).toHaveAttribute('open', '');
  await expect(page.locator('#mapping-walkthrough')).toHaveAttribute('open', '');
  await expect(page.locator('#task-mapping')).toBeInViewport();
  await expect(page.locator('#task-mapping img')).toHaveAttribute('src', '/assets/fabric-mapping-task.png');
  await page.goto('/powertable.html#contribution-evidence');
  await expect(page.getByRole('heading', { name: 'What is PowerTable?' }).last()).toBeVisible();
  await expect(page.locator('#contribution-evidence img')).toHaveCount(0);
});

test('thanks and next-case links form a real sequence through all cases', async ({ page, baseURL }) => {
  for (let index = 0; index < routes.length; index++) {
    await page.goto(`/${routes[index]}.html`);
    await expect(page.locator('.case-endcap-badge')).toContainText('End of case study');
    await expect(page.locator('.case-endcap-back')).toHaveAttribute('href', productRoutes.includes(routes[index]) ? '/#work' : /^\/(powertable|analytics-plus)\.html#product-/);
    const next = routes[index] === 'powertable' ? '/analytics-plus.html'
      : routes[index] === 'analytics-plus' ? '/cod-shield.html'
        : `/${routes[(index + 1) % routes.length]}.html`;
    await expect(page.locator('.case-endcap-next')).toHaveAttribute('href', next);
    await page.locator('.case-endcap-next').click();
    await expect(page).toHaveURL(baseURL + next);
  }
});

test('chapter motion is finite and respects live reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/column-mapping.html#case-flow');
  await expect(page.locator('#case-flow')).toHaveClass(/is-in-view/);
  const cue = page.locator('#case-flow .case-chapter-heading');
  await expect(cue).toHaveCSS('animation-name', 'case-chapter-arrive');
  await expect(cue).toHaveCSS('animation-iteration-count', '1');
  await expect.poll(() => cue.evaluate(element => element.getAnimations().every(animation => animation.playState === 'finished'))).toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(cue).toHaveCSS('animation-name', 'none');
  await expect(page.locator('#case-flow .case-film-play')).toBeHidden();
});

test('product feature previews explain the feature and contribution without requiring another page', async ({ page }) => {
  for (const [route, count] of [['powertable', 7], ['analytics-plus', 5]]) {
    await page.goto(`/${route}.html`);
    const cards = page.locator('#case-approach .case-product-feature');
    await expect(cards).toHaveCount(count);
    for (const card of await cards.all()) {
      const summary = card.locator(':scope > summary');
      await expect(summary).toBeVisible();
      await expect(summary.locator('strong')).not.toBeEmpty();
      await expect(summary.locator('small')).toContainText('My work:');
      await expect(summary.locator('.feature-case-action')).toContainText('Explore on this page');
      await expect(card).not.toHaveAttribute('open');
      await expect(summary.locator('.feature-card-illustration figcaption')).toHaveText(
        await card.getAttribute('data-feature') === 'crosstab' ? 'Contribution structure diagram' : 'Original design screen');
    }
  }
});

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`original feature previews stay within their cards in ${appearance} at ${width}px`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      for (const [route, ids] of [
        ['powertable', ['mapping', 'baselines', 'backlog', 'ganttPanel', 'resourcePanel', 'formatting', 'crosstab']],
        ['analytics-plus', ['wizard', 'kpi', 'storyboard', 'gantt', 'presentation']]
      ]) {
        await page.goto(`/${route}.html`);
        await page.evaluate(() => document.fonts.ready);
        const cards = page.locator('.case-product-feature');
        expect(await cards.evaluateAll(nodes => nodes.map(node => node.dataset.feature))).toEqual(ids);
        for (const card of await cards.all()) {
          expect(await card.evaluate(element => {
            const card = element.getBoundingClientRect();
            const illustration = element.querySelector('.feature-card-illustration');
            const frame = illustration.getBoundingClientRect();
            const artwork = illustration.querySelector('img, svg');
            const art = artwork.getBoundingClientRect();
            const heading = element.querySelector('strong').getBoundingClientRect();
            return frame.left >= card.left && frame.right <= card.right && frame.bottom <= heading.top &&
              art.width > 0 && art.height > 0 && art.left >= frame.left && art.right <= frame.right &&
              illustration.getAnimations({ subtree: true }).length === 0 &&
              (artwork.tagName !== 'IMG' || getComputedStyle(artwork).objectFit === 'scale-down');
          })).toBe(true);
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    });
  }
}

test('a reader can follow product to area to feature and return to the same area', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Read PowerTable case study', exact: true }).click();
  await expect(page.locator('#case-overview')).toContainText('PowerTable is a Lumel product inside Microsoft Fabric');
  await expect(page.locator('.product-work-area')).toHaveCount(3);
  const mapping = page.locator('#product-tasks [data-feature="mapping"]');
  await mapping.locator('summary').click();
  await expect(mapping).toHaveAttribute('open', '');
  await expect(page).toHaveURL(/powertable\.html$/);
  await mapping.getByRole('link', { name: 'Full feature evidence' }).click();
  await expect(page.getByRole('navigation', { name: 'Product to feature' })).toHaveText(/PowerTable.*Gantt.*Column Mapping/);
  await expect(page.locator('.case-my-work')).toContainText('End-to-end Gantt and resource mapping');
  await page.locator('.case-endcap-back').click();
  await expect(page).toHaveURL(/powertable\.html#product-tasks$/);
  await expect(page.locator('#product-tasks')).toBeInViewport();
});

test('solution walkthrough uses readable timing, pauses, and supports keyboard step selection', async ({ page }) => {
  await page.clock.install();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/column-mapping.html#case-flow');
  await page.getByText('Explore the illustrated workflow', { exact: true }).click();
  const film = page.getByRole('group', { name: 'Step-by-step solution illustration', exact: true });
  await expect(film.locator('.case-film-status')).toContainText('Step 1 of 3');
  await film.getByRole('button', { name: 'Play concept' }).click();
  await expect(film.getByRole('button', { name: 'Pause concept' })).toBeVisible();
  await page.clock.runFor(3200);
  await expect(film.locator('.case-film-status')).toContainText('Step 1 of 3 / Playing');
  const duration = await film.locator('.case-film-panel:visible .case-film-timeline span').evaluate(element => parseFloat(getComputedStyle(element).animationDuration) * 1000);
  expect(duration).toBeGreaterThanOrEqual(6000);
  await page.clock.runFor(duration);
  await expect(film.locator('.case-film-status')).toContainText('Step 2 of 3 / Playing');
  await film.getByRole('button', { name: 'Pause concept' }).click();
  await expect(film.locator('.case-film-status')).toContainText('Step 2 of 3 / Choose');
  await film.getByRole('button', { name: 'Map resources', exact: true }).focus();
  await page.keyboard.press('Home');
  await expect(film.getByRole('button', { name: 'Define task roles', exact: true })).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(film.getByRole('button', { name: 'Connect time', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.mouse.click(1, 1);
  await film.getByRole('button', { name: 'Play concept' }).click();
  await expect(film.locator('.case-film-status')).toContainText('Step 1 of 3 / Playing');
  for (let index = 0; index < 3; index++) {
    const currentDuration = await film.locator('.case-film-panel:visible .case-film-timeline span').evaluate(element => parseFloat(getComputedStyle(element).animationDuration) * 1000);
    await page.clock.runFor(currentDuration + 1);
    await expect(film.locator('.case-film-status')).toContainText(index < 2 ? `Step ${index + 2} of 3 / Playing` : 'Step 3 of 3 / Choose');
  }
  await expect(film.locator('.case-film-status')).toContainText('Step 3 of 3 / Choose');
  await expect(film.locator('.case-film-panel:visible')).toHaveCount(1);
  await expect(film.locator('.case-film-panel:visible')).toContainText('Resource and Cost have focused tabs');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(film.getByRole('button', { name: 'Play concept' })).toBeHidden();
  await film.getByRole('button', { name: 'Define task roles', exact: true }).click();
  await expect(film.locator('.case-film-panel:visible')).toContainText('Choose the source fields');
});

test('concept playback stops when motion preferences change and resets after navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/analytics.html#case-flow');
  await page.getByText('Explore the illustrated workflow', { exact: true }).click();
  await page.getByRole('button', { name: 'Play concept' }).click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.case-film')).not.toHaveClass(/is-playing/);
  await expect(page.locator('.case-film-status')).toContainText('Step 1 of 3 / Choose');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.getByRole('button', { name: 'Play concept' }).click();
  await page.locator('.case-endcap-next').click();
  await expect(page).toHaveURL(/storyboard\.html$/);
  await expect(page.locator('.case-film')).not.toHaveClass(/is-playing/);
  await expect(page.locator('.case-film-status')).toContainText('Step 1 of 3 / Choose');
});

test('outcome cards distinguish confirmed shipping, exploration, and contribution', async ({ page }) => {
  for (const [route, status] of [
    ['analytics', 'Confirmed delivery'], ['kpi', 'Confirmed delivery'], ['analytics-plus', 'Confirmed delivery'],
    ['gantt-baselines', 'Exploration'], ['crosstab', 'Contribution'], ['powertable', 'Design contribution']
  ]) {
    await page.goto(`/${route}.html`);
    await expect(page.locator('.case-outcome-status')).toHaveText(status);
    await expect(page.locator('.case-outcome')).not.toContainText(/3,?000|BPM Partners|Dresner|customers worldwide/);
  }
  await expect(page.locator('.case-outcome')).toContainText('resource earned-value remain explorations');
});

for (const [width, appearance] of [[320, 'light'], [1440, 'dark']]) {
  test(`all sixteen cases explain illustrated solution steps at ${width}px in ${appearance}`, async ({ page }) => {
    test.setTimeout(90000);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
    for (const route of [...routes, 'cod-shield', 'analytics-spatial']) {
      await page.goto(`/${route}.html`);
      const summary = page.locator('.case-solution');
      await expect(summary).toHaveCount(1);
      await expect(summary.locator('.case-solution-idea')).not.toBeEmpty();
      await expect(summary.locator('.case-solution-example')).toContainText('Example situation');
      await expect(summary.locator('.case-solution-value')).toContainText('Designed to help');
      const illustrated = page.getByText('Explore the illustrated workflow', { exact: true });
      if (await illustrated.count()) await illustrated.click();
      const film = page.getByRole('group', { name: 'Step-by-step solution illustration', exact: true });
      expect(await film.evaluate(element => element.closest('#full-case-evidence') === null), route).toBe(true);
      const buttons = film.locator('.case-film-controls > button:not(.case-film-play)');
      await expect(buttons).toHaveCount(3);
      for (let index = 0; index < 3; index++) {
        await buttons.nth(index).click();
        await expect(buttons.nth(index)).toHaveAttribute('aria-pressed', 'true');
        const panel = film.locator('.case-film-panel:visible');
        await expect(panel).toHaveCount(1);
        await expect(panel.locator('svg')).toHaveAttribute('data-solution-step', String(index + 1));
        await expect(panel.locator('dt')).toHaveText(['What the user does', 'What the design makes clear', 'Why this step matters']);
        for (const explanation of await panel.locator('dd').all()) await expect(explanation).not.toBeEmpty();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} step ${index + 1}`).toBe(true);
      }
      await expect(film.locator('.case-film-scope')).toContainText('Evidence & scope');
      await expect(film.locator('.case-film-scope')).not.toBeEmpty();
    }
  });
}
