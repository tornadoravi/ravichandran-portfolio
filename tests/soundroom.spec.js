import { test, expect } from './fixtures.js';
import { readFile } from 'node:fs/promises';

test.use({ reducedMotion: 'reduce' });

test('the uploaded MP3 is served unchanged without external player permissions', async ({ request }) => {
  const response = await request.get('/assets/soundroom-roja.mp3');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('audio/mpeg');
  const mp3 = await response.body();
  expect(mp3.equals(await readFile(new URL('../assets/soundroom-roja.mp3', import.meta.url)))).toBe(true);
  expect(mp3.length).toBeGreaterThan(300000);
  expect((await request.head('/assets/soundroom-roja.mp3')).status()).toBe(200);
  const html = await request.get('/');
  expect(html.headers()['content-security-policy']).not.toContain('youtube');
  expect(await html.text()).not.toContain('youtube');
});

for (const width of [320, 390, 768, 1440]) {
  test(`listening modes are keyboard-accessible and fit at ${width}px`, async ({ page, baseURL }) => {
    await page.setViewportSize({ width, height: 900 });
    const audioRequests = [];
    const externalRequests = [];
    page.on('request', request => {
      if (request.url().endsWith('.mp3')) audioRequests.push(request.url());
      if (new URL(request.url()).origin !== new URL(baseURL).origin) externalRequests.push(request.url());
    });
    await page.goto('/');
    const focus = page.getByRole('button', { name: 'Focus Mode', exact: true });
    const soundroom = page.getByRole('button', { name: 'Soundroom Mode', exact: true });
    await expect(focus).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#soundroom-panel')).toBeHidden();
    expect(await page.locator('audio').evaluate(audio => audio.paused)).toBe(true);
    expect(audioRequests).toEqual([]);
    await soundroom.focus();
    await page.keyboard.press('Enter');
    await expect(soundroom).toHaveAttribute('aria-pressed', 'true');
    await expect(focus).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('#soundroom-panel')).toBeVisible();
    await expect(page.locator('#soundroom-panel p')).toHaveCount(0);
    await expect(page.locator('[data-soundroom]')).not.toContainText(/Pudhu|Instrumental|Roja/);
    await expect.poll(() => page.locator('audio').evaluate(audio => !audio.paused && audio.currentTime > 0)).toBe(true);
    expect(audioRequests).toHaveLength(1);
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(250, 249, 246)');
    await expect(page.locator('html')).toHaveAttribute('data-appearance', 'system');
    await expect(soundroom).toHaveCSS('background-color', 'rgb(239, 238, 233)');
    await expect(soundroom).toHaveCSS('color', 'rgb(41, 45, 41)');
    for (const control of await page.locator('.listening-modes button, .ambience-play, .soundroom-volume input').all()) {
      expect((await control.boundingBox()).height).toBeGreaterThanOrEqual(44);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(externalRequests).toEqual([]);
    await focus.click();
    await expect(page.locator('#soundroom-panel')).toBeHidden();
    expect(await page.locator('audio').evaluate(audio => audio.paused)).toBe(true);
  });
}

test('Soundroom plays the supplied MP3; looping, volume, pause and Focus control actual audio', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('audio')).toHaveAttribute('src', '/assets/soundroom-roja.mp3');
  await page.getByRole('button', { name: 'Soundroom Mode', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Pause ambience', exact: true })).toBeEnabled();
  await expect.poll(() => page.locator('audio').evaluate(audio => !audio.paused && audio.currentTime > 0)).toBe(true);
  const media = await page.locator('audio').evaluate(audio => ({ loop: audio.loop, volume: audio.volume, duration: audio.duration }));
  expect(media.loop).toBe(true);
  expect(media.volume).toBe(.18);
  expect(media.duration).toBeGreaterThan(21);
  expect(media.duration).toBeLessThan(22);
  await page.locator('audio').evaluate(audio => { audio.currentTime = audio.duration - .1; });
  await expect.poll(() => page.locator('audio').evaluate(audio => audio.currentTime)).toBeLessThan(1);
  const volume = page.getByRole('slider', { name: 'Volume', exact: true });
  await volume.focus();
  await page.keyboard.press('ArrowRight');
  expect(await page.locator('audio').evaluate(audio => audio.volume)).toBe(.19);
  await expect(page.locator('.soundroom-volume output')).toHaveText('19%');
  await page.locator('audio').evaluate(audio => audio.pause());
  await expect(page.getByRole('button', { name: 'Play ambience', exact: true })).toBeVisible();
  await expect(page.locator('.soundroom-status')).toHaveText('Paused. Press Play to listen.');
  await page.getByRole('button', { name: 'Play ambience', exact: true }).click();
  await page.getByRole('button', { name: 'Pause ambience', exact: true }).click();
  expect(await page.locator('audio').evaluate(audio => audio.paused)).toBe(true);
  await page.getByRole('button', { name: 'Play ambience', exact: true }).click();
  await page.getByRole('button', { name: 'Focus Mode', exact: true }).click();
  expect(await page.locator('audio').evaluate(audio => audio.paused)).toBe(true);
  await expect(page.locator('body')).not.toHaveClass(/is-listening/);
  await page.reload();
  expect(await page.locator('audio').evaluate(audio => audio.paused)).toBe(true);
  await expect(page.getByRole('button', { name: 'Focus Mode', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('visibility and page restoration stop audio without automatically restarting it', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Soundroom Mode', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Pause ambience', exact: true })).toBeEnabled();
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  expect(await page.locator('audio').evaluate(audio => audio.paused)).toBe(true);
  await expect(page.getByRole('button', { name: 'Play ambience', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Play ambience', exact: true }).click();
  await page.evaluate(() => {
    dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true }));
    dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
  });
  expect(await page.locator('audio').evaluate(audio => audio.paused)).toBe(true);
  await expect(page.locator('#soundroom-panel')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Play ambience', exact: true })).toBeVisible();
});

test('a failed media request is visible and a deliberate retry can recover', async ({ page }) => {
  await page.route('**/assets/soundroom-roja.mp3', route => route.fulfill({ status: 404, body: 'Audio unavailable' }));
  await page.goto('/');
  await page.getByRole('button', { name: 'Soundroom Mode', exact: true }).click();
  await expect(page.locator('.soundroom-status')).toContainText(/could not (load|start)/);
  await expect(page.getByRole('button', { name: 'Play ambience', exact: true })).toBeEnabled();
  await page.unroute('**/assets/soundroom-roja.mp3');
  await page.getByRole('button', { name: 'Play ambience', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Pause ambience', exact: true })).toBeEnabled();
  expect(await page.locator('audio').evaluate(audio => audio.paused)).toBe(false);
  await page.getByRole('button', { name: 'Focus Mode', exact: true }).click();
});

test('blocked playback reports an error instead of claiming music is playing', async ({ page }) => {
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = () => Promise.reject(new DOMException('Playback was blocked', 'NotAllowedError'));
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Soundroom Mode', exact: true }).click();
  await expect(page.locator('.soundroom-status')).toHaveText('Music could not start. Press Play to retry.');
  await expect(page.locator('body')).not.toHaveClass(/is-listening/);
  await expect(page.getByRole('button', { name: 'Play ambience', exact: true })).toBeEnabled();
});

test('switching to Focus cancels a pending Play without a stale success state', async ({ page }) => {
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = () => new Promise(resolve => { window.finishAudioStart = resolve; });
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Soundroom Mode', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Starting...', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Focus Mode', exact: true }).click();
  await page.evaluate(() => window.finishAudioStart());
  await expect(page.locator('.soundroom-status')).toHaveText('Quiet browsing.');
  await expect(page.locator('body')).not.toHaveClass(/is-listening/);
});

test('a stalled request restores Play instead of leaving the control disabled', async ({ page }) => {
  await page.clock.install();
  await page.addInitScript(() => { HTMLMediaElement.prototype.play = () => new Promise(() => {}); });
  await page.goto('/');
  await page.getByRole('button', { name: 'Soundroom Mode', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Starting...', exact: true })).toBeDisabled();
  await page.clock.fastForward(12001);
  await expect(page.locator('.soundroom-status')).toHaveText('Music could not start. Press Play to retry.');
  await expect(page.getByRole('button', { name: 'Play ambience', exact: true })).toBeEnabled();
});

test('music keeps playing through case pages and About without changing appearance or restarting audio', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Soundroom Mode', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Pause ambience', exact: true })).toBeEnabled();
  await expect.poll(() => page.locator('audio').evaluate(audio => audio.currentTime)).toBeGreaterThan(0);
  await page.evaluate(() => {
    window.originalAudio = document.querySelector('audio');
    window.originalPlaybackTime = window.originalAudio.currentTime;
  });
  await page.getByRole('link', { name: 'Read PowerTable case study', exact: true }).click();
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(250, 249, 246)');
  await page.locator('#gantt-features a[href="/column-mapping.html"]').click();
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(250, 249, 246)');
  await page.locator('#main-nav').getByRole('link', { name: 'About', exact: true }).click();
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(250, 249, 246)');
  await page.locator('#main-nav').getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Soundroom Mode', exact: true })).toHaveAttribute('aria-pressed', 'true');
  expect(await page.locator('audio').evaluate(audio => audio === window.originalAudio && !audio.paused &&
    audio.currentTime >= window.originalPlaybackTime)).toBe(true);
  await expect(page.getByRole('button', { name: 'Pause ambience', exact: true })).toBeVisible();
  await page.reload();
  expect(await page.locator('audio').evaluate(audio => audio.paused)).toBe(true);
  expect(await page.locator('audio').evaluate(audio => audio.readyState)).toBe(0);
  await page.getByRole('button', { name: 'Soundroom Mode', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Pause ambience', exact: true })).toBeEnabled();
  await page.getByRole('button', { name: 'Focus Mode', exact: true }).click();
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(250, 249, 246)');
});
