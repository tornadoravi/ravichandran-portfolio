import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawn } from 'node:child_process';
import { once } from 'node:events';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { files, reactPages, securityHeaders } from '../site-files.js';

const root = new URL('../', import.meta.url);
const output = new URL('../dist/', import.meta.url);

test('React production build preserves public boundaries, prerenders routes, and serves safely', async t => {
  const build = () => {
    try {
      execFileSync(process.execPath, ['scripts/build-site.mjs'], {
        cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']
      });
    } catch (error) {
      throw new Error(`Production build failed:\n${error.stderr || error.stdout || error.message}`);
    }
  };
  build();
  const firstHtml = await Promise.all(reactPages.map(file => readFile(new URL(file, output), 'utf8')));
  await writeFile(new URL('stale-file.txt', output), 'Must not survive another build.');
  await writeFile(new URL('assets/stale.js', output), 'Must not survive another build.');
  build();

  const publicFiles = [...new Set([...files.values()].map(([file]) => file))];
  const manifest = JSON.parse(await readFile(new URL('.vite/manifest.json', output), 'utf8'));
  const compiledFiles = [...new Set(Object.values(manifest).flatMap(entry =>
    [entry.file, ...(entry.css || []), ...(entry.assets || [])]))];
  const builtFiles = (await readdir(output, { recursive: true, withFileTypes: true }))
    .filter(entry => entry.isFile())
    .map(entry => relative(fileURLToPath(output), join(entry.parentPath, entry.name)));
  assert.deepEqual(builtFiles.sort(), [...new Set([
    ...publicFiles, ...compiledFiles, '.vite/manifest.json', '_headers'
  ])].sort());
  for (const file of publicFiles) {
    if (reactPages.includes(file)) continue;
    assert.deepEqual(await readFile(new URL(file, output)), await readFile(new URL(file, root)), file);
  }

  assert.equal(reactPages.length, 16);
  assert.ok(compiledFiles.filter(file => file.endsWith('.js')).length > 1, 'Expected split client bundles');
  for (const [index, file] of reactPages.entries()) {
    const source = await readFile(new URL(file, root), 'utf8');
    const html = await readFile(new URL(file, output), 'utf8');
    assert.equal(html, firstHtml[index], `Non-deterministic prerender for ${file}`);
    assert.match(html, /<div id="root">[\s\S]*<main(?:\s|>)/, `Missing prerendered main in ${file}`);
    assert.match(html, /<footer(?:\s|>)/, `Missing prerendered footer in ${file}`);
    assert.doesNotMatch(html, /<div id="root">\s*<\/div>/);
    assert.doesNotMatch(html, /src="\/src\/main\.jsx"/);
    assert.match(html, /<script[^>]+type="module"[^>]+src="\/assets\/[^"]+\.js"/);
    assert.equal(html.match(/<title>[\s\S]*?<\/title>/)?.[0], source.match(/<title>[\s\S]*?<\/title>/)?.[0]);
    assert.equal(html.match(/<body[^>]*>/)?.[0], source.match(/<body[^>]*>/)?.[0]);
    assert.match(html, /theme\.js/);
  }
  const routeContent = await Promise.all(reactPages.map(async file =>
    (await readFile(new URL(file, output), 'utf8')).match(/<main(?:\s|>)[\s\S]*?<\/main>/)?.[0]));
  assert.equal(new Set(routeContent).size, reactPages.length, 'Every route must prerender its own main content');

  const headers = await readFile(new URL('_headers', output), 'utf8');
  for (const pathname of [...files.keys(), ...compiledFiles.map(file => `/${file}`)]) {
    const block = headers.split('\n\n').find(block => block.startsWith(`${pathname}\n`));
    assert.ok(block, `Missing headers for ${pathname}`);
    for (const [name, value] of Object.entries(securityHeaders(pathname))) {
      assert.ok(block.includes(`  ${name}: ${value}`), `Missing ${name} for ${pathname}`);
    }
  }
  assert.ok(headers.includes('/portrait-standalone\n'));
  assert.ok(headers.includes('/analytics\n'));
  assert.ok(!headers.includes('/*'), 'No broad overlapping CSP policy');
  assert.ok(!builtFiles.some(file => /(?:^|\/)(?:career-ops|node_modules|tests|server\.js|site-files\.js|package\.json|\.env)/.test(file)));

  const config = await readFile(new URL('netlify.toml', root), 'utf8');
  assert.match(config, /command = "npm run build"/);
  assert.match(config, /publish = "dist"/);

  const server = spawn(process.execPath, ['server.js'], {
    cwd: root, env: { ...process.env, PORT: '0' }, stdio: ['ignore', 'pipe', 'pipe']
  });
  const exited = once(server, 'exit');
  t.after(async () => {
    if (server.exitCode === null) server.kill('SIGTERM');
    await exited;
  });
  const origin = await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Production server failed to start')), 10000);
    let stdout = '';
    let stderr = '';
    server.stderr.on('data', chunk => { stderr += chunk; });
    server.stdout.on('data', chunk => {
      stdout += chunk;
      const match = stdout.match(/Portfolio ready at (http:\/\/127\.0\.0\.1:\d+)/);
      if (match) {
        clearTimeout(timeout);
        resolve(match[1]);
      }
    });
    server.once('error', error => { clearTimeout(timeout); reject(error); });
    server.once('exit', code => {
      clearTimeout(timeout);
      reject(new Error(`Production server exited (${code}): ${stderr}`));
    });
  });

  for (const pathname of ['/', '/about.html', '/powertable.html', '/portrait-standalone.html']) {
    const response = await fetch(`${origin}${pathname}`);
    assert.equal(response.status, 200);
    const [file] = files.get(pathname);
    assert.equal(await response.text(), await readFile(new URL(file, output), 'utf8'));
    for (const [name, value] of Object.entries(securityHeaders(pathname))) {
      assert.equal(response.headers.get(name), value);
    }
  }
  const script = compiledFiles.find(file => file.endsWith('.js'));
  const scriptResponse = await fetch(`${origin}/${script}`);
  assert.equal(scriptResponse.status, 200);
  assert.match(scriptResponse.headers.get('content-type'), /text\/javascript/);
  assert.equal(await scriptResponse.text(), await readFile(new URL(script, output), 'utf8'));

  const head = await fetch(`${origin}/`, { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  assert.ok(Number(head.headers.get('content-length')) > 0);
  const post = await fetch(`${origin}/`, { method: 'POST' });
  assert.equal(post.status, 405);
  assert.equal(post.headers.get('allow'), 'GET, HEAD');
  for (const pathname of [
    '/career-ops/.env', '/.env', '/server.js', '/site-files.js',
    '/package.json', '/src/main.jsx', '/.vite/manifest.json',
    '/assets/stale.js', '/assets/not-built.js', '/app.js', '/soundroom.js'
  ]) {
    assert.equal((await fetch(`${origin}${pathname}`)).status, 404, pathname);
  }
  const missingHead = await fetch(`${origin}/.env`, { method: 'HEAD' });
  assert.equal(missingHead.status, 404);
  assert.equal(await missingHead.text(), '');
});
