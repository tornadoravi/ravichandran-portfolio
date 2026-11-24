import { test, expect } from './fixtures.js';
import { readFile } from 'node:fs/promises';

test.use({ reducedMotion: 'reduce' });

for (const appearance of ['light', 'dark']) {
  for (const width of [390, 1440]) {
    test(`About has a visible selected navigation pill in ${appearance} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      await page.goto('/about.html');
      await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
      if (width <= 700) await page.locator('.menu-toggle').click();
      const nav = page.getByRole('navigation', { name: 'Main navigation' });
      const about = nav.getByRole('link', { name: 'About', exact: true });
      await expect(about).toBeVisible();
      await expect(about).toHaveAttribute('aria-current', 'page');
      await expect(nav.getByRole('link', { name: 'Home', exact: true })).not.toHaveAttribute('aria-current');
      const colors = await about.evaluate(link => ({
        selected: getComputedStyle(link).backgroundColor,
        header: getComputedStyle(link.closest('header')).backgroundColor
      }));
      expect(colors.selected).not.toBe('rgba(0, 0, 0, 0)');
      expect(colors.selected).not.toBe(colors.header);
      if (width > 700) {
        await about.hover();
        await expect(about).toHaveCSS('background-color', colors.selected);
      }
    });
  }
}

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`Home retains product overviews without the removed feature strip in ${appearance} at ${width}px`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      await page.goto('/');
      await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
      const mascot = page.locator('.header-brand .studio-mascot');
      await expect(mascot).toBeVisible();
      await mascot.evaluate(image => image.decode());
      await expect(page.locator('.studio-mark')).toHaveCount(0);
      expect(await mascot.evaluate(image => {
        const art = image.getBoundingClientRect();
        const button = image.closest('button').getBoundingClientRect();
        return art.left >= button.left && art.right <= button.right && art.top >= button.top && art.bottom <= button.bottom;
      })).toBe(true);
      await page.evaluate(() => document.fonts.ready);
      await page.locator('main img').evaluateAll(images => Promise.all(images.map(image => {
        image.loading = 'eager';
        return image.decode();
      })));
      await expect(page.locator('.portrait-title')).toHaveText('I’m a product designer making complex products easier to use.');
      await expect(page.locator('#main-nav').getByRole('link', { name: 'Work', exact: true, includeHidden: true })).toHaveCount(0);
      await expect(page.locator('#main-nav a[aria-current]')).toHaveText('Home');
      await expect(page.locator('.hero-avatar')).toHaveCount(0);
      const portrait = page.locator('.hero-portrait-art');
      await expect(portrait).toHaveAttribute('alt', '3D-style illustrated portrait of Ravichandran V');
      await expect(portrait).toHaveJSProperty('naturalWidth', 1254);
      const identity = await page.locator('.reference-hero').evaluate(element => {
        const photo = element.querySelector('.hero-portrait-stage').getBoundingClientRect();
        const role = element.querySelector('.hero-role').getBoundingClientRect();
        const name = element.querySelector('.hero-role strong').getBoundingClientRect();
        const heading = element.querySelector('h1').getBoundingClientRect();
        const introduction = element.querySelector('.hero-introduction');
        const backdrop = element.querySelector('.hero-portrait-type');
        return {
          backdropFontSize: parseFloat(getComputedStyle(backdrop).fontSize),
          backdropFits: [...backdrop.children].every(line => line.scrollWidth <= line.clientWidth),
          centerOffset: Math.abs(photo.x + photo.width / 2 - innerWidth / 2),
          headingCenterOffset: Math.abs(heading.x + heading.width / 2 - innerWidth / 2),
          headingLines: heading.height / parseFloat(getComputedStyle(element.querySelector('h1')).lineHeight),
          introductionLines: introduction.getBoundingClientRect().height / parseFloat(getComputedStyle(introduction).lineHeight),
          gap: role.y - photo.bottom,
          titleGap: heading.y - role.bottom,
          nameInside: name.x >= role.x && name.right <= role.right,
          background: getComputedStyle(document.querySelector('.home-showcase'), '::before').backgroundImage
        };
      });
      expect(identity.centerOffset).toBeLessThan(1);
      expect(identity.backdropFits).toBe(true);
      expect(identity.headingCenterOffset).toBeLessThan(1);
      expect(identity.headingLines).toBeLessThanOrEqual(width <= 700 ? 3.01 : 2.01);
      expect(identity.introductionLines).toBeLessThanOrEqual(2.01);
      expect(identity.gap).toBeGreaterThanOrEqual(8);
      expect(identity.titleGap).toBeGreaterThanOrEqual(24);
      expect(identity.nameInside).toBe(true);
      expect(identity.background).toContain('radial-gradient');
      expect(identity.background).not.toContain('repeating-linear-gradient');
      if (width > 700) {
        const nav = await page.locator('#main-nav').boundingBox();
        const contacts = await page.locator('.header-contacts').boundingBox();
        expect(contacts.x - nav.x - nav.width).toBeCloseTo(24, 0);
        expect(nav.x + nav.width / 2).toBeGreaterThan(width / 2);
      }
      if (width === 1440) {
        const art = await page.locator('.hero-portrait-stage').boundingBox();
        const actions = await page.locator('.hero-socials').boundingBox();
        expect(art.width).toBeGreaterThanOrEqual(480);
        expect(art.width).toBeLessThanOrEqual(600);
        expect(identity.backdropFontSize).toBeGreaterThanOrEqual(125);
        expect(actions.y + actions.height).toBeLessThanOrEqual(900);
      } else if (width <= 700) {
        const art = await page.locator('.hero-portrait-stage').boundingBox();
        expect(art.width).toBeGreaterThanOrEqual(Math.min(240, width - 52));
        expect(identity.backdropFontSize).toBeGreaterThanOrEqual(60);
        const primary = await page.locator('.hero-profile-link').boundingBox();
        expect(primary.y + primary.height).toBeLessThanOrEqual(844);
      }
      const products = page.locator('#work > .product-context-grid > .product-context-card');
      await expect(page.locator('#products-title')).toHaveText('Enterprise product design');
      await expect(page.getByRole('navigation', { name: 'Selected feature case studies' })).toHaveCount(0);
      await expect(page.locator('.product-browse-help')).toHaveCount(0);
      await expect(products).toHaveCount(2);
      await expect(products.locator('h3')).toHaveText(['PowerTable ↗', 'Inforiver Analytics+ ↗']);
      await expect(products.nth(0)).toHaveAttribute('href', '/powertable.html');
      await expect(products.nth(1)).toHaveAttribute('href', '/analytics-plus.html');
      await expect(products.locator('.product-my-work')).toHaveCount(2);
      await expect(products.nth(0).locator('.product-my-work')).toContainText('Cross-tab contribution');
      await expect(products.nth(1).locator('.product-my-work')).toContainText('End-to-end Analytics+ UX/UI');
      await expect(products.nth(1).locator('.product-my-work')).toContainText('Selected features inside.');
      await expect(products.nth(0).locator('.product-live-badge')).toHaveText('Live on Fabric');
      await expect(products.nth(1).locator('.product-live-badge')).toHaveText('Live on Power BI');
      for (const [index, platform, icon] of [
        [0, 'Microsoft Fabric', 'microsoft-fabric.svg'],
        [1, 'Microsoft Power BI', 'microsoft-power-bi.svg']
      ]) {
        const pill = products.nth(index).locator('.product-card-tags > .eyebrow');
        await expect(pill).toHaveText(platform);
        await expect(pill.locator('img')).toHaveAttribute('src', `/assets/${icon}`);
        await expect(pill.locator('img')).toHaveAttribute('alt', '');
        expect(await pill.evaluate(element => {
          const icon = element.querySelector('img').getBoundingClientRect();
          const pill = element.getBoundingClientRect();
          return icon.width === 20 && icon.height === 20 &&
            Math.abs(icon.y + icon.height / 2 - pill.y - pill.height / 2) < 1 &&
            element.scrollWidth <= element.clientWidth;
        })).toBe(true);
      }
      await expect(page.locator('.showcase-case, .case-showcase, .delivery-badge')).toHaveCount(0);
      await expect(page.locator('.product-cover-poster img[src*="powertable-official-gantt"], .product-cover-poster img[src*="analytics-plus-official-dashboard"]')).toHaveCount(2);
      await expect(page.locator('#work > .product-context-grid > .product-context-card')).toHaveCount(2);
      await expect(page.getByRole('link', { name: 'Read COD Shield concept case study', exact: true })).toHaveAttribute('href', '/cod-shield.html');
      await expect(page.locator('.home-concept')).toContainText('Not launched or user-tested.');
      const caseSizes = await page.locator('.product-context-card').evaluateAll(cards => cards.map(card => {
        const bounds = card.getBoundingClientRect();
        const cover = card.querySelector('.cover-evidence').getBoundingClientRect();
        return { width: bounds.width, height: bounds.height, coverWidth: cover.width, coverHeight: cover.height };
      }));
      expect(caseSizes).toHaveLength(4);
      for (const dimension of ['width', 'height', 'coverWidth', 'coverHeight']) {
        const values = caseSizes.map(size => size[dimension]);
        expect(Math.max(...values) - Math.min(...values), `Shared ${dimension} across all four cases`).toBeLessThan(1.1);
      }
      expect(await page.locator('.product-cover-poster').evaluateAll(covers => covers.every(cover => {
        const bounds = cover.getBoundingClientRect();
        return cover.scrollWidth <= cover.clientWidth && [...cover.querySelectorAll('img, .cover-poster-copy, .cover-flow')].every(element => {
          const content = element.getBoundingClientRect();
          return content.left >= bounds.left && content.right <= bounds.right && content.top >= bounds.top && content.bottom <= bounds.bottom;
        });
      }))).toBe(true);
      await expect(page.locator('[data-soundroom]')).toHaveCount(1);
      await expect(page.locator('.site-header [data-soundroom]')).toHaveCount(1);
      await expect(page.locator('.page-listening, .product-context-controls')).toHaveCount(0);
      await expect(page.locator('.studio-notes, .studio-tools, .studio-recommendation')).toHaveCount(0);
      await expect(page.getByRole('heading', { name: 'Beyond the screens.' })).toHaveCount(0);
      await expect(page.locator('main > section').last()).toHaveAttribute('id', 'work');
      const main = await page.locator('main').evaluate(element => ({
        existingWorkHeight: element.getBoundingClientRect().height -
          element.querySelector('.home-concept').getBoundingClientRect().height -
          parseFloat(getComputedStyle(element.querySelector('.home-concept')).marginTop),
        words: element.innerText.trim().split(/\s+/).length,
        headlineWords: element.querySelector('h1').innerText.trim().split(/\s+/).length
      }));
      expect(main.words - main.headlineWords).toBeLessThanOrEqual(256);
      if (width === 390) {
        expect(main.existingWorkHeight).toBeLessThan(3529.25 * .92);
        const actions = await page.locator('.hero-socials').boundingBox();
        const workHeading = await page.locator('#products-title').boundingBox();
        expect(workHeading.y - actions.y - actions.height).toBeLessThan(110);
      }
      if (width === 1440) expect(main.existingWorkHeight).toBeLessThan(2735.89 * .92);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      expect(errors).toEqual([]);
    });
  }

}

test('the enlarged portrait adapts to screen height on desktop and screen width on mobile', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const sizes = [];
  for (const [width, height] of [[1440, 900], [1440, 1200], [320, 844], [390, 844], [914, 790]]) {
    await page.setViewportSize({ width, height });
    const portrait = await page.locator('.hero-portrait-stage').boundingBox();
    expect(portrait.x).toBeGreaterThanOrEqual(0);
    expect(portrait.x + portrait.width).toBeLessThanOrEqual(width);
    for (const selector of ['.hero-portrait-art', '.hero-portrait-type']) {
      const artwork = await page.locator(selector).boundingBox();
      expect(artwork.width / (portrait.width * 1.05)).toBeCloseTo(1.05, 4);
    }
    expect(await page.locator('.hero-portrait-type > span').evaluateAll(lines => lines.every(line => {
      const range = document.createRange();
      range.selectNodeContents(line);
      const text = range.getBoundingClientRect();
      const bounds = line.closest('.reference-hero').getBoundingClientRect();
      if (text.left < bounds.left || text.right > bounds.right) return false;
      for (let ancestor = line.parentElement; ancestor; ancestor = ancestor.parentElement) {
        if (!['clip', 'hidden', 'auto', 'scroll'].includes(getComputedStyle(ancestor).overflowX)) continue;
        const clip = ancestor.getBoundingClientRect();
        if (text.left < clip.left || text.right > clip.right) return false;
      }
      return true;
    }))).toBe(true);
    sizes.push(portrait.width);
  }
  expect(sizes[1]).toBeGreaterThan(sizes[0]);
  expect(sizes[3]).toBeGreaterThan(sizes[2]);
});

test('the hero offers a LinkedIn icon followed by a working down arrow, retaining both product routes', async ({ page }) => {
    await page.goto('/');
    const heroLinks = page.locator('.reference-hero a');
    await expect(heroLinks).toHaveCount(2);
    const profile = heroLinks.first();
    await expect(profile).toHaveAccessibleName('LinkedIn (opens in a new tab)');
    await expect(profile).toHaveText('');
    await expect(profile.locator('svg')).toBeVisible();
    await expect(profile).toHaveAttribute('href', 'https://www.linkedin.com/in/ravichandran-uxui/');
    await expect(profile).toHaveAttribute('target', '_blank');
    await expect(profile).toHaveAttribute('rel', 'noopener noreferrer');
    const work = heroLinks.nth(1);
    await expect(work).toHaveAccessibleName('View enterprise product design');
    await expect(work).toHaveAttribute('href', '#work');
    await work.click();
    await expect(page).toHaveURL(/#work$/);
    await expect(page.locator('#products-title')).toBeInViewport();
    for (const [id, path] of [
      ['project-planning', 'powertable'],
      ['project-analytics', 'analytics-plus']
    ]) {
      await page.goto('/');
      await page.locator(`#${id}`).click();
      await expect(page).toHaveURL(new RegExp(`/${path}\\.html$`));
      await expect(page.locator('h1')).toBeVisible();
    }
});

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 1440]) {
    test(`recruiters see identity and LinkedIn without scrolling in ${appearance} at ${width}px`, async ({ page }) => {
      const height = width > 700 ? 900 : 844;
      await page.setViewportSize({ width, height });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('data-theme', appearance);
      await page.evaluate(() => document.fonts.ready);
      await page.locator('.hero-portrait-art').evaluate(image => image.decode());
      const linkedIn = page.locator('.hero-profile-link');
      const candidates = [
        page.locator('.hero-role'), page.locator('.hero-introduction'),
        linkedIn, page.locator('.hero-work-link')
      ];
      for (const candidate of candidates) {
        const box = await candidate.boundingBox();
        expect(box).not.toBeNull();
        expect(box.y).toBeGreaterThanOrEqual(0);
        expect(box.y + box.height).toBeLessThanOrEqual(height);
      }
      for (const control of [linkedIn, page.locator('.hero-work-link')]) {
        const target = await control.boundingBox();
        expect(target.width).toBeGreaterThanOrEqual(44);
        expect(target.height).toBeGreaterThanOrEqual(44);
        expect(target.width).toBeCloseTo(target.height, 0);
      }
      expect(await page.evaluate(() => scrollY)).toBe(0);
      if (width <= 700) await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'false');
    });
  }
}

test('Resume remains available in navigation and serves the updated PDF', async ({ page }) => {
  await page.goto('/');
  const response = await page.request.get(await page.locator('.site-header a[href$=".pdf"]').first().getAttribute('href'));
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('application/pdf');
  const content = await response.body();
  expect(content.subarray(0, 5).toString()).toBe('%PDF-');
  expect(content.equals(await readFile(new URL('../assets/ravichandran-resume.pdf', import.meta.url)))).toBe(true);
});

test('the removed Home cards do not remove their case studies or original evidence', async ({ page }) => {
  for (const [path, image] of [
    ['/column-mapping.html', '/assets/fabric-mapping-time-entries.png'],
    ['/analytics.html', '/assets/wizard-function.png']
  ]) {
    await page.goto(path);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator(`img[src="${image}"]`).first()).toHaveCount(1);
  }
});

test('the reference-style contact section and About use the supplied email without replacing LinkedIn', async ({ page }) => {
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('.reference-footer h2 a')).toHaveAttribute('href', 'mailto:ravichandran.uxui@gmail.com');
    await expect(page.getByRole('link', { name: 'Get in touch', exact: true })).toHaveAttribute('href', 'mailto:ravichandran.uxui@gmail.com');
    await expect(page.locator('.reference-footer a[href*="linkedin.com"]')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.goto('/about.html');
    await expect(page.locator('.contact-email')).toHaveAttribute('href', 'mailto:ravichandran.uxui@gmail.com');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('LinkedIn, product bookmarks and case routes remain usable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto(baseURL);
    await expect(page.locator('.hero-portrait-art')).toBeVisible();
    await page.locator('.hero-portrait-art').evaluate(image => image.decode());
    await expect(page.locator('.hero-portrait-art')).toHaveJSProperty('naturalWidth', 1254);
    await expect(page.locator('.reference-hero a')).toHaveCount(2);
    await expect(page.locator('.hero-profile-link')).toHaveAttribute('href', 'https://www.linkedin.com/in/ravichandran-uxui/');
    await page.goto(new URL('/analytics.html', baseURL).href);
    await expect(page.locator('#case-approach #decisions')).toBeVisible();
    await expect(page.locator('#full-case-evidence')).not.toHaveAttribute('open');
    await page.goto(baseURL);
    await expect(page.locator('#project-planning .cover-task')).toBeVisible();
    await expect(page.locator('#project-planning .cover-timeline')).toBeVisible();
    await expect(page.locator('#main-nav a[href="/#work"]')).toHaveCount(0);
    await page.getByRole('link', { name: 'View enterprise product design', exact: true }).click();
    await expect(page.locator('#work')).toBeInViewport();
    await expect(page.locator('#main-nav a[aria-current]')).toHaveText('Home');
    await page.locator('#main-nav').getByRole('link', { name: 'About', exact: true }).click();
    await expect(page.locator('#main-nav a[aria-current]')).toHaveText('About');
  } finally {
    await context.close();
  }
});
