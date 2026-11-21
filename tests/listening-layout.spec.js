import { test, expect } from './fixtures.js';

for (const width of [320, 390, 768, 1440]) {
  for (const colorScheme of ['light', 'dark']) {
    test(`header sound settings fit and preserve keyboard focus at ${width}px in ${colorScheme}`, async ({ page }) => {
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

      const trigger = page.getByRole('button', { name: 'Sound settings', exact: true });
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await expect(page.locator('.page-listening')).toHaveCount(0);
      await trigger.focus();
      await trigger.press('Enter');
      const panel = page.getByRole('region', { name: 'Sound settings', exact: true });
      await expect(panel).toBeVisible();
      async function expectClearSpacing() {
        const layout = await page.evaluate(() => {
          const box = selector => {
            const rect = document.querySelector(selector).getBoundingClientRect();
            return { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right };
          };
          return {
            header: box('.site-header'),
            panel: box('.sound-settings-menu'),
            overflow: document.documentElement.scrollWidth - innerWidth
          };
        });
        expect(layout.panel.top - layout.header.bottom).toBeCloseTo(8, 0);
        expect(layout.panel.left).toBeGreaterThanOrEqual(12);
        expect(layout.panel.right).toBeLessThanOrEqual(width - 12);
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
      await page.keyboard.press('Escape');
      await expect(panel).toBeHidden();
      await expect(trigger).toBeFocused();
      expect(await page.locator('audio').evaluate(audio => audio.paused)).toBe(true);
    });
  }
}

test('sound settings close for other header controls and outside clicks without starting music', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const trigger = page.getByRole('button', { name: 'Sound settings', exact: true });
    const panel = page.getByRole('region', { name: 'Sound settings', exact: true });
    await trigger.click();
    await page.getByRole('button', { name: /^Appearance:/ }).click();
    await expect(panel).toBeHidden();
    await trigger.click();
    await expect(page.getByRole('menu', { name: 'Appearance', exact: true })).toBeHidden();
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
    await expect(panel).toBeHidden();
    await trigger.click();
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeHidden();
    await page.locator('h1').click();
    await expect(panel).toBeHidden();
    expect(await page.locator('audio').evaluate(audio => audio.paused && audio.readyState === 0)).toBe(true);
  });

test('a late playback failure remains visible after closing sound settings', async ({ page }) => {
    await page.addInitScript(() => {
      HTMLMediaElement.prototype.play = () => new Promise((resolve, reject) => {
        window.failAudioStart = () => reject(new DOMException('Playback was blocked', 'NotAllowedError'));
      });
    });
    await page.goto('/');
    const trigger = page.getByRole('button', { name: 'Sound settings', exact: true });
    await trigger.click();
    await page.getByRole('button', { name: 'Soundroom Mode', exact: true }).click();
    await trigger.click();
    await page.evaluate(() => window.failAudioStart());
    await expect(page.getByRole('alert')).toHaveText('Music could not start. Press Play to retry.');
    await expect(page.getByRole('alert')).toBeVisible();
    await trigger.click();
    await expect(page.getByRole('alert')).toBeHidden();
    await expect(page.getByRole('button', { name: 'Play ambience', exact: true })).toBeEnabled();
  });
