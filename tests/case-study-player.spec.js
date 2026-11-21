import { test, expect } from './fixtures.js';
import { createCaseNarration } from '../src/case-narration.js';

async function mockVoice(page, available = true, { indian = true } = {}) {
  await page.addInitScript(({ available, indian }) => {
    const speech = new EventTarget();
    window.__narration = { spoken: [], current: null, cancels: 0 };
    speech.getVoices = () => [
      { name: 'Remote Indian English', lang: 'en-IN', default: true, localService: false },
      ...(available ? [
        { name: 'Local English', lang: 'en-US', default: true, localService: true },
        { name: 'Tara', lang: 'en-IN', default: true, localService: true },
        ...(indian ? [{ name: 'Rishi', lang: 'en-IN', default: false, localService: true }] : [])
      ] : [])
    ];
    speech.speak = utterance => {
      window.__narration.current = utterance;
      window.__narration.spoken.push({ text: utterance.text, local: utterance.voice.localService, language: utterance.lang, name: utterance.voice.name });
      queueMicrotask(() => utterance.onstart?.());
    };
    speech.cancel = () => { window.__narration.cancels++; };
    Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: speech });
    Object.defineProperty(window, 'SpeechSynthesisUtterance', {
      configurable: true, value: class { constructor(text) { this.text = text; } }
    });
  }, { available, indian });
}

async function openPlayer(page, route = '/analytics.html') {
  await page.goto(route);
  const trigger = page.locator('.case-player-entry').getByRole('button', { name: 'Walkthrough', exact: true });
  await expect(trigger).toBeVisible();
  await trigger.click();
  return page.getByRole('dialog', { name: 'The story behind the design.', exact: true });
}

test.use({ reducedMotion: 'no-preference' });

test('every case has an opt-in walkthrough and never starts narration on page load', async ({ page }) => {
  await mockVoice(page);
  for (const route of [
    'powertable', 'column-mapping', 'gantt-baselines', 'gantt-backlog', 'gantt-configuration',
    'gantt-conditional-formatting', 'resource-configuration', 'crosstab',
    'analytics-plus', 'analytics', 'storyboard', 'gantt', 'presentation', 'kpi'
  ]) {
    await page.goto(`/${route}.html`);
    const heroTrigger = page.locator('.case-presentation-hero').getByRole('button', { name: 'Walkthrough', exact: true });
    if (['powertable', 'analytics-plus'].includes(route)) await expect(heroTrigger).toHaveCount(0);
    else await expect(heroTrigger).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Case study chapters', exact: true }).getByRole('button', { name: 'Walkthrough', exact: true })).toBeVisible();
    await expect(page.locator('.case-player')).toHaveCount(0);
    expect(await page.evaluate(() => window.__narration.spoken)).toEqual([]);
  }
});

test('local narration controls automatic steps, can pause, and stops on close', async ({ page }) => {
  await page.clock.install();
  await mockVoice(page);
  const player = await openPlayer(page);
  await expect(player).toBeVisible();
  await expect(player.locator('.case-player-status')).toContainText('Step 1 of 5 / Narrating');
  expect(await page.evaluate(() => window.__narration.spoken[0])).toMatchObject({ local: true, language: 'en-IN', name: 'Rishi' });
  await expect(player.getByText('Indian male English narration / Rishi.', { exact: false })).toBeVisible();
  expect(await page.evaluate(() => window.__narration.spoken[0].text)).toContain('I worked on the full Chart Wizard flow');
  expect(await page.evaluate(() => window.__narration.spoken[0].text)).not.toContain('My role:');
  await page.clock.fastForward(20000);
  await expect(player.locator('.case-player-status')).toContainText('Step 1 of 5');
  await page.evaluate(() => window.__narration.current.onend());
  await page.clock.runFor(750);
  await expect(player.locator('.case-player-status')).toContainText('Step 2 of 5 / Narrating');
  await player.getByRole('button', { name: 'Pause', exact: true }).click();
  await page.clock.fastForward(20000);
  await expect(player.locator('.case-player-status')).toContainText('Step 2 of 5 / Paused');
  await player.getByRole('button', { name: 'Play from here', exact: true }).click();
  await expect(player.locator('.case-player-status')).toContainText('Narrating');
  await player.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(player.locator('.case-player-status')).toContainText('Step 3 of 5 / Paused');
  await player.getByRole('button', { name: 'Close case study walkthrough', exact: true }).click();
  await expect(player).toHaveCount(0);
  await expect(page.locator('.case-player-entry').getByRole('button', { name: 'Walkthrough', exact: true })).toBeFocused();
  await expect(page.locator('body')).not.toHaveClass(/preview-open/);
  const count = await page.evaluate(() => window.__narration.spoken.length);
  await page.clock.fastForward(70000);
  expect(await page.evaluate(() => window.__narration.spoken.length)).toBe(count);
  expect(await page.evaluate(() => window.__narration.cancels)).toBeGreaterThan(0);
});

test('spoken explanations connect decisions without reading labels or swallowing acronyms', async ({ page }) => {
  await mockVoice(page);
  const player = await openPlayer(page);
  await player.getByRole('button', { name: 'Go to step 3: Decisions', exact: true }).click();
  await player.getByRole('button', { name: 'Play from here', exact: true }).click();
  const text = await page.evaluate(() => window.__narration.spoken.at(-1).text);
  expect(text).toContain("Here's how I approached it.");
  expect(text).toContain('both routes come together');
  expect(text).not.toContain('What I designed');
  const spoken = createCaseNarration({
    caseId: 'wizard', problem: 'UX/UI for KPI templates in Power BI and Analytics+.', hasScreen: true, official: false
  });
  expect(spoken[1]).toContain('user experience and interface design for K P I templates in Power B I and Analytics Plus');
});

test('one studio companion guides all five steps without adding extra narration', async ({ page }) => {
  await mockVoice(page);
  const player = await openPlayer(page);
  const guide = player.locator('.case-player-guide');
  await expect(guide).toHaveCount(1);
  const mascot = guide.locator('img');
  await mascot.evaluate(image => image.decode());
  await expect(mascot).toHaveAttribute('src', '/assets/studio-mascot-peach.webp');
  await expect(mascot).toHaveAttribute('alt', '');
  await expect(mascot).toHaveCSS('width', '44px');
  for (const [index, label, copy] of [
    [1, 'Context', "Let's start with the context."],
    [2, 'Problem', "Here's the problem behind the work."],
    [3, 'Decisions', "Let's unpack the design decisions."],
    [4, 'Evidence', "Let's take a closer look at the evidence."],
    [5, 'Delivery', "Here's the delivery and its scope."]
  ]) {
    await player.getByRole('button', { name: `Go to step ${index}: ${label}`, exact: true }).click();
    await expect(guide).toHaveCount(1);
    await expect(guide).toContainText(copy);
  }
  expect(await page.evaluate(() => window.__narration.spoken.length)).toBe(1);
});

test('conversational narration retains exploration and contribution boundaries', async ({ page }) => {
  await mockVoice(page);
  let player = await openPlayer(page, '/gantt-baselines.html');
  await player.getByRole('button', { name: 'Go to step 5: Delivery', exact: true }).click();
  await player.getByRole('button', { name: 'Play from here', exact: true }).click();
  expect(await page.evaluate(() => window.__narration.spoken.at(-1).text)).toContain('still an exploration');
  await player.getByRole('button', { name: 'Close case study walkthrough', exact: true }).click();
  player = await openPlayer(page, '/crosstab.html');
  await player.getByRole('button', { name: 'Go to step 4: Evidence', exact: true }).click();
  await player.getByRole('button', { name: 'Play from here', exact: true }).click();
  const text = await page.evaluate(() => window.__narration.spoken.at(-1).text);
  expect(text).toContain("no dedicated design screen supplied");
  expect(text).toContain("not a final interface");
});

test('keyboard activation also automatically starts the Indian-English walkthrough', async ({ page }) => {
  await mockVoice(page);
  await page.goto('/analytics.html');
  await page.locator('.case-player-entry').getByRole('button', { name: 'Walkthrough', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.case-player-status')).toContainText('Step 1 of 5 / Narrating');
  expect(await page.evaluate(() => window.__narration.spoken[0])).toMatchObject({ language: 'en-IN', local: true });
});

test('female and US voices are not substituted for the requested Indian male voice', async ({ page }) => {
  await mockVoice(page, true, { indian: false });
  const player = await openPlayer(page);
  await expect(player.getByText('No local Indian male English voice is available here. The visual walkthrough still works.')).toBeVisible();
  await expect(player.getByRole('button', { name: 'Voice unavailable', exact: true })).toBeDisabled();
  await expect(player.locator('.case-player-status')).toContainText('Playing');
  expect(await page.evaluate(() => window.__narration.spoken)).toEqual([]);
});

test('a later-loaded Indian male voice automatically starts after the visitor pressed Play', async ({ page }) => {
  await mockVoice(page, true, { indian: false });
  const player = await openPlayer(page);
  expect(await page.evaluate(() => window.__narration.spoken)).toEqual([]);
  await page.evaluate(() => {
    const installed = speechSynthesis.getVoices();
    speechSynthesis.getVoices = () => [...installed, { name: 'Rishi', lang: 'en-IN', localService: true, default: false }];
    speechSynthesis.dispatchEvent(new Event('voiceschanged'));
  });
  await expect(player.getByText('Indian male English narration / Rishi.', { exact: false })).toBeVisible();
  expect(await page.evaluate(() => window.__narration.spoken.at(-1))).toMatchObject({ language: 'en-IN', local: true, name: 'Rishi' });
  await expect(player.locator('.case-player-status')).toContainText('Step 1 of 5 / Narrating');
});

test('voice availability updates do not undo explicit muting', async ({ page }) => {
  await mockVoice(page);
  const player = await openPlayer(page);
  await player.getByRole('button', { name: 'Voice on', exact: true }).click();
  const count = await page.evaluate(() => window.__narration.spoken.length);
  await page.evaluate(() => speechSynthesis.dispatchEvent(new Event('voiceschanged')));
  await expect(player.getByRole('button', { name: 'Voice off', exact: true })).toHaveAttribute('aria-pressed', 'false');
  expect(await page.evaluate(() => window.__narration.spoken.length)).toBe(count);
  await expect(player.locator('.case-player-status')).toContainText('Playing');
});

test('a visual walkthrough stays usable without a local voice, finishes once, and can replay', async ({ page }) => {
  await page.clock.install();
  await mockVoice(page, false);
  const player = await openPlayer(page, '/gantt-baselines.html');
  await expect(player.getByText('No local Indian male English voice is available here. The visual walkthrough still works.')).toBeVisible();
  await expect(player.getByRole('button', { name: 'Voice unavailable', exact: true })).toBeDisabled();
  await page.clock.fastForward(19000);
  await expect(player.locator('.case-player-status')).toContainText('Step 2 of 5');
  await player.getByRole('button', { name: 'Go to step 5: Delivery', exact: true }).click();
  await expect(player.locator('.case-player-copy')).toContainText('remains an exploration');
  await player.getByRole('button', { name: 'Play from here', exact: true }).click();
  await page.clock.fastForward(19000);
  await expect(player.locator('.case-player-status')).toContainText('Walkthrough complete');
  await page.clock.fastForward(60000);
  await expect(player.locator('.case-player-status')).toContainText('Step 5 of 5');
  await player.getByRole('button', { name: 'Replay', exact: true }).click();
  await expect(player.locator('.case-player-status')).toContainText('Step 1 of 5 / Playing');
  expect(await page.evaluate(() => window.__narration.spoken)).toEqual([]);
});

test('voice failures are explicit and readers can continue without voice', async ({ page }) => {
  await page.clock.install();
  await mockVoice(page);
  const player = await openPlayer(page);
  await page.evaluate(() => window.__narration.current.onerror({ error: 'synthesis-failed' }));
  await expect(player.getByRole('alert')).toContainText('Voice playback could not finish');
  await expect(player.locator('.case-player-status')).toContainText('Paused');
  await player.getByRole('button', { name: 'Voice on', exact: true }).click();
  await player.getByRole('button', { name: 'Play from here', exact: true }).click();
  await page.clock.fastForward(19000);
  await expect(player.locator('.case-player-status')).toContainText('Step 2 of 5 / Playing');
});

test('a removed voice cannot trap the player in voice mode', async ({ page }) => {
  await page.clock.install();
  await mockVoice(page);
  const player = await openPlayer(page);
  await page.evaluate(() => {
    speechSynthesis.getVoices = () => [];
    speechSynthesis.dispatchEvent(new Event('voiceschanged'));
    window.__narration.current.onend();
  });
  await page.clock.runFor(750);
  await expect(player.getByRole('alert')).toContainText('no longer available');
  await player.getByRole('button', { name: 'Voice on', exact: true }).click();
  await player.getByRole('button', { name: 'Play from here', exact: true }).click();
  await expect(player.locator('.case-player-status')).toContainText('Playing');
});

test('stalled narration pauses with a recoverable error instead of silently advancing', async ({ page }) => {
  await page.clock.install();
  await mockVoice(page);
  const player = await openPlayer(page);
  await page.clock.fastForward(61000);
  await expect(player.getByRole('alert')).toContainText('Voice playback could not finish');
  await expect(player.locator('.case-player-status')).toContainText('Step 1 of 5 / Paused');
});

test('reduced motion is manual, keyboard browsing pauses playback, and Escape restores focus', async ({ page }) => {
  await page.clock.install();
  await mockVoice(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const player = await openPlayer(page);
  await expect(player.locator('.case-player-status')).toContainText('Manual mode');
  await page.clock.fastForward(30000);
  await expect(player.locator('.case-player-status')).toContainText('Step 1 of 5');
  expect(await page.evaluate(() => window.__narration.spoken)).toEqual([]);
  await player.getByRole('button', { name: 'Read this step', exact: true }).click();
  await page.evaluate(() => window.__narration.current.onend());
  await page.clock.runFor(750);
  await expect(player.locator('.case-player-status')).toContainText('Step 1 of 5 / Manual mode');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await player.getByRole('button', { name: 'Play from here', exact: true }).click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(player.locator('.case-player-status')).toContainText('Manual mode');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await player.getByRole('button', { name: 'Play from here', exact: true }).click();
  await page.keyboard.press('Tab');
  await expect(player.locator('.case-player-status')).toContainText('Paused');
  await page.keyboard.press('Escape');
  await expect(player).toHaveCount(0);
  await expect(page.locator('.case-player-entry').getByRole('button', { name: 'Walkthrough', exact: true })).toBeFocused();
});

test('short landscape layouts keep the story and controls reachable', async ({ page }) => {
  await mockVoice(page, false);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 844, height: 390 });
  const player = await openPlayer(page);
  await player.getByRole('button', { name: 'Go to step 3: Decisions', exact: true }).click();
  await expect(player.locator('.case-player-copy')).toContainText('What I designed');
  await player.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(player.locator('.case-player-status')).toContainText('Step 4 of 5');
  const bounds = await player.boundingBox();
  expect(bounds.y).toBeGreaterThanOrEqual(0);
  expect(bounds.y + bounds.height).toBeLessThanOrEqual(390);
  expect(await player.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
  await player.getByRole('button', { name: 'Close case study walkthrough', exact: true }).click();
  await expect(player).toHaveCount(0);
});

test('hiding the page stops narration and automatic advancement', async ({ page }) => {
  await page.clock.install();
  await mockVoice(page);
  const player = await openPlayer(page);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect(player.locator('.case-player-status')).toContainText('Paused');
  await page.clock.fastForward(70000);
  await expect(player.locator('.case-player-status')).toContainText('Step 1 of 5');
});

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`walkthrough controls and honest evidence fit ${appearance} at ${width}px`, async ({ page }) => {
      await mockVoice(page, false);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      await page.setViewportSize({ width, height: 844 });
      for (const route of ['/analytics.html', '/crosstab.html']) {
        const player = await openPlayer(page, route);
        await player.getByRole('button', { name: 'Go to step 4: Evidence', exact: true }).click();
        if (route === '/analytics.html') {
          const image = player.locator('.case-player-visual img');
          await image.evaluate(image => image.decode());
          await expect(image).toHaveAttribute('src', '/assets/wizard-chart-family.png');
          await expect(image).toHaveCSS('transform', 'none');
          await expect(image).toHaveCSS('filter', 'none');
          const ratio = await image.evaluate(image => ({
            original: image.naturalWidth / image.naturalHeight,
            rendered: image.getBoundingClientRect().width / image.getBoundingClientRect().height
          }));
          expect(ratio.rendered).toBeCloseTo(ratio.original, 2);
        } else {
          await expect(player.locator('.case-player-visual img')).toHaveCount(0);
          await expect(player.locator('.case-player-copy')).toContainText('Dedicated design screens were not supplied');
        }
        expect(await player.evaluate(element => {
          const bounds = element.getBoundingClientRect();
          const buttons = [...element.querySelectorAll('.case-player-controls button')].map(button => button.getBoundingClientRect());
          return bounds.x >= 0 && bounds.right <= innerWidth && bounds.y >= 0 && bounds.bottom <= innerHeight &&
            element.scrollWidth <= element.clientWidth && buttons.every(button => button.height >= 44 && button.bottom <= bounds.bottom);
        })).toBe(true);
        await player.getByRole('button', { name: 'Close case study walkthrough', exact: true }).click();
      }
    });
  }
}

test('the full readable case remains available without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto(`${baseURL}/analytics.html`);
    await expect(page.locator('.case-player-entry').getByRole('button', { name: 'Walkthrough', exact: true })).toBeHidden();
    await expect(page.locator('.case-walkthrough-tab')).toBeHidden();
    await expect(page.getByRole('link', { name: 'Read the feature case study', exact: true })).toHaveAttribute('href', '#case-overview');
    await expect(page.locator('#case-overview')).toBeVisible();
    await expect(page.locator('.case-fast-read')).toContainText('End-to-end Chart Wizard');
  } finally {
    await context.close();
  }
});

test('the Walkthrough CTA is visually compact and keeps a larger touch target', async ({ browser, baseURL }) => {
  for (const hasTouch of [false, true]) {
    const context = await browser.newContext({ hasTouch, viewport: { width: hasTouch ? 390 : 1440, height: 900 } });
    try {
      const page = await context.newPage();
      await page.goto(`${baseURL}/analytics.html`);
      const trigger = page.locator('.case-player-entry').getByRole('button', { name: 'Walkthrough', exact: true });
      await expect(trigger).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      const bounds = await trigger.boundingBox();
      expect(bounds.width).toBeLessThan(140);
      expect(bounds.height).toBe(hasTouch ? 44 : 36);
      await expect(trigger).toHaveAccessibleDescription('Guided visuals + Indian male English narration when available.');
    } finally {
      await context.close();
    }
  }
});

test('the navigation tab opens one shared player and returns focus to the tab', async ({ page }) => {
  await mockVoice(page);
  for (const route of ['/analytics.html', '/powertable.html', '/analytics-plus.html']) {
    await page.goto(route);
    const tab = page.getByRole('navigation', { name: 'Case study chapters', exact: true }).getByRole('button', { name: 'Walkthrough', exact: true });
    const url = page.url();
    await tab.click();
    await expect(page.locator('.case-player')).toHaveCount(1);
    await expect(page.locator('.case-player')).toBeVisible();
    await expect(page.locator('.case-player-status')).toContainText('Step 1 of 5 / Narrating');
    expect(await page.evaluate(() => window.__narration.spoken.at(-1).name)).toBe('Rishi');
    await page.getByRole('button', { name: 'Close case study walkthrough', exact: true }).click();
    await expect(tab).toBeFocused();
    expect(page.url()).toBe(url);
  }
});
