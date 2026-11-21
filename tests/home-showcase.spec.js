import { test, expect } from './fixtures.js';

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
    test(`Home keeps product links without featured-case cards in ${appearance} at ${width}px`, async ({ page }) => {
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
      await page.locator('main img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
      await expect(page.locator('.portrait-title')).toHaveText("I'm a product designer making complex products feel clear.");
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
        return {
          centerOffset: Math.abs(photo.x + photo.width / 2 - innerWidth / 2),
          gap: role.y - photo.bottom,
          titleGap: heading.y - role.bottom,
          nameInside: name.x >= role.x && name.right <= role.right,
          background: getComputedStyle(document.querySelector('.home-showcase'), '::before').backgroundImage
        };
      });
      expect(identity.centerOffset).toBeLessThan(1);
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
        expect(art.width).toBeGreaterThanOrEqual(420);
        expect(art.width).toBeLessThanOrEqual(480);
        expect(actions.y + actions.height).toBeLessThanOrEqual(900);
      } else if (width <= 700) {
        const art = await page.locator('.hero-portrait-stage').boundingBox();
        expect(art.width).toBeGreaterThanOrEqual(Math.min(300, width - 52));
      }
      const products = page.locator('.product-context-card');
      await expect(products).toHaveCount(2);
      await expect(products.locator('h3')).toHaveText(['PowerTable ↗', 'Inforiver Analytics+ ↗']);
      await expect(products.nth(0)).toHaveAttribute('href', '/powertable.html');
      await expect(products.nth(1)).toHaveAttribute('href', '/analytics-plus.html');
      await expect(products.locator('.product-my-work')).toHaveCount(2);
      await expect(products.nth(0).locator('.product-my-work')).toContainText('Cross-tab contribution');
      await expect(products.nth(1).locator('.product-my-work')).toContainText('Chart Wizard UX/UI');
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
      await expect(page.locator('#work .product-context-card')).toHaveCount(2);
      await expect(page.locator('[data-soundroom]')).toHaveCount(1);
      await expect(page.locator('.site-header [data-soundroom]')).toHaveCount(1);
      await expect(page.locator('.page-listening, .product-context-controls')).toHaveCount(0);
      await expect(page.locator('.studio-notes, .studio-tools, .studio-recommendation')).toHaveCount(0);
      await expect(page.getByRole('heading', { name: 'Beyond the screens.' })).toHaveCount(0);
      await expect(page.locator('main > section').last()).toHaveAttribute('id', 'work');
      const main = await page.locator('main').evaluate(element => ({
        height: element.getBoundingClientRect().height,
        words: element.innerText.trim().split(/\s+/).length
      }));
      expect(main.words).toBeLessThanOrEqual(199);
      if (width === 390) {
        expect(main.height).toBeLessThan(3529.25 * .92);
        const actions = await page.locator('.hero-socials').boundingBox();
        const workHeading = await page.locator('#products-title').boundingBox();
        expect(workHeading.y - actions.y - actions.height).toBeLessThan(110);
      }
      if (width === 1440) expect(main.height).toBeLessThan(2735.89 * .92);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      expect(errors).toEqual([]);
    });
  }

}

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

test('the portrait and selected-work route remain usable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto(baseURL);
    await expect(page.locator('.hero-portrait-art')).toBeVisible();
    await page.locator('.hero-portrait-art').evaluate(image => image.decode());
    await expect(page.locator('.hero-portrait-art')).toHaveJSProperty('naturalWidth', 1254);
    await expect(page.locator('#project-planning .cover-task')).toBeVisible();
    await expect(page.locator('#project-planning .cover-timeline')).toBeVisible();
    await expect(page.locator('#main-nav a[href="/#work"]')).toHaveCount(0);
    await page.getByRole('link', { name: 'View selected work', exact: true }).click();
    await expect(page.locator('#work')).toBeInViewport();
    await expect(page.locator('#main-nav a[aria-current]')).toHaveText('Home');
    await page.locator('#main-nav').getByRole('link', { name: 'About', exact: true }).click();
    await expect(page.locator('#main-nav a[aria-current]')).toHaveText('About');
  } finally {
    await context.close();
  }
});
