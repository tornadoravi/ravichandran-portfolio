import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { chromium, expect } from '@playwright/test';

const profiles = [
  { id: 'conversational', label: 'Conversational', description: 'Warm and relaxed.' },
  { id: 'calm', label: 'Calm', description: 'Soft-spoken and composed.' },
  { id: 'energetic', label: 'Energetic tech-explainer', description: 'Bright and expressive.' }
];

function wav() {
  const audio = Buffer.alloc(524);
  audio.write('RIFF');
  audio.writeUInt32LE(audio.length - 8, 4);
  audio.write('WAVEfmt ', 8);
  audio.writeUInt32LE(16, 16);
  audio.writeUInt16LE(1, 20);
  audio.writeUInt16LE(1, 22);
  audio.writeUInt32LE(24000, 24);
  audio.writeUInt32LE(48000, 28);
  audio.writeUInt16LE(2, 32);
  audio.writeUInt16LE(16, 34);
  audio.write('data', 36);
  audio.writeUInt32LE(audio.length - 44, 40);
  return audio;
}

async function pageFor(t, generate, health = { ready: true, default_profile: 'conversational', profiles }) {
  const browser = await chromium.launch();
  t.after(() => browser.close());
  const page = await browser.newPage();
  await page.route('http://voice-audition.test/**', async route => {
    const path = new URL(route.request().url()).pathname;
    if (path === '/api/health') return route.fulfill({ json: health });
    if (path === '/api/voice/preview') return generate(route);
    const assets = {
      '/': ['index.html', 'text/html'],
      '/app.js': ['app.js', 'text/javascript'],
      '/app.css': ['app.css', 'text/css'],
      '/mascot.webp': ['../assets/studio-mascot-peach.webp', 'image/webp'],
      '/favicon.png': ['../favicon.png', 'image/png']
    };
    const asset = assets[path];
    if (!asset) return route.fulfill({ status: 404 });
    return route.fulfill({
      contentType: asset[1],
      body: await readFile(new URL(asset[0], import.meta.url))
    });
  });
  await page.goto('http://voice-audition.test/');
  return page;
}

test('chosen styles are sent, locked in flight, and not confused with existing audio', async t => {
  const requests = [];
  let release;
  const pending = new Promise(resolve => { release = resolve; });
  const page = await pageFor(t, async route => {
    requests.push(route.request().postDataJSON());
    await pending;
    await route.fulfill({ contentType: 'audio/wav', headers: { 'X-Voice-Profile': 'calm' }, body: wav() });
  });
  const select = page.getByLabel('Speaking style');
  await expect(select).toBeEnabled();
  await select.selectOption('calm');
  await page.getByRole('button', { name: 'Generate local preview' }).click();
  await expect(select).toBeDisabled();
  await expect(page.getByLabel('Short audition script')).toHaveJSProperty('readOnly', true);
  await expect.poll(() => requests.length).toBe(1);
  expect(requests[0]).toMatchObject({ profile: 'calm' });
  release();
  await expect(page.getByRole('heading', { name: 'Calm audition' })).toBeVisible();
  await expect(select).toBeEnabled();
  await expect(page.getByLabel('Short audition script')).toHaveJSProperty('readOnly', false);
  await expect(page.getByRole('link', { name: 'Download WAV' })).toHaveAttribute('download', 'local-calm-audition.wav');
  await select.selectOption('energetic');
  await expect(page.getByRole('status')).toContainText('Generate a preview to hear this style');
  await expect(page.getByRole('heading', { name: 'Calm audition' })).toBeVisible();
  expect(requests).toHaveLength(1);
});

test('a mismatched voice response is rejected rather than relabelled', async t => {
  const page = await pageFor(t, route => route.fulfill({
    contentType: 'audio/wav', headers: { 'X-Voice-Profile': 'energetic' }, body: wav()
  }));
  const select = page.getByLabel('Speaking style');
  await expect(select).toBeEnabled();
  await select.selectOption('calm');
  await page.getByRole('button', { name: 'Generate local preview' }).click();
  await expect(page.getByRole('alert')).toContainText('different voice profile');
  await expect(page.locator('#preview')).toBeHidden();
  await expect(select).toBeEnabled();
});

test('missing voice metadata keeps generation unavailable with a clear error', async t => {
  for (const health of [{ ready: true }, { ready: true, default_profile: 'conversational', profiles: [null] }]) {
    const page = await pageFor(t, () => { throw new Error('Generation should remain unavailable.'); }, health);
    await expect(page.getByRole('alert')).toContainText('valid voice options');
    await expect(page.getByRole('button', { name: 'Generate local preview' })).toBeDisabled();
    await expect(page.getByLabel('Speaking style')).toBeDisabled();
  }
});
