import { test, expect } from './fixtures.js';
import { caseHighlights } from '../src/case-narratives.js';
import { bikecareScreens } from '../src/bikecare-story.js';
import { codScreens } from '../src/cod-shield-story.js';
import { caseFeatureEvidence } from '../src/case-feature-evidence.js';
import { explainCaseScreen } from '../src/case-screen-context.js';

const cases = [
  ['powertable', 'powertable'], ['mapping', 'column-mapping'], ['baselines', 'gantt-baselines'],
  ['backlog', 'gantt-backlog'], ['ganttPanel', 'gantt-configuration'],
  ['formatting', 'gantt-conditional-formatting'], ['resourcePanel', 'resource-configuration'],
  ['crosstab', 'crosstab'], ['analyticsSuite', 'analytics-plus'], ['wizard', 'analytics'],
  ['storyboard', 'storyboard'], ['gantt', 'gantt'], ['presentation', 'presentation'], ['kpi', 'kpi'],
  ['spatial', 'analytics-spatial'], ['codShield', 'cod-shield'], ['bikecare', 'bikecare']
];
const products = ['powertable', 'analyticsSuite'];

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`minimal cases have no reading panels in ${appearance} at ${width}px`, async ({ page }) => {
      test.setTimeout(90000);
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      for (const [id, route] of cases) {
        await page.goto(`/${route}.html`);
        await expect(page.getByRole('button', { name: 'Walkthrough', exact: true }).first()).toBeEnabled();
        await expect(page.locator('main details,.walkthrough-guide-bubble,.case-chapter-nav,.case-chapter')).toHaveCount(0);
        const brief = page.locator('.case-fast-read .case-story-brief');
        await expect(brief.locator('dt')).toHaveText(['The problem', 'My role', 'The decision', 'The evidence']);
        await expect(brief.locator('dd')).toHaveText(['problem', 'role', 'decision', 'evidence'].map(key => caseHighlights[id][key]));
        for (const copy of await brief.locator('dd').all()) {
          expect((await copy.innerText()).trim().split(/\s+/).length, route).toBeLessThanOrEqual(14);
        }
        const entry = page.locator('.case-watch-entry');
        expect((await entry.boundingBox()).height, route).toBeLessThanOrEqual(105);
        await expect(entry).not.toContainText("I'll walk you");
        await expect(entry.locator('.walkthrough-guide')).toHaveCount(0);
        if (id !== 'crosstab') {
          const hero = page.locator('.case-hero-preview figure');
          await expect(hero.locator('.case-screen-explanation')).toBeVisible();
          await expect(hero.locator('.case-screen-explanation')).toHaveText(
            explainCaseScreen(await hero.locator('img').getAttribute('src')));
        }
        const metrics = await page.locator('main').evaluate(main => ({
          words: main.innerText.trim().split(/\s+/).length,
          overflow: document.documentElement.scrollWidth > innerWidth
        }));
        expect(metrics.overflow, route).toBe(false);
        expect(metrics.words, route).toBeLessThan(products.includes(id) ? 750 : id === 'bikecare' ? 420 : 260);
        await expect(page.getByRole('navigation', { name: 'Continue exploring case studies' })).toBeVisible();
      }
      expect(errors).toEqual([]);
    });
  }
}

for (const [id, route] of cases.filter(([id]) => !products.includes(id))) {
  test(`minimal gallery retains original evidence and inspection on ${route}`, async ({ page }) => {
    test.setTimeout(60000);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`/${route}.html#case-screens`);
    const gallery = page.locator('.case-screen-walkthrough');
    if (id === 'crosstab') {
      await expect(page.locator('#case-screens .case-concept-evidence')).toContainText('Dedicated design screens were not supplied');
      await expect(gallery).toHaveCount(0);
      return;
    }
    const panels = gallery.locator('.case-demo-panel');
    await expect(panels.first()).toBeAttached();
    const images = panels.locator('img');
    const sources = await images.evaluateAll(nodes => nodes.map(node => node.getAttribute('src')));
    expect(new Set(sources).size).toBe(sources.length);
    if (id === 'bikecare') expect(sources).toEqual(bikecareScreens.map(screen => screen.src));
    if (id === 'codShield') expect(sources).toEqual(codScreens.map(screen => screen.src));
    const picker = gallery.getByRole('combobox');
    const tabs = gallery.getByRole('tab');
    for (let index = 0; index < sources.length; index++) {
      if (await picker.count()) await picker.selectOption(String(index));
      else await tabs.nth(index).click();
      const panel = gallery.locator('.case-demo-panel:visible');
      await expect(panel).toHaveCount(1);
      const image = panel.locator('img');
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(node => node.decode());
      await expect(image).toHaveAttribute('src', sources[index]);
      const size = await image.evaluate(node => {
        const rect = node.getBoundingClientRect();
        return { w: rect.width, h: rect.height, nw: node.naturalWidth, nh: node.naturalHeight };
      });
      expect(size.w).toBeGreaterThan(0);
      expect(size.w).toBeLessThanOrEqual(size.nw);
      expect(size.h).toBeLessThanOrEqual(size.nh);
      expect(size.w / size.h).toBeCloseTo(size.nw / size.nh, 2);
      await expect(image).toHaveCSS('filter', 'none');
      await expect(image).toHaveCSS('transform', 'none');
      await expect(panel.locator('figcaption')).not.toBeEmpty();
      const description = explainCaseScreen(sources[index]);
      await expect(panel.locator('figcaption .case-screen-explanation')).toHaveText(description);
      expect(description.split(/\s+/).length, sources[index]).toBeLessThanOrEqual(24);
      expect([...new Intl.Segmenter('en', { granularity: 'sentence' }).segment(description)],
        sources[index]).toHaveLength(1);
      await expect(panel.locator('a.product-screenshot')).toHaveAttribute('href', sources[index]);
    }
    const inspect = gallery.locator('.case-demo-panel:visible').getByRole('button', { name: 'Inspect screenshot' });
    await inspect.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(inspect).toBeFocused();
  });
}

test('product cards keep short feature answers, authentic previews and working same-page recordings', async ({ page }) => {
  test.setTimeout(60000);
  for (const [id, route] of cases.filter(([id]) => products.includes(id))) {
    await page.goto(`/${route}.html`);
    const cards = page.locator('.case-product-feature');
    await expect(cards).toHaveCount(id === 'powertable' ? 7 : 5);
    for (const [index, card] of (await cards.all()).entries()) {
      const feature = await card.getAttribute('data-feature');
      await expect(card.locator('.case-feature-number')).toHaveText(String(index + 1).padStart(2, '0'));
      await expect(card.locator('.case-feature-purpose')).toHaveText(caseHighlights[feature].purpose);
      await expect(card.locator('.case-screen-explanation')).toBeVisible();
      await expect(card.locator('.case-screen-explanation')).toHaveText(caseHighlights[feature].screen);
      await expect(card.locator('.case-feature-story dd')).toHaveText(
        ['problem', 'role', 'decision', 'evidence'].map(key => caseHighlights[feature][key]));
      if (caseFeatureEvidence[feature]) await expect(card.locator('img')).toHaveAttribute('src', caseFeatureEvidence[feature].src);
      await expect(card.getByRole('link', { name: 'View screens' })).toHaveAttribute('href', /\.html$/);
      const opener = card.getByRole('button', { name: 'Walkthrough', exact: true });
      await opener.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(opener).toBeFocused();
      await expect(page).toHaveURL(new RegExp(`/${route}\\.html$`));
    }
  }
});

for (const route of ['powertable', 'analytics-plus', 'analytics', 'column-mapping', 'crosstab', 'bikecare', 'cod-shield', 'analytics-spatial']) {
  test(`screens remain accessible without JavaScript on ${route}`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    try {
      const page = await context.newPage();
      await page.goto(`${baseURL}/${route}.html`);
      await expect(page.locator('main details')).toHaveCount(0);
      await expect(page.locator('.case-fast-read dt')).toHaveCount(4);
      const panels = page.locator('.case-demo-panel');
      if (await panels.count()) {
        const strip = page.getByRole('region', { name: 'Original screens. Scroll horizontally to explore.' });
        await expect(strip).toBeVisible();
        const last = panels.last().locator('a.product-screenshot');
        await last.scrollIntoViewIfNeeded();
        await expect(last).toBeInViewport();
        await expect(last).toHaveAttribute('href', /^\/assets\//);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
      await expect(page.locator('.case-endcap-back')).toHaveAttribute('href', /^(\/#work|\/(powertable|analytics-plus)\.html#product-)/);
    } finally {
      await context.close();
    }
  });
}

test('native screen tabs retain keyboard navigation', async ({ page }) => {
  await page.goto('/gantt-backlog.html#case-screens');
  const tabs = page.getByRole('tab');
  await tabs.first().focus();
  await page.keyboard.press('End');
  await expect(tabs.last()).toBeFocused();
  await expect(tabs.last()).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('Home');
  await expect(tabs.first()).toBeFocused();
  await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
});

test('prototype actions use separate dialogs and preserve direct entry and focus restoration', async ({ page }) => {
  for (const [route, bookmark, title] of [
    ['bikecare', 'bikecare-prototype', 'BikeCare prototype'],
    ['cod-shield', 'prototype', 'COD Shield simulation']
  ]) {
    await page.goto(`/${route}.html#${bookmark}`);
    const dialog = page.getByRole('dialog', { name: title, exact: true });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Nothing is sent');
    await expect(dialog.locator('button').first()).toBeEnabled();
    await page.keyboard.press('Escape');
    const opener = page.getByRole('button', { name: 'Try prototype', exact: false });
    await expect(opener).toBeFocused();
    await expect(page.locator('body')).not.toHaveClass(/preview-open/);
    await opener.click();
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Close prototype', exact: true }).click();
    await expect(opener).toBeFocused();
    await expect(page.locator('main details')).toHaveCount(0);
  }
});

for (const [width, height] of [[320, 812], [390, 844], [768, 900], [1440, 1000], [844, 390]]) {
  test(`player prioritizes fully contained original screens at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const route of ['analytics', 'column-mapping', 'bikecare']) {
      await page.goto(`/${route}.html`);
      await page.getByRole('button', { name: 'Walkthrough', exact: true }).first().click();
      const player = page.getByRole('dialog');
      await player.getByRole('button', { name: 'Go to section 3: Solution', exact: true }).click();
      await expect(player.locator('.cod-film-stage .walkthrough-guide,.case-evidence-sequence,.case-evidence-mount')).toHaveCount(0);
      const character = player.locator('.walkthrough-guide img');
      expect((await character.boundingBox()).width).toBeLessThanOrEqual(32);
      const image = player.locator('.cod-film-stage img').first();
      await image.evaluate(node => node.decode());
      const bounds = await image.boundingBox();
      const body = await player.locator('.cod-film-body').boundingBox();
      expect(bounds.width).toBeGreaterThan(30);
      expect(bounds.height).toBeGreaterThan(70);
      expect(bounds.x).toBeGreaterThanOrEqual(body.x - 1);
      expect(bounds.y).toBeGreaterThanOrEqual(body.y - 1);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(body.x + body.width + 1);
      expect(bounds.y + bounds.height).toBeLessThanOrEqual(body.y + body.height + 1);
      expect(await player.locator('.cod-film-body').evaluate(node => node.scrollHeight - node.clientHeight)).toBeLessThanOrEqual(1);
      await expect(player.locator('.cod-film-captions')).toBeInViewport();
      await expect(player.getByRole('button', { name: 'Read this scene', exact: true })).toBeInViewport();
      await page.keyboard.press('Escape');
    }
  });
}
