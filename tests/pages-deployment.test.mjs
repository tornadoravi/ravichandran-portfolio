import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import http from 'node:http';
import { once } from 'node:events';
import { chromium } from '@playwright/test';
import { files, reactPages } from '../site-files.js';

test('GitHub Pages subpath supports every prerendered route, assets and enhanced navigation', async t => {
  const base = '/ravichandran-portfolio/';
  const root = new URL('../', import.meta.url);
  const output = new URL('../dist/', import.meta.url);
  t.after(() => {
    // Restore the local build even when a Pages assertion fails.
    execFileSync(process.execPath, ['scripts/build-site.mjs'], {
      cwd: root,
      env: { ...process.env, SITE_BASE_PATH: process.env.SITE_BASE_PATH || '/' },
      stdio: ['ignore', 'pipe', 'pipe']
    });
  });
  execFileSync(process.execPath, ['scripts/build-site.mjs'], {
    cwd: root,
    env: { ...process.env, SITE_BASE_PATH: base },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  const publicFiles = new Map(files);
  const manifest = JSON.parse(await readFile(new URL('.vite/manifest.json', output), 'utf8'));
  const types = { js: 'text/javascript', css: 'text/css', svg: 'image/svg+xml', png: 'image/png', ttf: 'font/ttf', woff2: 'font/woff2', m4a: 'audio/mp4' };
  for (const entry of Object.values(manifest)) {
    for (const file of [entry.file, ...(entry.css || []), ...(entry.assets || [])]) {
      const type = types[file.split('.').at(-1)];
      assert.ok(type, `Unexpected compiled file type: ${file}`);
      publicFiles.set(`/${file}`, [file, type]);
    }
  }
  const server = http.createServer(async (request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const file = url.pathname.startsWith(base)
      ? publicFiles.get(url.pathname.slice(base.length - 1)) : null;
    if (!file) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }
    try {
      const content = await readFile(new URL(file[0], output));
      response.writeHead(200, { 'Content-Type': file[1] });
      response.end(content);
    } catch (error) {
      console.error(`Unable to serve Pages test asset ${file[0]}:`, error);
      response.writeHead(500);
      response.end('Unable to load test asset');
    }
  });
  t.after(() => new Promise(resolve => {
    server.close(resolve);
    server.closeAllConnections();
  }));
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  const errors = [];
  const browser = await chromium.launch();
  t.after(() => browser.close());

  for (const javaScriptEnabled of [true, false]) {
    const page = await browser.newPage({
      javaScriptEnabled,
      viewport: { width: javaScriptEnabled ? 1440 : 390, height: 900 },
      reducedMotion: 'reduce'
    });
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('response', response => {
      if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    for (const file of reactPages) {
      await page.goto(`${origin}${base}${file}`);
      assert.equal(await page.locator('main').count(), 1, file);
      assert.ok((await page.locator('main').innerText()).trim(), file);
      if (javaScriptEnabled) {
        await page.locator('.header-brand [data-companion]:enabled').waitFor();
      }
      const policy = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute('content');
      assert.ok(policy.includes("script-src 'self'"));
      assert.ok(!policy.includes('unsafe-inline'));
      assert.ok(!policy.includes('frame-ancestors'));
      const invalid = await page.evaluate(prefix => {
        const nodes = [...document.querySelectorAll('a[href], img[src], audio[src], script[src], link[href]')];
        return nodes.flatMap(node => {
          const value = node.getAttribute('src') ?? node.getAttribute('href');
          const url = new URL(value, location.href);
          return url.origin === location.origin && !url.pathname.startsWith(prefix) ? [value] : [];
        });
      }, base);
      assert.deepEqual(invalid, [], `${file}: URL escaped the deployment base`);
      await page.locator('img').evaluateAll(async images => {
        await Promise.all(images.map(image => {
          image.loading = 'eager';
          return image.decode();
        }));
      });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), file);
    }
    if (javaScriptEnabled) {
      await page.goto(`${origin}${base}analytics.html`);
      await page.locator('.case-watch-entry').getByRole('button', { name: 'Walkthrough', exact: true }).click();
      await page.getByRole('button', { name: 'Read this scene', exact: true }).click();
      await page.waitForFunction(() => {
        const audio = document.querySelector('.case-player audio');
        return audio && !audio.paused && audio.currentTime > 0;
      });
      const source = await page.locator('.case-player audio').getAttribute('src');
      assert.ok(new URL(source, page.url()).pathname.startsWith(`${base}assets/`));
      await page.getByRole('button', { name: 'Go to section 4: Evidence', exact: true }).click();
      const evidence = page.locator('.case-film-source-screen img');
      await evidence.evaluate(image => image.decode());
      assert.ok(new URL(await evidence.getAttribute('src'), page.url()).pathname.startsWith(`${base}assets/`));
      await page.getByRole('button', { name: 'Close cinematic walkthrough', exact: true }).click();
    }
    await page.close();
  }

  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${origin}${base}`);
  await page.locator('.header-brand [data-companion]:enabled').waitFor();
  await page.evaluate(() => { window.pagesAudio = document.querySelector('audio'); });
  await page.getByRole('link', { name: 'Read PowerTable case study', exact: true }).click();
  await page.waitForURL(`${origin}${base}powertable.html`);
  assert.equal(await page.evaluate(() => window.pagesAudio === document.querySelector('audio')), true);
  await page.goBack();
  await page.waitForURL(`${origin}${base}`);
  assert.equal(await page.evaluate(() => window.pagesAudio === document.querySelector('audio')), true);
  await page.goForward();
  await page.waitForURL(`${origin}${base}powertable.html`);
  assert.equal(await page.evaluate(() => window.pagesAudio === document.querySelector('audio')), true);
  await page.goto(`${origin}${base}analytics.html#storytelling`);
  await page.waitForURL(`${origin}${base}storyboard.html#overview`);
  const audio = await page.locator('audio').getAttribute('src');
  assert.equal((await fetch(`${origin}${audio}`)).status, 200);
  assert.equal((await fetch(`${origin}/src/main.jsx`)).status, 404);
  assert.deepEqual(errors, [], 'Browser errors or missing deployment assets');
  await page.close();
});
