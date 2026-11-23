import { test, expect } from './fixtures.js';
import { readFileSync } from 'node:fs';
import { codFilmScenes, codFilmSections, codFilmSources } from '../src/cod-film-story.js';

const recorded = JSON.parse(readFileSync(new URL('../src/cod-film-audio.json', import.meta.url), 'utf8'));
test.use({ reducedMotion: 'no-preference' });

async function mockNarration(page) {
  await page.addInitScript(clips => {
    window.__film = { played: [], media: null };
    HTMLMediaElement.prototype.play = function () {
      const clip = clips.find(item => this.src.includes(item.file.replace('.m4a', '')));
      if (!clip) return Promise.reject(new Error('Unexpected cinematic recording.'));
      window.__film.played.push(clip.id);
      window.__film.media = this;
      queueMicrotask(() => this.dispatchEvent(new Event('playing')));
      return Promise.resolve();
    };
    HTMLMediaElement.prototype.pause = function () {};
  }, recorded.scenes);
}

async function openFilm(page) {
  await page.goto('/cod-shield.html');
  await page.locator('.case-walkthrough-tab').click();
  return page.getByRole('dialog', { name: 'From a reported story to a proposed solution.', exact: true });
}

async function choose(player, index) {
  const sectionIndex = codFilmSections.findIndex(section => index >= section.start && index <= section.end);
  const section = codFilmSections[sectionIndex];
  await player.getByRole('button', { name: `Go to section ${sectionIndex + 1}: ${section.label}`, exact: true }).click();
  if (section.label === 'Solution') await player.getByRole('group', { name: 'Solution steps', exact: true }).getByRole('button').nth(index - section.start).click();
}

test('the mobile business-case ending keeps all three stakeholder benefits inside the scene viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mockNarration(page);
  const player = await openFilm(page);
  await choose(player, 9);
  await page.evaluate(() => document.fonts.ready);
  const viewport = await player.locator('.cod-film-body').boundingBox();
  const benefits = player.locator('.cod-film-scope > div > span');
  await expect(benefits).toHaveCount(3);
  const finalBenefit = await benefits.last().boundingBox();
  expect(finalBenefit.y + finalBenefit.height).toBeLessThanOrEqual(viewport.y + viewport.height);
});

test('the incident is visible in the case and source digests link to reporting without loading external media', async ({ page }) => {
  await mockNarration(page);
  const external = [];
  page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:4174/')) external.push(request.url()); });
  await page.goto('/cod-shield.html');
  await expect(page.locator('.cod-film-context')).toContainText("Veeramani's reported story");
  expect(await page.evaluate(() => window.__film.played)).toEqual([]);
  await expect(page.locator('audio')).not.toHaveAttribute('src', /energetic/);
  await page.locator('.case-walkthrough-tab').click();
  const player = page.locator('.cod-film-player');
  await choose(player, 1);
  const cards = player.locator('.cod-film-source');
  await expect(cards).toHaveCount(2);
  for (const [index, source] of codFilmSources.entries()) {
    await expect(cards.nth(index)).toContainText(source.summary);
    await expect(cards.nth(index).getByRole('link')).toHaveAttribute('href', source.url);
    await expect(cards.nth(index)).toContainText('original summary');
  }
  await expect(player.locator('.cod-film-captions')).toContainText('reported claims, not audited order data');
  expect(external).toEqual([]);
});

test('native narration advances the complete story and five solution scenes without restarting on mute', async ({ page }) => {
  await mockNarration(page);
  const player = await openFilm(page);
  await expect(player.locator('.cod-film-header .case-card-number')).toHaveText('Walkthrough');
  const navigation = player.getByRole('navigation', { name: 'Story sections', exact: true });
  await expect(navigation.getByRole('button')).toHaveCount(6);
  const solution = navigation.getByRole('button', { name: 'Go to section 5: Solution', exact: true });
  await expect(solution).toHaveCount(1);
  for (const [index, scene] of codFilmScenes.entries()) {
    await expect(player.locator('.cod-film-status')).toContainText(`Scene ${index + 1} of ${codFilmScenes.length} / Narrating`);
    await expect(player.locator('.cod-film-stage')).toHaveAttribute('data-scene', scene.id);
    await expect(player.locator('.cod-film-captions p')).toHaveText(scene.narration);
    if (index >= 4 && index <= 8) {
      await expect(solution).toHaveAttribute('aria-current', 'step');
      await expect(player.getByRole('group', { name: 'Solution steps', exact: true }).getByRole('button').nth(index - 4)).toHaveAttribute('aria-pressed', 'true');
    }
    if (index === 2) {
      const count = await page.evaluate(() => window.__film.played.length);
      await player.getByRole('button', { name: 'Voice on', exact: true }).click();
      await expect(player.locator('audio')).toHaveJSProperty('muted', true);
      expect(await page.evaluate(() => window.__film.played.length)).toBe(count);
      await player.getByRole('button', { name: 'Voice off', exact: true }).click();
    }
    await page.evaluate(() => window.__film.media.dispatchEvent(new Event('ended')));
  }
  await expect(player.locator('.cod-film-status')).toContainText('Story complete');
  expect(await page.evaluate(() => window.__film.played)).toEqual(codFilmScenes.map(scene => scene.id));
  await player.getByRole('button', { name: 'Replay story', exact: true }).click();
  await expect(player.locator('.cod-film-stage')).toHaveAttribute('data-scene', 'veeramani');
  await expect(player.locator('.cod-film-status')).toContainText('Narrating');
  await player.getByRole('button', { name: 'Close cinematic walkthrough', exact: true }).click();
  await expect(player).toHaveCount(0);
  await expect(page.locator('.case-walkthrough-tab')).toBeFocused();
});

test('all cinematic recordings decode, pause and resume as native media', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const player = await openFilm(page);
  for (let index = 0; index < codFilmScenes.length; index++) {
    await choose(player, index);
    await player.getByRole('button', { name: 'Read this scene', exact: true }).click();
    const media = player.locator('audio');
    await expect(media).toHaveAttribute('src', new RegExp(recorded.scenes[index].file.replace('.m4a', '')));
    await expect.poll(() => media.evaluate(element => !element.paused && element.readyState >= 2 && element.currentTime > 0)).toBe(true);
    await player.getByRole('button', { name: 'Pause', exact: true }).click();
    const position = await media.evaluate(element => element.currentTime);
    await expect.poll(() => media.evaluate(element => element.paused)).toBe(true);
    await player.getByRole('button', { name: 'Read this scene', exact: true }).click();
    await expect.poll(() => media.evaluate((element, pausedAt) => !element.paused && element.currentTime >= pausedAt, position)).toBe(true);
    await player.getByRole('button', { name: 'Pause', exact: true }).click();
  }
});

test('motion follows media, pause freezes it, and keyboard scene selection is static', async ({ page }) => {
  await mockNarration(page);
  const player = await openFilm(page);
  const stage = player.locator('.cod-film-stage');
  await expect(stage).toHaveAttribute('data-playing', 'true');
  await expect.poll(() => stage.evaluate(element => element.getAnimations({ subtree: true }).some(animation => animation.playState === 'running'))).toBe(true);
  await player.getByRole('button', { name: 'Pause', exact: true }).click();
  await expect.poll(() => stage.evaluate(element => element.getAnimations({ subtree: true }).every(animation => animation.playState === 'paused'))).toBe(true);
  const first = player.getByRole('button', { name: 'Go to section 1: Veeramani', exact: true });
  await first.focus();
  await page.keyboard.press('End');
  await expect(player.getByRole('button', { name: 'Go to section 6: Business case', exact: true })).toBeFocused();
  await expect(stage).toHaveAttribute('data-scene', 'scope');
  expect(await stage.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
  await page.keyboard.press('Home');
  await expect(first).toBeFocused();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await player.getByRole('button', { name: 'Read this scene', exact: true }).click();
  expect(await stage.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
  await page.evaluate(() => window.__film.media.dispatchEvent(new Event('ended')));
  await expect(stage).toHaveAttribute('data-scene', 'veeramani');
  await expect(player.locator('.cod-film-status')).toContainText('Manual mode');
});

test('Solution scenes are interactive, pause playback, gate consent, and never send or store demo data', async ({ page }) => {
  await mockNarration(page);
  const player = await openFilm(page);
  const saved = await page.evaluate(() => ({ local: { ...localStorage }, session: { ...sessionStorage } }));
  const requests = [];
  page.on('request', request => requests.push({ url: request.url(), method: request.method() }));
  await choose(player, 4);
  const steps = player.getByRole('group', { name: 'Solution steps', exact: true });
  await expect(steps.getByRole('button')).toHaveCount(5);
  await player.getByRole('button', { name: 'Play', exact: true }).click();
  await player.getByRole('group', { name: 'Walkthrough partner apps' }).getByRole('button', { name: 'Flipkart', exact: true }).click();
  await expect(player.locator('.cod-film-status')).toContainText('Paused');
  await player.getByRole('button', { name: 'Report without an order', exact: true }).click();
  await expect(player.locator('.cod-film-stage')).toHaveAttribute('data-scene', 'report');
  await expect(player.locator('.cod-partner-header strong')).toHaveText('Flipkart');
  await expect(player.getByLabel('Order ID (optional)')).toHaveValue('');
  await player.getByRole('button', { name: 'Continue to household review', exact: true }).click();
  await expect(player.locator('.cod-film-feedback')).toContainText('No support request was sent.');
  await player.getByRole('button', { name: 'Demo: preview approved review', exact: true }).click();
  await expect(player.locator('.cod-film-feedback')).toContainText('No identity or household has been verified.');
  const activate = player.getByRole('button', { name: 'Request temporary protection', exact: true });
  await expect(activate).toBeDisabled();
  await player.getByRole('checkbox').check();
  await activate.click();
  await expect(player.locator('.cod-film-stage')).toHaveAttribute('data-scene', 'sync');
  await expect(player.locator('[data-platform]')).toHaveCount(1);
  await expect(player.locator('[data-platform="flipkart"]')).toHaveAttribute('data-sync-status', 'pending');
  await player.getByRole('button', { name: 'Demo: preview confirmation failure', exact: true }).click();
  await expect(player.locator('[data-platform="flipkart"]')).toHaveAttribute('data-sync-status', 'failed');
  await expect(player.locator('.cod-film-feedback')).toContainText('No actual service is activated.');
  await expect(player.locator('.cod-partner-phone')).toContainText('Confirmation failed in this demo. Protection is not active.');
  await steps.getByRole('button', { name: '04 Choose the scope', exact: true }).click();
  await expect(player.getByRole('checkbox')).not.toBeChecked();
  await expect(activate).toBeDisabled();
  expect(await page.evaluate(() => ({ local: { ...localStorage }, session: { ...sessionStorage } }))).toEqual(saved);
  expect(requests.filter(request => request.method !== 'GET' || !request.url.startsWith('http://127.0.0.1:4174/'))).toEqual([]);
  await player.getByRole('button', { name: 'Close cinematic walkthrough', exact: true }).click();
  await page.locator('.case-walkthrough-tab').click();
  await choose(player, 7);
  await expect(player.getByRole('checkbox')).not.toBeChecked();
});

test('five solution steps support keyboard wrapping without motion', async ({ page }) => {
  await mockNarration(page);
  const player = await openFilm(page);
  await choose(player, 4);
  const steps = player.getByRole('group', { name: 'Solution steps', exact: true }).getByRole('button');
  await steps.first().focus();
  await page.keyboard.press('End');
  await expect(steps.last()).toBeFocused();
  await expect(player.locator('.cod-film-stage')).toHaveAttribute('data-scene', 'sync');
  await page.keyboard.press('ArrowRight');
  await expect(steps.first()).toBeFocused();
  await expect(player.locator('.cod-film-stage')).toHaveAttribute('data-scene', 'placement');
  expect(await player.locator('.cod-film-stage').evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
});

test('keyboard scrolling the phone keeps popup navigation and playback controls visible', async ({ page }) => {
  await mockNarration(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  const player = await openFilm(page);
  await choose(player, 7);
  const content = player.getByRole('region', { name: 'App screen content', exact: true });
  await content.focus();
  await page.keyboard.press('End');
  await expect.poll(() => content.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
  expect(await player.evaluate(element => element.scrollTop)).toBe(0);
  await expect(player.getByRole('button', { name: 'Close cinematic walkthrough', exact: true })).toBeInViewport({ ratio: 1 });
  await expect(player.getByRole('button', { name: 'Next', exact: true })).toBeInViewport({ ratio: 1 });
});

for (const [width, height, appearance] of [[320, 844, 'light'], [390, 844, 'dark'], [390, 650, 'light'], [1280, 720, 'light'], [1440, 900, 'light'], [1440, 900, 'dark'], [844, 390, 'light']]) {
  test(`cinematic scenes and caption controls fit ${width}×${height} ${appearance}`, async ({ page }) => {
    await mockNarration(page);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width, height });
    await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const player = await openFilm(page);
    for (const index of [0, 1, 4, 5, 6, 7, 8, 9]) {
      await choose(player, index);
      expect(await player.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
      expect(await player.evaluate(element => {
        const frame = element.getBoundingClientRect();
        const controls = element.querySelector('.case-player-controls').getBoundingClientRect();
        element.scrollTop = 1000;
        return frame.top >= 0 && frame.bottom <= innerHeight && element.scrollTop === 0 && getComputedStyle(element).overflowY === 'clip' &&
          controls.top >= frame.top && controls.bottom <= frame.bottom;
      })).toBe(true);
      expect(await player.locator('.cod-film-stage').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
      if (index >= 4 && index <= 8) {
        expect(await player.locator('.cod-partner-phone').evaluate(element => {
          const frame = element.getBoundingClientRect();
          const footer = element.querySelector('.cod-partner-bottom-nav').getBoundingClientRect();
          const viewport = element.closest('.cod-film-body').getBoundingClientRect();
          return footer.bottom <= frame.bottom && element.scrollWidth <= element.clientWidth &&
            (innerHeight <= 600 || (frame.top >= viewport.top && frame.bottom <= viewport.bottom && frame.bottom <= innerHeight));
        })).toBe(true);
        await player.locator('.cod-partner-body').evaluate(element => { element.scrollTop = element.scrollHeight; });
        if (height > 600) expect(await player.locator('.cod-partner-body').evaluate(element =>
          [...element.querySelectorAll('button, input[type="text"]')].every(control => control.getBoundingClientRect().height <= element.clientHeight)
        )).toBe(true);
        await expect(player.getByRole('button', { name: 'Close cinematic walkthrough', exact: true })).toBeInViewport({ ratio: 1 });
        await expect(player.getByRole('button', { name: 'Next', exact: true })).toBeInViewport({ ratio: 1 });
      }
      await player.locator('.cod-film-captions').scrollIntoViewIfNeeded();
      await expect(player.locator('.cod-film-captions')).toBeInViewport();
      await player.getByRole('button', { name: index === 9 ? 'Finish' : 'Next', exact: true }).click();
      if (index === 9) break;
    }
    await expect(player).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('hiding the page and changing motion preference stop the film; media failure is explicit', async ({ page }) => {
  await mockNarration(page);
  const player = await openFilm(page);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect(player.locator('.cod-film-status')).toContainText('Paused');
  await page.evaluate(() => Object.defineProperty(document, 'hidden', { configurable: true, value: false }));
  await player.getByRole('button', { name: 'Play', exact: true }).click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(player.locator('.cod-film-status')).toContainText('Manual mode');
  await player.getByRole('button', { name: 'Read this scene', exact: true }).click();
  await page.evaluate(() => window.__film.media.dispatchEvent(new Event('error')));
  await expect(player.getByRole('alert')).toContainText('This recording could not play.');
  await expect(player.locator('.cod-film-captions p')).toHaveText(codFilmScenes[0].narration);
});

test('the full incident-to-solution story and source links remain available without JavaScript', async ({ browser }) => {
  const page = await browser.newPage({ javaScriptEnabled: false });
  try {
    await page.goto('http://127.0.0.1:4174/cod-shield.html');
    await expect(page.getByRole('button', { name: 'Walkthrough', exact: true })).toBeHidden();
    await page.locator('.cod-film-transcript > summary').click();
    await expect(page.locator('.cod-film-transcript ol > li')).toHaveCount(codFilmScenes.length);
    await expect(page.locator('.cod-film-transcript')).toContainText('not footage of him');
    await expect(page.locator('.cod-film-transcript')).toContainText('Each app handles its own case and COD orders, not competitors.');
    await expect(page.locator('.cod-film-transcript')).toContainText('These are intended benefits, not measured results.');
    await expect(page.locator('.cod-film-transcript a')).toHaveCount(2);
  } finally { await page.close(); }
});
