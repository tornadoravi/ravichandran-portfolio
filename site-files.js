export const files = new Map([
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
  ['/crosstab.html', ['crosstab.html', 'text/html']],
  ['/column-mapping.html', ['column-mapping.html', 'text/html']],
  ['/gantt-baselines.html', ['gantt-baselines.html', 'text/html']],
  ['/gantt-conditional-formatting.html', ['gantt-conditional-formatting.html', 'text/html']],
  ['/gantt-backlog.html', ['gantt-backlog.html', 'text/html']],
  ['/resource-configuration.html', ['resource-configuration.html', 'text/html']],
  ['/gantt-configuration.html', ['gantt-configuration.html', 'text/html']],
  ['/mapping.css', ['mapping.css', 'text/css']],
  ['/styles.css', ['styles.css', 'text/css']],
  ['/hero.css', ['hero.css', 'text/css']],
  ['/home.css', ['home.css', 'text/css']],
  ['/theme.js', ['theme.js', 'text/javascript']],
  ['/assets/soundroom-roja.mp3', ['assets/soundroom-roja.mp3', 'audio/mpeg']],
  ['/assets/studio-ambience.wav', ['assets/studio-ambience.wav', 'audio/wav']],
  ['/assets/studio-companion.svg', ['assets/studio-companion.svg', 'image/svg+xml']],
  ['/assets/studio-companion-3d.webp', ['assets/studio-companion-3d.webp', 'image/webp']],
  ['/assets/ravichandran-resume.pdf', ['assets/ravichandran-resume.pdf', 'application/pdf']],
  ['/assets/portrait-3d.webp', ['assets/portrait-3d.webp', 'image/webp']],
  ['/assets/portrait-3d-source.png', ['assets/portrait-3d-source.png', 'image/png']],
  ['/assets/anton-latin.ttf', ['assets/anton-latin.ttf', 'font/ttf']],
  ['/assets/anton-OFL.txt', ['assets/anton-OFL.txt', 'text/plain']],
  ['/portrait-standalone.html', ['portrait-standalone.html', 'text/html']],
  ['/favicon.svg', ['favicon.svg', 'image/svg+xml']],
  ['/assets/ravichandran-profile.png', ['assets/ravichandran-profile.png', 'image/png']],
  ['/assets/inforiver-analytics-logo.svg', ['assets/inforiver-analytics-logo.svg', 'image/svg+xml']],
  ['/assets/inforiver-analytics-official.png', ['assets/inforiver-analytics-official.png', 'image/png']],
  ['/assets/analytics-plus-official-dashboard.webp', ['assets/analytics-plus-official-dashboard.webp', 'image/webp']],
  ['/assets/analytics-kpi-official-presets.webp', ['assets/analytics-kpi-official-presets.webp', 'image/webp']],
  ['/assets/microsoft-power-bi.svg', ['assets/microsoft-power-bi.svg', 'image/svg+xml']],
  ['/assets/microsoft-fabric.svg', ['assets/microsoft-fabric.svg', 'image/svg+xml']],
  ['/assets/fabric-gantt-configuration.png', ['assets/fabric-gantt-configuration.png', 'image/png']],
  ['/assets/powertable-official-gantt.webp', ['assets/powertable-official-gantt.webp', 'image/webp']],
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

export const reactPages = [...new Set([...files.values()]
  .filter(([file, type]) => type === 'text/html' && file !== 'portrait-standalone.html')
  .map(([file]) => file))];

export function securityHeaders(pathname) {
  return {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': pathname === '/portrait-standalone.html'
      ? "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; font-src data:; object-src 'none'; base-uri 'none'; frame-ancestors 'self'"
      : "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'self'"
  };
}
