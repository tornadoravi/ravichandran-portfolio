import { test, expect } from './fixtures.js';

async function keyboardFocus(page, locator) {
  await page.keyboard.press('Tab');
  await locator.focus();
  await expect(locator).toBeFocused();
  expect(await locator.evaluate(element => element.matches(':focus-visible'))).toBe(true);
}

test('all hover rules require hover and fine-pointer capabilities', async ({ page }) => {
  await page.goto('/');
  const ungated = await page.evaluate(() => {
    const violations = [];
    function inspect(rules, guarded = false) {
      for (const rule of rules) {
        const condition = rule.conditionText || '';
        const gated = guarded || (condition.includes('(hover: hover)') && condition.includes('(pointer: fine)'));
        if (rule.selectorText?.includes(':hover') && !gated) violations.push(rule.selectorText);
        if (rule.cssRules) inspect(rule.cssRules, gated);
      }
    }
    for (const sheet of document.styleSheets) inspect(sheet.cssRules);
    return violations;
  });
  expect(ungated).toEqual([]);
});

test('keyboard card navigation and appearance changes are immediate', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.appearance-trigger')).toBeEnabled();
  const card = page.getByRole('link', { name: 'Read Inforiver Analytics+ case study', exact: true });
  await keyboardFocus(page, card);
  await expect(card).toHaveCSS('transform', 'none');
  await expect(card).toHaveCSS('transition-duration', '0s');
  expect(await card.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
  await card.press('Enter');
  await expect(page).toHaveURL(/analytics-plus\.html$/);
  await expect(page.locator('#main')).not.toHaveAttribute('aria-busy', 'true');
  expect(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length)).toBe(0);

  const appearance = page.locator('.appearance-trigger');
  await keyboardFocus(page, appearance);
  await appearance.press('Enter');
  await expect(page.getByRole('menuitemradio', { name: 'Light' })).toBeVisible();
  await page.getByRole('menuitemradio', { name: 'Dark' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('body')).toHaveCSS('transition-duration', '0s');
  expect(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length)).toBe(0);
});

test('keyboard mobile menu and companion greeting do not animate', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.locator('.menu-toggle');
  await keyboardFocus(page, menu);
  await menu.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#main-nav')).toHaveCSS('transition-duration', '0s');
  await menu.press('Enter');

  const companion = page.locator('.header-brand [data-companion]');
  await keyboardFocus(page, companion);
  await companion.press('Enter');
  await expect(page.locator('.header-brand .companion-greeting')).toBeVisible();
  await expect(companion.locator('.soundroom-companion')).toHaveCSS('animation-name', 'none');
  await expect(companion.locator('.soundroom-companion')).toHaveCSS('transform', 'none');
});

test('keyboard image inspection opens without entrance or backdrop animation', async ({ page }) => {
  await page.goto('/analytics.html');
  const inspect = page.locator('.inspect-button').first();
  await expect(inspect).toBeVisible();
  await keyboardFocus(page, inspect);
  await inspect.press('Enter');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveCSS('animation-name', 'none');
  expect(await dialog.evaluate(element => getComputedStyle(element, '::backdrop').animationName)).toBe('none');
  await page.keyboard.press('Escape');
  await expect(inspect).toBeFocused();
});

test('keyboard focus resets portrait depth directly without inherited style writes', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('.appearance-trigger')).toBeEnabled();
  const hero = page.locator('.portrait-hero');
  const portrait = page.locator('.portrait-art');
  const bounds = await hero.boundingBox();
  await page.mouse.move(bounds.x + bounds.width - 30, bounds.y + 120);
  await expect.poll(() => portrait.evaluate(element => new DOMMatrixReadOnly(getComputedStyle(element).transform).m41)).toBeGreaterThan(6);
  await page.keyboard.press('Tab');
  await expect(portrait).toHaveCSS('transform', 'none');
  expect(await portrait.evaluate(element => element.style.transform)).toBe('');
  expect(await hero.evaluate(element => element.style.cssText)).toBe('');
});

test('pointer controls provide a short press response without disabling zoom or text selection', async ({ page }) => {
  await page.goto('/');
  const control = page.locator('.appearance-trigger');
  await expect(control).toBeEnabled();
  await control.hover();
  await page.mouse.down();
  try {
    expect(await control.evaluate(element => element.matches(':active'))).toBe(true);
    await expect.poll(() => control.evaluate(element => new DOMMatrixReadOnly(getComputedStyle(element).transform).m11)).toBeCloseTo(.97, 2);
    await expect(control).toHaveCSS('touch-action', 'manipulation');
    expect(await page.locator('.hero-introduction').evaluate(element => getComputedStyle(element).userSelect)).not.toBe('none');
    expect(await page.locator('meta[name="viewport"]').getAttribute('content')).not.toMatch(/user-scalable\s*=\s*no|maximum-scale\s*=\s*1/);
  } finally {
    await page.mouse.up();
  }
});

test('coarse-pointer emulation has no hover transforms and keeps selected theme feedback', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto(baseURL);
    expect(await page.evaluate(() => matchMedia('(hover: hover) and (pointer: fine)').matches)).toBe(false);
    const card = page.locator('.project-visual').first();
    await card.hover();
    await expect(card).toHaveCSS('transform', 'none');
    const companion = page.locator('.header-brand [data-companion]');
    await companion.hover();
    await expect(companion.locator('.soundroom-companion')).toHaveCSS('transform', 'none');
    await page.locator('.appearance-trigger').tap();
    await expect(page.getByRole('menuitemradio', { name: 'Light' })).toBeVisible();
    const selected = page.getByRole('menuitemradio', { checked: true });
    expect(await selected.evaluate(element => getComputedStyle(element).backgroundColor)).not.toBe('rgba(0, 0, 0, 0)');
  } finally {
    await context.close();
  }
});
