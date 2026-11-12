import { test, expect, openCaseDetails } from './fixtures.js';

const origin = `http://127.0.0.1:${process.env.PORT || 4173}`;
const featurePages = ['/storyboard.html', '/gantt.html', '/analytics.html', '/presentation.html', '/kpi.html'];
const productPages = ['/powertable.html', '/analytics-plus.html'];
const casePages = [...featurePages, '/powertable.html'];
const pages = ['/', '/about.html', '/analytics-plus.html', ...casePages, '/crosstab.html'];
for (const width of [320, 390, 768, 1440]) {
  for (const path of pages) {
    test(`${path} renders without overflow at ${width}px`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(path);
      expect(response.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const links = await page.locator('a').evaluateAll((elements) =>
        elements.map((element) => element.getAttribute('href')));
      for (const href of links) {
        expect(href).not.toBe('#');
        if (href.startsWith('#')) {
          expect(await page.locator(href).count()).toBe(1);
        } else if (href.startsWith('/')) {
          const url = new URL(href, page.url());
          expect((await page.request.get(url.href)).status()).toBe(200);
          if (url.hash) {
            const destination = await page.request.get(url.href);
            expect(await destination.text()).toContain(`id="${url.hash.slice(1)}"`);
          }
        }
      }
      expect(errors).toEqual([]);
      if (path !== '/about.html') {
        await expect(page.locator('.product-screenshot img, [data-illustration] svg, .case-diagram, .structure-map').first()).toBeVisible();
      }
      for (const disclosure of await page.locator('.case-deep-dive, .feature-previews, .case-context').all()) {
        if (await disclosure.getAttribute('open') === null) {
          await disclosure.locator(':scope > summary').click();
        }
      }
      for (const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveJSProperty('complete', true);
        expect(await image.evaluate((element) => element.naturalWidth)).toBeGreaterThan(0);
      }
    });
  }
}

test('main navigation includes Home, Work, and About on every page', async ({ page }) => {
  for (const path of [...pages, '/index.html']) {
    await page.goto(path);
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(nav.getByRole('link')).toHaveText(['Home', 'Work', 'About']);
    await expect(nav.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('href', '/');
    const current = path === '/' || path === '/index.html' ? 'Home' : path === '/about.html' ? 'About' : 'Work';
    await expect(nav.locator('a[aria-current]')).toHaveText(current);
  }
});

test('Home and Work tabs follow anchor navigation and browser history', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  const workPosition = await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop));
  await expect(nav.locator('a[aria-current]')).toHaveText('Home');
  await nav.getByRole('link', { name: 'Work', exact: true }).click();
  await expect.poll(() => page.locator('#work').evaluate((element) => element.getBoundingClientRect().top)).toBeCloseTo(workPosition, 0);
  await expect(nav.locator('a[aria-current]')).toHaveText('Work');
  await page.goBack();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(nav.locator('a[aria-current]')).toHaveText('Home');
  await page.goForward();
  await expect.poll(() => page.locator('#work').evaluate((element) => element.getBoundingClientRect().top)).toBeCloseTo(workPosition, 0);
  await expect(nav.locator('a[aria-current]')).toHaveText('Work');
  await page.goto('/#project-analytics');
  await expect(nav.locator('a[aria-current]')).toHaveText('Work');
  await nav.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page).toHaveURL(origin + '/');
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(nav.locator('a[aria-current]')).toHaveText('Home');
  await expect(page.locator('.portrait-hero')).toBeInViewport();
});

test('Home remains selected at the hero even when the URL retains a work bookmark', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const hash of ['#work', '#project-analytics']) {
      await page.goto('/' + hash);
      const current = page.locator('#main-nav a[aria-current]');
      await expect(current).toHaveText('Work');
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await expect(page.locator('.portrait-hero')).toBeInViewport();
      await expect(current).toHaveText('Home');
      expect(new URL(page.url()).hash).toBe(hash);
      await page.locator('.home-about').scrollIntoViewIfNeeded();
      await expect(current).toHaveText('Work');
      await page.locator('#work').evaluate((element) => element.scrollIntoView({ behavior: 'instant' }));
      await expect(current).toHaveText('Work');
    }
    await page.goto('/');
    await page.locator('#project-planning').scrollIntoViewIfNeeded();
    await expect(page.locator('#main-nav a[aria-current]')).toHaveText('Work');
    expect(new URL(page.url()).hash).toBe('');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect(page.locator('#main-nav a[aria-current]')).toHaveText('Home');
  }
});

test('mobile menu supports keyboard, dismissal, and navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menu' });
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav).toBeHidden();
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(nav).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(nav).toBeHidden();
  await menu.click();
  await nav.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/about\.html$/);
  await menu.click();
  await nav.getByRole('link', { name: 'Work', exact: true }).click();
  await expect(page).toHaveURL(/\/#work$/);
  await expect(page.locator('#work')).toBeInViewport();
  await menu.click();
  await nav.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page).toHaveURL(origin + '/');
  await expect(nav).toBeHidden();
  await expect(page.locator('.portrait-hero')).toBeInViewport();
});

test('viewers return to the overview to choose another feature or product', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Read Inforiver Analytics+ case study' }).click();
  await expect(page).toHaveURL(/analytics-plus\.html$/);
  await page.getByRole('link', { name: 'Read Storyboard authoring case study' }).click();
  await openCaseDetails(page);
  await page.getByRole('navigation', { name: 'Case study sections' }).getByRole('link', { name: 'Presentation', exact: true }).click();
  await expect(page.locator('#presentation')).toBeInViewport();
  await page.locator('.back-link').click();
  await page.locator('#feature-gantt').click();
  await expect(page).toHaveURL(/gantt\.html$/);
  await openCaseDetails(page);
  await page.getByRole('navigation', { name: 'Case study sections' }).getByRole('link', { name: 'Timeline', exact: true }).click();
  await expect(page.locator('#timeline')).toBeInViewport();
  await page.locator('.back-link').click();
  await page.locator('#feature-wizard').click();
  await expect(page).toHaveURL(/analytics\.html$/);
  await openCaseDetails(page);
  await page.getByRole('navigation', { name: 'Case study sections' }).getByRole('link', { name: 'Chart Wizard', exact: true }).click();
  await expect(page.locator('#wizard')).toBeInViewport();
  await page.locator('.back-link').click();
  await page.locator('#feature-annotations').click();
  await expect(page).toHaveURL(/presentation\.html$/);
  await openCaseDetails(page);
  await page.getByRole('navigation', { name: 'Case study sections' }).getByRole('link', { name: 'Comments', exact: true }).click();
  await expect(page.locator('#comments')).toBeInViewport();
  await page.locator('.back-link').click();
  await page.locator('#feature-kpi').click();
  await expect(page).toHaveURL(/kpi\.html$/);
  await openCaseDetails(page);
  await page.getByRole('navigation', { name: 'Case study sections' }).getByRole('link', { name: 'Variance presets', exact: true }).click();
  await expect(page.locator('#variance')).toBeInViewport();
  await page.locator('.back-link').click();
  await expect(page).toHaveURL(/analytics-plus\.html#features$/);
  await page.locator('.back-link').click();
  await page.getByRole('link', { name: 'Read PowerTable case study', exact: true }).click();
  await expect(page).toHaveURL(/powertable\.html$/);
  await page.locator('.back-link').click();
  await page.getByRole('link', { name: 'Read Inforiver Analytics+ case study', exact: true }).click();
  await expect(page).toHaveURL(/analytics-plus\.html$/);
});

test('reduced motion and no-JavaScript navigation remain usable', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', javaScriptEnabled: false, viewport: { width: 320, height: 844 } });
  const page = await context.newPage();
  await page.goto(origin + '/');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About', exact: true }).click();
  await expect(page.locator('h1')).toContainText('Product design for');
  await expect(page.getByRole('link', { name: 'View LinkedIn profile' })).toHaveAttribute('href', 'https://www.linkedin.com/in/ravichandran-uxui/');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page).toHaveURL(origin + '/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});

test('reduced-motion preferences disable smooth scroll and illustration movement', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  expect(await page.locator('.project-visual .product-screenshot').first().evaluate((element) => getComputedStyle(element).transform)).toBe('none');
});

test('keyboard skip link reaches main content', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test('unknown files are not exposed', async ({ request }) => {
  expect((await request.get('/package.json')).status()).toBe(404);
  expect((await request.get('/missing.html')).status()).toBe(404);
  expect((await request.post('/')).status()).toBe(405);
});

test('all six supplied screenshots appear in the case study and open full-size', async ({ page }) => {
  await page.goto('/storyboard.html');
  await openCaseDetails(page);
  const names = ['storyboard-start', 'custom-layout', 'template-selection', 'blank-canvas', 'template-store', 'storyboard-editor'];
  for (const name of names) {
    const image = page.locator(`img[src="/assets/${name}.png"]`);
    await expect(image).toHaveCount(1);
    const response = await page.request.get(`/assets/${name}.png`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    await expect(page.locator(`a.product-screenshot[href="/assets/${name}.png"]`)).toHaveAttribute('target', '_blank');
  }
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'View custom layout screenshot full-size (opens in a new tab)', exact: true }).click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL(/\/assets\/custom-layout\.png$/);
  await popup.close();
});

test('editorial covers preserve genuine product views and the serif hierarchy', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('h1 em').evaluate((element) => getComputedStyle(element).fontStyle)).toBe('italic');
  await expect(page.locator('.analytics-scene').first()).toHaveCSS('background-color', 'rgb(232, 228, 239)');
  await expect(page.locator('.project-visual .product-screenshot img').first()).toHaveCSS('transform', 'none');
  await expect(page.locator('.project-visual .product-screenshot img').first()).toHaveCSS('filter', 'none');
  await expect(page.locator('.hero-index, .monogram')).toHaveCount(0);
});

test('storyboard screenshots are separate from Chart Wizard and planning', async ({ page }) => {
  await page.goto('/storyboard.html');
  await openCaseDetails(page);
  await expect(page.locator('h1')).toContainText('Storyboard');
  await expect(page.locator('.case-summary')).toContainText('Build a report.');
  await expect(page.locator('main img:not(.brand-image)[src^="/assets/"]')).toHaveCount(6);
  await expect(page.locator('img[src^="/assets/wizard-"]')).toHaveCount(0);
  await page.goto('/analytics.html');
  await openCaseDetails(page);
  await expect(page.locator('img[src^="/assets/wizard-"]')).toHaveCount(8);
  await expect(page.locator('img[src="/assets/storyboard-editor.png"], img[src="/assets/template-store.png"], img[src="/assets/custom-layout.png"]')).toHaveCount(0);
  await page.goto('/powertable.html');
  await expect(page.locator('img[src^="/assets/wizard-"], img[src^="/assets/storyboard-"]')).toHaveCount(0);
  await expect(page.locator('.case-evidence img')).toHaveAttribute('src', '/assets/powertable-official-gantt.webp');
  await page.goto('/');
  await expect(page.locator('.project')).toHaveCount(productPages.length);
  await page.getByRole('link', { name: 'Read Inforiver Analytics+ case study' }).click();
  await page.getByRole('link', { name: 'Read Storyboard authoring case study', exact: true }).click();
  await expect(page).toHaveURL(/storyboard\.html$/);
});

test('About timeline distinguishes the employer from product assignments', async ({ page }) => {
  await page.goto('/about.html#experience');
  await expect(page.getByRole('heading', { name: 'A path into enterprise product design.' })).toBeVisible();
  const employment = page.getByRole('list', { name: 'Employment experience' });
  await expect(employment.locator(':scope > li')).toHaveCount(3);
  await expect(employment.locator('h3')).toHaveText(['Lumel Technologies', 'Arus Info', 'Velsure Softech Solutions Pvt Ltd']);
  await expect(employment.locator('.role-timeline h4')).toHaveText([
    'Product Designer II', 'Product Designer I', 'Contractor', 'UX/UI Designer', 'Trainee Engineer', 'Project Intern'
  ]);
  await expect(employment.locator('.role-dates')).toHaveText([
    'Jan 2025 \u2014 Present', 'Jul 2023 \u2014 Jan 2025', 'Oct 2022 \u2014 Jul 2023',
    'Apr 2023 \u2014 Jul 2023', 'Jul 2022 \u2014 Jun 2023', 'Dec 2021 \u2014 Apr 2022'
  ]);
  expect(await employment.locator('time').evaluateAll((elements) => elements.map((element) => element.dateTime))).toEqual([
    '2025-01', '2023-07', '2025-01', '2022-10', '2023-07', '2023-04', '2023-07', '2022-07', '2023-06', '2021-12', '2022-04'
  ]);
  const assignments = page.getByRole('list', { name: 'Product assignments at Lumel Technologies' });
  await expect(assignments.locator(':scope > li')).toHaveCount(2);
  await expect(assignments.locator('.timeline-duration')).toHaveText(['1.5 years', '2.5 years']);
  expect(await assignments.evaluate((element) => element.closest('.experience-timeline') === null)).toBe(true);
  await assignments.getByRole('link', { name: 'Storyboard authoring' }).click();
  await expect(page).toHaveURL(/storyboard\.html$/);
});

test('previous storyboard section bookmarks reach the dedicated case study', async ({ page }) => {
  await page.goto('/analytics.html#templates');
  await expect(page).toHaveURL(/storyboard\.html#templates$/);
  await expect(page.locator('#templates')).toBeInViewport();
  await page.goto('/analytics.html#storytelling');
  await expect(page).toHaveURL(/storyboard\.html#overview$/);
});

test('storyboard views follow entry, alternative setup routes, and authoring order', async ({ page }) => {
  await page.goto('/storyboard.html');
  await openCaseDetails(page);
  await page.locator('.flow-disclosure > summary').click();
  expect(await page.locator('main img:not(.brand-image)[src^="/assets/"]').evaluateAll((images) => images.map((image) => image.getAttribute('src')))).toEqual([
    '/assets/storyboard-start.png',
    '/assets/custom-layout.png',
    '/assets/template-selection.png',
    '/assets/template-store.png',
    '/assets/blank-canvas.png',
    '/assets/storyboard-editor.png'
  ]);
  const flow = page.getByRole('navigation', { name: 'Storyboard user flow', exact: true });
  await expect(flow.locator('.flow-routes .route-card')).toHaveCount(4);
  await expect(flow).toContainText('alternative starting routes');
  await flow.getByRole('link', { name: /Custom layout/ }).click();
  await expect(page.locator('#layout')).toBeInViewport();
  await flow.getByRole('link', { name: /Blank report/ }).click();
  await expect(page.locator('#blank-report')).toBeInViewport();
  await flow.getByRole('link', { name: /Compose the report/ }).click();
  await expect(page.locator('#editor')).toBeInViewport();
});

test('About displays the supplied portrait and exposes experience and recommendations', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/about.html');
  const portrait = page.getByRole('img', { name: 'Portrait of Ravichandran V', exact: true });
  await expect(portrait).toHaveAttribute('src', '/assets/ravichandran-profile.png');
  await expect(portrait).toHaveJSProperty('naturalWidth', 800);
  await expect(portrait).toHaveJSProperty('naturalHeight', 800);
  const navigation = page.getByRole('navigation', { name: 'About sections' });
  await navigation.getByRole('link', { name: 'Experience', exact: true }).click();
  await expect(page.locator('#experience')).toBeInViewport();
  await navigation.getByRole('link', { name: 'Recommendations', exact: true }).click();
  await expect(page.locator('#recommendations')).toBeInViewport();
  const recommendation = page.locator('#recommendations .recommendation-link');
  await expect(recommendation).toHaveAttribute('href', 'https://www.linkedin.com/in/ravichandran-uxui/details/recommendations/');
  await expect(recommendation).toHaveAttribute('target', '_blank');
  await expect(recommendation).toHaveAttribute('rel', 'noopener noreferrer');
  expect((await page.request.get('/assets/ravichandran-profile.png')).status()).toBe(200);
});

test('recommendations preserve the supplied text, attribution, dates, and relationships', async ({ page }) => {
  await page.goto('/about.html#recommendations');
  const cards = page.locator('.recommendation-card');
  await expect(cards).toHaveCount(2);
  await expect(cards.locator('cite')).toHaveText(['Mai Tran', 'Deepak Praveen']);
  await expect(cards.first().locator('time')).toHaveAttribute('datetime', '2026-11-03');
  await expect(cards.last().locator('time')).toHaveAttribute('datetime', '2026-11-02');
  await expect(cards.first()).toContainText('did not manage Ravichandran directly');
  await expect(cards.last()).toContainText('Managed Ravichandran directly');
  await expect(cards.first()).toContainText('Senior Product Design Manager @ Lumel');
  await expect(cards.last()).toContainText('Sr. Product Designer at Lumel | Crafting Microsoft Fabric IQ\u2019s Plan');
  await expect(cards.first().locator('.recommendation-full blockquote p')).toHaveText([
    'Ravi is a well-rounded senior designer who you can count on to deliver design output of the highest quality. At Lumel, we design highly technical products for Microsoft Fabric, and Ravi has a real gift for balancing tasteful, polished visual design with the rigor those products demand. He thinks through every edge case, so his designs hold up not just in the happy path but in the messy, real-world scenarios that often get missed.',
    'He has led multiple projects independently from start to finish, and he needs remarkably little supervision. Once a project is in his hands, his lead and I have complete trust he will get it done to the highest level. What sets him apart is his judgment: he isn\u2019t afraid to push back on stakeholders when something isn\u2019t right for users, and he does it in a way that keeps business goals in view. That ability to find the balance between user needs and business needs is exactly what you want from a senior designer.',
    'I highly recommend Ravi to any team that values craft, ownership, and sound design judgment, and I\u2019d be happy to give him a strong reference.'
  ]);
  await expect(cards.last().locator('.recommendation-full blockquote p')).toHaveText([
    'Working with Ravi has been one of my proudest experiences at Lumel Technologies. In over four years together, he has been one of the hardest-working designers I\u2019ve ever seen.',
    'Ravi designed across Inforiver Analytics+ and PowerTable in Microsoft Fabric Planning, including the Gantt and Resources modules. Two highlights stand out: Storyboard mode in Inforiver Analytics+, and the entire Gantt module, which he owned and handled exceptionally well. He also repeatedly delivered critical work across several Inforiver Analytics+ releases.',
    'He brings the same energy to every task, even when the workload is overwhelming. He understands user needs, constraints, and our design system deeply, and his deliverables are among the cleanest our developers receive. He seeks feedback often, loves to brainstorm, and is always open to new ideas.',
    'Any team would be lucky to have Ravi. I recommend him without hesitation.'
  ]);
  const disclosure = cards.first().locator('summary');
  await disclosure.focus();
  await page.keyboard.press('Enter');
  await expect(cards.first().locator('details')).toHaveAttribute('open', '');
  await expect(cards.first().locator('.recommendation-full blockquote')).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(cards.first().locator('details')).not.toHaveAttribute('open', '');
  await expect(page.locator('.name-block')).not.toContainText('Senior');
});

test('numbered work index reaches each project and follows the reading position', async ({ page }) => {
  await page.goto('/');
  const index = page.getByRole('navigation', { name: 'Selected work index' });
  await expect(index.getByRole('link')).toHaveCount(productPages.length);
  await index.getByRole('link', { name: /Inforiver Analytics/ }).click();
  await expect(page).toHaveURL(/#project-analytics$/);
  await expect(page.locator('#project-analytics')).toBeInViewport();
  await expect(index.getByRole('link', { name: /Inforiver Analytics/ })).toHaveAttribute('aria-current', 'location');
  await index.getByRole('link', { name: /PowerTable/ }).click();
  await expect(page.locator('#project-planning')).toBeInViewport();
  await expect(index.getByRole('link', { name: /PowerTable/ })).toHaveAttribute('aria-current', 'location');
});

test('case navigation stays available and exposes reading progress', async ({ page }) => {
  await page.goto('/storyboard.html');
  await openCaseDetails(page);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  const navigation = page.getByRole('navigation', { name: 'Case study sections' });
  const progress = page.getByRole('progressbar', { name: 'Case study reading progress' });
  await expect(progress).toHaveJSProperty('value', 0);
  await navigation.getByRole('link', { name: 'Presentation', exact: true }).click();
  await expect(page.locator('#presentation')).toBeInViewport();
  await expect(navigation.getByRole('link', { name: 'Presentation', exact: true })).toHaveAttribute('aria-current', 'location');
  expect(await navigation.evaluate((element) => Math.abs(element.getBoundingClientRect().top))).toBeLessThan(2);
  expect(await page.locator('#presentation').evaluate((element) => element.getBoundingClientRect().top)).toBeGreaterThan(await navigation.evaluate((element) => element.getBoundingClientRect().bottom));
  expect(await progress.evaluate((element) => element.value)).toBeGreaterThan(50);
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await expect(progress).toHaveJSProperty('value', 100);
});

test('screenshot inspection supports native focus, Escape, close, and backdrop dismissal', async ({ page }) => {
  await page.goto('/storyboard.html');
  await openCaseDetails(page);
  const buttons = page.getByRole('button', { name: 'Inspect screenshot', exact: true });
  await expect(buttons).toHaveCount(6);
  await buttons.first().click();
  const dialog = page.getByRole('dialog', { name: 'Inspect screenshot', exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('img')).toHaveAttribute('src', /\/assets\/storyboard-start\.png$/);
  await expect(dialog.locator('img')).toHaveJSProperty('naturalWidth', 1400);
  const close = dialog.getByRole('button', { name: 'Close screenshot preview' });
  await expect(close).toBeFocused();
  await page.locator('.site-header .wordmark').evaluate((element) => element.focus());
  await expect(close).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(buttons.first()).toBeFocused();
  await buttons.first().click();
  await close.click();
  await expect(dialog).toHaveCount(0);
  await buttons.first().click();
  await page.mouse.click(5, 5);
  await expect(dialog).toHaveCount(0);
  await expect(page.locator('body')).not.toHaveClass(/preview-open/);
});

test('mobile screenshot inspection fits the viewport and returns focus', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('/storyboard.html');
  await openCaseDetails(page);
  const button = page.getByRole('button', { name: 'Inspect screenshot', exact: true }).last();
  await button.click();
  const dialog = page.getByRole('dialog', { name: 'Inspect screenshot' });
  expect(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(button).toBeFocused();
});

test('recommendation disclosures and source links remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(origin + '/about.html#recommendations');
  await page.locator('.recommendation-card').first().locator('summary').click();
  await expect(page.locator('.recommendation-full blockquote').first()).toBeVisible();
  await expect(page.locator('.role-timeline h4')).toHaveCount(6);
  await page.goto(origin + '/storyboard.html');
  await openCaseDetails(page);
  await expect(page.getByRole('button', { name: 'Inspect screenshot', exact: true })).toHaveCount(0);
  await expect(page.locator('a.product-screenshot')).toHaveCount(6);
  await context.close();
});

test('scroll reveals are visible when reached and respect changed motion preferences', async ({ page }) => {
  await page.goto('/');
  const lastProject = page.locator('#project-planning');
  await expect(lastProject).toHaveClass(/reveal-target/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await lastProject.evaluate((element) => getComputedStyle(element).opacity)).toBe('1');
  expect(await lastProject.evaluate((element) => getComputedStyle(element).transform)).toBe('none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await lastProject.scrollIntoViewIfNeeded();
  await expect(lastProject).toHaveClass(/is-revealed/);
  await expect(lastProject).toHaveCSS('opacity', '1');
});

test('all eight Chart Wizard screenshots follow the supplied feature flow', async ({ page }) => {
  await page.goto('/analytics.html');
  await openCaseDetails(page);
  await page.locator('#feature-walkthrough > summary').click();
  const names = ['chart-family', 'function', 'use-case', 'visual-style', 'favorites', 'customize', 'advanced', 'result'];
  const images = page.locator('img[src^="/assets/wizard-"]');
  await expect(images).toHaveCount(8);
  expect(await images.evaluateAll((elements) => elements.map((element) => element.getAttribute('src')))).toEqual(
    names.map((name) => `/assets/wizard-${name}.png`));
  for (const [index, name] of names.entries()) {
    const asset = `/assets/wizard-${name}.png`;
    const response = await page.request.get(asset);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    const image = page.locator(`img[src="${asset}"]`);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty('naturalWidth', index === 7 ? 1420 : 540);
    await expect(image).toHaveJSProperty('naturalHeight', index === 7 ? 805 : 370);
    await expect(page.locator(`a.product-screenshot[href="${asset}"]`)).toHaveAttribute('target', '_blank');
  }
  await expect(page.locator('[data-illustration="wizard"]')).toHaveCount(0);
  await expect(page.locator('main')).toContainText('representative states');
  await expect(page.locator('main')).toContainText('not claimed to preserve every setting');
});

test('Chart Wizard flow preserves alternative routes and reaches configuration and report view', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/analytics.html');
  await openCaseDetails(page);
  await page.locator('.flow-disclosure > summary').click();
  const flow = page.getByRole('navigation', { name: 'Chart Wizard user flow' });
  await expect(flow.locator('.route-card')).toHaveCount(2);
  await expect(flow).toContainText('alternative discovery routes');
  await flow.getByRole('link', { name: /Browse by chart/ }).click();
  await expect(page.locator('#browse-chart')).toBeInViewport();
  await flow.getByRole('link', { name: /Filter by function/ }).click();
  await expect(page.locator('#browse-function')).toBeInViewport();
  await flow.getByRole('link', { name: /02 Customize/ }).click();
  await expect(page.locator('#customize')).toBeInViewport();
  await flow.getByRole('link', { name: /03 Advanced/ }).click();
  await expect(page.locator('#advanced')).toBeInViewport();
  await flow.getByRole('link', { name: /Return to the report/ }).click();
  await expect(page.locator('#result')).toBeInViewport();
  const nav = page.getByRole('navigation', { name: 'Case study sections' });
  await expect(nav.getByRole('link', { name: 'Report view' })).toHaveAttribute('aria-current', 'location');
});

test('Wizard screenshots use native-size crops while the feature gallery uses illustrations', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#project-analytics .product-screenshot img')).toHaveAttribute('src', '/assets/analytics-plus-official-dashboard.webp');
  await expect(page.locator('#project-analytics .visual-bottom')).toContainText('Official Analytics+ template · Lumel Inc.');
  await page.goto('/analytics-plus.html');
  const wizard = page.locator('#feature-wizard');
  await expect(wizard.locator('img')).toHaveCount(0);
  await expect(wizard).toContainText('Original concept illustration');
  await expect(wizard.locator('[data-case-scene="wizard-design"]')).toBeVisible();
  await page.goto('/analytics.html');
  await openCaseDetails(page);
  await expect(page.getByRole('button', { name: 'Inspect screenshot', exact: true })).toHaveCount(2);
  await page.locator('#feature-walkthrough > summary').click();
  await expect(page.getByRole('button', { name: 'Inspect screenshot', exact: true })).toHaveCount(8);
  await page.getByRole('button', { name: 'Inspect screenshot', exact: true }).first().click();
  const dialog = page.getByRole('dialog', { name: 'Inspect screenshot' });
  await expect(dialog.locator('img')).toHaveJSProperty('naturalWidth', 540);
  expect(await dialog.locator('img').evaluate((element) => element.clientWidth)).toBeLessThanOrEqual(540);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
});

test('Chart Wizard documentation is not presented as an independent review or outcome', async ({ page }) => {
  await page.goto('/analytics.html#reflection');
  await page.locator('#reflection .evidence-note > summary').click();
  const reference = page.locator('#reflection .note');
  await expect(reference).toContainText('vendor documentation, not a customer review');
  await expect(reference).toContainText('not a Chart Wizard review page');
  await expect(reference.getByRole('link', { name: /Chart Wizard release walkthrough/ })).toHaveAttribute(
    'href', 'https://inforiver.com/blog/inforiver-analytics-plus/inforiver-analytics-flexible-kpi-containers/#Chart-wizard');
  await expect(page.locator('.customer-review, .review-rating')).toHaveCount(0);
});

for (const path of pages.filter((path) => path !== '/')) {
  test(`intro motion runs once and settles on ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    const heading = page.locator('h1');
    const timing = await heading.evaluate((element) => element.getAnimations().map((animation) => animation.effect.getTiming()));
    expect(timing).toHaveLength(1);
    expect(timing[0].duration).toBe(700);
    expect(timing[0].iterations).toBe(1);
    await heading.evaluate((element) => Promise.all(element.getAnimations().map((animation) => animation.finished)));
    await expect(heading).toHaveCSS('opacity', '1');
    await expect(heading).toHaveCSS('transform', 'none');
  });
}

test('project motion responds to pointer and keyboard without transforming screenshots', async ({ page }) => {
  await page.goto('/#project-analytics');
  const preview = page.locator('#project-analytics .project-visual');
  await preview.hover();
  await expect.poll(() => preview.evaluate(element => new DOMMatrixReadOnly(getComputedStyle(element).transform).m42)).toBeLessThan(-4.9);
  await expect(preview.locator('.product-screenshot img')).toHaveCSS('transform', 'none');
  expect(await preview.locator('.product-screenshot img').evaluate((element) => element.clientWidth)).toBeLessThanOrEqual(1390);
  await page.mouse.move(0, 0);
  await preview.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(preview).toBeFocused();
  await expect(preview).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, -5)');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(preview).toHaveCSS('transform', 'none');
});

test('floating back-to-top navigation returns position and keyboard focus on every page', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const path of pages) {
    await page.goto(path);
    const top = page.locator('.back-to-top');
    await expect(top).toBeHidden();
    if (path === '/crosstab.html') await openCaseDetails(page);
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
    await expect(top).toBeVisible();
    await top.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
    await expect(page.locator('#main')).toBeFocused();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(top).toBeHidden();
  }
});

test('reduced motion cancels active entrances and deep links skip them', async ({ page }) => {
  await page.goto('/about.html', { waitUntil: 'domcontentloaded' });
  expect(await page.locator('h1').evaluate((element) => element.getAnimations().length)).toBe(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => page.locator('h1').evaluate((element) => element.getAnimations().length)).toBe(0);
  await expect(page.locator('h1')).toHaveCSS('opacity', '1');
  await expect(page.locator('h1')).toHaveCSS('transform', 'none');
  await page.goto('/');
  expect(await page.locator('h1').evaluate((element) => element.getAnimations().length)).toBe(0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/analytics.html#browse-chart');
  expect(await page.locator('h1').evaluate((element) => element.getAnimations().length)).toBe(0);
  await expect(page.locator('#browse-chart')).toBeInViewport();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: 'Inspect screenshot', exact: true }).first().click();
  const dialog = page.getByRole('dialog', { name: 'Inspect screenshot' });
  expect(await dialog.evaluate((element) => getComputedStyle(element, '::backdrop').animationName)).toBe('none');
  await page.keyboard.press('Escape');
});

test('touch browsing has no desktop hover lift and project taps still navigate', async ({ browser }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(origin + '/#project-analytics');
  const preview = page.locator('#project-analytics .project-visual');
  expect(await page.evaluate(() => matchMedia('(hover: none)').matches)).toBe(true);
  await expect(preview).toHaveCSS('transform', 'none');
  await preview.tap();
  await expect(page).toHaveURL(/analytics-plus\.html$/);
  await context.close();
});

test('About employer and recommendation reveals settle when reached', async ({ page }) => {
  await page.goto('/about.html');
  await page.locator('#experience-details > summary').click();
  const employer = page.locator('.experience-timeline > li').last();
  const recommendation = page.locator('.recommendation-card').last();
  for (const element of [employer, recommendation]) {
    await expect(element).toHaveClass(/reveal-target/);
    await element.scrollIntoViewIfNeeded();
    await expect(element).toHaveClass(/is-revealed/);
    await expect(element).toHaveCSS('opacity', '1');
  }
});

test('full case details retain problem, scope, and evidence summaries', async ({ page }) => {
  for (const path of casePages) {
    await page.goto(path);
    if (featurePages.includes(path)) await openCaseDetails(page);
    const brief = page.locator('.case-brief');
    await expect(brief.locator('h2')).toHaveCount(3);
    await expect(brief).toContainText('Design challenge');
    await expect(brief).toContainText(path === '/gantt.html' ? 'Case focus' : 'My contribution');
    for (const paragraph of await brief.locator('p').all()) {
      expect((await paragraph.textContent()).length).toBeGreaterThan(30);
    }
  }
  await page.goto('/powertable.html');
  await expect(page.locator('.case-brief')).toContainText('configuration screens');
  await expect(page.locator('.resource-scene figcaption')).toContainText('Conceptual resource-planning illustration');
  await expect(page.locator('.case-brief')).toContainText('explorations');
  await page.goto('/analytics.html');
  await openCaseDetails(page);
  await expect(page.locator('.case-brief')).toContainText('Chart Wizard shipped');
});

test('genuine case evidence appears early without duplicating screenshots', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of ['/analytics.html', '/storyboard.html', '/gantt.html', '/kpi.html', '/powertable.html']) {
      await page.goto(path);
      const evidence = page.locator('.case-evidence img').first();
      const top = await evidence.evaluate((image) => image.getBoundingClientRect().top + scrollY);
      expect(top).toBeLessThan(width === 1440 ? 900 : 1050);
      expect(await evidence.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
      await expect(evidence).not.toHaveAttribute('loading', 'lazy');
      await expect(page.locator('.case-evidence .reveal-target')).toHaveCount(0);
    }
  }
});

test('mobile case navigation has full-size targets and reveals the current section', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 700 });
  for (const path of casePages) {
    await page.goto(path);
    if (featurePages.includes(path)) await openCaseDetails(page);
    if (path === '/powertable.html') await page.locator('#study-details > summary').click();
    const navigation = page.getByRole('navigation', { name: 'Case study sections' });
    const bounds = await navigation.locator('a').evaluateAll((links) => links.map((link) => ({
      top: link.getBoundingClientRect().top,
      height: link.getBoundingClientRect().height,
      font: parseFloat(getComputedStyle(link).fontSize)
    })));
    expect(new Set(bounds.map((link) => link.top)).size).toBe(path === '/powertable.html' ? 2 : 1);
    expect(bounds.every((link) => link.height >= 44 && link.font >= 13)).toBe(true);
    await page.locator('#reflection').scrollIntoViewIfNeeded();
    const reflection = navigation.getByRole('link', { name: path === '/powertable.html' ? 'Delivery & sources' : 'Reflection', exact: true });
    await expect(reflection).toHaveAttribute('aria-current', 'location');
    expect(await reflection.evaluate((link) => {
      const parent = link.parentElement.getBoundingClientRect();
      const bounds = link.getBoundingClientRect();
      return bounds.left >= parent.left && bounds.right <= parent.right;
    })).toBe(true);
    await navigation.getByRole('link', { name: path === '/powertable.html' ? 'Feature scope' : 'Overview', exact: true }).click();
    await expect(page.locator('#overview')).toBeInViewport();
    expect(await page.locator('#overview').evaluate((element) =>
      element.getBoundingClientRect().top >= document.querySelector('.case-nav').getBoundingClientRect().bottom)).toBe(true);
  }
});

test('native-size screenshot inspection supports keyboard panning and fit-to-screen', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('/analytics.html');
  await openCaseDetails(page);
  const opener = page.getByRole('button', { name: 'Inspect screenshot', exact: true }).first();
  await opener.click();
  const dialog = page.getByRole('dialog', { name: 'Inspect screenshot', exact: true });
  await dialog.getByRole('button', { name: 'Actual size', exact: true }).click();
  const fit = dialog.getByRole('button', { name: 'Fit to screen', exact: true });
  await expect(fit).toHaveAttribute('aria-pressed', 'true');
  expect(await dialog.locator('img').evaluate((image) => image.clientWidth)).toBe(540);
  const viewport = dialog.getByRole('region', { name: 'Screenshot image' });
  expect(await viewport.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
  await viewport.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => viewport.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await fit.click();
  await expect(dialog.getByRole('button', { name: 'Actual size', exact: true })).toHaveAttribute('aria-pressed', 'false');
  expect(await dialog.locator('img').evaluate((image) => image.clientWidth <= image.parentElement.clientWidth)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
});

test('fitting remains available after resizing a native-size screenshot', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/analytics.html');
  await openCaseDetails(page);
  await page.getByRole('button', { name: 'Inspect screenshot', exact: true }).first().click();
  const dialog = page.getByRole('dialog', { name: 'Inspect screenshot' });
  await dialog.getByRole('button', { name: 'Actual size', exact: true }).click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(dialog.getByRole('button', { name: 'Fit to screen', exact: true })).toBeEnabled();
  await dialog.getByRole('button', { name: 'Fit to screen', exact: true }).click();
  await expect(dialog.getByRole('button', { name: 'Actual size', exact: true })).toBeDisabled();
  await expect(dialog).toContainText('Shown at its original resolution');
  expect(await dialog.locator('img').evaluate((image) => image.clientWidth)).toBe(540);
  await dialog.getByRole('button', { name: 'Close screenshot preview' }).click();
  await expect(dialog).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
});

test('essential typography and text contrast stay legible on every page', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of pages) {
      await page.goto(path);
      const failures = await page.evaluate(() => {
        function luminance(color) {
          const channels = color.match(/[\d.]+/g).slice(0, 3).map(Number).map((value) => {
            const channel = value / 255;
            return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
          });
          return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
        }
        return [...document.querySelectorAll('.eyebrow, figcaption, .metadata dt, .metadata dd, .case-nav a, .project-description p, .experience-timeline p, .recommendation-context, .fine-print')]
          .filter((element) => element.getClientRects().length)
          .flatMap((element) => {
            const style = getComputedStyle(element);
            let ancestor = element;
            while (ancestor.parentElement && getComputedStyle(ancestor).backgroundColor === 'rgba(0, 0, 0, 0)') ancestor = ancestor.parentElement;
            const a = luminance(style.color);
            const b = luminance(getComputedStyle(ancestor).backgroundColor);
            const contrast = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
            return parseFloat(style.fontSize) < 12 || contrast < 4.5 ?
              [{ text: element.textContent.slice(0, 60), size: style.fontSize, contrast }] : [];
          });
      });
      expect(failures, `${path} at ${width}px`).toEqual([]);
      for (const paragraph of await page.locator('.section-copy > p:not(.fine-print), .hero-bottom p, .about-intro > div > p:not(.large-copy)').all()) {
        expect(await paragraph.evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(17);
      }
    }
  }
});

test('user-flow disclosures remain keyboard-usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  for (const [path, name, link, target] of [
    ['/analytics.html', 'Chart Wizard user flow', /Filter by function/, '#browse-function'],
    ['/storyboard.html', 'Storyboard user flow', /Custom layout/, '#layout'],
    ['/presentation.html', 'Presentation user flow', /Review the comments/, '#comments'],
    ['/gantt.html', 'Power BI Gantt setup flow', /Understand the data mapping/, '#mapping'],
    ['/powertable.html', 'PowerTable planning user flow', /Consider resource capacity/, '#resources'],
    ['/kpi.html', 'KPI Presets user flow', /Browse Variance presets/, '#variance']
  ]) {
    await page.goto(origin + path);
    if (featurePages.includes(path)) await openCaseDetails(page);
    if (path === '/powertable.html') await page.locator('#study-details > summary').click();
    const disclosure = page.locator('.flow-disclosure');
    await expect(disclosure).not.toHaveAttribute('open');
    await disclosure.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(disclosure).toHaveAttribute('open');
    await page.getByRole('navigation', { name, exact: true }).getByRole('link', { name: link }).click();
    await expect(page.locator(target)).toBeInViewport();
  }
  await context.close();
});

test('reveal motion does not compound a fading parent and child', async ({ page }) => {
  await page.goto('/about.html');
  const nested = await page.locator('.reveal-target').evaluateAll((elements) =>
    elements.filter((element) => element.parentElement.closest('.reveal-target')).map((element) => element.className));
  expect(nested).toEqual([]);
  await expect(page.locator('.recommendation-card.reveal-target')).toHaveCount(2);
});

test('homepage prioritizes selected work before the approach', async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('.home-about')).toHaveCount(1);
    await expect(page.locator('#about-title')).toHaveText(/Good design connects\s*the whole workflow\./);
    expect(await page.locator('main > section').evaluateAll((sections) => sections.map((section) => section.classList[0]))).toEqual([
      'portrait-hero', 'work-section', 'home-about'
    ]);
    await expect(page.locator('.home-about a[href="/about.html"]')).toBeVisible();
    if (width <= 700) await page.locator('.menu-toggle').click();
    await page.locator('#main-nav a[href="/#work"]').click();
    await expect(page.locator('#work')).toBeInViewport();
    await expect(page.locator('.project').first()).toHaveAttribute('id', 'project-planning');
  }
});

test('Home and About link to the supplied GitHub profile', async ({ page }) => {
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/about.html']) {
      await page.goto(path);
      const link = page.getByRole('link', { name: /View GitHub/ });
      await expect(link).toHaveAttribute('href', 'https://github.com/tornadoravi');
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
});

test('homepage gives clear ownership and direct case and contact actions', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.project-role')).toHaveCount(2);
  expect(await page.locator('.case-link').evaluateAll((links) => links.map((link) => link.getAttribute('href')))).toEqual(productPages);
  const contact = page.getByRole('link', { name: /Connect on LinkedIn/ });
  await expect(contact).toHaveAttribute('href', 'https://www.linkedin.com/in/ravichandran-uxui/');
  await expect(contact).toHaveAttribute('target', '_blank');
  await expect(page.locator('.portrait-work-link')).toHaveCount(0);
  const primary = page.locator('#main-nav a[href="/#work"]');
  expect(await primary.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(48);
  await primary.click();
  await expect(page.locator('#work')).toBeInViewport();
});

test('Power BI Gantt preserves all three supplied states at native resolution', async ({ page }) => {
  await page.goto('/gantt.html');
  await openCaseDetails(page);
  const states = [
    ['gantt-entry', 440, 355],
    ['gantt-data-mapping', 455, 310],
    ['gantt-timeline', 1406, 786]
  ];
  expect(await page.locator('main img:not(.brand-image)').evaluateAll((images) => images.map((image) => image.getAttribute('src')))).toEqual(
    states.map(([name]) => `/assets/${name}.png`));
  for (const [name, width, height] of states) {
    const src = `/assets/${name}.png`;
    const response = await page.request.get(src);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    const image = page.locator(`img[src="${src}"]`);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty('naturalWidth', width);
    await expect(image).toHaveJSProperty('naturalHeight', height);
    expect(await image.evaluate((element) => element.clientWidth <= element.naturalWidth)).toBe(true);
    await expect(page.locator(`a.product-screenshot[href="${src}"]`)).toHaveAttribute('target', '_blank');
  }
  await expect(page.getByRole('button', { name: 'Inspect screenshot', exact: true })).toHaveCount(3);
  await expect(page.locator('[data-illustration]')).toHaveCount(0);
});

test('Power BI Gantt keeps product context and public references distinct from claims', async ({ page }) => {
  await page.goto('/gantt.html');
  await openCaseDetails(page);
  await expect(page.locator('h1')).toContainText('Gantt for Power BI');
  await expect(page.locator('.metadata')).toContainText('Analytics+ · Microsoft Power BI');
  await expect(page.locator('.metadata')).not.toContainText('Microsoft Fabric');
  await expect(page.locator('.metadata')).not.toContainText('1.5 years');
  await expect(page.locator('.case-brief')).toContainText('Case focus');
  await expect(page.locator('main')).not.toContainText('end-to-end');
  await expect(page.locator('#reflection')).toContainText('not a change shown as implemented');
  const references = page.locator('#reflection .note').filter({ hasText: 'Official product references' });
  await expect(references).toContainText('vendor documentation, not independent customer reviews');
  await expect(references.getByRole('link', { name: /Gantt setup documentation/ })).toHaveAttribute(
    'href', 'https://docs.inforiver.com/analytics+/gantt-chart');
  await expect(references.getByRole('link', { name: /Gantt feature overview/ })).toHaveAttribute(
    'href', 'https://inforiver.com/analytics-plus/gantt-chart/');
  await expect(references).toContainText('not a Gantt review page');
  await expect(page.locator('.customer-review, .review-rating, .deliverable-stats')).toHaveCount(0);
  for (const path of ['/analytics.html', '/storyboard.html', '/powertable.html']) {
    await page.goto(path);
    await expect(page.locator('img[src^="/assets/gantt-"]')).toHaveCount(0);
  }
});

test('Gantt flow navigation and timeline inspection work on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/gantt.html');
  await openCaseDetails(page);
  await page.locator('.flow-disclosure > summary').click();
  const flow = page.getByRole('navigation', { name: 'Power BI Gantt setup flow' });
  for (const [name, target] of [
    [/Choose Gantt/, '#entry'],
    [/Understand the data mapping/, '#mapping'],
    [/Read tasks against time/, '#timeline']
  ]) {
    await flow.getByRole('link', { name }).click();
    await expect(page.locator(target)).toBeInViewport();
  }
  const opener = page.getByRole('button', { name: 'Inspect screenshot', exact: true }).last();
  await opener.click();
  const dialog = page.getByRole('dialog', { name: 'Inspect screenshot', exact: true });
  await expect(dialog.locator('img')).toHaveAttribute('src', /\/assets\/gantt-timeline\.png$/);
  await dialog.getByRole('button', { name: 'Actual size', exact: true }).click();
  expect(await dialog.locator('img').evaluate((image) => image.clientWidth)).toBe(1406);
  expect(await dialog.getByRole('region', { name: 'Screenshot image' }).evaluate((element) =>
    element.scrollWidth > element.clientWidth)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
});

test('presentation case separates contribution scope, concepts, and vendor evidence', async ({ page }) => {
  await page.goto('/presentation.html');
  await openCaseDetails(page);
  await expect(page.locator('h1')).toHaveText('Annotations & Presentation.');
  await expect(page.locator('.metadata')).toContainText('Analytics+ · Microsoft Power BI');
  await expect(page.locator('.metadata')).not.toContainText('Microsoft Fabric');
  await expect(page.locator('.case-brief')).toContainText('Nine supplied full-resolution design screens');
  await expect(page.locator('.case-evidence')).toContainText('not as a recording of every interaction');
  await expect(page.locator('#comments')).toContainText('not an assumed threaded discussion system');
  await expect(page.locator('#comments')).toContainText('Comments-panel capabilities provide product context; my contribution here covers annotations, presentation mode, and slideshow interactions.');
  await expect(page.locator('#references')).toContainText('vendor documentation, not independent customer reviews');
  await expect(page.locator('#references a').first()).toHaveAttribute('href', 'https://docs.inforiver.com/analytics+/storyboard/annotations');
  await expect(page.locator('.customer-review, .review-rating, iframe')).toHaveCount(0);
  await expect(page.locator('img[src$=".png"]:not(.brand-image)')).toHaveCount(9);
  const illustrations = page.locator('figure:has(img[data-visual-kind="illustration"])');
  await expect(illustrations).toHaveCount(2);
  for (const figure of await illustrations.all()) {
    await expect(figure.locator('figcaption')).toContainText('Original conceptual illustration');
    await expect(figure.locator('img')).toHaveAttribute('data-visual-kind', 'illustration');
    await expect(figure.locator('img')).toHaveAttribute('alt', /not a product screenshot/);
  }
  for (const source of ['annotation-context', 'presentation-focus']) {
    const response = await page.request.get(`/assets/${source}.svg`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/svg+xml');
    const svg = await response.text();
    const result = await page.evaluate((source) => {
      const document = new DOMParser().parseFromString(source, 'image/svg+xml');
      return {
        errors: document.querySelectorAll('parsererror').length,
        title: document.querySelector('title')?.textContent,
        description: document.querySelector('desc')?.textContent,
        external: document.querySelectorAll('image, script, foreignObject').length
      };
    }, svg);
    expect(result.errors).toBe(0);
    expect(result.title).toContain('Conceptual illustration');
    expect(result.description).toContain('not a');
    expect(result.external).toBe(0);
  }
});

test('concept inspection is correctly labeled and supports mobile keyboard panning', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/presentation.html');
  await openCaseDetails(page);
  const opener = page.getByRole('button', { name: 'Inspect illustration', exact: true }).first();
  await expect(page.getByRole('button', { name: 'Inspect screenshot', exact: true })).toHaveCount(9);
  await opener.click();
  const dialog = page.getByRole('dialog', { name: 'Inspect illustration', exact: true });
  await expect(dialog.locator('img')).toHaveJSProperty('naturalWidth', 1040);
  await expect(dialog).toContainText('Conceptual illustration, not a product screenshot');
  expect(await dialog.evaluate((element) => getComputedStyle(element, '::backdrop').animationName)).toBe('none');
  await dialog.getByRole('button', { name: 'Actual size', exact: true }).click();
  const viewport = dialog.getByRole('region', { name: 'Illustration image', exact: true });
  expect(await dialog.locator('img').evaluate((image) => image.clientWidth)).toBe(1040);
  await viewport.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => viewport.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await dialog.getByRole('button', { name: 'Fit to screen', exact: true }).click();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test('presentation concepts and related case links work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 320, height: 844 } });
  const page = await context.newPage();
  await page.goto(origin + '/');
  await page.getByRole('link', { name: 'Read Inforiver Analytics+ case study' }).click();
  await page.getByRole('link', { name: 'Read Annotations, Comments and Presentation case study', exact: true }).click();
  await expect(page).toHaveURL(/presentation\.html$/);
  await openCaseDetails(page);
  for (const image of await page.locator('img[data-visual-kind="illustration"]').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty('naturalWidth', 1040);
  }
  await expect(page.locator('.inspect-button')).toHaveCount(0);
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'View conceptual annotation illustration full-size (opens in a new tab)', exact: true }).click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL(/annotation-context\.svg$/);
  await popup.close();
  await page.getByRole('link', { name: 'Storyboard authoring case', exact: false }).click();
  await expect(page).toHaveURL(/storyboard\.html$/);
  await expect(page.locator('main img:not(.brand-image)')).toHaveCount(6);
  await openCaseDetails(page);
  await page.locator('#presentation a').click();
  await expect(page).toHaveURL(/presentation\.html$/);
  await page.goto(origin + '/about.html#experience');
  await page.locator('.assignment-timeline').getByRole('link', { name: /Annotations, Comments/ }).click();
  await expect(page).toHaveURL(/presentation\.html$/);
  await context.close();
});

test('two products agree across Home, index, and branded product case heroes', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#work-title sup')).toHaveText('02');
  await expect(page.locator('.project-index a > span')).toHaveText(['01', '02']);
  const projects = await page.locator('.project').evaluateAll((elements) => elements.map((element) => ({
    id: element.id,
    number: element.querySelector('.project-caption .eyebrow').textContent.slice(0, 2),
    path: element.querySelector('.case-link').getAttribute('href')
  })));
  expect(projects.map((project) => project.id)).toEqual([
    'project-planning', 'project-analytics'
  ]);
  expect(projects.map((project) => project.number)).toEqual(['01', '02']);
  for (const project of projects) {
    await page.goto(project.path);
    await expect(page.locator('.case-hero .project-identity')).toContainText(
      project.id === 'project-planning' ? 'PowerTable' : 'Analytics+'
    );
  }
  await page.goto('/about.html');
  await expect(page.locator('.assignment-timeline h4')).toHaveText(['PowerTable', 'Inforiver Analytics+']);
});

for (const path of casePages) {
  test(`${path} explains business context, pain points, solutions, and a responsive concept`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      if (featurePages.includes(path)) await openCaseDetails(page);
      if (path === '/powertable.html') await page.locator('#study-details > summary').click();
      if (path === '/analytics.html') await page.locator('#feature-walkthrough > summary').click();
      const business = page.getByRole('region', { name: 'Business case', exact: true });
      await expect(business.locator('.large-copy')).not.toBeEmpty();
      await expect(page.locator('#reflection .evidence-note')).toHaveCount(1);
      const cards = page.locator('.solution-grid > li');
      await expect(cards).toHaveCount(3);
      for (const card of await cards.all()) {
        await expect(card).toContainText('Pain point');
        await expect(card).toContainText('Solution highlight');
        await expect(card.locator('h3')).not.toBeEmpty();
        await expect(card.locator('a')).toHaveAttribute('href', /^#/);
      }
      const model = page.locator('#concept');
      await expect(model.locator('.concept-node')).toHaveCount(3);
      await expect(model.locator('figcaption')).toContainText('not a product screenshot');
      await model.scrollIntoViewIfNeeded();
      const boxes = await model.locator('.concept-node').evaluateAll(nodes => nodes.map(node => {
        const bounds = node.getBoundingClientRect();
        return { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height };
      }));
      expect(boxes.every(box => box.height >= 44 && box.width >= 44)).toBe(true);
      expect(new Set(boxes.map(box => width < 700 ? box.x : box.y)).size).toBe(1);
      for (const node of await model.locator('.concept-node').all()) {
        const target = await node.getAttribute('href');
        await node.click();
        await expect(page.locator(target)).toBeInViewport();
      }
      const nav = page.getByRole('navigation', { name: 'Case study sections' });
      const sectionLinks = path === '/powertable.html'
        ? [['Context & role', '#business-case'], ['Design decisions', '#competitive-analysis'], ['Feature scope', '#overview']]
        : [['Business case', '#business-case'], ['Solutions', '#solutions'], ['Concept', '#concept']];
      for (const [label, target] of sectionLinks) {
        await nav.getByRole('link', { name: label, exact: true }).click();
        await expect(page.locator(target)).toBeInViewport();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });
}

test('all case user flows and concept explanations remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  for (const path of casePages) {
    await page.goto(origin + path);
    if (featurePages.includes(path)) await openCaseDetails(page);
    if (path === '/powertable.html') await page.locator('#study-details > summary').click();
    await expect(page.locator('#business-case')).toContainText('business', { ignoreCase: true });
    await expect(page.locator('#concept .concept-node')).toHaveCount(3);
    const flow = page.locator('#user-flow');
    await flow.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(flow).toHaveAttribute('open');
    expect(await flow.locator('a').count()).toBeGreaterThanOrEqual(3);
    for (const link of await flow.locator('a').all()) {
      const target = await link.getAttribute('href');
      await link.click();
      await expect(page.locator(target)).toBeInViewport();
    }
  }
  await context.close();
});

test('all nine supplied presentation screens retain full resolution, source order, and responsive inspection', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/presentation.html');
  await openCaseDetails(page);
  const sources = Array.from({ length: 9 }, (_, index) => `/assets/presentation-screen-${String(index + 1).padStart(2, '0')}.png`);
  expect(await page.locator('main img:not(.brand-image)[src^="/assets/presentation-screen-"]').evaluateAll(images => images.map(image => image.getAttribute('src')))).toEqual(sources);
  for (const source of sources) {
    const image = page.locator(`img[src="${source}"]`);
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(image => image.decode());
    await expect(image).toHaveJSProperty('naturalWidth', 1707);
    await expect(image).toHaveJSProperty('naturalHeight', 830);
    await expect(image).toHaveAttribute('width', '1707');
    await expect(image).toHaveAttribute('height', '830');
    await expect(image).toHaveAttribute('alt', /.+/);
    expect(await image.evaluate(image => image.clientWidth <= image.naturalWidth)).toBe(true);
    await expect(image.locator('xpath=ancestor::figure').locator('figcaption')).toContainText('Design screen');
  }
  await expect(page.locator('main')).not.toContainText('low-resolution');
  await expect(page.locator('main')).not.toContainText('contact sheet');
  await expect(page.locator('a[href="/assets/presentation-contact-sheet.png"]')).toHaveCount(0);
  await page.getByRole('button', { name: 'Inspect screenshot', exact: true }).first().click();
  const dialog = page.getByRole('dialog', { name: 'Inspect screenshot', exact: true });
  await expect(dialog.locator('img')).toHaveJSProperty('naturalWidth', 1707);
  await dialog.getByRole('button', { name: 'Actual size', exact: true }).click();
  expect(await dialog.locator('img').evaluate(image => image.clientWidth)).toBe(1707);
  const viewport = dialog.getByRole('region', { name: 'Screenshot image', exact: true });
  await viewport.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => viewport.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 1440, height: 1000 });
  const firstImage = page.locator(`img[src="${sources[0]}"]`);
  await firstImage.scrollIntoViewIfNeeded();
  expect(await firstImage.evaluate(image => image.clientHeight)).toBeLessThanOrEqual(380);
  expect(await firstImage.evaluate(image => image.clientWidth)).toBeLessThan(900);
  expect(await firstImage.evaluate(image => image.clientWidth <= image.naturalWidth)).toBe(true);
  await page.goto('/analytics-plus.html');
  const card = page.locator('#feature-annotations');
  await expect(card).toHaveAttribute('href', '/presentation.html');
  await expect(card.locator('img')).toHaveAttribute('src', '/assets/annotation-detail.png');
  await expect(card).toContainText('Design screen · Annotation detail');
  for (const path of ['/analytics.html', '/storyboard.html', '/gantt.html', '/powertable.html']) {
    await page.goto(path);
    await expect(page.locator('img[src^="/assets/presentation-screen-"]')).toHaveCount(0);
  }
});

test('KPI case preserves supplied screens and distinguishes evidence from feature claims', async ({ page }) => {
  await page.goto('/kpi.html');
  await openCaseDetails(page);
  await expect(page.locator('h1')).toContainText('KPI Presets.');
  await expect(page.locator('.metadata')).toContainText('Analytics+ · Microsoft Power BI');
  await expect(page.locator('.metadata')).not.toContainText('Microsoft Fabric');
  await expect(page.locator('.case-brief')).toContainText('Reusable KPI templates shipped');
  await expect(page.locator('#overview')).toContainText('sample values that differ from the adjacent report canvas');
  await expect(page.locator('#variance')).toContainText('Its detailed contents and behavior are not shown');
  await expect(page.locator('#library')).toContainText('not a count of the examples in this image');
  await expect(page.locator('#references')).toContainText('vendor references, not independent customer reviews or proof of personal design ownership');
  await expect(page.locator('.customer-review, .review-rating, iframe')).toHaveCount(0);
  const expected = [
    ['/assets/kpi-simple.png', 2000, 1063],
    ['/assets/kpi-variance.png', 2000, 1046],
    ['/assets/kpi-preset-library.png', 1996, 211]
  ];
  expect(await page.locator('main img:not(.brand-image)').evaluateAll(images => images.map(image => image.getAttribute('src')))).toEqual(expected.map(([source]) => source));
  for (const [source, width, height] of expected) {
    const image = page.locator(`img[src="${source}"]`);
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(image => image.decode());
    await expect(image).toHaveJSProperty('naturalWidth', width);
    await expect(image).toHaveJSProperty('naturalHeight', height);
    expect(await image.evaluate(image => image.clientWidth <= image.naturalWidth)).toBe(true);
    await expect(image).toHaveAttribute('width', String(width));
    await expect(image).toHaveAttribute('height', String(height));
  }
  const flow = page.locator('#user-flow');
  await flow.locator('summary').click();
  await expect(flow.locator('.flow-route-note')).toContainText('alternative preset families, not consecutive required steps');
  for (const path of casePages.filter(path => path !== '/kpi.html')) {
    await page.goto(path);
    await expect(page.locator('img[src^="/assets/kpi-"]')).toHaveCount(0);
  }
});

test('KPI full-size inspection supports mobile panning and focus return', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/kpi.html');
  await openCaseDetails(page);
  const opener = page.getByRole('button', { name: 'Inspect screenshot', exact: true }).first();
  await expect(page.getByRole('button', { name: 'Inspect screenshot', exact: true })).toHaveCount(3);
  await opener.click();
  const dialog = page.getByRole('dialog', { name: 'Inspect screenshot', exact: true });
  await dialog.getByRole('button', { name: 'Actual size', exact: true }).click();
  expect(await dialog.locator('img').evaluate(image => image.clientWidth)).toBe(2000);
  const viewport = dialog.getByRole('region', { name: 'Screenshot image', exact: true });
  await viewport.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => viewport.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
  await dialog.getByRole('button', { name: 'Fit to screen', exact: true }).click();
  expect(await dialog.locator('img').evaluate(image => image.clientWidth)).toBeLessThan(390);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test('KPI is reachable from Home and About with original evidence without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 320, height: 844 } });
  const page = await context.newPage();
  await page.goto(origin + '/');
  await page.getByRole('link', { name: 'Read Inforiver Analytics+ case study' }).click();
  await expect(page.locator('#feature-kpi [data-case-scene="kpi-design"]')).toBeVisible();
  await expect(page.locator('#feature-kpi')).toContainText('Original concept illustration');
  await page.getByRole('link', { name: 'Read KPI Presets case study', exact: true }).click();
  await expect(page).toHaveURL(/kpi\.html$/);
  await expect(page.locator('.inspect-button')).toHaveCount(0);
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'View Simple KPI presets full-size (opens in a new tab)', exact: true }).click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL(/kpi-simple\.png$/);
  await popup.close();
  await page.goto(origin + '/about.html#experience');
  await page.getByRole('link', { name: 'KPI Presets', exact: false }).click();
  await expect(page).toHaveURL(/kpi\.html$/);
  await context.close();
});

test('Gantt is reachable from Home and About without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(origin + '/');
  await page.getByRole('link', { name: 'Read Inforiver Analytics+ case study' }).click();
  await page.getByRole('link', { name: 'Read Power BI Gantt case study' }).click();
  await expect(page).toHaveURL(/gantt\.html$/);
  await expect(page.locator('main img:not(.brand-image)')).toHaveCount(3);
  await expect(page.getByRole('button', { name: 'Inspect screenshot', exact: true })).toHaveCount(0);
  for (const image of await page.locator('main img:not(.brand-image)').all()) {
    await image.scrollIntoViewIfNeeded();
    expect(await image.evaluate((element) => element.naturalWidth)).toBeGreaterThan(0);
  }
  await page.goto(origin + '/about.html#experience');
  await page.locator('.assignment-timeline').getByRole('link', { name: 'Gantt for Power BI' }).click();
  await expect(page).toHaveURL(/gantt\.html$/);
  await context.close();
});
