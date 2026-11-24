import { test, expect } from './fixtures.js';
import { readFileSync } from 'node:fs';
import { createCaseNarration } from '../src/case-narration.js';
import { solutionSteps } from '../src/case-solutions.js';
import { solutionScreens } from '../src/case-solution-evidence.js';
import { solutionNarration, standaloneNarration } from '../src/case-film-narration.js';
import { caseHighlights } from '../src/case-narratives.js';
import { explainCaseScreen } from '../src/case-screen-context.js';

const recorded = JSON.parse(readFileSync(new URL('../src/case-film-audio.json', import.meta.url), 'utf8'));
const previous = JSON.parse(readFileSync(new URL('../src/case-audio.json', import.meta.url), 'utf8'));
const cases = [
  ['powertable', 'powertable'], ['mapping', 'column-mapping'], ['baselines', 'gantt-baselines'],
  ['backlog', 'gantt-backlog'], ['ganttPanel', 'gantt-configuration'],
  ['formatting', 'gantt-conditional-formatting'], ['resourcePanel', 'resource-configuration'],
  ['crosstab', 'crosstab'], ['analyticsSuite', 'analytics-plus'], ['wizard', 'analytics'],
  ['storyboard', 'storyboard'], ['gantt', 'gantt'], ['presentation', 'presentation'],
  ['kpi', 'kpi'], ['spatial', 'analytics-spatial'], ['bikecare', 'bikecare']
];
test.use({ reducedMotion: 'no-preference' });

async function mockVoice(page) {
  await page.addInitScript(recordings => {
    window.__narration = { spoken: [], current: null, cancels: 0 };
    HTMLMediaElement.prototype.play = function () {
      const clip = Object.values(recordings.cases).flat().find(item =>
        this.src.includes(item.file.replace('.m4a', '')));
      if (!clip) return Promise.reject(new Error(`Unexpected recording: ${this.src}`));
      window.__narration.current = this;
      window.__narration.spoken.push({ text: clip.text, src: this.src, name: recordings.label });
      queueMicrotask(() => this.dispatchEvent(new Event('playing')));
      return Promise.resolve();
    };
    HTMLMediaElement.prototype.pause = function () { window.__narration.cancels++; };
  }, recorded);
}

async function openPlayer(page, route = 'analytics') {
  await page.goto(`/${route}.html`);
  await page.getByRole('button', { name: 'Walkthrough', exact: true }).first().click();
  return page.locator('.case-player.cod-film-player');
}

async function choose(player, index, closingLabel = 'Scope') {
  const sectionIndex = index < 2 ? index : index < 5 ? 2 : index - 2;
  const labels = ['Context', 'Problem', 'Solution', 'Evidence', closingLabel];
  await player.getByRole('button', { name: `Go to section ${sectionIndex + 1}: ${labels[sectionIndex]}`, exact: true }).click();
  if (sectionIndex === 2) await player.getByRole('group', { name: 'Solution steps', exact: true }).getByRole('button').nth(index - 2).click();
}

test('every remaining case shares the animated Walkthrough frame with one Solution section and its own three steps', async ({ page }) => {
  test.setTimeout(90000);
  await mockVoice(page);
  for (const [caseId, route] of cases) {
    await page.goto(`/${route}.html`);
    await expect(page.locator('.case-player')).toHaveCount(0);
    expect(await page.evaluate(() => window.__narration.spoken)).toEqual([]);
    await page.getByRole('button', { name: 'Walkthrough', exact: true }).first().click();
    const player = page.locator('.cod-film-player');
    await expect(player.locator('.case-card-number')).toHaveText('Walkthrough');
    await expect(player.getByRole('navigation', { name: 'Story sections', exact: true }).getByRole('button')).toHaveCount(5);
    const solution = player.getByRole('button', { name: 'Go to section 3: Solution', exact: true });
    await expect(solution).toHaveCount(1);
    await solution.click();
    const buttons = player.getByRole('group', { name: 'Solution steps', exact: true }).getByRole('button');
    await expect(buttons).toHaveCount(3);
    for (let index = 0; index < 3; index++) {
      await buttons.nth(index).click();
      await expect(buttons.nth(index)).toHaveAttribute('aria-pressed', 'true');
      await expect(solution).toHaveAttribute('aria-current', 'step');
      await expect(player.locator('[data-solution-step]')).toHaveAttribute('data-solution-step', String(index + 1));
      await expect(player.locator('#cod-film-scene-title')).toHaveText(solutionSteps[caseId][index].title);
      if (caseHighlights[caseId]) {
        await expect(player).toHaveAttribute('data-presentation', 'guided');
        await expect(player.locator('#case-player-solution-detail')).toHaveCount(0);
        await expect(player.locator('.walkthrough-guide')).toBeVisible();
        await expect(player.locator('.cod-film-stage details')).toHaveCount(0);
      } else {
        await expect(player.locator('#case-player-solution-detail dt')).toHaveText([
          'What the user does', 'What the design makes clear', 'Why this step matters'
        ]);
      }
      if (caseId !== 'bikecare') {
        const screen = solutionScreens[caseId]?.[index];
        const image = player.locator('.case-solution-screen img');
        if (screen) {
          await expect(player.locator('.case-solution-screen .case-screen-explanation')).toHaveText(
            screen.explanation || explainCaseScreen(screen.src));
          await expect(image).toHaveAttribute('src', screen.src);
          await image.evaluate(node => node.decode());
          expect(await image.evaluate(node => [node.naturalWidth, node.naturalHeight])).toEqual([screen.width, screen.height]);
          const bounds = await image.boundingBox();
          expect(bounds.width / bounds.height).toBeCloseTo(screen.width / screen.height, 2);
          expect(bounds.width).toBeLessThanOrEqual(screen.width);
          expect(bounds.height).toBeLessThanOrEqual(screen.height);
        } else {
          await expect(image).toHaveCount(0);
        }
      }
      await player.getByRole('button', { name: 'Play', exact: true }).click();
      await expect(player.locator('.cod-film-status')).toContainText(`Scene ${index + 3} of 7 / Narrating`);
      expect(await page.evaluate(() => window.__narration.spoken.at(-1).text)).toBe(recorded.cases[caseId][index + 2].text);
    }
    await player.getByRole('button', { name: 'Close cinematic walkthrough', exact: true }).click();
  }
});

test('opening the original Solution screen pauses narration and preserves the case page', async ({ page }) => {
  await mockVoice(page);
  const player = await openPlayer(page);
  await choose(player, 2);
  await player.getByRole('button', { name: 'Play', exact: true }).click();
  await expect(player.locator('.cod-film-status')).toContainText('Narrating');
  const originalURL = page.url();
  const [source] = await Promise.all([
    page.waitForEvent('popup'),
    player.getByRole('link', { name: 'Open original screen (opens in a new tab)' }).click()
  ]);
  await source.waitForLoadState();
  await expect(source).toHaveURL(/\/assets\/wizard-chart-family\.png$/);
  await expect(player.getByRole('button', { name: 'Play', exact: true })).toBeVisible();
  expect(page.url()).toBe(originalURL);
  await source.close();
  await player.getByRole('button', { name: 'Close cinematic walkthrough', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Walkthrough', exact: true }).first()).toBeFocused();
});

test('BikeCare changes original screens with narration and pauses for manual inspection', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await mockVoice(page);
  const player = await openPlayer(page, 'bikecare');
  for (const [index, first, middle, last] of [
    [2, 'jobcard', 'estimate', 'estimate'],
    [3, 'review', 'service-feedback', 'history'],
    [4, 'supplier', 'ride', 'ride']
  ]) {
    await choose(player, index, 'Business case');
    const image = player.locator('.bikecare-solution-evidence img');
    await expect(image).toHaveAttribute('src', `/assets/bikecare-mobile-${first}.webp`);
    const description = player.locator('.bikecare-solution-evidence .case-screen-explanation');
    await expect(description).toHaveText(explainCaseScreen(`/assets/bikecare-mobile-${first}.webp`));
    await image.evaluate(node => node.decode());
    const bounds = await image.boundingBox();
    expect(bounds.width).toBeGreaterThanOrEqual(100);
    expect(bounds.width / bounds.height).toBeCloseTo(390 / 844, 2);
    await player.getByRole('button', { name: 'Play', exact: true }).click();
    for (const [fraction, expected] of [[0.4, middle], [0.8, last]]) {
      await page.evaluate(({ seconds, fraction }) => {
        const audio = window.__narration.current;
        audio.currentTime = seconds * fraction;
        audio.dispatchEvent(new Event('timeupdate'));
      }, { seconds: recorded.cases.bikecare[index].seconds, fraction });
      await expect(image).toHaveAttribute('src', `/assets/bikecare-mobile-${expected}.webp`);
      await expect(description).toHaveText(explainCaseScreen(`/assets/bikecare-mobile-${expected}.webp`));
    }
    await player.getByRole('group', { name: 'Solution design screens' }).getByRole('button').first().click();
    await expect(player.getByRole('button', { name: 'Play', exact: true })).toBeVisible();
    await expect(image).toHaveAttribute('src', `/assets/bikecare-mobile-${first}.webp`);
    await player.getByRole('button', { name: 'Play', exact: true }).click();
    await expect(image).toHaveAttribute('src', `/assets/bikecare-mobile-${last}.webp`);
  }
});

test('selected walkthrough screens explain the exact controls and states shown', async ({ page }) => {
  test.setTimeout(60000);
  await mockVoice(page);
  const checks = [
    ['powertable', 2, 'fabric-gantt-configuration.png', /task.*date|date.*task/i, /Start Date/i],
    ['column-mapping', 4, 'fabric-mapping-resource.png', /resource.*identifier/i, /Resource Table/i],
    ['gantt-configuration', 3, 'fabric-gantt-config-dependency.png', /connector color, line type, and stroke/i, /Connector controls/i],
    ['gantt-configuration', 4, 'fabric-gantt-config-label.png', /font size.*text color/i, /Enable Data Label/i],
    ['resource-configuration', 3, 'fabric-resource-config-data-color.png', /fill.*summary.bar color/i, /Summary bar/i],
    ['resource-configuration', 4, 'fabric-resource-config-label.png', /adaptive labels/i, /Adaptive Label/i],
    ['analytics-plus', 3, 'storyboard-editor.png', /Storyboard.*authoring/i, /composed canvas|authoring canvas/i],
    ['kpi', 3, 'kpi-variance.png', /Variance presets/i, /Variance presets/i],
    ['kpi', 4, 'kpi-preset-library.png', /original pattern sheet/i, /original sheet/i]
  ];
  for (const [route, index, filename, speech, focus] of checks) {
    const player = await openPlayer(page, route);
    await choose(player, index);
    await expect(player.locator('.case-solution-screen img')).toHaveAttribute('src', `/assets/${filename}`);
    await expect(player.locator('.case-solution-screen img')).toHaveAttribute('alt', /./);
    await expect(player.locator('.cod-film-captions p')).toContainText(speech);
    await expect(player.locator('.case-evidence-sequence,.case-evidence-focus')).toHaveCount(0);
    await expect(player.locator('.case-player-error')).toHaveCount(0);
    await expect(player.locator('.cod-film-stage')).not.toHaveClass(/has-motion/);
    await player.getByRole('button', { name: 'Play', exact: true }).click();
    await expect(player.locator('.cod-film-status')).toContainText('Narrating');
    await expect(player.locator('.cod-film-stage')).toHaveClass(/has-motion/);
    await player.getByRole('button', { name: 'Close cinematic walkthrough', exact: true }).click();
  }
});

test('seven native completion events advance the story and keep Solution grouped through all three scenes', async ({ page }) => {
  await mockVoice(page);
  const player = await openPlayer(page);
  for (const [index, clip] of recorded.cases.wizard.entries()) {
    await expect(player.locator('.cod-film-status')).toContainText(`Scene ${index + 1} of 7 / Narrating`);
    await expect(player.locator('.cod-film-captions p')).toHaveText(clip.text);
    if (index >= 2 && index <= 4) {
      await expect(player.getByRole('button', { name: 'Go to section 3: Solution', exact: true })).toHaveAttribute('aria-current', 'step');
    }
    await page.evaluate(() => window.__narration.current.dispatchEvent(new Event('ended')));
  }
  await expect(player.locator('.cod-film-status')).toContainText('Story complete');
  await player.getByRole('button', { name: 'Replay story', exact: true }).click();
  await expect(player.locator('.cod-film-status')).toContainText('Scene 1 of 7 / Narrating');
  await player.getByRole('button', { name: 'Close cinematic walkthrough', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Walkthrough', exact: true }).first()).toBeFocused();
  await expect(page.locator('body')).not.toHaveClass(/preview-open/);
});

test('recorded scripts match current content and unchanged narration retains its existing recording', () => {
  for (const [caseId] of cases.filter(([id]) => !standaloneNarration[id])) {
    const clips = recorded.cases[caseId];
    for (const [oldIndex, newIndex] of [[0, 0], [1, 1], [3, 5], [4, 6]]) {
      if (clips[newIndex].text === previous.cases[caseId][oldIndex].text) {
        expect(clips[newIndex].file).toBe(previous.cases[caseId][oldIndex].file);
      }
    }
    expect(clips.slice(2, 5).map(clip => clip.text)).toEqual(solutionNarration[caseId]);
    expect(new Set(clips.slice(2, 5).map(clip => clip.file)).size).toBe(3);
  }
  const spoken = createCaseNarration({
    caseId: 'wizard', problem: 'UX/UI for KPI templates in Power BI and Analytics+.', hasScreen: true, official: false
  });
  expect(spoken[1]).toContain('user experience and interface design for K P I templates in Power B I and Analytics Plus');
});

test('exploration, contribution and spatial boundaries remain explicit without invented product evidence', async ({ page }) => {
  await mockVoice(page);
  let player = await openPlayer(page, 'gantt-baselines');
  await choose(player, 6);
  await expect(player.locator('.cod-film-captions')).toContainText('exploration');
  await player.getByRole('button', { name: 'Play', exact: true }).click();
  expect(await page.evaluate(() => window.__narration.spoken.at(-1).text)).toContain('still an exploration');
  player = await openPlayer(page, 'crosstab');
  await choose(player, 5);
  await expect(player.locator('.case-film-source-screen')).toHaveCount(0);
  await expect(player.locator('.walkthrough-guide-cue')).toHaveCount(0);
  await expect(player.locator('.cod-film-captions p')).toHaveText(recorded.cases.crosstab[5].text);
  await choose(player, 6);
  await expect(player.locator('.cod-film-captions')).toHaveText(/contribution/i);
  player = await openPlayer(page, 'analytics-spatial');
  await choose(player, 5);
  await expect(player.locator('.case-film-source-screen')).toHaveAttribute('href', '/assets/analytics-spatial-sequence.png');
  await choose(player, 6);
  await expect(player.locator('.case-film-copy')).toHaveCount(0);
  await expect(player.locator('.cod-film-captions')).toContainText('no Vision Pro release');
});

test('keyboard activation uses packaged narration, never browser speech or a live voice service', async ({ page }) => {
  await mockVoice(page);
  await page.addInitScript(() => {
    Object.defineProperty(window, 'speechSynthesis', { value: {
      getVoices() { throw new Error('Browser voice lookup must not be used.'); },
      speak() { throw new Error('Browser speech must not be used.'); }
    } });
  });
  const api = [];
  page.on('request', request => { if (request.url().includes(':4176/')) api.push(request.url()); });
  await page.goto('/analytics.html');
  await page.getByRole('button', { name: 'Walkthrough', exact: true }).first().focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.cod-film-status')).toContainText('Narrating');
  expect(await page.evaluate(() => window.__narration.spoken[0])).toMatchObject({ name: 'Energetic tech-explainer' });
  expect(api).toEqual([]);
});

test('AAC narration supports native byte ranges', async ({ page, request }) => {
  await mockVoice(page);
  const player = await openPlayer(page);
  await expect(player.locator('audio')).toHaveAttribute('src', /\.m4a$/);
  const source = await player.locator('audio').getAttribute('src');
  const first = await request.get(source, { headers: { Range: 'bytes=0-7' } });
  expect(first.status()).toBe(206);
  expect(first.headers()['content-type']).toBe('audio/mp4');
  expect((await first.body()).toString('ascii', 4)).toBe('ftyp');
  const tail = await request.get(source, { headers: { Range: 'bytes=-8' } });
  expect(tail.status()).toBe(206);
  expect((await tail.body()).length).toBe(8);
  const invalid = await request.get(source, { headers: { Range: 'bytes=999999999-1000000000' } });
  expect(invalid.status()).toBe(416);
});

for (const [caseId, route] of cases) {
  test(`all seven ${caseId} recordings decode and play as native packaged media`, async ({ page }) => {
    test.setTimeout(60000);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const mediaRequests = [];
    page.on('request', request => { if (request.url().endsWith('.m4a')) mediaRequests.push(request.url()); });
    await page.goto(`/${route}.html`);
    expect(mediaRequests).toEqual([]);
    await page.getByRole('button', { name: 'Walkthrough', exact: true }).first().click();
    const player = page.locator('.cod-film-player');
    for (let index = 0; index < 7; index++) {
      await choose(player, index, caseId === 'bikecare' ? 'Business case' : 'Scope');
      await player.getByRole('button', { name: 'Read this scene', exact: true }).click();
      const audio = player.locator('audio');
      await expect(audio).toHaveAttribute('src', new RegExp(recorded.cases[caseId][index].file.replace('.m4a', '')));
      await expect.poll(() => audio.evaluate(media => !media.paused && media.readyState >= 2 && media.currentTime > 0)).toBe(true);
      await player.getByRole('button', { name: 'Pause', exact: true }).click();
      await expect.poll(() => audio.evaluate(media => media.paused)).toBe(true);
    }
    await player.getByRole('button', { name: 'Finish', exact: true }).click();
    await expect(player).toHaveCount(0);
  });
}

test('pause preserves position and muting never reloads a recording', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const player = await openPlayer(page);
  await choose(player, 3);
  await player.getByRole('button', { name: 'Read this scene', exact: true }).click();
  const audio = player.locator('audio');
  await expect.poll(() => audio.evaluate(media => media.currentTime > .3)).toBe(true);
  await player.getByRole('button', { name: 'Pause', exact: true }).click();
  const position = await audio.evaluate(media => media.currentTime);
  await player.getByRole('button', { name: 'Voice on', exact: true }).click();
  expect(await audio.evaluate(media => media.currentTime)).toBeCloseTo(position, 1);
  await player.getByRole('button', { name: 'Read this scene', exact: true }).click();
  await expect.poll(() => audio.evaluate(media => media.currentTime), { timeout: 5000 }).toBeGreaterThan(position);
  await expect(audio).toHaveJSProperty('muted', true);
});

test('missing media fails explicitly and manual scene controls remain usable', async ({ page }) => {
  await page.route('**/*.m4a', route => route.fulfill({ status: 404, body: 'Missing recording' }));
  const player = await openPlayer(page);
  await expect(player.getByRole('alert')).toContainText('This recording could not play');
  await expect(player.locator('.cod-film-status')).toContainText('Paused');
  await player.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(player.locator('.cod-film-status')).toContainText('Scene 2 of 7 / Paused');
  await expect(player.locator('.cod-film-captions p')).toHaveText(recorded.cases.wizard[1].text);
});

test('stale errors cannot interrupt a newly selected scene and stalled media cannot silently advance', async ({ page }) => {
  await page.clock.install();
  await mockVoice(page);
  const player = await openPlayer(page);
  await expect(player.locator('.cod-film-status')).toContainText('Narrating');
  await page.evaluate(() => { window.__oldFailure = window.__narration.current.onerror; });
  await player.getByRole('button', { name: 'Next', exact: true }).click();
  await player.getByRole('button', { name: 'Play', exact: true }).click();
  await page.evaluate(() => window.__oldFailure());
  await expect(player.getByRole('alert')).toHaveCount(0);
  await expect(player.locator('.cod-film-status')).toContainText('Scene 2 of 7 / Narrating');
  await page.clock.fastForward(121000);
  await expect(player.getByRole('alert')).toContainText('This recording could not play');
  await expect(player.locator('.cod-film-status')).toContainText('Scene 2 of 7 / Paused');
});

test('muted narration still advances from native completion and replays without undoing mute', async ({ page }) => {
  await mockVoice(page);
  const player = await openPlayer(page);
  await player.getByRole('button', { name: 'Voice on', exact: true }).click();
  expect(await page.evaluate(() => window.__narration.spoken.length)).toBe(1);
  for (let index = 0; index < 7; index++) {
    await expect(player.locator('.cod-film-status')).toContainText(`Scene ${index + 1} of 7 / Playing muted`);
    await page.evaluate(() => window.__narration.current.dispatchEvent(new Event('ended')));
  }
  await player.getByRole('button', { name: 'Replay story', exact: true }).click();
  await expect(player.locator('.cod-film-status')).toContainText('Scene 1 of 7 / Playing muted');
  await expect(player.locator('audio')).toHaveJSProperty('muted', true);
});

test('reduced motion is manual, keyboard selection has no animation, and Escape restores focus', async ({ page }) => {
  await page.clock.install();
  await mockVoice(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const player = await openPlayer(page);
  await page.clock.fastForward(30000);
  expect(await page.evaluate(() => window.__narration.spoken)).toEqual([]);
  await expect(player.locator('.cod-film-status')).toContainText('Scene 1 of 7 / Manual mode');
  await player.getByRole('button', { name: 'Read this scene', exact: true }).click();
  await page.evaluate(() => window.__narration.current.dispatchEvent(new Event('ended')));
  await expect(player.locator('.cod-film-status')).toContainText('Scene 1 of 7 / Manual mode');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const context = player.getByRole('button', { name: 'Go to section 1: Context', exact: true });
  await context.focus();
  await page.keyboard.press('ArrowRight');
  await expect(player.locator('.cod-film-stage')).not.toHaveClass(/has-motion/);
  await expect(player.locator('.cod-film-status')).toContainText('Scene 2 of 7 / Paused');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Walkthrough', exact: true }).first()).toBeFocused();
});

test('page hiding pauses narration without later advancement', async ({ page }) => {
  await page.clock.install();
  await mockVoice(page);
  const player = await openPlayer(page);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.clock.fastForward(70000);
  await expect(player.locator('.cod-film-status')).toContainText('Scene 1 of 7 / Paused');
});

test('guide character follows narration, mute, pause and live reduced motion without extra reading', async ({ page }) => {
  await mockVoice(page);
  const player = await openPlayer(page);
  const guide = player.locator('.walkthrough-guide');
  const character = guide.locator('.walkthrough-guide-character > img');
  await expect(character).toHaveAttribute('src', '/assets/studio-mascot-peach.webp');
  await expect(guide).toHaveAttribute('data-speaking', 'true');
  await player.locator('#cod-film-scene-title').click();
  await expect(character).toHaveCSS('animation-name', 'walkthrough-guide-gesture');
  await expect(guide.locator('.walkthrough-guide-cue,.walkthrough-guide-bubble')).toHaveCount(0);
  await expect(character).toHaveCSS('width', '32px');
  await expect(player.locator('.case-film-copy,.case-film-detail,details,.cod-film-beat')).toHaveCount(0);
  await expect(player.locator('.cod-film-captions p')).toHaveText(recorded.cases.wizard[0].text);
  await player.getByRole('button', { name: 'Voice on', exact: true }).click();
  await expect(guide).toHaveAttribute('data-speaking', 'false');
  await expect(character).toHaveCSS('animation-name', 'none');
  await expect(player.locator('.cod-film-status')).toContainText('Playing muted');
  await player.getByRole('button', { name: 'Voice off', exact: true }).click();
  await expect(guide).toHaveAttribute('data-speaking', 'true');
  await player.getByRole('button', { name: 'Pause', exact: true }).click();
  await expect(guide).toHaveAttribute('data-speaking', 'false');
  await expect(character).toHaveCSS('animation-name', 'none');
  await player.getByRole('button', { name: 'Play', exact: true }).click();
  await expect(guide).toHaveAttribute('data-speaking', 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(guide).toHaveAttribute('data-speaking', 'false');
  await expect(character).toHaveCSS('animation-name', 'none');
  await expect(player.locator('.cod-film-status')).toContainText('Manual mode');
  await player.getByRole('button', { name: 'Read this scene', exact: true }).click();
  await expect(guide).toHaveAttribute('data-speaking', 'true');
  await expect(character).toHaveCSS('animation-name', 'none');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Walkthrough', exact: true }).first()).toBeFocused();
});

for (const [width, height] of [[320, 812], [390, 844], [768, 900], [1440, 1000], [844, 390]]) {
  for (const appearance of ['light', 'dark']) {
    test(`captions, grouped solution controls and honest evidence fit ${appearance} at ${width}x${height}`, async ({ page }) => {
      await mockVoice(page);
      await page.setViewportSize({ width, height });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript(theme => localStorage.setItem('portfolio-appearance', theme), appearance);
      const player = await openPlayer(page);
      await expect(page.locator('html')).toHaveAttribute('data-theme', appearance);
      await choose(player, 3);
      const buttons = player.getByRole('group', { name: 'Solution steps', exact: true }).getByRole('button');
      await buttons.nth(1).focus();
      await page.keyboard.press('End');
      await expect(buttons.last()).toBeFocused();
      await expect(player.locator('[data-solution-step]')).toHaveAttribute('data-solution-step', '3');
      await page.keyboard.press('Home');
      await expect(buttons.first()).toBeFocused();
      await expect(player.locator('[data-solution-step]')).toHaveAttribute('data-solution-step', '1');
      await expect(player.locator('.case-film-detail')).toHaveCount(0);
      await expect(player.locator('.walkthrough-guide')).toBeVisible();
      await expect(player.locator('.cod-film-captions p')).toHaveText(recorded.cases.wizard[2].text);
      expect(await player.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
      if (height > 600) {
        await expect(player.locator('.cod-film-captions')).toBeInViewport();
        await expect(player.getByRole('button', { name: 'Read this scene', exact: true })).toBeInViewport();
      }
      await choose(player, 5);
      await expect(player.locator('.case-film-source-screen img')).toHaveAttribute('alt', /./);
      await player.locator('.case-film-source-screen img').evaluate(image => image.decode());
      await choose(player, 6);
      await expect(player.locator('details')).toHaveCount(0);
      await expect(player.locator('.walkthrough-guide-cue')).toHaveCount(0);
      await expect(player.locator('.cod-film-captions p')).toHaveText(recorded.cases.wizard[6].text);
      const bounds = await player.boundingBox();
      expect(bounds.y).toBeGreaterThanOrEqual(0);
      expect(bounds.y + bounds.height).toBeLessThanOrEqual(height);
      await player.getByRole('button', { name: 'Finish', exact: true }).click();
      await expect(player).toHaveCount(0);
    });
  }
}
