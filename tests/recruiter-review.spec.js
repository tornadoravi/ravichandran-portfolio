import { test, expect } from './fixtures.js';
import { readFile } from 'node:fs/promises';

const features = [
  ['/column-mapping.html', '#cost-mapping'],
  ['/gantt-baselines.html', '#comparison'],
  ['/gantt-backlog.html', '#pending-changes'],
  ['/gantt-conditional-formatting.html', '#timeline'],
  ['/gantt-configuration.html', '#dependency'],
  ['/resource-configuration.html', '#label'],
  ['/storyboard.html', '#templates'],
  ['/gantt.html', '#mapping'],
  ['/analytics.html', '#visual-form'],
  ['/presentation.html', '#annotations'],
  ['/kpi.html', '#variance']
];
const analytics = [
  ['/storyboard.html', 'Storyboard'],
  ['/gantt.html', 'Gantt'],
  ['/analytics.html', 'Chart Wizard'],
  ['/presentation.html', 'Annotations'],
  ['/kpi.html', 'KPI Presets']
];

test.use({ reducedMotion: 'reduce' });

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`recruiter summaries and verified branding are concise and usable in ${appearance} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(appearance => localStorage.setItem('portfolio-appearance', appearance), appearance);
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      for (const path of ['/', '/about.html', '/powertable.html', '/analytics-plus.html', '/crosstab.html', ...features.map(([path]) => path)]) {
        await page.goto(path);
        await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
        await page.evaluate(() => document.fonts.ready);
        const identity = page.getByRole('group', { name: 'Employer and product platform' });
        await expect(identity).toBeVisible();
        await expect(identity.getByAltText('Lumel Technologies', { exact: true })).toBeVisible();
        await expect(identity.getByAltText('Microsoft', { exact: true })).toBeVisible();
        for (const image of await identity.locator('img').all()) {
          expect(await image.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
          await expect(image).toHaveCSS('filter', 'none');
          const ratios = await image.evaluate(image => ({
            source: image.naturalWidth / image.naturalHeight,
            rendered: image.getBoundingClientRect().width / image.getBoundingClientRect().height
          }));
          expect(ratios.rendered).toBeCloseTo(ratios.source, 2);
        }
        const words = await page.locator('main').evaluate(element => element.innerText.trim().split(/\s+/).length);
        expect(words, path).toBeLessThanOrEqual(path === '/analytics-plus.html' ? 400 : 350);
        if (features.some(([feature]) => feature === path)) {
          await expect(page.locator('#case-details')).not.toHaveAttribute('open');
          await expect(page.locator('.decision-flow > li')).toHaveCount(3);
          await expect(page.locator('.decision-flow .small-index')).toHaveText(['01 / Challenge', '02 / Design', '03 / Evidence']);
          await expect(page.locator('main > .mapping-lead img, main > .case-evidence img, main > .mapping-evidence img').first()).toBeVisible();
          for (const item of await page.locator('.decision-flow > li').all()) {
            const box = await item.boundingBox();
            expect(box.x).toBeGreaterThanOrEqual(0);
            expect(box.x + box.width).toBeLessThanOrEqual(width);
          }
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path).toBe(true);
      }
      expect(errors).toEqual([]);
    });
  }
}

test('all detailed evidence remains keyboard-accessible and bookmarked sections open their parent disclosures', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  for (const [path, hash] of features) {
    await page.goto(path);
    const summary = page.locator('#case-details > summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#case-details')).toHaveAttribute('open');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#case-details')).not.toHaveAttribute('open');
    await page.goto(path + hash);
    await expect(page.locator('#case-details')).toHaveAttribute('open');
    await expect(page.locator(hash)).toBeInViewport();
    await page.reload();
    await expect(page.locator(hash)).toBeInViewport();
  }
  await page.goto('/about.html#experience');
  await expect(page.locator('#experience-details')).toHaveAttribute('open');
  await expect(page.locator('#experience')).toBeInViewport();
});

test('Analytics+ feature tabs provide consistent keyboard navigation and a direct return to the product', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/storyboard.html');
  for (const [path, label] of analytics) {
    const tabs = page.getByRole('navigation', { name: 'Analytics+ features', exact: true });
    await tabs.getByRole('link', { name: label, exact: true }).focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new RegExp(path.replace('.', '\\.') + '$'));
    await expect(tabs.locator('[aria-current="page"]')).toHaveText(label);
    for (const link of await tabs.getByRole('link').all()) {
      expect((await link.boundingBox()).height).toBeGreaterThanOrEqual(44);
    }
    await expect(page.locator('.back-link')).toHaveAttribute('href', '/analytics-plus.html#features');
  }
  await page.locator('.back-link').click();
  await expect(page.locator('#features')).toBeInViewport();
});

test('recruiter summaries, branding, evidence disclosures and feature navigation work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 900 } });
  try {
    const page = await context.newPage();
    for (const [path] of features) {
      await page.goto(baseURL + path);
      await expect(page.locator('.case-snapshot')).toBeVisible();
      await page.locator('#case-details > summary').focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('#case-details .case-nav')).toBeVisible();
      await expect(page.getByAltText('Lumel Technologies', { exact: true })).toBeVisible();
    }
    await page.goto(baseURL + '/storyboard.html');
    await page.getByRole('navigation', { name: 'Analytics+ features' }).getByRole('link', { name: 'KPI Presets', exact: true }).click();
    await expect(page).toHaveURL(baseURL + '/kpi.html');
  } finally {
    await context.close();
  }
});

test('company logos are served unchanged from their allowlisted local assets', async ({ request }) => {
  for (const name of ['lumel-logo.svg', 'microsoft-logo.png']) {
    const response = await request.get('/assets/' + name);
    expect(response.status()).toBe(200);
    expect((await response.body()).equals(await readFile(new URL('../assets/' + name, import.meta.url)))).toBe(true);
  }
});
