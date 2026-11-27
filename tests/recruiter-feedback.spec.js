import { test, expect } from './fixtures.js';
import { caseHighlights } from '../src/case-narratives.js';
import { caseFeatureEvidence } from '../src/case-feature-evidence.js';
import { explainCaseScreen } from '../src/case-screen-context.js';

test('selected feature previews retain authored context within a short scan', () => {
  for (const id of [...Object.keys(caseFeatureEvidence), 'crosstab']) {
    const copy = caseHighlights[id];
    for (const key of ['problem', 'role', 'decision', 'evidence']) {
      expect(copy[key].trim().split(/\s+/).length, `${id}: ${key}`).toBeLessThanOrEqual(14);
    }
    const words = ['purpose', 'problem', 'role', 'decision', 'evidence', 'screen']
      .filter(key => copy[key]).map(key => copy[key]).join(' ').split(/\s+/).length;
    expect(words, id).toBeLessThanOrEqual(65);
    if (caseFeatureEvidence[id]) expect(explainCaseScreen(caseFeatureEvidence[id].src)).not.toBe('');
  }
});

test('Analytics+ keeps end-to-end ownership while showing only selected features', async ({ page }) => {
  await page.goto('/analytics-plus.html');
  await expect(page.locator('.case-hero')).toContainText('End-to-end Analytics+ UX/UI');
  await expect(page.locator('.case-fast-read')).toContainText('selected features shown');
  await expect(page.locator('.case-fast-read')).toContainText('Chart Wizard and reusable KPI templates shipped');
  await page.getByRole('button', { name: 'Walkthrough', exact: true }).first().click();
  const player = page.getByRole('dialog');
  await expect(player.locator('.cod-film-captions')).toContainText('I worked on Analytics Plus');
  await expect(player.locator('.cod-film-captions')).toContainText('end to end');
  await expect(player.locator('.cod-film-captions')).not.toContainText("I didn't design the whole product");
  await expect(player.locator('.case-player-error')).toHaveCount(0);
});

test('Storyboard and both Gantt products show complete design ownership without expanding Cross-tab scope', async ({ page }) => {
  for (const [route, ownership] of [
    ['storyboard', 'Complete Storyboard UX/UI ownership'],
    ['gantt', 'Complete Analytics+ Gantt UX/UI ownership'],
    ['powertable', 'Complete Gantt and Resource Gantt UX/UI ownership']
  ]) {
    await page.goto(`/${route}.html`);
    await expect(page.locator('.case-fast-read')).toContainText(ownership);
  }
  await expect(page.locator('.case-fast-read')).toContainText('Cross-tab contribution');
  await page.goto('/analytics-plus.html');
  for (const [feature, ownership] of [
    ['storyboard', 'Complete Storyboard UX/UI ownership'],
    ['gantt', 'Complete Analytics+ Gantt UX/UI ownership']
  ]) {
    await expect(page.locator(`[data-feature="${feature}"] .case-feature-story`)).toContainText(ownership);
  }
});

test('Backlog explains its purpose without repeating the full case narrative', async ({ page }) => {
  await page.goto('/powertable.html#product-tasks');
  const feature = page.locator('[data-feature="backlog"]');
  await expect(feature.locator('.case-feature-purpose')).toContainText('tasks without dates');
  await expect(feature.locator('.case-feature-story')).toContainText(caseHighlights.backlog.decision);
  await expect(feature.locator('.case-screen-explanation')).toHaveText(caseHighlights.backlog.screen);
  await feature.getByRole('link', { name: 'View screens' }).click();
  await expect(page.locator('.case-fast-read')).toContainText(caseHighlights.backlog.problem);
  await expect(page.locator('.case-fast-read')).toContainText('production persistence is unverified');
  await expect(page.locator('main details,.case-chapter')).toHaveCount(0);
});

test('company recognition and official product images retain their proper attribution', async ({ page }) => {
  for (const [route, source] of [
    ['powertable', '/assets/powertable-official-gantt.webp'],
    ['analytics-plus', '/assets/analytics-plus-official-dashboard.webp']
  ]) {
    await page.goto(`/${route}.html`);
    const hero = page.locator('.case-hero-preview');
    await expect(hero.locator('img')).toHaveAttribute('src', source);
    await expect(hero.locator('figcaption')).toContainText('Official');
    await expect(hero.locator('.case-screen-explanation')).not.toContainText('I designed');
    await expect(hero.locator('figcaption a').first()).toHaveAttribute('href', /^https:/);
    const recognition = page.locator('.case-recognition-note');
    await expect(recognition).toContainText('Lumel');
    await expect(recognition).toContainText('2025');
    await expect(recognition).toContainText('not an individual design award');
    await expect(recognition.getByRole('link')).toHaveAttribute('href', 'https://lumel.com/best-overall-epm-vendor-2025/');
  }
});

test('exploration and contribution boundaries stay visible in the brief, not behind a disclosure', async ({ page }) => {
  for (const [route, note] of [
    ['gantt-baselines', 'exploration, not a confirmed release'],
    ['crosstab', 'no dedicated interface supplied'],
    ['cod-shield', 'no active protection or user testing'],
    ['bikecare', 'outcomes remain untested'],
    ['analytics-spatial', 'usability remain unvalidated']
  ]) {
    await page.goto(`/${route}.html`);
    await expect(page.locator('.case-fast-read dd').last()).toContainText(note);
    await expect(page.locator('.case-fast-read')).toBeVisible();
    await expect(page.locator('main details')).toHaveCount(0);
  }
});

test('conditional formatting keeps the original editor without implying an after-Apply result', async ({ page }) => {
  await page.goto('/powertable.html#product-resources');
  const feature = page.locator('[data-feature="formatting"]');
  const image = feature.locator('img');
  await image.scrollIntoViewIfNeeded();
  await image.evaluate(node => node.decode());
  await expect(image).toHaveAttribute('src', '/assets/fabric-conditional-rule.png');
  await expect(image).toHaveAttribute('alt', /Schedule Hours greater than zero/);
  expect(await image.evaluate(node => [node.naturalWidth, node.naturalHeight])).toEqual([612, 823]);
  await expect(feature.locator('.case-screen-explanation')).toContainText('not overload');
  await expect(feature.locator('.case-feature-story')).toContainText('an after-Apply result is not shown');
  await feature.getByRole('link', { name: 'View screens' }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/gantt-conditional-formatting\.html$/);
  await expect(page.locator('.case-fast-read')).toContainText(caseHighlights.formatting.role);
});

for (const width of [320, 390, 768, 1440]) {
  test(`compact invitations remain in the opening viewport at ${width}px`, async ({ page }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const route of ['powertable', 'analytics-plus', 'column-mapping', 'resource-configuration',
      'gantt-conditional-formatting', 'analytics', 'bikecare', 'cod-shield', 'analytics-spatial']) {
      await page.goto(`/${route}.html`);
      const entry = page.locator('.case-watch-entry');
      const button = entry.getByRole('button', { name: 'Walkthrough', exact: true });
      await expect(button).toBeInViewport();
      expect((await button.boundingBox()).height).toBeGreaterThanOrEqual(48);
      await expect(entry.locator('.walkthrough-entry-note')).toHaveCount(0);
      await expect(entry).not.toContainText(/under\s+3\s+minutes/i);
      await expect(button).toHaveAccessibleDescription(/recorded narration.*captions/);
      await expect(entry.locator('.walkthrough-guide')).toHaveCount(0);
      const alternate = entry.locator('.case-read-link,.case-prototype-trigger');
      await expect(alternate).toHaveCount(1);
      await expect(alternate).toBeInViewport();
      const hero = await page.locator('main > .case-hero').boundingBox();
      const entryBox = await entry.boundingBox();
      expect(entryBox.y).toBeGreaterThanOrEqual(hero.y);
      if (width > 900) {
        const preview = await page.locator('.case-presentation-hero').boundingBox();
        expect(entryBox.x + entryBox.width).toBeLessThanOrEqual(preview.x);
      }
    }
  });
}

for (const width of [320, 1440]) {
  test(`COD prototype keeps all four app-specific editable flows at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/cod-shield.html#prototype');
    const dialog = page.getByRole('dialog', { name: 'COD Shield simulation', exact: true });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('group', { name: 'Choose a proposed partner app' }).getByRole('button')).toHaveCount(4);
    await dialog.getByRole('button', { name: 'Try working flow', exact: true }).click();
    await dialog.getByRole('button', { name: 'Report without an order', exact: true }).click();
    const prototype = dialog.getByRole('region', { name: 'Amazon working COD Shield prototype', exact: true });
    const address = prototype.getByLabel('Affected home and unit', { exact: true });
    await expect(address).toBeEditable();
    await address.fill('Example home / Unit 7C');
    await prototype.getByRole('button', { name: 'Request support', exact: true }).click();
    await expect(prototype.getByRole('button', { name: 'Continue to residence review', exact: true })).toBeDisabled();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Try prototype', exact: false })).toBeFocused();
    await expect(page.locator('main details')).toHaveCount(0);
  });
}

test('main-case endings retain the product-to-concept sequence', async ({ page }) => {
  await page.goto('/powertable.html');
  for (const route of ['analytics-plus', 'cod-shield', 'bikecare']) {
    const next = page.locator('.case-endcap-next');
    await expect(next).toHaveAttribute('href', `/${route}.html`);
    await next.click();
    await expect(page).toHaveURL(new RegExp(`/${route}\\.html$`));
  }
  await page.locator('.case-endcap-back').click();
  await expect(page).toHaveURL(/\/#work$/);
  await expect(page.locator('#work')).toBeInViewport();
});
