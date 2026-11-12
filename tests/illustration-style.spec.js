import { test, expect } from './fixtures.js';

const routes = [
  '/', '/about.html', '/powertable.html', '/analytics-plus.html',
  '/column-mapping.html', '/gantt-baselines.html', '/gantt-backlog.html',
  '/gantt-conditional-formatting.html', '/gantt-configuration.html',
  '/resource-configuration.html', '/crosstab.html', '/storyboard.html',
  '/gantt.html', '/analytics.html', '/presentation.html', '/kpi.html'
];

for (const appearance of ['light', 'dark']) {
  for (const javaScriptEnabled of [true, false]) {
    test.describe(`paper artwork in ${appearance} with JavaScript ${javaScriptEnabled}`, () => {
      test.use({ javaScriptEnabled, viewport: { width: 390, height: 900 }, reducedMotion: 'reduce', colorScheme: appearance });
      for (const route of routes) {
        test(`consistent, local illustration surfaces on ${route}`, async ({ page }) => {
          if (javaScriptEnabled) await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
          const errors = [];
          page.on('pageerror', error => errors.push(error.message));
          await page.goto(route);
          if (javaScriptEnabled) await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
          else await page.evaluate(value => { document.documentElement.dataset.theme = value; }, appearance);
          const artwork = page.locator('.portfolio-illustration');
          expect(await artwork.count(), route).toBeGreaterThan(0);
          const issues = await artwork.evaluateAll(svgs => svgs.flatMap(svg => {
            const problems = [];
            const style = getComputedStyle(svg);
            if (style.getPropertyValue('--art-ink').trim() !== '#526960') problems.push('Missing shared palette');
            if (!svg.classList.contains('feature-illustration') && !style.backgroundImage.includes('radial-gradient')) problems.push('Missing gridded ground');
            if (!svg.closest('.product-illustration') && svg.querySelectorAll('feDropShadow').length !== 1) problems.push('Missing local shadow');
            const ids = new Set([...svg.querySelectorAll('[id]')].map(node => node.id));
            for (const element of svg.querySelectorAll('*')) {
              const paint = getComputedStyle(element);
              for (const property of ['fill', 'stroke', 'filter']) {
                for (const match of paint[property].matchAll(/url\(["']?[^#]*#([^"')]+)/g)) {
                  if (!ids.has(decodeURIComponent(match[1]))) problems.push(`Non-local ${property}: ${match[1]}`);
                }
              }
            }
            for (const sheet of svg.querySelectorAll('.illustration-paper')) {
              const paint = getComputedStyle(sheet);
              if (!paint.filter.includes('url(')) problems.push('Paper missing cast shadow');
              if (['rgb(0, 0, 0)', 'none'].includes(paint.fill)) problems.push('Unresolved paper paint');
            }
            if (svg.querySelector('.illustration-surface[style]')) problems.push('Inline styles blocked by site policy');
            for (const bar of svg.querySelectorAll('.diagram-bar')) {
              if (getComputedStyle(bar).fill !== 'rgb(102, 133, 119)') problems.push('Timeline bars lost their distinction');
            }
            return problems;
          }));
          expect(issues, route).toEqual([]);
          const ids = await artwork.locator('[id]').evaluateAll(nodes => nodes.map(node => node.id));
          expect(new Set(ids).size, route).toBe(ids.length);
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true);
          if (route === '/powertable.html') {
            await expect(page.locator('.product-illustration .workspace-paper')).toHaveCount(javaScriptEnabled ? 10 : 0);
          }
          expect(errors).toEqual([]);
        });
      }
    });
  }
}

test('standalone Presentation concepts retain their descriptions, local paint and original dimensions', async ({ page }) => {
  await page.goto('/presentation.html');
  for (const name of ['annotation-context', 'presentation-focus']) {
    const response = await page.request.get(`/assets/${name}.svg`);
    expect(response.ok()).toBe(true);
    const artwork = await page.evaluate(source => {
      const document = new DOMParser().parseFromString(source, 'image/svg+xml');
      const svg = document.documentElement;
      const ids = new Set([...svg.querySelectorAll('[id]')].map(node => node.id));
      const references = [...source.matchAll(/url\(#([^)]+)\)/g)].map(match => match[1]);
      return {
        valid: !document.querySelector('parsererror'),
        viewBox: svg.getAttribute('viewBox'),
        description: svg.querySelector('desc')?.textContent,
        sheets: svg.querySelectorAll('.paper').length,
        shadows: svg.querySelectorAll('feDropShadow').length,
        inlineStyles: svg.querySelectorAll('style, [style]').length,
        localPaint: references.every(id => ids.has(id))
      };
    }, await response.text());
    expect(artwork.valid).toBe(true);
    expect(artwork.viewBox).toBe('0 0 1040 580');
    expect(artwork.description).toMatch(/not a (product screenshot|Figma capture)/);
    expect(artwork.sheets).toBe(2);
    expect(artwork.shadows).toBe(1);
    expect(artwork.inlineStyles).toBe(0);
    expect(artwork.localPaint).toBe(true);
  }
});
