import { test, expect } from './fixtures.js';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

test.use({ reducedMotion: 'reduce' });

const activePages = [
  '/', '/about.html', '/powertable.html', '/analytics-plus.html', '/analytics-spatial.html',
  '/column-mapping.html', '/gantt-baselines.html', '/gantt-backlog.html',
  '/gantt-conditional-formatting.html', '/gantt-configuration.html',
  '/resource-configuration.html', '/crosstab.html', '/storyboard.html', '/gantt.html',
  '/analytics.html', '/presentation.html', '/kpi.html'
];

test('Analytics+ case links align horizontally where they fit and wrap without overlap', async ({ page }) => {
  for (const width of [320, 390, 768, 1060, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/#project-analytics');
    await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
    await page.evaluate(() => document.fonts.ready);
    const links = page.locator('#project-analytics .project-case-links > a');
    await expect(links).toHaveCount(2);
    await expect(links.nth(0)).toHaveAttribute('href', '/analytics-plus.html');
    await expect(links.nth(1)).toHaveAttribute('href', '/analytics-spatial.html');
    const [main, concept] = await Promise.all([links.nth(0).boundingBox(), links.nth(1).boundingBox()]);
    expect(main.height).toBeGreaterThanOrEqual(44);
    expect(concept.height).toBeGreaterThanOrEqual(44);
    if (width >= 1060) expect(concept.y).toBeCloseTo(main.y, 1);
    if (Math.abs(concept.y - main.y) < 1) expect(concept.x).toBeGreaterThanOrEqual(main.x + main.width + 24);
    else expect(concept.y).toBeGreaterThanOrEqual(main.y + main.height + 12);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`product covers show the Microsoft wordmark and platform in ${appearance} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      await page.goto('/');
      await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
      const badges = page.locator('.project-visual .platform-pill');
      await expect(badges).toHaveCount(2);
      await expect(badges.locator(':scope > span')).toHaveText(['Fabric', 'Power BI']);
      for (const badge of await badges.all()) {
        await badge.scrollIntoViewIfNeeded();
        await expect(badge).toHaveCSS('background-color', 'rgb(255, 255, 255)');
        const logo = badge.getByAltText('Microsoft', { exact: true });
        await expect(logo).toBeVisible();
        await expect(logo).toHaveAttribute('src', '/assets/microsoft-logo.png');
        await expect(logo).toHaveJSProperty('naturalWidth', 216);
        const box = await logo.boundingBox();
        expect(box.width).toBeGreaterThanOrEqual(94);
        expect(box.width / box.height).toBeCloseTo(216 / 46, 2);
        const bounds = await badge.boundingBox();
        const cover = await badge.locator('..').locator('..').boundingBox();
        expect(bounds.x).toBeGreaterThanOrEqual(cover.x);
        expect(bounds.x + bounds.width).toBeLessThanOrEqual(cover.x + cover.width);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
  }
}

test('one interactive character precedes the name on every active page', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of activePages) {
    await page.goto(path);
    const character = page.locator('.header-brand [data-companion]');
    await expect(page.locator('[data-companion]')).toHaveCount(1);
    await expect(character).toBeEnabled();
    await expect(page.locator('.listening-room .soundroom-companion')).toHaveCount(0);
    await expect(character.locator('img')).toHaveJSProperty('naturalWidth', 352);
    const icon = await character.boundingBox();
    const name = await page.locator('.header-brand .wordmark').boundingBox();
    expect(icon.x + icon.width).toBeLessThan(name.x);
    expect(Math.abs(icon.y + icon.height / 2 - name.y - name.height / 2)).toBeLessThan(1);
    await character.focus();
    await page.keyboard.press('Enter');
    await expect(character).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#companion-greeting')).toBeInViewport();
    await page.keyboard.press('Escape');
    await expect(page.locator('#companion-greeting')).toBeHidden();
    await expect(character).toBeFocused();
  }
});

for (const mode of ['focus', 'soundroom']) {
  for (const width of [320, 390, 701, 768, 900, 1440]) {
    test(`header character and navigation fit ${mode} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(mode => sessionStorage.setItem('portfolio-listening-mode', mode), mode);
      for (const path of ['/', '/about.html', '/powertable.html']) {
        await page.goto(path);
        const character = page.locator('.header-brand [data-companion]');
        await expect(character).toBeInViewport();
        await expect(page.locator('.header-brand .wordmark')).toBeInViewport();
        expect((await character.boundingBox()).width).toBeGreaterThanOrEqual(44);
        if (width <= 700) {
          const menu = await page.locator('.menu-toggle').boundingBox();
          const name = await page.locator('.header-brand .wordmark').boundingBox();
          expect(menu.x).toBeGreaterThanOrEqual(name.x + name.width);
          expect(Math.abs(menu.y + menu.height / 2 - name.y - name.height / 2)).toBeLessThan(1);
          await page.locator('.menu-toggle').click();
        }
        await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
        await character.click();
        const greeting = await page.locator('#companion-greeting').boundingBox();
        expect(greeting.x).toBeGreaterThanOrEqual(0);
        expect(greeting.x + greeting.width).toBeLessThanOrEqual(width);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    });
  }
  for (const width of [320, 390, 768, 1440]) {
    test(`portrait lettering stays visible but never bleeds into its fade in ${mode} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(mode => sessionStorage.setItem('portfolio-listening-mode', mode), mode);
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      const portrait = page.locator('.hero-portrait');
      await portrait.locator('img').evaluate(image => image.decode());
      const visible = await portrait.screenshot();
      await page.locator('.portrait-wordmark').evaluate(element => { element.style.visibility = 'hidden'; });
      const hidden = await portrait.screenshot();
      const { width: imageWidth, height: imageHeight } = await sharp(visible).metadata();
      const fadeTop = Math.floor(imageHeight * .64);
      const fade = { left: 0, top: fadeTop, width: imageWidth, height: imageHeight - fadeTop };
      const withLetters = await sharp(visible).extract(fade).raw().toBuffer();
      const withoutLetters = await sharp(hidden).extract(fade).raw().toBuffer();
      expect(withLetters.equals(withoutLetters)).toBe(true);
      expect((await sharp(visible).raw().toBuffer()).equals(await sharp(hidden).raw().toBuffer())).toBe(false);
    });
  }
}

for (const width of [320, 390, 650, 768, 1440, 2000]) {
  test(`editorial Home preserves its gallery, categories and character at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(247, 248, 243)');
    await expect(page.locator('h1')).toHaveText('Complex products.Considered experiences.');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.hero-role strong')).toHaveText('Product Designer II at Lumel.');
    await expect(page.locator('.hero-role > span')).toHaveText('Enterprise analytics & connected planning.');
    const role = await page.locator('.hero-role').boundingBox();
    const identity = page.locator('.hero-context .project-identity');
    await expect(identity.locator('.identity-company')).toContainText('Designed at');
    await expect(identity.locator('.identity-company img')).toHaveAttribute('alt', 'Lumel Technologies');
    await expect(identity.locator('.identity-platform')).toContainText('Fabric & Power BI');
    await expect(identity.locator('.identity-platform img[alt="Microsoft"]')).toBeVisible();
    const badges = await identity.boundingBox();
    const title = await page.locator('.portrait-title').boundingBox();
    expect(badges.y).toBeGreaterThanOrEqual(role.y + role.height + 12);
    expect(badges.x).toBeCloseTo(role.x, 1);
    expect(badges.y + badges.height).toBeLessThan(title.y);
    await expect(page.locator('.portrait-footer, .portrait-work-link')).toHaveCount(0);
    await expect(page.locator('.portrait-stage')).toHaveCount(0);
    await expect(page.locator('.portrait-wordmark')).toHaveText('PRODUCTDESIGNER');
    await expect(page.locator('.portrait-wordmark')).toBeVisible();
    await expect(page.locator('.portrait-wordmark')).toHaveAttribute('aria-hidden', 'true');
    expect(await page.locator('.portrait-wordmark').evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(72);
    const portrait = page.locator('.hero-portrait .portrait-art');
    await expect(portrait).toHaveAttribute('src', '/assets/portrait-3d.webp?v=3');
    await expect(portrait).toHaveJSProperty('complete', true);
    expect(await portrait.evaluate(image => image.naturalWidth)).toBe(1254);
    const portraitWidth = width > 1050
      ? Math.min((Math.min(1600, width - 112) - 48) / 2.3, 640)
      : width > 700 ? Math.min((width - 92) / 2.1, 440) : Math.min(360, width - 40);
    expect((await portrait.boundingBox()).width).toBeCloseTo(portraitWidth, 1);
    expect(await page.locator('.hero-portrait').evaluate(element => getComputedStyle(element, '::before').content)).toBe('none');
    await expect(page.locator('.soundroom-companion')).toHaveAttribute('src', '/assets/studio-companion-3d.webp');
    const hero = await page.locator('.portrait-hero').boundingBox();
    expect(hero.y + hero.height).toBeGreaterThanOrEqual(900);
    const projects = page.locator('#work > .project');
    await expect(projects).toHaveCount(2);
    const boxes = await projects.evaluateAll(items => items.map(item => {
      const { x, y, width, height } = item.getBoundingClientRect();
      return { x, y, width, height };
    }));
    if (width > 700) {
      expect(boxes[1].y).toBe(boxes[0].y);
      expect(boxes[1].x).toBeGreaterThanOrEqual(boxes[0].x + boxes[0].width);
    } else {
      expect(boxes[1].y).toBeGreaterThanOrEqual(boxes[0].y + boxes[0].height);
    }
    for (const project of await projects.all()) {
      await expect(project.locator('.project-categories li')).toHaveCount(2);
      await expect(project.locator('.project-categories a, .project-categories button')).toHaveCount(0);
      const image = project.locator('.product-screenshot img');
      const expectedImage = await project.getAttribute('id') === 'project-planning'
        ? '/assets/powertable-official-gantt.webp'
        : '/assets/analytics-plus-official-dashboard.webp';
      await expect(image).toHaveAttribute('src', expectedImage);
      await expect(project.locator('.visual-bottom')).toContainText('Official');
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(image => image.decode());
      const frame = await project.locator('.project-visual').boundingBox();
      const screen = await image.boundingBox();
      const source = await project.locator('.visual-bottom').boundingBox();
      expect(screen.y).toBeGreaterThanOrEqual(frame.y);
      expect(screen.y + screen.height).toBeLessThanOrEqual(frame.y + frame.height - 8);
      expect(source.y + source.height).toBeLessThanOrEqual(frame.y + frame.height - 8);
      const dimensions = await image.evaluate(image => ({
        width: image.clientWidth, height: image.clientHeight,
        nativeWidth: image.naturalWidth, nativeHeight: image.naturalHeight
      }));
      expect(dimensions.width).toBeLessThanOrEqual(dimensions.nativeWidth);
      expect(Math.abs(dimensions.width / dimensions.height - dimensions.nativeWidth / dimensions.nativeHeight)).toBeLessThan(.02);
      await expect(project.locator('.project-features')).toHaveCount(0);
      await expect(project.locator('.case-link')).toHaveCount(1);
    }
    await expect(page.locator('#project-planning h3')).toHaveText('PowerTable');
    await expect(page.locator('#project-analytics h3')).toHaveText('Inforiver Analytics+');
    if (width > 700) {
      for (const selector of ['.project-visual', '.visual-heading', '.cover-statement', '.product-screenshot', '.visual-bottom']) {
        const [planning, analytics] = await page.locator(`#work > .project ${selector}`).evaluateAll(elements => elements.map(element => {
          const { y, height } = element.getBoundingClientRect();
          return { y, height };
        }));
        expect(analytics.y, `${selector} top`).toBeCloseTo(planning.y, 0);
        expect(analytics.height, `${selector} height`).toBeCloseTo(planning.height, 0);
      }
    }
    for (const label of await page.locator('.platform-pill, .project-categories li, .visual-bottom').all()) {
      expect(await label.evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(12);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    expect(errors).toEqual([]);
  });
}

for (const mode of ['focus', 'soundroom']) {
  for (const width of [1440, 1920, 2560]) {
    test(`Home content scales to fill a ${width}px screen in ${mode}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(mode => sessionStorage.setItem('portfolio-listening-mode', mode), mode);
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      const hero = await page.locator('.portrait-hero').boundingBox();
      expect(hero.width).toBeCloseTo(Math.min(1600, width - 112), 1);
      expect((await page.locator('.portrait-art').boundingBox()).width).toBeGreaterThanOrEqual(550);
      const title = await page.locator('.portrait-title').evaluate(element => {
        const style = getComputedStyle(element);
        return { size: parseFloat(style.fontSize), lines: element.getBoundingClientRect().height / parseFloat(style.lineHeight) };
      });
      expect(title.size).toBeGreaterThanOrEqual(60);
      expect(title.lines).toBeCloseTo(2, 1);
      await expect(page.locator('.hero-role')).toHaveCSS('font-size', '14px');
      await expect(page.locator('.hero-introduction')).toHaveCSS('font-size', '18px');
      expect((await page.locator('#work').boundingBox()).y).toBeCloseTo(900, 0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
  }
}

for (const width of [1060, 1280, 1526, 1920]) {
  test(`desktop headline stays on two unclipped lines with larger text at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.portrait-title').evaluate(element => {
      element.style.fontSize = `${parseFloat(getComputedStyle(element).fontSize) * 1.1}px`;
    });
    const composition = await page.locator('.portrait-title').evaluate(element => {
      const style = getComputedStyle(element);
      const title = element.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(element.querySelector('em'));
      return {
        lines: title.height / parseFloat(style.lineHeight),
        titleWidth: title.width,
        phraseWidth: range.getBoundingClientRect().width,
        left: title.left,
        portraitLeft: document.querySelector('.hero-portrait').getBoundingClientRect().left,
        right: title.right
      };
    });
    expect(composition.lines).toBeCloseTo(2, 1);
    expect(composition.phraseWidth).toBeLessThanOrEqual(composition.titleWidth);
    expect(composition.left).toBeGreaterThanOrEqual(56);
    expect(composition.right).toBeLessThan(composition.portraitLeft);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('Resume serves the supplied PDF unchanged and professional links are prominent', async ({ page, request }) => {
  const response = await request.get('/assets/ravichandran-resume.pdf');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/pdf');
  const content = await response.body();
  expect(content.subarray(0, 5).toString()).toBe('%PDF-');
  expect(content.equals(await readFile(new URL('../assets/ravichandran-resume.pdf', import.meta.url)))).toBe(true);
  expect((await request.head('/assets/ravichandran-resume.pdf')).status()).toBe(200);
  expect((await request.get('/assets/CV.pdf')).status()).toBe(404);
  await page.goto('/');
  const contacts = page.locator('.header-contacts');
  await expect(contacts.getByRole('link', { name: /Resume/ })).toHaveAttribute('href', '/assets/ravichandran-resume.pdf');
  await expect(contacts.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/ravichandran-uxui/');
  for (const link of await contacts.locator('a').all()) {
    await expect(link).toBeInViewport();
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect((await link.boundingBox()).height).toBeGreaterThanOrEqual(44);
  }
  await page.goto('/about.html');
  await expect(page.locator('.name-block').getByRole('link', { name: /Resume/ })).toHaveAttribute('href', '/assets/ravichandran-resume.pdf');
});

test('editorial Home keeps native links and a complete gallery without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto(baseURL);
    await expect(page.locator('.hero-portrait img')).toBeVisible();
    await expect(page.locator('.header-brand .soundroom-companion')).toBeVisible();
    await expect(page.locator('.header-brand [data-companion]')).toBeDisabled();
    await expect(page.locator('[data-soundroom]')).toBeHidden();
    await expect(page.locator('#main-nav')).toBeVisible();
    await expect(page.locator('.header-contacts a')).toHaveCount(2);
    await page.locator('#main-nav a[href="/#work"]').click();
    await expect(page.locator('#work')).toBeInViewport();
    await page.getByRole('link', { name: 'Read PowerTable case study', exact: true }).click();
    await expect(page).toHaveURL(/powertable\.html$/);
  } finally {
    await context.close();
  }
});

test('fine-pointer hover gives covers and the original character subtle motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const cover = page.locator('#project-planning .project-visual');
  await cover.hover();
  await expect(page.locator('#project-planning')).toHaveCSS('transform', 'none');
  await expect.poll(() => cover.evaluate(element => new DOMMatrixReadOnly(getComputedStyle(element).transform).m42)).toBeLessThan(-4.9);
  await page.locator('.companion-button').hover();
  await expect.poll(() => page.locator('.soundroom-companion')
    .evaluate(element => Math.abs(new DOMMatrixReadOnly(getComputedStyle(element).transform).m12))).toBeGreaterThan(.13);
  expect(await page.locator('audio').evaluate(audio => audio.paused)).toBe(true);
});

test('reduced motion keeps portrait, cover and character hover effects still', async ({ page }) => {
  await page.goto('/');
  for (const selector of ['.hero-portrait img', '#project-planning .project-visual', '#project-analytics .product-screenshot', '.soundroom-companion']) {
    const element = page.locator(selector).first();
    await element.hover();
    await expect(element).toHaveCSS('transform', 'none');
    await expect(element).toHaveCSS('transition-duration', '0s');
  }
  await page.getByRole('button', { name: 'Say hello to the studio companion' }).click();
  await expect(page.locator('.soundroom-companion')).toHaveCSS('animation-name', 'none');
});

test('the dimensional companion greets keyboard and touch users without interfering with music', async ({ page }) => {
  await page.goto('/');
  const companion = page.getByRole('button', { name: 'Say hello to the studio companion' });
  const greeting = page.locator('#companion-greeting');
  await expect(companion).toHaveAttribute('aria-expanded', 'false');
  await expect(greeting).toBeHidden();
  await expect(page.locator('.soundroom-companion')).toHaveJSProperty('naturalWidth', 352);
  expect((await companion.boundingBox()).height).toBeGreaterThanOrEqual(44);
  await companion.focus();
  await page.keyboard.press('Enter');
  await expect(companion).toHaveAttribute('aria-expanded', 'true');
  await expect(greeting).toContainText('Pick a project card');
  expect(await page.locator('audio').evaluate(audio => audio.paused)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(greeting).toBeHidden();
  await expect(companion).toBeFocused();
  await page.getByRole('button', { name: 'Soundroom Mode', exact: true }).click();
  await expect(page.locator('.soundroom-status')).toHaveText('Music is playing.');
  await companion.click();
  await expect(greeting).toContainText('Good music');
  await expect(page.locator('.soundroom-status')).toHaveText('Music is playing.');
  await companion.click();
  await expect(greeting).toBeHidden();
  await expect(companion).toHaveAttribute('aria-expanded', 'false');
});

for (const width of [320, 390, 768, 1440]) {
  test(`About matches the editorial Home without losing its content at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/about.html');
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(247, 248, 243)');
    await expect(page.locator('body')).toHaveAttribute('data-native-cursor', '');
    await expect(page.locator('.header-contacts a')).toHaveCount(2);
    await expect(page.locator('.profile-photo')).toHaveJSProperty('naturalWidth', 800);
    await expect(page.locator('h1')).toHaveCSS('font-family', await page.locator('.site-header .wordmark').evaluate(element => getComputedStyle(element).fontFamily));
    for (const target of ['#profile', '#approach', '#experience', '#recommendations']) {
      await page.locator(`.about-nav a[href="${target}"]`).click();
      await expect(page.locator(target)).toBeInViewport();
    }
    await expect(page.locator('.recommendation-card')).toHaveCount(2);
    await expect(page.locator('.recommendation-card').first()).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
