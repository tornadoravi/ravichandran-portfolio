import { test, expect } from './fixtures.js';

for (const width of [320, 390, 768, 1440]) {
  for (const colorScheme of ['light', 'dark']) {
    test(`listening controls stay clear of keyboard landmark focus at ${width}px in ${colorScheme}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme });
      await page.goto('/');
      await expect(page.locator('.appearance-trigger')).toBeEnabled();
      await page.keyboard.press('Tab');
      const menu = page.locator('.menu-toggle');
      if (await menu.isVisible()) {
        await menu.focus();
        await menu.press('Enter');
      }
      const about = page.locator('#main-nav').getByRole('link', { name: 'About', exact: true });
      await about.focus();
      await about.press('Enter');
      await expect(page).toHaveURL(/about\.html$/);
      const main = page.locator('#main');
      await expect(main).toBeFocused();
      expect(await main.evaluate(element => element.matches(':focus-visible'))).toBe(true);
      await expect(main).toHaveCSS('outline-style', 'none');
      await expect(main.locator('h1')).toHaveCSS('outline-style', 'solid');
      await expect(main.locator('h1')).toHaveCSS('outline-width', '2px');

      async function expectClearSpacing() {
        const layout = await page.evaluate(() => {
          const box = selector => {
            const rect = document.querySelector(selector).getBoundingClientRect();
            return { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right };
          };
          return {
            header: box('.site-header'),
            row: box('.page-listening'),
            room: box('.page-listening .listening-room'),
            main: box('#main'),
            overflow: document.documentElement.scrollWidth - innerWidth
          };
        });
        expect(layout.row.top).toBeGreaterThanOrEqual(layout.header.bottom - 1);
        expect(layout.room.top - layout.row.top).toBeGreaterThanOrEqual(16);
        expect(layout.row.bottom - layout.room.bottom).toBeGreaterThanOrEqual(16);
        expect(layout.main.top).toBeGreaterThanOrEqual(layout.row.bottom - 1);
        expect(layout.overflow).toBeLessThanOrEqual(0);
      }
      await expectClearSpacing();
      const soundroom = page.getByRole('button', { name: 'Soundroom Mode', exact: true });
      await soundroom.focus();
      await soundroom.press('Enter');
      await expect(soundroom).toHaveAttribute('aria-pressed', 'true');
      await expect(soundroom).toHaveCSS('outline-style', 'solid');
      await expect(page.locator('#soundroom-panel')).toBeVisible();
      await expectClearSpacing();
      await page.getByRole('button', { name: 'Focus Mode', exact: true }).press('Enter');
      await expect(page.locator('#soundroom-panel')).toBeHidden();
      await expectClearSpacing();
    });
  }
}
