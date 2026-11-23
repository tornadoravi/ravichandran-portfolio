import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { files, securityHeaders } from './site-files.js';

const port = Number(process.env.PORT || 4173);
const output = new URL('./dist/', import.meta.url);
const assetTypes = {
  '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.avif': 'image/avif',
  '.ttf': 'font/ttf', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.m4a': 'audio/mp4', '.pdf': 'application/pdf'
};
async function loadServedFiles() {
  const servedFiles = new Map(files);
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
  return servedFiles;
}
let servedFiles;
try {
  await readFile(new URL('index.html', output));
  servedFiles = await loadServedFiles();
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
    if (file[1] === 'text/html') servedFiles = await loadServedFiles();
    const content = await readFile(new URL(file[0], output));
    const headers = {
      'Content-Type': file[1] === 'audio/mp4' ? file[1] : `${file[1]}; charset=utf-8`,
      'Content-Length': content.length,
      ...securityHeaders(pathname)
    };
    if (file[1] === 'audio/mp4') {
      headers['Accept-Ranges'] = 'bytes';
      const range = request.headers.range;
      if (range) {
        const match = /^bytes=(\d*)-(\d*)$/.exec(range);
        const first = match?.[1] ? Number(match[1]) : null;
        const last = match?.[2] ? Number(match[2]) : null;
        const start = first ?? Math.max(0, content.length - last);
        const end = first === null ? content.length - 1 : Math.min(last ?? content.length - 1, content.length - 1);
        if (!match || (first === null && !last) || !Number.isSafeInteger(start) ||
            !Number.isSafeInteger(end) || (last !== null && !Number.isSafeInteger(last)) ||
            start >= content.length || end < start) {
          response.writeHead(416, { ...headers, 'Content-Length': 0, 'Content-Range': `bytes */${content.length}` });
          response.end();
          return;
        }
        response.writeHead(206, {
          ...headers, 'Content-Length': end - start + 1, 'Content-Range': `bytes ${start}-${end}/${content.length}`
        });
        response.end(request.method === 'HEAD' ? undefined : content.subarray(start, end + 1));
        return;
      }
    }
    response.writeHead(200, headers);
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
