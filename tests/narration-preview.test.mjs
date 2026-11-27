import assert from 'node:assert/strict';
import { copyFile, mkdtemp, readFile, rm, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { chromium } from '@playwright/test';
import { createServer } from 'vite';

test('generating narration does not reload or interrupt the Vite walkthrough', { timeout: 60000 }, async () => {
  const manifest = JSON.parse(await readFile(new URL('../src/case-film-audio.json', import.meta.url), 'utf8'));
  const source = new URL(`../assets/narration/${manifest.cases.powertable[0].file}`, import.meta.url);
  const recording = new URL(`../assets/narration/preview-watch-${process.pid}.m4a`, import.meta.url);
  const cache = await mkdtemp(join(tmpdir(), 'portfolio-narration-preview-'));
  const server = await createServer({ cacheDir: cache, server: { port: 0, open: false } });
  let browser;
  try {
    await server.listen();
    browser = await chromium.launch();
    const page = await browser.newPage({ reducedMotion: 'no-preference' });
    const updates = [];
    page.on('websocket', socket => socket.on('framereceived', frame => {
      if (typeof frame.payload === 'string' && /"type":"(?:update|full-reload)"/.test(frame.payload)) {
        updates.push(JSON.parse(frame.payload));
      }
    }));
    await page.goto(new URL('/powertable.html', server.resolvedUrls.local[0]).href);
    await page.getByRole('button', { name: 'Walkthrough', exact: true }).first().click();
    const audio = page.locator('.cod-film-player audio');
    await page.waitForFunction(() => document.querySelector('.cod-film-player audio')?.currentTime > 0,
      null, { timeout: 15000 });
    const position = await audio.evaluate(element => element.currentTime);
    await copyFile(source, recording);
    await page.waitForTimeout(1500);
    await unlink(recording);
    await page.waitForTimeout(1500);
    assert.deepEqual(updates, []);
    assert.equal(await page.locator('.cod-film-player').count(), 1);
    assert.equal(await audio.evaluate(element => element.paused), false);
    assert.ok(await audio.evaluate(element => element.currentTime) > position);
  } finally {
    await unlink(recording).catch(error => {
      if (error.code !== 'ENOENT') throw error;
    });
    await browser?.close();
    await server.close();
    await rm(cache, { recursive: true, force: true });
  }
});
