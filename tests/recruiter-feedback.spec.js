import { test, expect } from './fixtures.js';
import { solutionOverviewScreens } from '../src/case-solution-evidence.js';
import { caseSolutions } from '../src/case-solutions.js';

test('Analytics+ presents selected features without reducing end-to-end product ownership', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#project-analytics .product-my-work')).toContainText('End-to-end Analytics+ UX/UI');
  await page.locator('#project-analytics').click();
  await expect(page.locator('.case-hero')).toContainText('End-to-end Analytics+ UX/UI');
  await expect(page.locator('#case-approach')).toContainText('Selected features from end-to-end Analytics+ UX/UI');
  await page.getByRole('button', { name: 'Walkthrough', exact: true }).first().click();
  const player = page.getByRole('dialog');
  await expect(player.locator('.cod-film-captions')).toContainText('I worked on Analytics Plus');
  await expect(player.locator('.cod-film-captions')).toContainText('end to end');
  await expect(player.locator('.cod-film-captions')).not.toContainText("I didn't design the whole product");
  await expect(player.locator('.case-player-error')).toHaveCount(0);
});

for (const width of [390, 1440]) {
  test(`four main case studies total a 7–10 minute text read at ${width}px`, async ({ page }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const counts = {};
    for (const [caseId, route] of [['powertable', 'powertable'], ['analyticsSuite', 'analytics-plus'], ['codShield', 'cod-shield'], ['bikecare', 'bikecare']]) {
      await page.goto(`/${route}.html`);
      await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
      counts[caseId] = (await page.locator('main').innerText()).trim().split(/\s+/).length;
      const solution = page.locator('.case-solution');
      await expect(solution.locator('img')).toBeVisible();
      const explanation = solution.locator('.case-reading-details');
      await expect(explanation).not.toHaveAttribute('open');
      await explanation.locator(':scope > summary').click();
      await expect(explanation).toContainText(caseSolutions[caseId].example);
      await expect(explanation).toContainText(caseSolutions[caseId].value);
    }
    const total = Object.values(counts).reduce((sum, words) => sum + words, 0);
    expect(total, JSON.stringify(counts)).toBeGreaterThanOrEqual(1750);
    expect(total, JSON.stringify(counts)).toBeLessThanOrEqual(2000);
  });
  test(`native four-case reading stays within 7–10 minutes at ${width}px`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width, height: 900 } });
    try {
      const page = await context.newPage();
      const counts = {};
      for (const route of ['powertable', 'analytics-plus', 'cod-shield', 'bikecare']) {
        await page.goto(`${baseURL}/${route}.html`);
        counts[route] = (await page.locator('main').innerText()).trim().split(/\s+/).length;
        const more = page.locator('.case-screen-more');
        if (await more.count()) {
          await expect(more).not.toHaveAttribute('open');
          await expect(page.locator('.case-demo-panel:visible')).toHaveCount(1);
          await more.locator(':scope > summary').click();
          for (const panel of await page.locator('.case-demo-panel').all()) await expect(panel).toBeVisible();
        }
      }
      const total = Object.values(counts).reduce((sum, words) => sum + words, 0);
      expect(total, JSON.stringify(counts)).toBeGreaterThanOrEqual(1750);
      expect(total, JSON.stringify(counts)).toBeLessThanOrEqual(2000);
    } finally {
      await context.close();
    }
  });
}

test('BikeCare prototype is opt-in but the hero link and existing bookmark open it on the same page', async ({ page }) => {
  await page.goto('/bikecare.html');
  const prototype = page.locator('#bikecare-prototype');
  await expect(prototype).not.toHaveAttribute('open');
  await expect(prototype.locator(':scope > summary')).toBeVisible();
  await expect(page.locator('#case-screens .case-demo-panel:not([hidden]) img')).toBeVisible();
  await page.getByRole('link', { name: 'Try the clickable prototype', exact: true }).click();
  await expect(prototype).toHaveAttribute('open', '');
  await expect(prototype.locator('.bikecare-app-body')).toHaveAttribute('data-view', 'splash');
  await page.goto('/bikecare.html#bikecare-prototype');
  await expect(prototype).toHaveAttribute('open', '');
  await expect(prototype.locator('.bikecare-app-body')).toBeVisible();
});

for (const width of [320, 1440]) {
  for (const appearance of ['light', 'dark']) {
    test(`COD disclosures separate read-only previews from editable flows in ${appearance} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      await page.goto('/cod-shield.html');
      const disclosure = page.locator('.cod-partner-placement');
      const summary = disclosure.locator(':scope > summary');
      await expect(summary).toHaveText('Explore app placements and flows');
      await expect(disclosure).not.toHaveAttribute('open');
      await summary.focus();
      await summary.press('Enter');
      await expect(disclosure).toHaveAttribute('open', '');
      const experience = disclosure.locator('.cod-partner-experience');
      await expect(experience.getByRole('group', { name: 'Choose a proposed partner app' }).getByRole('button')).toHaveCount(4);
      await expect(experience.locator('.cod-partner-flow')).toHaveCount(0);
      await expect(experience).toContainText('Read-only design previews.');
      await experience.getByRole('button', { name: 'Report without an order', exact: true }).click();
      await expect(experience.getByLabel('Affected home and unit')).toHaveAttribute('readonly', '');
      await experience.getByRole('button', { name: 'Try working flow', exact: true }).click();
      await expect(experience.getByRole('list', { name: 'Working flow progress' })).toBeVisible();
      await expect(experience.getByRole('group', { name: 'Preview integration stages' })).toHaveCount(0);
      await experience.getByRole('button', { name: 'Report without an order', exact: true }).click();
      const prototype = experience.getByRole('region', { name: 'Amazon working COD Shield prototype', exact: true });
      const address = prototype.getByLabel('Affected home and unit', { exact: true });
      await expect(address).toBeEditable();
      await address.fill('Example home / Unit 7C');
      await prototype.getByRole('button', { name: 'Request support', exact: true }).click();
      await expect(prototype.getByRole('button', { name: 'Continue to residence review', exact: true })).toBeDisabled();
      await summary.focus();
      await summary.press('Space');
      await expect(disclosure).not.toHaveAttribute('open');
      await expect(prototype).toBeHidden();
      await summary.click();
      await expect(prototype).toBeVisible();
      await expect(prototype.getByRole('button', { name: 'Continue to residence review', exact: true })).toBeDisabled();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
  }
}

test('main-case endings keep the short reading path together instead of opening feature branches', async ({ page }) => {
  await page.goto('/powertable.html');
  for (const route of ['analytics-plus', 'cod-shield', 'bikecare']) {
    const next = page.locator('.case-endcap-next');
    await expect(next).toHaveAttribute('href', `/${route}.html`);
    await next.click();
    await expect(page).toHaveURL(new RegExp(`/${route}\\.html$`));
    await expect(page.locator('main h1')).toBeVisible();
  }
  await page.locator('.case-endcap-back').click();
  await expect(page).toHaveURL(/\/#project-bikecare$/);
  await expect(page.locator('#project-bikecare')).toBeInViewport();
});

for (const width of [320, 390, 1440]) {
  test(`solution evidence and larger feature previews remain readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const theme of ['light', 'dark']) {
      await page.goto('/powertable.html');
      await page.evaluate(value => localStorage.setItem('portfolio-appearance', value), theme);
      for (const [caseId, route] of [['powertable', 'powertable'], ['formatting', 'gantt-conditional-formatting'], ['wizard', 'analytics']]) {
        await page.goto(`/${route}.html`);
        const figure = page.locator('.case-solution .case-solution-screen');
        await figure.scrollIntoViewIfNeeded();
        const image = figure.locator('img');
        const evidence = solutionOverviewScreens[caseId];
        await expect(image).toHaveAttribute('src', evidence.src);
        await image.evaluate(node => node.decode());
        const bounds = await image.boundingBox();
        expect(bounds.width / bounds.height).toBeCloseTo(evidence.width / evidence.height, 2);
        expect(bounds.width).toBeLessThanOrEqual(evidence.width);
        expect(bounds.height).toBeLessThanOrEqual(evidence.height);
        await expect(image).toHaveCSS('filter', 'none');
        await expect(image).toHaveCSS('transform', 'none');
        expect((await figure.locator('figcaption').boundingBox()).y).toBeGreaterThanOrEqual(bounds.y + bounds.height);
        await expect(figure.getByRole('link', { name: 'Open original screen (opens in a new tab)' })).toHaveAttribute('href', evidence.src);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
      await page.goto('/powertable.html#product-tasks');
      const preview = page.locator('[data-feature="mapping"] .feature-card-illustration');
      const image = preview.locator('img');
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(node => node.decode());
      const paintedWidth = await image.evaluate(node => {
        const box = node.getBoundingClientRect();
        return Math.min(node.naturalWidth, box.width, box.height * node.naturalWidth / node.naturalHeight);
      });
      expect(paintedWidth).toBeGreaterThan((await preview.boundingBox()).width * 0.8);
      await expect(preview).toHaveCSS('padding', '0px');
      const imageBox = await image.boundingBox();
      expect((await preview.locator('figcaption').boundingBox()).y).toBeGreaterThanOrEqual(imageBox.y + imageBox.height);
    }
  });
}

const professional = ['powertable', 'column-mapping', 'gantt-baselines', 'gantt-backlog',
  'gantt-configuration', 'gantt-conditional-formatting', 'resource-configuration', 'crosstab',
  'analytics-plus', 'analytics', 'storyboard', 'gantt', 'presentation', 'kpi'];

for (const width of [320, 390, 768, 1440]) {
  test(`walkthrough sits beneath the introduction with the reading action at ${width}px`, async ({ page }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const route of [...professional, 'bikecare', 'cod-shield', 'analytics-spatial']) {
      await page.goto(`/${route}.html`);
      const entry = page.locator('.case-watch-entry');
      const button = entry.getByRole('button', { name: 'Walkthrough', exact: true });
      await expect(button).toBeVisible();
      await expect(button).toBeInViewport();
      await expect(entry).toContainText('Recorded voiceover');
      expect(await button.evaluate(node => node.getBoundingClientRect().height)).toBeGreaterThanOrEqual(48);
      const hero = page.locator('main > .case-hero');
      expect(await entry.evaluate(node => node.getBoundingClientRect().top))
        .toBeGreaterThanOrEqual(await hero.locator(':scope > .case-summary').evaluate(node => node.getBoundingClientRect().bottom));
      const preview = page.locator('.case-presentation-hero');
      if (await preview.count()) {
        await expect(entry.locator('.case-read-link')).toBeVisible();
        const entryBox = await entry.boundingBox();
        const previewBox = await preview.boundingBox();
        if (width > 900) {
          expect(entryBox.x + entryBox.width).toBeLessThanOrEqual(previewBox.x);
          expect(entryBox.x).toBeCloseTo((await hero.boundingBox()).x, 0);
        } else {
          expect(entryBox.y + entryBox.height).toBeLessThanOrEqual(previewBox.y);
        }
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const chapters = page.getByRole('navigation', { name: 'Case study chapters', exact: true });
      if (await chapters.count()) {
        await expect(chapters.getByRole('link')).toHaveCount(3);
        await expect(chapters.getByRole('button')).toHaveCount(0);
      }
    }
  });
}

test('conditional formatting opens its actual editor on the product page and supports keyboard closing', async ({ page }) => {
  await page.goto('/powertable.html#product-resources');
  const feature = page.locator('[data-feature="formatting"]');
  const summary = feature.locator(':scope > summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(feature).toHaveAttribute('open', '');
  await expect(page).toHaveURL(/powertable\.html#product-resources$/);
  const image = feature.locator('.case-feature-detail img');
  await image.evaluate(node => node.decode());
  await expect(image).toHaveAttribute('src', '/assets/fabric-conditional-rule.png');
  await expect(image).toHaveAttribute('alt', /Schedule Hours greater than zero/);
  await expect(image).toHaveCSS('filter', 'none');
  await expect(image).toHaveCSS('transform', 'none');
  const dimensions = await image.evaluate(node => ({
    width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height,
    nativeWidth: node.naturalWidth, nativeHeight: node.naturalHeight
  }));
  expect(dimensions.nativeWidth).toBe(612);
  expect(dimensions.nativeHeight).toBe(823);
  expect(dimensions.width).toBeLessThanOrEqual(612);
  expect(dimensions.width / dimensions.height).toBeCloseTo(612 / 823, 2);
  await summary.focus();
  await page.keyboard.press('Space');
  await expect(feature).not.toHaveAttribute('open');
  await expect(summary).toBeFocused();
});

test('same-page feature walkthroughs keep the correct recordings and restore trigger focus', async ({ page }) => {
  test.setTimeout(60000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  for (const route of ['powertable', 'analytics-plus']) {
    await page.goto(`/${route}.html`);
    const pageURL = page.url();
    for (const feature of await page.locator('.case-product-feature').all()) {
      await feature.locator(':scope > summary').click();
      const title = (await feature.locator('summary > strong').innerText()).replace(/\s*\+$/, '');
      const trigger = feature.getByRole('button', { name: 'Walkthrough', exact: true });
      await trigger.click();
      const dialog = page.getByRole('dialog');
      await expect(dialog.getByRole('heading', { level: 2 })).toHaveText(title);
      await expect(dialog.getByRole('button', { name: 'Voice on', exact: true })).toBeEnabled();
      await expect(dialog.getByRole('alert')).toHaveCount(0);
      await expect(dialog.locator('.cod-film-status')).toContainText('Scene 1 of 7');
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
      expect(page.url()).toBe(pageURL);
      await feature.locator(':scope > summary').click();
    }
    await page.locator('.case-watch-entry').getByRole('button', { name: 'Walkthrough', exact: true }).click();
    await expect(page.getByRole('dialog').getByRole('heading', { level: 2 }))
      .toHaveText(route === 'powertable' ? 'PowerTable' : 'Inforiver Analytics+');
    await expect(page.getByRole('dialog').getByRole('button', { name: 'Voice on', exact: true })).toBeEnabled();
    await page.keyboard.press('Escape');
  }
  expect(errors).toEqual([]);
});

test('native same-page evidence works without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto(`${baseURL}/powertable.html`);
    const solutionImage = page.locator('.case-solution .case-solution-screen img');
    await solutionImage.scrollIntoViewIfNeeded();
    await expect(solutionImage).toBeVisible();
    await expect(solutionImage).toHaveAttribute('src', '/assets/fabric-gantt-configuration.png');
    const feature = page.locator('[data-feature="formatting"]');
    await feature.locator(':scope > summary').click();
    await expect(feature.locator('.case-feature-detail img')).toBeVisible();
    await expect(feature.getByRole('button', { name: 'Walkthrough', exact: true })).toBeHidden();
    await expect(feature.getByRole('link', { name: 'Full feature evidence' })).toHaveAttribute('href', '/gantt-conditional-formatting.html');
    const crossTab = page.locator('[data-feature="crosstab"]');
    await expect(crossTab.locator('summary img')).toHaveCount(0);
    await expect(crossTab.locator('summary figcaption')).toHaveText('Contribution structure diagram');
  } finally {
    await context.close();
  }
});

test('BikeCare keeps a short main path while preserving deep-linked documentation', async ({ page }) => {
  await page.goto('/bikecare.html');
  expect(await page.locator('main').innerText().then(text => text.trim().split(/\s+/).length)).toBeLessThan(1500);
  await expect(page.locator('.case-reading-details[open]')).toHaveCount(0);
  await expect(page.locator('#bikecare-prototype')).toBeVisible();
  await page.goto('/bikecare.html#bikecare-system-title');
  await expect(page.locator('#bikecare-system-title')).toBeVisible();
  await expect(page.locator('#bikecare-system-title')).toBeInViewport();
  await expect(page.locator('#bikecare-system-title').locator('xpath=ancestor::details[1]')).toHaveAttribute('open', '');
});

test('About associates current PowerTable work and earlier Analytics+ work with their own roles', async ({ page }) => {
  await page.goto('/about.html');
  await page.locator('#experience-details > summary').click();
  const roles = page.getByRole('list', { name: 'Roles at Lumel Technologies' }).locator(':scope > li');
  await expect(roles).toHaveCount(3);
  await expect(roles.nth(0)).toContainText('Jan 2025');
  await expect(roles.nth(0)).toContainText('Since February 2025');
  await expect(roles.nth(0)).toContainText('PowerTable Gantt and resource Gantt');
  await expect(roles.nth(0)).toContainText('Cross-tab');
  await expect(roles.nth(1)).toContainText('Designed user interfaces and workflows for Inforiver Analytics+');
  await expect(roles.nth(2)).toContainText('Contributed UX/UI design work to Inforiver Analytics+ on a contract basis');
});
