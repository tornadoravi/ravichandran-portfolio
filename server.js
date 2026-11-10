import http from 'node:http';
import { readFile } from 'node:fs/promises';

const port = Number(process.env.PORT || 4173);
const files = new Map([
  ['/', ['index.html', 'text/html']],
  ['/index.html', ['index.html', 'text/html']],
  ['/about.html', ['about.html', 'text/html']],
  ['/analytics.html', ['analytics.html', 'text/html']],
  ['/analytics-plus.html', ['analytics-plus.html', 'text/html']],
  ['/storyboard.html', ['storyboard.html', 'text/html']],
  ['/presentation.html', ['presentation.html', 'text/html']],
  ['/gantt.html', ['gantt.html', 'text/html']],
  ['/kpi.html', ['kpi.html', 'text/html']],
  ['/powertable.html', ['powertable.html', 'text/html']],
  ['/column-mapping.html', ['column-mapping.html', 'text/html']],
  ['/gantt-baselines.html', ['gantt-baselines.html', 'text/html']],
  ['/gantt-conditional-formatting.html', ['gantt-conditional-formatting.html', 'text/html']],
  ['/gantt-backlog.html', ['gantt-backlog.html', 'text/html']],
  ['/resource-configuration.html', ['resource-configuration.html', 'text/html']],
  ['/gantt-configuration.html', ['gantt-configuration.html', 'text/html']],
  ['/mapping.css', ['mapping.css', 'text/css']],
  ['/styles.css', ['styles.css', 'text/css']],
  ['/app.js', ['app.js', 'text/javascript']],
  ['/hero.css', ['hero.css', 'text/css']],
  ['/assets/portrait-3d.webp', ['assets/portrait-3d.webp', 'image/webp']],
  ['/assets/portrait-3d-source.png', ['assets/portrait-3d-source.png', 'image/png']],
  ['/assets/anton-latin.ttf', ['assets/anton-latin.ttf', 'font/ttf']],
  ['/portrait-standalone.html', ['portrait-standalone.html', 'text/html']],
  ['/favicon.svg', ['favicon.svg', 'image/svg+xml']],
  ['/assets/ravichandran-profile.png', ['assets/ravichandran-profile.png', 'image/png']],
  ['/assets/inforiver-analytics-logo.svg', ['assets/inforiver-analytics-logo.svg', 'image/svg+xml']],
  ['/assets/inforiver-analytics-official.png', ['assets/inforiver-analytics-official.png', 'image/png']],
  ['/assets/microsoft-power-bi.svg', ['assets/microsoft-power-bi.svg', 'image/svg+xml']],
  ['/assets/microsoft-fabric.svg', ['assets/microsoft-fabric.svg', 'image/svg+xml']],
  ['/assets/fabric-gantt-configuration.png', ['assets/fabric-gantt-configuration.png', 'image/png']],
  ['/assets/fabric-configuration-detail.png', ['assets/fabric-configuration-detail.png', 'image/png']],
  ...['task', 'time-entries', 'resource', 'cost', 'resource-layout'].map((name) =>
    [`/assets/fabric-mapping-${name}.png`, [`assets/fabric-mapping-${name}.png`, 'image/png']]),
  ...['compare-menu', 'timeline', 'manager'].map((name) =>
    [`/assets/fabric-baseline-${name}.png`, [`assets/fabric-baseline-${name}.png`, 'image/png']]),
  ...['rule', 'summary', 'timeline'].map((name) =>
    [`/assets/fabric-conditional-${name}.png`, [`assets/fabric-conditional-${name}.png`, 'image/png']]),
  ...['empty', 'list', 'pending'].map((name) =>
    [`/assets/fabric-backlog-${name}.png`, [`assets/fabric-backlog-${name}.png`, 'image/png']]),
  ...['timeline', 'milestone', 'data-color', 'label'].map((name) =>
    [`/assets/fabric-resource-config-${name}.png`, [`assets/fabric-resource-config-${name}.png`, 'image/png']]),
  ...['timeline', 'milestone', 'dependency', 'data-color', 'label'].map((name) =>
    [`/assets/fabric-gantt-config-${name}.png`, [`assets/fabric-gantt-config-${name}.png`, 'image/png']]),
  ['/assets/annotation-detail.png', ['assets/annotation-detail.png', 'image/png']],
  ...['planning-timeline-concept', 'planning-capacity-concept'].map((name) =>
    [`/assets/${name}.svg`, [`assets/${name}.svg`, 'image/svg+xml']]),
  ...['annotation-context', 'presentation-focus'].map((name) =>
    [`/assets/${name}.svg`, [`assets/${name}.svg`, 'image/svg+xml']]),
  ...['presentation-contact-sheet', ...Array.from({ length: 9 }, (_, index) => `presentation-screen-${String(index + 1).padStart(2, '0')}`)].map((name) =>
    [`/assets/${name}.png`, [`assets/${name}.png`, 'image/png']]),
  ...['storyboard-start', 'custom-layout', 'template-selection', 'blank-canvas', 'template-store', 'storyboard-editor',
    'wizard-chart-family', 'wizard-function', 'wizard-use-case', 'wizard-visual-style', 'wizard-favorites', 'wizard-customize', 'wizard-advanced', 'wizard-result',
    'gantt-entry', 'gantt-data-mapping', 'gantt-timeline',
    'kpi-simple', 'kpi-variance', 'kpi-preset-library'].map((name) =>
    [`/assets/${name}.png`, [`assets/${name}.png`, 'image/png']])
]);

const server = http.createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const file = files.get(pathname);
  if (!file || !['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(file ? 405 : 404, { 'Content-Type': 'text/plain' });
    response.end(file ? 'Method not allowed' : 'Page not found');
    return;
  }
  try {
    const content = await readFile(new URL(file[0], import.meta.url));
    response.writeHead(200, {
      'Content-Type': `${file[1]}; charset=utf-8`,
      'Content-Length': content.length,
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': pathname === '/portrait-standalone.html'
        ? "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; font-src data:; object-src 'none'; base-uri 'none'; frame-ancestors 'self'"
        : "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'self'"
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch (error) {
    console.error(`Unable to serve ${file[0]}:`, error);
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('Unable to load this page');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Portfolio ready at http://127.0.0.1:${port}`);
});
server.on('error', (error) => {
  console.error('Portfolio server failed:', error);
  process.exitCode = 1;
});
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close());
}
