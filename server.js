import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { files, securityHeaders } from './site-files.js';

const port = Number(process.env.PORT || 4173);
const output = new URL('./dist/', import.meta.url);
const servedFiles = new Map(files);
const assetTypes = {
  '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.avif': 'image/avif',
  '.ttf': 'font/ttf', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.pdf': 'application/pdf'
};
try {
  await readFile(new URL('index.html', output));
  const manifest = JSON.parse(await readFile(new URL('.vite/manifest.json', output), 'utf8'));
  for (const entry of Object.values(manifest)) {
    for (const file of [entry.file, ...(entry.css || []), ...(entry.assets || [])]) {
      const extension = file.slice(file.lastIndexOf('.'));
      if (!/^assets\/[A-Za-z0-9_./-]+$/.test(file) || file.split('/').includes('..') || !assetTypes[extension]) {
        throw new Error(`Invalid compiled asset in build manifest: ${file}`);
      }
      servedFiles.set(`/${file}`, [file, assetTypes[extension]]);
    }
  }
} catch (error) {
  console.error('Production build is missing or invalid. Run "npm run build" before "npm start".', error.message);
  process.exit(1);
}
const server = http.createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const file = servedFiles.get(pathname);
  if (!file || !['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(file ? 405 : 404, {
      'Content-Type': 'text/plain',
      ...(file ? { Allow: 'GET, HEAD' } : {}),
      ...securityHeaders(pathname)
    });
    response.end(request.method === 'HEAD' ? undefined : file ? 'Method not allowed' : 'Page not found');
    return;
  }
  try {
    const content = await readFile(new URL(file[0], output));
    response.writeHead(200, {
      'Content-Type': `${file[1]}; charset=utf-8`,
      'Content-Length': content.length,
      ...securityHeaders(pathname)
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch (error) {
    console.error(`Unable to serve ${file[0]}:`, error);
    response.writeHead(500, { 'Content-Type': 'text/plain', ...securityHeaders(pathname) });
    response.end(request.method === 'HEAD' ? undefined : 'Unable to load this page');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Portfolio ready at http://127.0.0.1:${server.address().port}`);
});
server.on('error', (error) => {
  console.error('Portfolio server failed:', error);
  process.exitCode = 1;
});
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close());
}
