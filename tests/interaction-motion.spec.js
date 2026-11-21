import { test, expect } from './fixtures.js';

async function keyboardFocus(page, locator) {
  await page.keyboard.press('Tab');
  await locator.focus();
  await expect(locator).toBeFocused();
  expect(await locator.evaluate(element => element.matches(':focus-visible'))).toBe(true);
}

test('cards keep their resting borders on hover and retain keyboard focus outlines', async ({ page }) => {
  const borders = element => {
    const style = getComputedStyle(element);
    return ['Top', 'Right', 'Bottom', 'Left'].map(side =>
      [style[`border${side}Width`], style[`border${side}Style`], style[`border${side}Color`]]
    );
  };
  for (const [path, selector] of [
    ['/', '.product-context-card'],
    ['/powertable.html', '.case-product-features a'],
    ['/about.html', '.recommendation-card'],
    ['/analytics.html', '.case-evidence-summary'],
    ['/analytics.html', '.product-screenshot']
  ]) {
    await page.goto(path);
    const card = page.locator(selector).first();
    await card.evaluate(element => {
      for (let parent = element.parentElement; parent; parent = parent.parentElement) {
        if (parent.tagName === 'DETAILS') parent.open = true;
      }
    });
    await card.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    const resting = await card.evaluate(borders);
    await card.hover();
    await card.evaluate(element => Promise.all(element.getAnimations({ subtree: true }).map(animation => animation.finished)));
    expect(await card.evaluate(borders), `${path} ${selector}`).toEqual(resting);
  }
  await page.goto('/');
  const link = page.locator('.product-context-card').first();
  await keyboardFocus(page, link);
  expect(await link.evaluate(element => {
    const style = getComputedStyle(element);
    return style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2;
  })).toBe(true);
});

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

test('the reference hero keeps its typography still during pointer and keyboard browsing', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('.appearance-trigger')).toBeEnabled();
  const hero = page.locator('.reference-hero');
  const title = page.locator('.portrait-title');
  const bounds = await hero.boundingBox();
  await page.mouse.move(bounds.x + bounds.width - 30, bounds.y + 120);
  await expect(title).toHaveCSS('transform', 'none');
  await page.keyboard.press('Tab');
  await expect(title).toHaveCSS('transform', 'none');
  expect(await title.evaluate(element => element.getAnimations().length)).toBe(0);
  expect(await hero.evaluate(element => element.style.cssText)).toBe('');
});

test('the centered portrait waits for its image and plays one composite-only cinematic entrance', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  let release;
  const imageReady = new Promise(resolve => { release = resolve; });
  await page.route('**/assets/portrait-3d.webp', async route => {
    await imageReady;
    await route.continue();
  });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.appearance-trigger')).toBeEnabled();
  const stage = page.locator('.hero-portrait-stage');
  await expect(stage).not.toHaveClass(/is-ready/);
  release();
  await expect(stage).toHaveClass(/is-ready/);
  const effects = await stage.evaluate(element => element.getAnimations({ subtree: true }).map(animation => {
    const timing = animation.effect.getTiming();
    return {
      name: animation.animationName,
      iterations: timing.iterations,
      end: timing.delay + timing.duration,
      properties: [...new Set(animation.effect.getKeyframes().flatMap(frame =>
        Object.keys(frame).filter(key => !['offset', 'computedOffset', 'easing', 'composite'].includes(key))
      ))]
    };
  }));
  expect(effects.map(effect => effect.name).sort()).toEqual(['hero-light-sweep', 'hero-portrait-arrive', 'hero-type-arrive']);
  for (const effect of effects) {
    expect(effect.iterations).toBe(1);
    expect(effect.end).toBeLessThanOrEqual(1950);
    expect(effect.properties.every(property => ['transform', 'opacity'].includes(property))).toBe(true);
  }
  await stage.evaluate(element => Promise.all(element.getAnimations({ subtree: true }).map(animation => animation.finished)));
  await expect(page.locator('.hero-portrait-art')).toHaveCSS('transform', 'none');
  await expect(page.locator('.hero-portrait-art')).toHaveCSS('opacity', '1');
  expect(await stage.evaluate(element => getComputedStyle(element, '::after').opacity)).toBe('0');
  await stage.hover();
  expect(await stage.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
});

test('reduced motion and keyboard input settle the portrait without hiding it', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const stage = page.locator('.hero-portrait-stage');
  const running = () => stage.evaluate(element => element.getAnimations({ subtree: true }).length);
  await expect(stage).toHaveClass(/is-ready/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(running).toBe(0);
  await expect(page.locator('.hero-portrait-art')).toHaveCSS('opacity', '1');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(running).toBeGreaterThan(0);
  await page.keyboard.press('Tab');
  await expect(stage).toHaveClass(/is-settled/);
  await expect.poll(running).toBe(0);
  await expect(page.locator('.hero-portrait-art')).toBeVisible();
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
    const card = page.locator('.product-context-card').first();
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
