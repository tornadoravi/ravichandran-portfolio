import { test, expect, openLinkDetails } from './fixtures.js';

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
  expect(await stage.evaluate(element => getComputedStyle(element.querySelector('.hero-portrait-frame'), '::after').opacity)).toBe('0');
  await stage.hover();
  expect(await stage.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
});

for (const [route, selector] of [
  ['/powertable.html', '.product-illustration .portfolio-illustration'],
  ['/analytics-plus.html', '.feature-illustration'],
  ['/cod-shield.html', '.cod-shield-illustration'],
  ['/bikecare.html', '[data-case-scene="bikecare-challenge"]']
]) {
  test(`cinematic illustration on ${route} plays once, pauses offscreen and preserves its still layout`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(route);
    await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
    const art = page.locator(selector).first();
    await art.evaluate(element => {
      for (let parent = element.parentElement; parent; parent = parent.parentElement) {
        if (parent.tagName === 'DETAILS') parent.open = true;
      }
    });
    const resting = await art.boundingBox();
    await art.scrollIntoViewIfNeeded();
    await expect(art).toHaveAttribute('data-cinematic-state', 'playing');
    expect(await art.evaluate(element => element.getAnimations({ subtree: true }).some(animation => animation.playState === 'running'))).toBe(true);
    const effects = await art.evaluate(element => element.getAnimations({ subtree: true }).map(animation => ({
      iterations: animation.effect.getTiming().iterations,
      end: animation.effect.getTiming().delay + animation.effect.getTiming().duration,
      properties: [...new Set(animation.effect.getKeyframes().flatMap(frame =>
        Object.keys(frame).filter(key => !['offset', 'computedOffset', 'easing', 'composite'].includes(key))
      ))]
    })));
    expect(effects.length).toBeGreaterThan(1);
    for (const effect of effects) {
      expect(effect.iterations).toBe(1);
      expect(effect.end).toBeLessThanOrEqual(2000);
      expect(effect.properties.every(property => ['transform', 'opacity'].includes(property))).toBe(true);
    }
    await page.evaluate(() => scrollTo(0, 0));
    await expect(art).toHaveAttribute('data-cinematic-state', 'paused');
    expect(await art.evaluate(element => element.getAnimations({ subtree: true }).every(animation => animation.playState === 'paused'))).toBe(true);
    await art.scrollIntoViewIfNeeded();
    await expect(art).toHaveAttribute('data-cinematic-state', 'static');
    expect(await art.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
    const settled = await art.boundingBox();
    expect(settled.width).toBeCloseTo(resting.width, 1);
    expect(settled.height).toBeCloseTo(resting.height, 1);
    const foreground = art.locator('.illustration-foreground');
    await expect(foreground).toHaveCSS('transform', 'none');
    await expect(foreground).toHaveCSS('opacity', '1');
    await page.evaluate(() => scrollTo(0, 0));
    await art.scrollIntoViewIfNeeded();
    await expect(art).toHaveAttribute('data-cinematic-state', 'static');
  });
}

test('cinematic artwork settles on keyboard and reduced motion, including later-mounted diagrams', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/bikecare.html');
  const art = page.locator('[data-case-scene="bikecare-challenge"]');
  await openLinkDetails(art);
  await art.scrollIntoViewIfNeeded();
  await expect(art).toHaveAttribute('data-cinematic-state', 'playing');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(art).toHaveAttribute('data-cinematic-state', 'static');
  expect(await art.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.keyboard.press('Tab');
  await expect(art.locator('.illustration-foreground')).toHaveCSS('opacity', '1');
  await page.evaluate(() => {
    const sample = document.querySelector('[data-case-scene="bikecare-challenge"]').cloneNode(true);
    sample.removeAttribute('data-cinematic-state');
    sample.dataset.testLateIllustration = '';
    document.querySelector('main').append(sample);
  });
  await expect(page.locator('[data-test-late-illustration]')).toHaveAttribute('data-cinematic-state', 'static');
});

test('all four cover headlines and curved underlines animate without moving the card or screenshots', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
  await page.evaluate(() => document.fonts.ready);
  const cards = page.locator('.product-context-card');
  for (let index = 0; index < 4; index++) {
    if (index > 0) {
      await page.reload();
      await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
      await page.evaluate(() => document.fonts.ready);
    }
    const card = cards.nth(index);
    const art = card.locator('[data-cinematic-root]');
    const cardBefore = await card.boundingBox();
    const screenBefore = await card.locator('.cover-screen').boundingBox();
    await card.scrollIntoViewIfNeeded();
    await expect(art).toHaveAttribute('data-cinematic-state', 'playing');
    const effects = await art.evaluate(element => element.getAnimations({ subtree: true }).filter(animation =>
      animation.animationName.startsWith('illustration-cover')).map(animation => ({
        name: animation.animationName,
        state: animation.playState,
        iterations: animation.effect.getTiming().iterations,
        properties: [...new Set(animation.effect.getKeyframes().flatMap(frame =>
          Object.keys(frame).filter(key => !['offset', 'computedOffset', 'easing', 'composite'].includes(key))
        ))]
      })));
    expect(effects).toHaveLength(5);
    expect(effects.some(effect => effect.name === 'illustration-cover-rule')).toBe(true);
    expect(effects.every(effect => effect.state === 'running' && effect.iterations === 1 &&
      effect.properties.every(property => ['transform', 'opacity'].includes(property)))).toBe(true);
    await expect(art).toHaveAttribute('data-cinematic-state', 'static');
    const cardAfter = await card.boundingBox();
    const screenAfter = await card.locator('.cover-screen').boundingBox();
    expect(cardAfter.width).toBeCloseTo(cardBefore.width, 1);
    expect(cardAfter.height).toBeCloseTo(cardBefore.height, 1);
    expect(screenAfter.width).toBeCloseTo(screenBefore.width, 1);
    expect(screenAfter.height).toBeCloseTo(screenBefore.height, 1);
    await expect(card.locator('.cover-headline-rule')).toHaveCSS('transform', 'none');
    await expect(card.locator('.cover-headline strong')).toHaveCSS('opacity', '1');
    await expect(card.locator('.cover-headline strong')).toHaveCSS('transform', 'none');
  }
});

for (const appearance of ['light', 'dark']) {
  for (const javaScriptEnabled of [true, false]) {
    test.describe(`cinematic still artwork in ${appearance} with JavaScript ${javaScriptEnabled}`, () => {
      test.use({ javaScriptEnabled, reducedMotion: 'reduce', colorScheme: appearance });
      test('preserves visible foregrounds and local theme paints on all four cases', async ({ page }) => {
        if (javaScriptEnabled) await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
        for (const route of ['/powertable.html', '/analytics-plus.html', '/cod-shield.html', '/bikecare.html']) {
          await page.goto(route);
          if (javaScriptEnabled) await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
          else await page.evaluate(value => { document.documentElement.dataset.theme = value; }, appearance);
          const foregrounds = page.locator('.illustration-surface > .illustration-foreground');
          expect(await foregrounds.count(), route).toBeGreaterThan(0);
          const issues = await foregrounds.evaluateAll(elements => elements.flatMap(element => {
            const problems = [];
            const surface = element.parentElement;
            const svg = element.closest('svg');
            const ids = new Set([...svg.querySelectorAll('[id]')].map(node => node.id));
            const style = getComputedStyle(element);
            if (style.opacity !== '1' || style.transform !== 'none') problems.push('Still foreground is hidden or transformed');
            if (surface.getAnimations({ subtree: true }).length) problems.push('Still artwork is animating');
            if (getComputedStyle(surface.querySelector('.illustration-sweep')).opacity !== '0') problems.push('Light sweep obscures still artwork');
            for (const [suffix, property] of [['paper', 'backgroundColor'], ['accent', 'color']]) {
              const probe = document.createElement('span');
              probe.style[property] = `var(--art-${suffix === 'paper' ? 'white' : 'accent'})`;
              svg.parentElement.append(probe);
              const expected = getComputedStyle(probe)[property];
              probe.remove();
              const stop = surface.querySelector(`linearGradient[id$="-${suffix}"] > stop:${suffix === 'paper' ? 'first' : 'last'}-child`);
              if (getComputedStyle(stop).stopColor !== expected) problems.push(`Unresolved ${suffix} theme paint`);
            }
            for (const node of surface.querySelectorAll('*')) {
              const paint = getComputedStyle(node);
              for (const property of ['fill', 'stroke', 'filter']) {
                for (const match of paint[property].matchAll(/url\(["']?[^#]*#([^"')]+)/g)) {
                  if (!ids.has(decodeURIComponent(match[1]))) problems.push(`Non-local ${property}`);
                }
              }
            }
            return problems;
          }));
          expect(issues, route).toEqual([]);
        }
      });
    });
  }
}

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
