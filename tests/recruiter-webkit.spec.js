import { test, expect } from './fixtures.js';

test.use({ browserName: 'webkit', reducedMotion: 'reduce' });

for (const width of [390, 1440]) {
  for (const appearance of ['light', 'dark']) {
    test(`main walkthroughs show their actual Solution content in ${appearance} at ${width}px`, async ({ page }) => {
      test.setTimeout(60000);
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      for (const route of ['powertable', 'analytics-plus', 'cod-shield', 'bikecare']) {
        await page.goto(`/${route}.html`);
        const entry = page.locator('.case-watch-entry').getByRole('button', { name: 'Walkthrough', exact: true });
        await entry.click();
        const player = page.getByRole('dialog');
        const section = route === 'cod-shield' ? 5 : 3;
        await player.getByRole('button', { name: `Go to section ${section}: Solution`, exact: true }).click();
        if (route === 'cod-shield') {
          await expect(player.locator('.cod-film-partner-solution')).toBeVisible();
          await expect(player.getByRole('group', { name: 'Walkthrough partner apps' }).getByRole('button')).toHaveCount(4);
        } else {
          const image = player.locator('[data-solution-step] img').first();
          await expect(image).toBeVisible();
          await image.evaluate(node => node.decode());
          expect(await image.evaluate(node => node.naturalWidth > 0 && node.naturalHeight > 0)).toBe(true);
        }
        await player.getByRole('button', { name: 'Close cinematic walkthrough', exact: true }).click();
        await expect(entry).toBeFocused();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
      expect(errors).toEqual([]);
    });
  }
}
