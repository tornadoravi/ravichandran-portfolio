import { test, expect } from './fixtures.js';

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`editorial product covers keep original screens intact in ${appearance} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      await page.goto('/#work');
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('.product-cover-poster')).toHaveCount(2);
      await expect(page.locator('.showcase-case, .case-showcase')).toHaveCount(0);
      await expect(page.locator('.cover-headline')).toHaveText(['Complex plans.Made clear.', 'Find a chart.Tell your story.']);
      await expect(page.locator('#project-planning .cover-screen img')).toHaveAttribute('src', '/assets/powertable-official-gantt.webp');
      await expect(page.locator('#project-analytics .cover-screen img')).toHaveAttribute('src', '/assets/analytics-plus-official-dashboard.webp');
      await expect(page.locator('.cover-screen-caption')).toHaveText(['Official product canvas', 'Official product canvas']);
      await expect(page.locator('.cover-poster-badge')).toHaveText(['Product overview', 'Product overview']);
      await expect(page.locator('.cover-description')).toHaveCount(2);
      await expect(page.locator('.cover-scope-tags > span')).toHaveCount(6);
      await expect(page.locator('#project-planning .cover-flow')).toHaveText('TasksTimeline');
      for (const poster of await page.locator('.product-cover-poster').all()) {
        const image = poster.locator('img');
        await image.evaluate(image => image.decode());
        const box = await poster.boundingBox();
        const frame = await poster.locator('.cover-screen').boundingBox();
        const picture = await image.boundingBox();
        expect(frame.x).toBeGreaterThanOrEqual(box.x);
        expect(frame.x + frame.width).toBeLessThanOrEqual(box.x + box.width);
        expect(frame.y + frame.height).toBeLessThanOrEqual(box.y + box.height);
        const source = await image.evaluate(image => ({ width: image.naturalWidth, height: image.naturalHeight }));
        expect(picture.width).toBeLessThanOrEqual(source.width);
        expect(picture.width / picture.height).toBeCloseTo(source.width / source.height, 2);
        await expect(image).toHaveCSS('transform', 'none');
        await expect(image).toHaveCSS('filter', 'none');
        const copy = await poster.locator('.cover-poster-copy').boundingBox();
        if (box.width > 520) {
          expect(copy.x + copy.width).toBeLessThanOrEqual(frame.x - 16);
          expect(frame.y).toBeGreaterThanOrEqual(box.y);
          expect(box.width / box.height).toBeGreaterThan(1.3);
        } else {
          expect(copy.y + copy.height).toBeLessThanOrEqual(frame.y - 12);
          expect(frame.width).toBeGreaterThanOrEqual(box.width - 42);
        }
        const headline = await poster.locator('.cover-headline').evaluate(element => parseFloat(getComputedStyle(element).fontSize));
        expect(headline).toBeGreaterThanOrEqual(26);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    });
  }
}

test('alternating reference cards use split landscape covers and readable stacked artwork on narrow panels', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 701, 740, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/#work');
    await page.locator('.product-cover-poster img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
    const cards = await page.locator('.product-context-card').evaluateAll(cards => cards.map(card => {
      const bounds = selector => {
        const { x, y, width, height, right, bottom } = card.querySelector(selector).getBoundingClientRect();
        return { x, y, width, height, right, bottom };
      };
      return {
        top: card.getBoundingClientRect().top,
        height: card.getBoundingClientRect().height,
        tile: bounds('.cover-evidence'),
        frame: bounds('.cover-screen'),
        copy: bounds('.cover-poster-copy'),
        flow: { ...bounds('.cover-flow'), right: Math.max(...[...card.querySelectorAll('.cover-flow > span')].map(element => element.getBoundingClientRect().right)) },
        badge: bounds('.product-live-badge'),
        role: bounds('.product-my-work'),
        rows: ['.product-context-copy .eyebrow', '.product-context-copy h3', '.product-context-copy > p:not([class])'].map(bounds)
      };
    }));
    for (const card of cards) {
      if (card.tile.width > 520) {
        expect(card.copy.right, `${width}px copy beside screen`).toBeLessThanOrEqual(card.frame.x - 16);
        expect(card.copy.bottom, `${width}px copy above flow`).toBeLessThanOrEqual(card.flow.y - 16);
      } else {
        expect(card.copy.bottom, `${width}px copy above original screen`).toBeLessThanOrEqual(card.frame.y - 12);
        expect(card.frame.bottom, `${width}px screen above flow`).toBeLessThanOrEqual(card.flow.y - 12);
      }
      expect(card.flow.bottom, `${width}px flow inside tile`).toBeLessThanOrEqual(card.tile.bottom);
      expect(card.flow.right, `${width}px flow inside tile`).toBeLessThanOrEqual(card.tile.right);
      expect(card.role.y - card.badge.bottom, `${width}px badge-to-divider gap`).toBeGreaterThanOrEqual(15);
    }
    if (width > 700) {
      expect(Math.abs(cards[0].height - cards[1].height), `${width}px card heights`).toBeLessThan(1);
      expect(cards[0].tile.x).toBeLessThan(cards[0].rows[1].x);
      expect(cards[1].tile.x).toBeGreaterThan(cards[1].rows[1].x);
    } else {
      for (const card of cards) expect(card.tile.bottom).toBeLessThan(card.rows[1].y);
    }
  }
});

test('cover animation is decorative, pointer-triggered, and finite', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/#work');
  await expect(page.locator('.appearance-trigger')).toBeEnabled();
  const card = page.locator('#project-analytics');
  await card.hover();
  const names = await card.evaluate(element => element.getAnimations({ subtree: true }).map(animation => animation.animationName));
  expect(names).toContain('cover-data-flow');
  expect(names).toContain('cover-chart-reveal');
  await expect(card.locator('.product-cover-illustration')).toHaveCSS('transform', 'none');
  await expect.poll(() => card.evaluate(element => element.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running').length)).toBe(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await card.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
});

test('task-to-timeline illustration sequences on scroll, replays on hover, and respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('.appearance-trigger')).toBeEnabled();
  await page.mouse.move(0, 0);
  const poster = page.locator('#project-planning .product-cover-poster');
  const flow = poster.locator('.cover-flow');
  await expect(flow).not.toHaveClass(/is-in-view/);
  await flow.scrollIntoViewIfNeeded();
  await expect(flow).toHaveClass(/is-in-view/);
  await expect(flow.locator('.cover-task-row')).toHaveCount(3);
  await expect(flow.locator('.cover-timeline-bar')).toHaveCount(3);
  const sequence = await flow.evaluate(element => element.getAnimations({ subtree: true }).map(animation => ({
    name: animation.animationName,
    delay: animation.effect.getTiming().delay,
    duration: animation.effect.getTiming().duration,
    iterations: animation.effect.getTiming().iterations,
    compositeOnly: animation.effect.getKeyframes().every(frame => Object.keys(frame).every(key =>
      ['transform', 'opacity', 'offset', 'computedOffset', 'easing', 'composite'].includes(key)))
  })));
  expect(sequence.filter(animation => animation.name === 'cover-task-ready').map(animation => animation.delay)).toEqual([0, 90, 180]);
  expect(sequence.filter(animation => animation.name === 'cover-timeline-build').map(animation => animation.delay)).toEqual([1100, 1200, 1300]);
  expect(sequence.every(animation => animation.iterations === 1 && animation.compositeOnly)).toBe(true);
  const signal = sequence.find(animation => animation.name === 'cover-data-flow');
  const taskEnd = Math.max(...sequence.filter(animation => animation.name === 'cover-task-ready').map(animation => animation.delay + animation.duration));
  const timelineStart = Math.min(...sequence.filter(animation => animation.name === 'cover-timeline-build').map(animation => animation.delay));
  expect(signal.delay).toBeGreaterThanOrEqual(taskEnd);
  expect(signal.delay + signal.duration).toBeLessThanOrEqual(timelineStart);
  await expect.poll(() => flow.evaluate(element => element.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running').length)).toBe(0);
  await poster.hover();
  await expect.poll(() => flow.evaluate(element => element.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running').length)).toBeGreaterThan(0);
  await expect(poster.locator('.product-cover-illustration')).toHaveCSS('transform', 'none');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await flow.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
  await expect(flow.locator('.cover-task')).toBeVisible();
  await expect(flow.locator('.cover-timeline')).toBeVisible();
});

test('keyboard focus keeps the covers static and product navigation available', async ({ page }) => {
  await page.goto('/#work');
  const card = page.locator('#project-analytics');
  await page.keyboard.press('Tab');
  const planning = page.locator('#project-planning');
  await planning.focus();
  await planning.locator('.cover-flow').scrollIntoViewIfNeeded();
  expect(await planning.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
  await card.focus();
  expect(await card.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/analytics-plus\.html$/);
});
