import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build, createServer } from 'vite';
import { files, reactPages, securityHeaders } from '../site-files.js';

const root = new URL('../', import.meta.url);
const output = new URL('../dist/', import.meta.url);
const publicFiles = new Set([...files.values()].map(([file]) => file));

await build({
  root: fileURLToPath(root),
  configFile: fileURLToPath(new URL('../vite.config.js', import.meta.url)),
  build: { outDir: fileURLToPath(output), emptyOutDir: true }
});

const renderer = await createServer({
  root: fileURLToPath(root),
  configFile: fileURLToPath(new URL('../vite.config.js', import.meta.url)),
  server: { middlewareMode: true, watch: null, hmr: false },
  appType: 'custom'
});
try {
  const { renderPage } = await renderer.ssrLoadModule('/src/entry-server.jsx');
  for (const file of reactPages) {
    const destination = new URL(file, output);
    const html = await readFile(destination, 'utf8');
    const placeholder = /<div\s+id=["']root["']\s*>\s*<\/div>/;
    if (!placeholder.test(html)) throw new Error(`Missing empty React root in ${file}`);
    const markup = await renderPage(file.slice(0, -5));
    if (typeof markup !== 'string' || !markup.trim()) {
      throw new Error(`React prerender returned no content for ${file}`);
    }
    await writeFile(destination, html.replace(placeholder, () => `<div id="root">${markup}</div>`));
  }
} finally {
  await renderer.close();
}

for (const file of publicFiles) {
  if (reactPages.includes(file)) continue;
  const destination = new URL(file, output);
  await mkdir(new URL('./', destination), { recursive: true });
  await copyFile(new URL(file, root), destination);
}

const manifest = JSON.parse(await readFile(new URL('.vite/manifest.json', output), 'utf8'));
const compiledFiles = new Set(Object.values(manifest).flatMap(entry =>
  [entry.file, ...(entry.css || []), ...(entry.assets || [])]));
const headers = [...files.keys(), ...[...compiledFiles].map(file => `/${file}`)].flatMap(pathname => {
  const paths = pathname.endsWith('.html') ? [pathname, pathname.slice(0, -5)] : [pathname];
  return paths.map(path => [
    path,
    ...Object.entries(securityHeaders(pathname)).map(([name, value]) => `  ${name}: ${value}`),
    ''
  ].join('\n'));
}).join('\n');
await writeFile(new URL('_headers', output), headers);
console.log(`Built and prerendered ${reactPages.length} React pages in dist/ with allowlisted public files and Netlify security headers.`);
