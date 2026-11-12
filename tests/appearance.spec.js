import { test, expect } from './fixtures.js';

test.use({ reducedMotion: 'reduce' });

const backgrounds = { light: 'rgb(247, 248, 243)', dark: 'rgb(16, 28, 33)' };

async function choose(page, label) {
  await page.getByRole('button', { name: /^Appearance:/ }).click();
  await page.getByRole('menuitemradio', { name: label, exact: true }).click();
  await expect(page.getByRole('button', { name: `Appearance: ${label}`, exact: true })).toBeFocused();
}

for (const colorScheme of ['light', 'dark']) {
  test(`System defaults to the ${colorScheme} device appearance without loading music`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    const audioRequests = [];
    page.on('request', request => { if (request.url().endsWith('.mp3')) audioRequests.push(request.url()); });
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Appearance: System', exact: true })).toBeEnabled();
    await expect(page.locator('html')).toHaveAttribute('data-appearance', 'system');
    await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
    await expect(page.locator('body')).toHaveCSS('background-color', backgrounds[colorScheme]);
    expect(await page.locator('audio').evaluate(audio => audio.paused && audio.readyState === 0)).toBe(true);
    expect(audioRequests).toEqual([]);
  });
}

test('explicit appearance persists across routes, reloads, and visits independently of the OS', async ({ page, browser }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await choose(page, 'Dark');
  for (const path of ['/powertable.html', '/analytics-plus.html', '/storyboard.html', '/about.html']) {
    await page.goto(path);
    await expect(page.getByRole('button', { name: 'Appearance: Dark', exact: true })).toBeEnabled();
    await expect(page.locator('body')).toHaveCSS('background-color', backgrounds.dark);
  }
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-appearance', 'dark');
  const context = await browser.newContext({ storageState: await page.context().storageState(), colorScheme: 'light' });
  const revisit = await context.newPage();
  await revisit.goto(page.url());
  await expect(revisit.locator('body')).toHaveCSS('background-color', backgrounds.dark);
  await context.close();
  await choose(page, 'Light');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('body')).toHaveCSS('background-color', backgrounds.light);
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#f7f8f3');
});

test('System follows live device changes while explicit Dark remains pinned', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await choose(page, 'Dark');
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await choose(page, 'System');
  await expect(page.locator('body')).toHaveCSS('background-color', backgrounds.light);
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('body')).toHaveCSS('background-color', backgrounds.dark);
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#101c21');
  expect(await page.evaluate(() => localStorage.getItem('portfolio-appearance'))).toBe('system');
});

test('appearance changes neither start nor pause music and listening mode never changes appearance', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await choose(page, 'Light');
  await page.getByRole('button', { name: 'Soundroom Mode', exact: true }).click();
  await expect.poll(() => page.locator('audio').evaluate(audio => !audio.paused && audio.currentTime > 0)).toBe(true);
  await expect(page.locator('body')).toHaveCSS('background-color', backgrounds.light);
  await choose(page, 'Dark');
  expect(await page.locator('audio').evaluate(audio => audio.paused)).toBe(false);
  await expect(page.locator('body')).toHaveCSS('background-color', backgrounds.dark);
  await page.getByRole('button', { name: 'Focus Mode', exact: true }).click();
  expect(await page.locator('audio').evaluate(audio => audio.paused)).toBe(true);
  await expect(page.locator('body')).toHaveCSS('background-color', backgrounds.dark);
  await page.reload();
  expect(await page.locator('audio').evaluate(audio => audio.paused && audio.readyState === 0)).toBe(true);
});

for (const width of [320, 390, 701, 768, 900, 1440]) {
  test(`appearance menu is keyboard-accessible, dismissible, and fits at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const trigger = page.getByRole('button', { name: /^Appearance:/ });
    const menu = page.getByRole('menu', { name: 'Appearance', exact: true });
    await expect(trigger).toBeEnabled();
    await expect(trigger).toHaveAttribute('title', 'Appearance');
    expect((await trigger.boundingBox()).height).toBeGreaterThanOrEqual(44);
    const icon = await trigger.locator('svg:not(.appearance-chevron)').boundingBox();
    const chevron = await trigger.locator('.appearance-chevron').boundingBox();
    expect(icon.y + icon.height / 2).toBeCloseTo(chevron.y + chevron.height / 2, 1);
    await trigger.focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('menuitemradio', { name: 'Light', exact: true })).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await expect(page.getByRole('menuitemradio', { name: 'System', exact: true })).toBeFocused();
    await page.keyboard.press('Home');
    await expect(page.getByRole('menuitemradio', { name: 'Light', exact: true })).toBeFocused();
    await page.keyboard.press('End');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');
    await expect(trigger).toHaveAccessibleName('Appearance: Dark');
    await expect(trigger).toBeFocused();
    await expect(menu).toBeHidden();
    await trigger.click();
    await expect(page.getByRole('menuitemradio', { name: 'Dark', exact: true })).toHaveAttribute('aria-checked', 'true');
    await expect(page.getByRole('menuitemradio', { name: 'Dark', exact: true })).toHaveCSS('color', 'rgb(214, 239, 160)');
    const box = await menu.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(width);
    for (const item of await menu.getByRole('menuitemradio').all()) {
      expect((await item.boundingBox()).height).toBeGreaterThanOrEqual(44);
    }
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
    await expect(menu).toBeHidden();
    await trigger.click();
    await page.locator('h1').click();
    await expect(menu).toBeHidden();
    await trigger.click();
    await page.keyboard.press('Tab');
    await expect(menu).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('mobile navigation, companion greeting, and appearance menu do not overlap', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const navigation = page.getByRole('navigation', { name: 'Main navigation' });
  const menu = page.getByRole('menu', { name: 'Appearance', exact: true });
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await expect(navigation).toBeVisible();
  await page.getByRole('button', { name: /^Appearance:/ }).click();
  await expect(navigation).toBeHidden();
  await expect(menu).toBeVisible();
  await page.getByRole('button', { name: 'Say hello to the studio companion' }).click();
  await expect(menu).toBeHidden();
  await expect(page.locator('#companion-greeting')).toBeVisible();
});

test('stored appearance is applied before React hydrates', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('portfolio-appearance', 'dark'));
  await page.route('**/*.js', route => new URL(route.request().url()).pathname === '/theme.js' ? route.continue() : route.abort());
  await page.goto('/analytics-plus.html');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('body')).toHaveCSS('background-color', backgrounds.dark);
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#101c21');
  await expect(page.getByRole('button', { name: /^Appearance:/ })).toBeDisabled();
});

test('unavailable storage reports warnings but theme changes and native navigation remain usable', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  const warnings = [];
  page.on('console', message => { if (message.type() === 'warning') warnings.push(message.text()); });
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new DOMException('Storage blocked', 'SecurityError'); };
    Storage.prototype.setItem = () => { throw new DOMException('Storage blocked', 'SecurityError'); };
  });
  await page.goto('/');
  await choose(page, 'Dark');
  await expect(page.locator('body')).toHaveCSS('background-color', backgrounds.dark);
  expect(warnings.some(text => text.includes('Unable to restore the portfolio appearance'))).toBe(true);
  expect(warnings.some(text => text.includes('Unable to save the portfolio appearance'))).toBe(true);
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About', exact: true })).toHaveAttribute('href', '/about.html');
});
