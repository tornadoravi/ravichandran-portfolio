import { test, expect } from './fixtures.js';

const pages = [
  '/', '/about.html', '/powertable.html', '/analytics-plus.html', '/analytics-spatial.html',
  '/column-mapping.html', '/gantt-baselines.html', '/gantt-backlog.html',
  '/gantt-conditional-formatting.html', '/gantt-configuration.html',
  '/resource-configuration.html', '/crosstab.html', '/storyboard.html', '/gantt.html',
  '/analytics.html', '/presentation.html', '/kpi.html', '/cod-shield.html', '/bikecare.html'
];

test.use({ reducedMotion: 'reduce' });

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`${appearance} has a consistent, readable editorial theme across every active page at ${width}px`, async ({ page }) => {
      test.setTimeout(60000);
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(appearance => localStorage.setItem('portfolio-appearance', appearance), appearance);
      const failures = [];
      page.on('pageerror', error => failures.push(error.message));
      for (const path of pages) {
        await page.goto(path);
        const background = appearance === 'dark' ? 'rgb(23, 22, 20)' : 'rgb(244, 242, 238)';
        await expect(page.locator('body')).toHaveCSS('background-color', background);
        await expect(page.locator('body')).toHaveAttribute('data-native-cursor', '');
        await expect(page.locator('h1')).toBeVisible();
        const headingFont = await page.locator('h1').evaluate(element => {
          const style = getComputedStyle(element);
          return style.getPropertyValue(element.closest('.about-reference-copy') ? '--sans' : '--ds-font-display').split(',')[0].replaceAll('"', '').trim();
        });
        expect(await page.locator('h1').evaluate(element => getComputedStyle(element).fontFamily.split(',')[0].replaceAll('"', ''))).toBe(headingFont);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path).toBe(true);
        const contrastFailures = await page.evaluate(() => {
          const luminance = color => {
            const rgb = color.match(/[\d.]+/g).slice(0, 3).map(Number).map(value => value / 255)
              .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
            return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
          };
          return [...document.querySelectorAll('.eyebrow, figcaption, .structure-map > *, .metadata dt, .metadata dd, .case-nav a, .workspace-feature-tabs a, .product-overview-copy, .product-marketplace p, .product-marketplace .recommended-case, .project-description p, .fine-print, .project-features a, .project-feature-group h4, .soundroom-status, .inspect-button')]
            .filter(element => element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) && !element.closest('.sr-only, [aria-hidden="true"]'))
            .flatMap(element => {
              const style = getComputedStyle(element);
              const background = [0, 0, 0];
              let remaining = 1;
              for (let parent = element; parent && remaining > 0; parent = parent.parentElement) {
                const channels = getComputedStyle(parent).backgroundColor.match(/[\d.]+/g).map(Number);
                const alpha = channels[3] ?? 1;
                channels.slice(0, 3).forEach((channel, index) => { background[index] += channel * alpha * remaining; });
                remaining *= 1 - alpha;
              }
              const a = luminance(style.color);
              const b = luminance(`rgb(${background.map(channel => channel + 255 * remaining).join(', ')})`);
              const contrast = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
              return contrast < 4.5 || parseFloat(style.fontSize) < 12 ? [{ text: element.textContent.slice(0, 60), contrast }] : [];
            });
        });
        expect(contrastFailures, path).toEqual([]);
      }
      expect(failures).toEqual([]);
    });
  }
}
