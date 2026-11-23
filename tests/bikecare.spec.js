import { test, expect } from './fixtures.js';
import { bikecareScreens, bikecareScreenGroups } from '../src/bikecare-story.js';
import { bikecareThemes } from '../src/bikecare-ux-model.js';

test.use({ reducedMotion: 'reduce' });

async function workspace(app, label) {
  await app.getByRole('group', { name: 'Simulate a BikeCare role' }).getByRole('button', { name: label, exact: true }).click();
  await app.getByText('Skip access for design review', { exact: true }).click();
  await app.getByRole('button', { name: 'Open demo workspace', exact: true }).click();
}
async function selectBike(app, name) {
  await app.getByRole('button', { name: 'Selected bike: open garage', exact: true }).click();
  await app.getByRole('button', { name: `Select ${name}`, exact: true }).click();
}
async function more(app, name) {
  await nav(app, 'More');
  await app.getByRole('button', { name, exact: true }).click();
}
async function nav(app, label) {
  if (label === 'Rides' || label === 'Parts') {
    await app.getByRole('navigation', { name: 'BikeCare app navigation' }).getByRole('button', { name: 'More', exact: true }).click();
    await app.getByRole('button', { name: label === 'Rides' ? 'Motorcycle rides' : 'Parts and supplier checks', exact: true }).click();
    return;
  }
  await app.getByRole('navigation', { name: 'BikeCare app navigation' }).getByRole('button', { name: label, exact: true }).click();
}
async function prepareJob(app) {
  await workspace(app, 'Service advisor');
  await nav(app, 'Job card');
  await app.getByLabel('Odometer (km)', { exact: true }).fill('13600');
  await app.getByRole('button', { name: 'Send estimate for rider review' }).click();
}
async function approve(app) {
  await workspace(app, 'Rider');
  await nav(app, 'Service');
  await app.getByRole('button', { name: 'Open current job' }).click();
  await expect(app.getByRole('button', { name: 'Rider: approve estimate' })).toBeDisabled();
  await app.getByRole('checkbox').check();
  await app.getByRole('button', { name: 'Rider: approve estimate' }).click();
}
async function completeWork(app, guidance = true) {
  await workspace(app, 'Mechanic');
  await nav(app, 'Work');
  await app.getByLabel('Completed work & parts', { exact: true }).fill('Brake and chain service completed / Demo.');
  if (guidance) {
    await app.getByLabel('Next date (optional)').fill('2026-12-22');
    await app.getByLabel('Next km (optional)').fill('15500');
  }
  await app.getByRole('checkbox').check();
  await app.getByRole('button', { name: 'Mechanic: confirm completed work' }).click();
}
async function issueBill(app) {
  await workspace(app, 'Billing staff');
  await nav(app, 'Bill');
  await app.getByRole('button', { name: 'Billing: issue demo invoice' }).click();
}
async function review(app) {
  await workspace(app, 'Rider');
  await nav(app, 'Service');
  await app.getByRole('button', { name: 'Open current job' }).click();
}

test('portfolio-themed BikeCare cover connects the complete case, prototype and guide', async ({ page }) => {
  await page.goto('/');
  const card = page.getByRole('link', { name: 'Read BikeCare prototype case study', exact: true });
  const cover = card.getByRole('img', { name: 'BikeCare prototype cover', exact: true });
  await cover.locator('img').evaluateAll(images => Promise.all(images.map(image => { image.loading = 'eager'; return image.decode(); })));
  await expect(cover.locator('img')).toHaveCount(3);
  await expect(cover).toContainText('59 screens / 7 journey maps / 2 themes');
  for (const appearance of ['light', 'dark']) {
    await page.evaluate(value => localStorage.setItem('portfolio-appearance', value), appearance);
    await page.reload();
    await cover.locator('img').evaluateAll(images => Promise.all(images.map(image => { image.loading = 'eager'; return image.decode(); })));
    const style = element => ({ background: getComputedStyle(element).backgroundImage, color: getComputedStyle(element).color });
    expect(await cover.evaluate(style)).toEqual(await page.locator('.product-cover-art--codShield').evaluate(style));
    const font = element => getComputedStyle(element).fontFamily;
    expect(await cover.locator('.cover-headline').evaluate(font)).toEqual(await page.locator('.product-cover-art--codShield .cover-headline').evaluate(font));
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await card.scrollIntoViewIfNeeded();
      expect(await cover.evaluate(element => {
        const frame = element.getBoundingClientRect();
        return element.scrollWidth <= element.clientWidth && [...element.querySelectorAll('img')].every(image => {
          const bounds = image.getBoundingClientRect();
          return bounds.left >= frame.left && bounds.right <= frame.right && bounds.top >= frame.top && bounds.bottom <= frame.bottom;
        });
      })).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(await cover.locator('.cover-headline').evaluate(element =>
        [...element.children].every(line => line.getBoundingClientRect().height <= parseFloat(getComputedStyle(line).lineHeight) * 1.1)
      )).toBe(true);
      expect(await cover.locator('.cover-screen').evaluate(element => {
        const screen = element.getBoundingClientRect();
        return [...element.querySelectorAll('img')].every(image => {
          const bounds = image.getBoundingClientRect();
          return bounds.left >= screen.left && bounds.right <= screen.right && bounds.top >= screen.top && bounds.bottom <= screen.bottom;
        });
      })).toBe(true);
    }
  }
  await card.click();
  const links = page.getByRole('navigation', { name: 'BikeCare case-study deliverables' });
  await expect(page.getByRole('img', { name: 'BikeCare prototype cover', exact: true })).toBeVisible();
  await links.getByRole('link', { name: 'Try the clickable prototype', exact: true }).click();
  await expect(page.locator('.bikecare-app-body')).toHaveAttribute('data-view', 'splash');
  await expect(links.getByRole('link', { name: 'Read the complete case study', exact: true })).toHaveAttribute('href', '#case-overview');
  const guide = links.getByRole('link', { name: 'Download the Signal design-system guide', exact: true });
  await expect(guide).toHaveAttribute('download', '');
  expect((await page.request.get(await guide.getAttribute('href'))).ok()).toBe(true);
});

test('research-led case exposes every original design collection and keeps Home navigation', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  const card = page.getByRole('link', { name: 'Read BikeCare prototype case study', exact: true });
  await expect(card).toContainText('parts and motorcycle rides');
  await card.click();
  await expect(page).toHaveURL(/\/bikecare\.html$/);
  await expect(page.locator('.case-chapter')).toHaveCount(6);
  await expect(page.locator('main')).toContainText('Public-source desk research');
  await expect(page.locator('main')).toContainText('No interviews, quotes or usability scores are fabricated.');
  await expect(page.locator('main')).toContainText('Both-party confirmation is not a quality certificate');
  for (const [group, label] of bikecareScreenGroups) {
    await page.getByRole('navigation', { name: 'BikeCare screen collections' }).getByRole('button', { name: label, exact: true }).click();
    const tabs = page.getByRole('tablist', { name: 'Original design screens', exact: true }).getByRole('tab');
    const frames = bikecareScreens.filter(screen => screen.group === group);
    await expect(tabs).toHaveCount(frames.length);
    await tabs.first().focus();
    for (const [index, screen] of frames.entries()) {
      if (index) await page.keyboard.press('ArrowRight');
      await expect(tabs.nth(index)).toBeFocused();
      const panel = page.getByRole('tabpanel');
      await panel.locator('img').evaluate(image => image.decode());
      await expect(panel.locator('img')).toHaveAttribute('src', screen.src);
      await expect(panel).toContainText('Demo roles and data; not a launched app.');
    }
  }
  const duplicateIds = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map(element => element.id);
    return ids.filter((id, index) => ids.indexOf(id) !== index);
  });
  expect(duplicateIds).toEqual([]);
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Home', exact: true }).click();
  await expect(card).toBeVisible();
  expect(errors).toEqual([]);
});

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 1440]) {
    test(`BikeCare screens and five workspaces fit ${appearance} at ${width}px`, async ({ page }) => {
      test.setTimeout(120_000);
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      await page.goto('/bikecare.html#case-screens');
      for (const [, label] of bikecareScreenGroups) {
        await page.getByRole('navigation', { name: 'BikeCare screen collections' }).getByRole('button', { name: label, exact: true }).click();
        const tabs = page.getByRole('tablist', { name: 'Original design screens', exact: true }).getByRole('tab');
        for (const tab of await tabs.all()) {
          await tab.click();
          await page.getByRole('tabpanel').locator('img').scrollIntoViewIfNeeded();
          await page.getByRole('tabpanel').locator('img').evaluate(image => image.decode());
          expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
        }
      }
      const app = page.locator('[data-bikecare-app]');
      for (const label of ['Rider', 'Service advisor', 'Mechanic', 'Billing staff', 'Support agent']) {
        await workspace(app, label);
        expect(await app.locator('.bikecare-phone').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
        expect(await app.locator('input, select, textarea').evaluateAll(elements => elements.every(element => parseFloat(getComputedStyle(element).fontSize) >= 16))).toBe(true);
        expect(await app.locator('button:visible').evaluateAll(elements => elements.every(element => element.getBoundingClientRect().height >= 44))).toBe(true);
        expect(await app.locator('.bikecare-app-nav button').evaluateAll(elements => elements.every(element => element.getBoundingClientRect().width >= 44))).toBe(true);
      }
      await page.getByRole('button', { name: 'Walkthrough', exact: true }).first().click();
      const player = page.locator('.cod-film-player');
      await player.getByRole('button', { name: 'Go to section 3: Solution', exact: true }).click();
      await expect(player.locator('#cod-film-scene-title')).toHaveText('Approve the service');
      await expect(player.getByRole('group', { name: 'Solution steps' }).getByRole('button')).toHaveCount(3);
      await player.getByRole('button', { name: 'Close cinematic walkthrough', exact: true }).click();
    });
  }
}

test('four-role approval, work, billing and review gates preserve bike history and payment independence', async ({ page }) => {
  const posts = [];
  page.on('request', request => { if (request.method() === 'POST') posts.push(request.url()); });
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await workspace(app, 'Billing staff'); await nav(app, 'Bill');
  await expect(app.getByRole('button', { name: 'Billing: issue demo invoice' })).toBeDisabled();
  await workspace(app, 'Mechanic'); await nav(app, 'Work');
  await expect(app).toContainText('requires rider approval');
  await expect(app.getByRole('button', { name: 'Mechanic: confirm completed work' })).toHaveCount(0);
  await prepareJob(app);
  await approve(app);
  await completeWork(app);
  await expect(app).not.toContainText('Billing: issue demo invoice');
  await issueBill(app);
  await expect(app).toContainText('Unpaid');
  await app.getByRole('button', { name: 'Record demo payment' }).click();
  await app.getByRole('button', { name: 'Save simulated receipt' }).click();
  await review(app);
  await expect(app).toContainText('Paid / Demo receipt');
  await expect(app.getByRole('button', { name: 'Rider: confirm record' })).toBeDisabled();
  await nav(app, 'History');
  await expect(app.locator('.bikecare-status')).toHaveCount(1);
  await expect(app).not.toContainText('Brake and chain service');
  await review(app);
  await app.getByRole('checkbox').check();
  await app.getByRole('button', { name: 'Rider: confirm record' }).click();
  await nav(app, 'History');
  await expect(app.locator('.bikecare-status')).toHaveCount(2);
  await app.getByRole('button', { name: 'Preview resale history' }).click();
  await app.getByRole('button', { name: 'Create local resale preview' }).click();
  const preview = app.getByRole('region', { name: 'Buyer-facing resale preview' });
  await expect(preview).toContainText('Brake and chain service');
  await expect(preview).not.toContainText('Demo rider');
  await expect(preview).not.toContainText('DEMO VEHICLE');
  await selectBike(app, 'Yamaha FZ');
  await nav(app, 'History');
  await expect(app).toContainText('No confirmed records yet.');
  await selectBike(app, 'Honda Shine');
  await nav(app, 'History');
  await expect(app.locator('.bikecare-status')).toHaveCount(2);
  await page.reload(); await workspace(app, 'Rider'); await nav(app, 'History');
  await expect(app.locator('.bikecare-status')).toHaveCount(1);
  expect(posts).toEqual([]);
});

test('additional parts need fresh approval and corrections retain a held invoice outside history', async ({ page }) => {
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await prepareJob(app); await approve(app);
  await workspace(app, 'Mechanic'); await nav(app, 'Work');
  await app.getByRole('button', { name: 'Request an additional oil filter' }).click();
  await expect(app).toContainText('Rider approval needed / v2');
  await nav(app, 'Work');
  await expect(app.getByRole('button', { name: 'Mechanic: confirm completed work' })).toHaveCount(0);
  await approve(app); await completeWork(app); await issueBill(app); await review(app);
  await app.getByRole('checkbox').check();
  await app.getByRole('button', { name: 'Ask for correction' }).click();
  await expect(app.getByRole('checkbox')).not.toBeChecked();
  await expect(app.getByRole('button', { name: 'Rider: confirm record' })).toBeDisabled();
  await expect(app).toContainText('original invoice v1');
  await nav(app, 'History');
  await expect(app.locator('.bikecare-status')).toHaveCount(1);
  await workspace(app, 'Service advisor'); await nav(app, 'Job card');
  await app.getByLabel('Rider complaint').fill('Clarified chain service / Demo.');
  await app.getByRole('button', { name: 'Send estimate for rider review' }).click();
  await approve(app); await completeWork(app);
  await workspace(app, 'Billing staff'); await nav(app, 'Bill');
  await expect(app).toContainText('Draft service invoice');
  await expect(app.getByRole('button', { name: 'Record demo payment' })).toBeDisabled();
  await app.getByRole('button', { name: 'Billing: issue demo invoice' }).click();
  await review(app);
  await expect(app).toContainText('INV-014 / Revision 2');
  await app.getByRole('checkbox').check();
  await app.getByRole('button', { name: 'Rider: confirm record' }).click();
  await nav(app, 'History');
  await expect(app.locator('.bikecare-status')).toHaveCount(2);
});

test('supplied reminder thresholds and unknown guidance stay explicit', async ({ page }) => {
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await workspace(app, 'Rider');
  await app.getByText('Odometer & reminder tools', { exact: true }).click();
  await app.getByLabel('Current odometer (km)').fill('14500');
  await app.getByRole('button', { name: 'Update reading' }).click();
  await expect(app.locator('.bikecare-status')).toHaveText('Service due');
  await app.getByRole('button', { name: 'Preview a reminder' }).click();
  await expect(app).toContainText('No notification was scheduled or sent.');
  await app.getByLabel('Current odometer (km)').fill('14000');
  await app.getByRole('button', { name: 'Update reading' }).click();
  await expect(app.getByRole('alert')).toContainText('no lower than the current demo odometer');
  await prepareJob(app); await approve(app); await completeWork(app, false); await issueBill(app); await review(app);
  await app.getByRole('checkbox').check();
  await app.getByRole('button', { name: 'Rider: confirm record' }).click();
  await nav(app, 'Home');
  await expect(app.locator('.bikecare-status')).toHaveText('Guidance needed');
});

test('billing rejects invalid amounts and keeps a partial receipt separate from full settlement', async ({ page }) => {
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await prepareJob(app); await approve(app); await completeWork(app); await issueBill(app);
  await app.getByRole('button', { name: 'Record demo payment' }).click();
  await app.getByLabel('Receipt amount (INR)').fill('1000');
  await app.getByRole('button', { name: 'Save simulated receipt' }).click();
  await expect(app.getByRole('alert')).toContainText('outstanding balance');
  await app.getByLabel('Receipt amount (INR)').fill('100');
  await app.getByRole('button', { name: 'Save simulated receipt' }).click();
  await expect(app).toContainText('Part-paid / Demo');
  await expect(app).toContainText('Due ₹785.00');
  await app.getByRole('button', { name: 'Record demo payment' }).click();
  await expect(app.getByLabel('Receipt amount (INR)')).toHaveValue('785');
  await app.getByRole('button', { name: 'Save simulated receipt' }).click();
  await expect(app).toContainText('Paid / Demo receipt');
  await expect(app.getByRole('button', { name: 'Record demo payment' })).toBeDisabled();
});

test('parts purchases block pending suppliers and incompatible bikes, and orders are not automatically paid', async ({ page }) => {
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await workspace(app, 'Rider'); await nav(app, 'Shop');
  await app.getByRole('button', { name: 'View filter details' }).click();
  await app.getByRole('button', { name: 'Inspect supplier & authenticity checks' }).click();
  await expect(app).toContainText('does not prove every part genuine');
  await app.getByRole('button', { name: 'Preview pending supplier state' }).click();
  await expect(app.getByRole('button', { name: 'Return to eligible product' })).toBeDisabled();
  await expect(app).toContainText('Pending suppliers cannot list or sell.');
  await nav(app, 'Shop'); await app.getByRole('button', { name: 'View filter details' }).click();
  await app.getByRole('button', { name: 'Add to demo cart' }).click();
  await app.getByLabel('Quantity for filter').selectOption('4');
  await expect(app.getByLabel('Quantity for filter').getByRole('option')).toHaveCount(4);
  await selectBike(app, 'Yamaha FZ'); await nav(app, 'Shop');
  await app.getByRole('button', { name: 'View filter details' }).click();
  await expect(app.getByRole('button', { name: 'Add to demo cart' })).toBeDisabled();
  await nav(app, 'Shop'); await app.getByRole('button', { name: 'Open cart (4)' }).click();
  await app.getByRole('button', { name: 'Place demo pickup order' }).click();
  await expect(app.getByRole('alert')).toContainText('compatibility');
  await selectBike(app, 'Honda Shine'); await nav(app, 'Shop');
  await app.getByRole('button', { name: 'Open cart (4)' }).click();
  await app.getByRole('button', { name: 'Place demo pickup order' }).click();
  await expect(app).toContainText('Unpaid / Pay at pickup');
  await expect(app).toContainText('No stock reserved, money collected or seller notified.');
  await app.getByRole('button', { name: 'Simulate pickup payment' }).click();
  await expect(app).toContainText('Payment received / Demo');
  await expect(app.getByRole('button', { name: 'Cancel demo order' })).toBeDisabled();
});

test('motorcycle ride requests require review and keep meetup details private on withdrawal and cancellation', async ({ page }) => {
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await workspace(app, 'Rider'); await nav(app, 'Rides');
  await expect(app).toContainText('Company group');
  await app.getByRole('button', { name: 'View rider-created ride', exact: true }).click();
  await expect(app).toContainText('Exact meetup point hidden until approval');
  await app.getByRole('button', { name: 'Request to join ride' }).click();
  await expect(app.getByRole('alert')).toContainText('requirements');
  await app.getByRole('checkbox').check();
  await app.getByRole('button', { name: 'Request to join ride' }).click();
  await expect(app).toContainText('Join request pending');
  await app.getByRole('button', { name: 'Preview organiser decisions' }).click();
  await app.getByRole('button', { name: 'Simulate organiser approval' }).click();
  await app.getByRole('button', { name: 'Preview rider request state' }).click();
  await expect(app).toContainText('Demo meetup point / Not a real address');
  await app.getByRole('button', { name: 'Withdraw join request' }).click();
  await expect(app).toContainText('Exact meetup point hidden until approval');
  await app.getByRole('button', { name: 'Preview organiser decisions' }).click();
  await app.getByRole('button', { name: 'Cancel demo ride' }).click();
  await app.getByRole('button', { name: 'Preview rider request state' }).click();
  await expect(app).toContainText('Ride cancelled');
  await expect(app).not.toContainText('Demo meetup point / Not a real address');
  await app.getByRole('button', { name: 'Report & block demo organiser' }).click();
  await expect(app.getByRole('button', { name: 'View rider-created ride', exact: true })).toHaveCount(0);
  await app.getByRole('button', { name: 'View company group ride', exact: true }).click();
  await expect(app).toContainText('employee/group membership must be approved');
});

test('ride creation validates dates and groups without publishing a social event', async ({ page }) => {
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await workspace(app, 'Rider'); await nav(app, 'Rides');
  await app.getByRole('button', { name: 'Create a motorcycle ride' }).click();
  await app.getByLabel('Ride date').fill('2026-11-01');
  await app.getByRole('button', { name: 'Create local demo ride' }).click();
  await expect(app.getByRole('alert')).toContainText('after the demo date');
  await app.getByLabel('Ride date').fill('2026-12-20');
  await app.getByLabel('Ride title').fill('Demo colleagues motorcycle ride');
  await app.getByLabel('Ride category').selectOption('Company group');
  await app.getByRole('button', { name: 'Create local demo ride' }).click();
  await expect(app).toContainText('Nothing was published or sent.');
  await expect(app.getByRole('button', { name: 'Simulate organiser approval' })).toBeDisabled();
  await nav(app, 'Rides');
  await expect(app.getByRole('button', { name: 'View company group ride', exact: true })).toHaveCount(2);
});

test('case research and all original screen links are readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/bikecare.html');
  await expect(page.getByRole('heading', { name: 'BikeCare', exact: true })).toBeVisible();
  await expect(page.locator('main')).toContainText('The working flow needs JavaScript.');
  await expect(page.locator('main')).toContainText('Local service. Timely care. A history for resale.');
  for (const screen of bikecareScreens) await expect(page.locator(`noscript a[href="${screen.src}"]`)).toBeVisible();
  await context.close();
});

test('editable demo access recovers wrong and expired codes, signup consent and staff reset', async ({ page }) => {
  const posts = [];
  page.on('request', request => { if (request.method() === 'POST') posts.push(request.url()); });
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await app.getByRole('button', { name: 'Continue to welcome' }).click();
  await app.getByRole('button', { name: 'Get started as a rider' }).click();
  await app.getByLabel('Demo account email').fill('invalid');
  await app.getByRole('button', { name: 'Send demo code' }).click();
  await expect(app.getByRole('alert')).toContainText('fictional .test email');
  await app.getByLabel('Demo account email').fill('rider@example.test');
  await app.getByRole('button', { name: 'Send demo code' }).click();
  await app.getByLabel('One-time code').fill('000000');
  await app.getByRole('button', { name: 'Verify demo code' }).click();
  await expect(app.getByRole('alert')).toContainText('does not match');
  await app.getByRole('button', { name: 'Preview expired code' }).click();
  await expect(app).toContainText('Code expired');
  await app.getByRole('button', { name: 'Retry demo access' }).click();
  await expect(app.getByLabel('Demo account email')).toHaveValue('rider@example.test');
  await app.getByRole('button', { name: 'Resend demo code' }).click();
  await expect(app.getByLabel('One-time code')).toHaveValue('');
  await app.getByLabel('One-time code').fill('123456');
  await app.getByRole('button', { name: 'Verify demo code' }).click();
  await more(app, 'Design system and theme');
  await app.getByRole('button', { name: 'Sign out of demo workspace' }).click();
  await app.getByRole('button', { name: 'Create demo account' }).click();
  await app.getByRole('button', { name: 'Continue account setup' }).click();
  await expect(app.getByRole('alert')).toContainText('privacy notice');
  await app.getByRole('checkbox').check();
  await app.getByRole('button', { name: 'Continue account setup' }).click();
  await app.getByLabel('One-time code').fill('123456');
  await app.getByRole('button', { name: 'Verify demo code' }).click();
  await app.getByRole('group', { name: 'Simulate a BikeCare role' }).getByRole('button', { name: 'Service advisor', exact: true }).click();
  await app.getByRole('button', { name: 'Forgot password' }).click();
  await app.getByRole('button', { name: 'Preview reset email' }).click();
  await app.getByLabel('New demo password').fill('short');
  await app.getByRole('button', { name: 'Save demo reset' }).click();
  await expect(app.getByRole('alert')).toContainText('eight characters');
  await app.getByLabel('New demo password').fill('demo-reset-only');
  await app.getByRole('button', { name: 'Save demo reset' }).click();
  await expect(app).toContainText('Your workshop queue');
  expect(posts).toEqual([]);
});

test('unlisted 1970 mopeds start isolated history and do not inherit assumed oil service or fit', async ({ page }) => {
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await workspace(app, 'Rider');
  await more(app, 'Vehicles and EV setup');
  await app.getByRole('button', { name: 'Add a two-wheeler' }).click();
  await app.getByLabel('Vehicle category').selectOption('Moped');
  await app.getByRole('combobox', { name: 'Manufacturer', exact: true }).fill('Unlisted demo maker');
  await app.getByRole('combobox', { name: 'Manufacturer', exact: true }).press('Enter');
  await app.getByRole('combobox', { name: 'Model', exact: true }).fill('Vintage moped');
  await app.getByRole('combobox', { name: 'Model', exact: true }).press('Enter');
  await app.getByRole('button', { name: 'Continue vehicle setup' }).click();
  await app.getByLabel('Manufacture / model year').selectOption('1970');
  await app.getByLabel('Powertrain', { exact: true }).selectOption('Not confirmed');
  await app.getByRole('button', { name: 'Continue vehicle setup' }).click();
  await app.getByLabel('Odometer (km)', { exact: true }).fill('45000');
  await app.getByRole('button', { name: 'Save demo vehicle' }).click();
  await expect(app).toContainText('Model-year, variant and fit remain unverified');
  await expect(app.getByRole('button', { name: 'Selected bike: open garage' })).toContainText('1970');
  await nav(app, 'History');
  await expect(app).toContainText('No confirmed records yet');
  await workspace(app, 'Service advisor');
  await nav(app, 'Job card');
  await expect(app).toContainText('Vehicle-specific care guidance');
  await expect(app).not.toContainText('Engine oil');
  await selectBike(app, 'Honda Shine');
  await workspace(app, 'Rider'); await nav(app, 'History');
  await expect(app.locator('.bikecare-status')).toHaveCount(1);
});

test('EV setup separates battery details and its handover has no petrol tasks or motorcycle-eligibility bypass', async ({ page }) => {
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await workspace(app, 'Rider'); await more(app, 'Vehicles and EV setup');
  await app.getByRole('button', { name: 'Add a two-wheeler' }).click();
  await app.getByLabel('Vehicle category').selectOption('Scooter');
  await app.getByRole('combobox', { name: 'Manufacturer', exact: true }).fill('Ather');
  await app.getByRole('combobox', { name: 'Manufacturer', exact: true }).press('Enter');
  await app.getByRole('combobox', { name: 'Model', exact: true }).fill('450X');
  await app.getByRole('combobox', { name: 'Model', exact: true }).press('Enter');
  await app.getByRole('button', { name: 'Continue vehicle setup' }).click();
  await app.getByLabel('Manufacture / model year').selectOption('2024');
  await app.getByLabel('Powertrain', { exact: true }).selectOption('Electric');
  await app.getByRole('button', { name: 'Continue vehicle setup' }).click();
  await app.getByLabel('Odometer (km)', { exact: true }).fill('900');
  await app.getByRole('button', { name: 'Continue vehicle setup' }).click();
  await expect(app.getByLabel('Battery kWh (optional)')).toBeVisible();
  await expect(app).toContainText('No engine-capacity or oil-change fields');
  await app.getByLabel('Battery kWh (optional)').fill('-1');
  await app.getByRole('button', { name: 'Save demo vehicle' }).click();
  await expect(app.getByRole('alert')).toContainText('Battery capacity');
  await app.getByLabel('Battery kWh (optional)').fill('');
  await app.getByRole('button', { name: 'Save demo vehicle' }).click();
  await expect(app).toContainText('YOUR SCOOTER / EV');
  await workspace(app, 'Service advisor'); await nav(app, 'Job card');
  await expect(app.getByLabel('Intake: charge, condition, items')).toBeVisible();
  await app.getByRole('button', { name: 'Send estimate for rider review' }).click();
  await approve(app); await workspace(app, 'Mechanic'); await nav(app, 'Work');
  await expect(app).not.toContainText('oil filter');
  await expect(app.getByLabel('Completed work & parts')).toHaveValue(/EV specialist/);
  await app.getByRole('checkbox').check();
  await app.getByRole('button', { name: 'Mechanic: confirm completed work' }).click();
  await issueBill(app);
  await expect(app).toContainText('Tyre/brake inspection / 1 job');
  await expect(app).not.toContainText('Oil replacement');
  await workspace(app, 'Rider'); await nav(app, 'Shop');
  await app.getByRole('button', { name: 'View filter details' }).click();
  await expect(app.getByRole('button', { name: 'Add to demo cart' })).toBeDisabled();
  await nav(app, 'Rides'); await app.getByRole('button', { name: 'View rider-created ride', exact: true }).click();
  await app.getByRole('checkbox').check();
  await app.getByRole('button', { name: 'Request to join ride' }).click();
  await expect(app.getByRole('alert')).toContainText('permits motorcycles only');
});

test('permission denial and snooze keep the due state and optional in-app path explicit', async ({ page }) => {
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await workspace(app, 'Rider');
  await app.getByText('Odometer & reminder tools', { exact: true }).click();
  await app.getByLabel('Current odometer (km)').fill('14500');
  await app.getByRole('button', { name: 'Update reading' }).click();
  await more(app, 'Notifications and reminders');
  await app.getByRole('button', { name: 'Preview denied' }).click();
  await expect(app).toContainText('OS permission denied');
  await expect(app).toContainText('Unread care cue');
  await app.getByRole('button', { name: 'Mark read', exact: true }).click();
  await expect(app).toContainText('Read care cue');
  await app.getByRole('button', { name: 'Snooze three days' }).click();
  await expect(app).toContainText('snoozed until 2026-11-25');
  await expect(app.locator('.bikecare-status')).toHaveText('Service due');
  await app.getByText('Demo clock: 2026-11-22', { exact: true }).click();
  await app.getByRole('button', { name: 'Advance demo date one day' }).click();
  await expect(app).toContainText('Demo clock: 2026-11-23');
  await app.getByRole('checkbox', { name: 'In-app care cues' }).uncheck();
  await expect(app).toContainText('In-app cues are disabled');
  await expect(app.getByRole('button', { name: 'Mark unread' })).toHaveCount(0);
});

test('contextual complaints require a separate support response and reopening never rewrites service facts', async ({ page }) => {
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await workspace(app, 'Rider'); await more(app, 'Help, complaints and feedback');
  await app.getByRole('button', { name: 'Create a demo support request' }).click();
  await app.getByLabel('Subject', { exact: true }).fill('Demo service remains noisy');
  await app.getByLabel('Describe the issue').fill('short');
  await app.getByRole('button', { name: 'Submit demo request' }).click();
  await expect(app.getByRole('alert')).toContainText('ten characters');
  await app.getByLabel('Describe the issue').fill('Please arrange a review; the original service record must remain unchanged.');
  await app.getByRole('button', { name: 'Submit demo request' }).click();
  await expect(app).toContainText('BC-SHINE-014');
  await expect(app.getByRole('button', { name: 'Accept response and close' })).toHaveCount(0);
  await app.getByRole('button', { name: 'Escalate unresolved issue' }).click();
  await workspace(app, 'Support agent');
  await app.getByRole('button', { name: /BC-HELP-001 \/ Demo service remains noisy/ }).click();
  await app.getByRole('button', { name: 'Propose demo response' }).click();
  await expect(app.getByRole('button', { name: 'Accept response and close' })).toHaveCount(0);
  await workspace(app, 'Rider'); await more(app, 'Help, complaints and feedback');
  await app.getByRole('button', { name: /BC-HELP-001 \/ Demo service remains noisy/ }).click();
  await app.getByRole('button', { name: 'Accept response and close' }).click();
  await expect(app.locator('.bikecare-status')).toContainText('Closed');
  await app.getByRole('button', { name: 'Reopen the issue' }).click();
  await app.getByText('Request timeline (5)', { exact: true }).click();
  await expect(app).toContainText('reopened the request; original timeline retained');
  await nav(app, 'History');
  await expect(app.locator('.bikecare-status')).toHaveCount(1);
  await expect(app).toContainText('Engine oil replaced');
  await more(app, 'Help, complaints and feedback');
  await app.getByRole('button', { name: 'Create a demo support request' }).click();
  await app.getByLabel('Issue category').selectOption('Product issue');
  await expect(app).toContainText('DEMO-FILTER-01 / Demo listing');
});

test('searchable dropdowns normalise names, reset dependent models and support manual and keyboard choices', async ({ page }) => {
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await workspace(app, 'Rider'); await more(app, 'Vehicles and EV setup');
  await app.getByRole('button', { name: 'Add a two-wheeler' }).click();
  const manufacturer = app.getByRole('combobox', { name: 'Manufacturer', exact: true });
  const model = app.getByRole('combobox', { name: 'Model', exact: true });
  await manufacturer.fill('yam');
  await expect(app.getByRole('option', { name: 'Yamaha Suggestion', exact: true })).toBeVisible();
  await manufacturer.press('ArrowDown');
  await expect(manufacturer).toHaveAttribute('aria-activedescendant', /option-0$/);
  await manufacturer.press('Enter');
  await expect(manufacturer).toHaveValue('Yamaha');
  await expect(model).toHaveValue('');
  await model.focus();
  await expect(app.getByRole('listbox', { name: 'Model options' })).toContainText('RX100');
  for (const viewport of [{ width: 320, height: 568 }, { width: 390, height: 600 }]) {
    await page.setViewportSize(viewport);
    await model.click();
    await expect.poll(() => app.locator('.bikecare-select-panel').evaluate(panel => {
      const popup = panel.getBoundingClientRect();
      const body = panel.closest('.bikecare-app-body').getBoundingClientRect();
      return popup.top >= Math.max(0, body.top) && popup.bottom <= Math.min(innerHeight, body.bottom) && popup.height >= 100;
    })).toBe(true);
  }
  await page.setViewportSize({ width: 1280, height: 720 });
  await model.fill('FZ'); await model.press('Enter');
  await expect(model).toHaveValue('FZ');
  await manufacturer.fill('Honda'); await manufacturer.press('Enter');
  await expect(model).toHaveValue('');
  await model.focus(); await expect(app.getByRole('listbox')).not.toContainText('RX100');
  await model.press('Escape'); await expect(model).toHaveAttribute('aria-expanded', 'false');
  await manufacturer.fill(' honda '); await manufacturer.press('Escape');
  await model.fill(' shine '); await model.press('Escape');
  await app.getByRole('button', { name: 'Continue vehicle setup' }).click();
  await expect(app.getByRole('heading', { name: 'Honda / Shine', exact: true })).toBeVisible();
});

test('splash connects keyboard-accessible welcome, replay and both sign-in routes without fake loading', async ({ page }) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/bikecare.html#bikecare-prototype');
    await page.reload();
    const app = page.locator('[data-bikecare-app]');
    const view = app.locator('.bikecare-app-body');
    await expect(view).toHaveAttribute('data-view', 'splash');
    await expect(app.getByRole('navigation', { name: 'BikeCare app navigation' })).toHaveCount(0);
    expect(await view.evaluate(element => element.scrollHeight <= element.clientHeight && element.scrollWidth <= element.clientWidth)).toBe(true);
    const proceed = app.getByRole('button', { name: 'Continue to welcome' });
    expect(await proceed.evaluate(element => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
    await proceed.focus(); await page.keyboard.press('Enter');
    await expect(app.getByRole('heading', { name: 'Good care. A longer story.' })).toBeFocused();
    await app.getByRole('button', { name: 'Get started as a rider' }).click();
    await expect(app.getByLabel('Demo account email')).toBeVisible();
    await app.getByRole('button', { name: 'BikeCare welcome', exact: true }).click();
    await app.getByRole('button', { name: 'Replay introduction' }).click();
    await expect(app.getByRole('heading', { name: 'Every ride has a care story.' })).toBeFocused();
    await proceed.click();
    await app.getByRole('button', { name: 'Open workshop sign-in' }).click();
    await expect(app.getByLabel('Workshop role')).toHaveValue('advisor');
    await expect(app.getByLabel('Demo password', { exact: true })).toBeVisible();
  }
  const app = page.locator('[data-bikecare-app]');
  await workspace(app, 'Rider'); await more(app, 'Design system and theme');
  await app.getByLabel('Product theme').selectOption('dark');
  await app.getByRole('button', { name: 'BikeCare welcome', exact: true }).click();
  await app.getByRole('button', { name: 'Replay introduction' }).click();
  await expect(app).toHaveAttribute('data-product-theme', 'dark');
  await expect(app.locator('.bikecare-app-body')).toHaveAttribute('data-view', 'splash');
  await expect(app.getByRole('navigation', { name: 'BikeCare app navigation' })).toHaveCount(0);
});

test('landing and official bike photos stay honest across garage changes and image failure', async ({ page }) => {
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await app.getByRole('button', { name: 'Continue to welcome' }).click();
  await expect(app.getByRole('heading', { name: 'Good care. A longer story.' })).toBeVisible();
  await expect(app.locator('.bikecare-vehicle-photo img')).toHaveAttribute('src', '/assets/bikecare-official-honda.webp');
  await app.getByRole('button', { name: 'Get started as a rider' }).click();
  await app.getByLabel('Demo account email').fill('rider@example.test');
  await app.getByRole('button', { name: 'Send demo code' }).click();
  await app.getByLabel('One-time code').fill('123456');
  await app.getByRole('button', { name: 'Verify demo code' }).click();
  for (const [name, brand] of [['Honda Shine', 'honda'], ['Yamaha FZ', 'yamaha'], ['Hero Splendor', 'hero'], ['Ather 450X', 'ather']]) {
    await selectBike(app, name);
    const photo = app.locator('.bikecare-vehicle-photo img');
    await photo.evaluate(image => image.decode());
    await expect(photo).toHaveAttribute('src', `/assets/bikecare-official-${brand}.webp`);
    await expect(photo).toHaveAttribute('alt', /not verified for this vehicle's year or trim/);
    await expect(app.locator('.bikecare-vehicle-photo a')).toContainText('current reference');
  }
  await app.locator('.bikecare-vehicle-photo img').evaluate(image => image.dispatchEvent(new Event('error')));
  await expect(app).toContainText('Reference photo could not load.');
  await expect(app.locator('.bikecare-vehicle-photo img')).toHaveCount(0);
});

test('automatic service feedback creates only an opted-in complaint and keeps confirmation and payment separate', async ({ page }) => {
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await prepareJob(app); await approve(app); await completeWork(app); await issueBill(app); await review(app);
  await app.getByRole('checkbox').check();
  await app.getByRole('button', { name: 'Rider: confirm record' }).click();
  await expect(app.getByRole('heading', { name: 'How did the service feel?' })).toBeVisible();
  await expect(app.getByRole('radio', { checked: true })).toHaveCount(0);
  await app.getByRole('button', { name: 'Save service feedback' }).click();
  await expect(app.getByRole('alert')).toContainText('Choose a service rating');
  await app.getByRole('radio', { name: '2 stars: Dissatisfied', exact: true }).check();
  await app.getByRole('checkbox', { name: 'Request workshop follow-up', exact: false }).check();
  await app.getByRole('button', { name: 'Save service feedback' }).click();
  await expect(app.getByRole('alert')).toContainText('ten characters');
  await app.getByLabel('Tell us about the service (optional)').fill('The chain remains noisy. Please review the completed service.');
  await app.getByRole('button', { name: 'Save service feedback' }).click();
  await expect(app).toContainText('2 / 5 service rating');
  await app.getByRole('button', { name: 'Track workshop follow-up' }).click();
  await expect(app).toContainText('BC-SHINE-014 / Record v1');
  await expect(app).toContainText('Follow-up after service feedback');
  await expect(app.getByRole('button', { name: 'Accept response and close' })).toHaveCount(0);
  await nav(app, 'History'); await expect(app.locator('.bikecare-status')).toHaveCount(2);
  await review(app); await expect(app).toContainText('Unpaid');
});

test('feedback can be skipped and returned to without creating a complaint or a second rating', async ({ page }) => {
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await prepareJob(app); await approve(app); await completeWork(app); await issueBill(app); await review(app);
  await app.getByRole('checkbox').check(); await app.getByRole('button', { name: 'Rider: confirm record' }).click();
  await app.getByRole('button', { name: 'Skip for now' }).click();
  await expect(app).toContainText('Unpaid');
  await app.getByRole('button', { name: 'Rate this service' }).click();
  await app.getByRole('radio', { name: '1 star: Very dissatisfied', exact: true }).check();
  await app.getByRole('button', { name: 'Save service feedback' }).click();
  await expect(app.getByRole('button', { name: 'Track workshop follow-up' })).toHaveCount(0);
  await app.getByRole('button', { name: 'Back to service receipt' }).click();
  await app.getByRole('button', { name: 'View service feedback' }).click();
  await expect(app).toContainText('1 / 5 service rating');
  await expect(app.getByRole('button', { name: 'Save service feedback' })).toHaveCount(0);
  await more(app, 'Help, complaints and feedback'); await expect(app).toContainText('No requests yet.');
});

test('BikeCare walkthrough shows selectable actual solution screens and selection pauses narration', async ({ page }) => {
  await page.goto('/bikecare.html');
  await page.getByRole('button', { name: 'Walkthrough', exact: true }).first().click();
  const player = page.locator('.cod-film-player');
  await player.getByRole('button', { name: 'Go to section 3: Solution', exact: true }).click();
  const picks = player.getByRole('group', { name: 'Solution design screens' });
  await expect(player.locator('.bikecare-solution-evidence img')).toHaveAttribute('src', '/assets/bikecare-mobile-jobcard.webp');
  await player.getByRole('button', { name: 'Read this scene', exact: true }).click();
  await expect(player.getByRole('button', { name: 'Pause', exact: true })).toBeVisible();
  await picks.getByRole('button', { name: 'Estimate approval', exact: true }).click();
  await expect(player.locator('.bikecare-solution-evidence img')).toHaveAttribute('src', '/assets/bikecare-mobile-estimate.webp');
  await expect(player.getByRole('button', { name: 'Read this scene', exact: true })).toBeVisible();
  await player.getByRole('group', { name: 'Solution steps' }).getByRole('button').nth(1).click();
  await player.getByRole('group', { name: 'Solution design screens' }).getByRole('button', { name: 'Service feedback', exact: true }).click();
  await expect(player.locator('.bikecare-solution-evidence img')).toHaveAttribute('src', '/assets/bikecare-mobile-service-feedback.webp');
});

test('custom product themes preserve semantic and control contrast with a working illustrative loading state', async ({ page }) => {
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await workspace(app, 'Rider'); await more(app, 'Design system and theme');
  for (const appearance of ['light', 'dark']) {
    await app.getByLabel('Product theme').selectOption(appearance);
    await expect(app).toHaveAttribute('data-product-theme', appearance);
    const contrasts = await app.evaluate(element => {
      const style = getComputedStyle(element);
      function luminance(name) {
        const raw = style.getPropertyValue(`--bc-${name}`).trim().replace('#', '');
        const hex = raw.length === 3 ? [...raw].map(value => value + value).join('') : raw;
        const values = [0, 2, 4].map(index => parseInt(hex.slice(index, index + 2), 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
        return .2126 * values[0] + .7152 * values[1] + .0722 * values[2];
      }
      return [['ink', 'surface'], ['muted', 'canvas'], ['on-primary', 'primary'], ['on-primary', 'primary-hover'], ['warning', 'warning-soft'], ['error', 'error-soft'], ['info', 'info-soft'], ['success', 'success-soft'], ['on-feature', 'feature'], ['focus', 'surface'], ['control-line', 'surface']].map(([a, b]) => {
        const first = luminance(a), second = luminance(b);
        return (Math.max(first, second) + .05) / (Math.min(first, second) + .05);
      });

    });
    for (const contrast of contrasts.slice(0, -1)) expect(contrast).toBeGreaterThanOrEqual(4.5);
    expect(contrasts.at(-1)).toBeGreaterThanOrEqual(3);
  }
  await app.getByRole('button', { name: 'Primary example', exact: true }).click();
  await expect(app.getByRole('button', { name: 'Finish demo loading' })).toHaveAttribute('aria-busy', 'true');
  await expect(app).toContainText('No network request');
  await app.getByRole('button', { name: 'Finish demo loading' }).click();
  await expect(app.getByRole('button', { name: 'Disabled example' })).toBeDisabled();
});

test('product foundations expose responsive screen-linked journeys and shared live theme tokens', async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto('/bikecare.html');
  await expect(page.getByRole('navigation', { name: 'BikeCare product design foundations' }).getByRole('link')).toHaveCount(6);
  const controls = page.getByRole('group', { name: 'Choose a BikeCare user flow' });
  for (const name of ['Access & vehicle', 'Private documents', 'Service handovers', 'Reminders & resale', 'Parts purchase', 'Motorcycle rides', 'Complaints & recovery']) {
    await controls.getByRole('button', { name, exact: true }).click();
    const flow = page.getByRole('region', { name: `${name} user flow`, exact: true });
    const steps = flow.locator('.bikecare-flow-steps button');
    await expect(steps.first()).toHaveAttribute('aria-current', 'step');
    await expect(flow.getByRole('button', { name: 'Previous step', exact: true })).toBeDisabled();
    for (let index = 0; index < await steps.count(); index++) {
      await steps.nth(index).click();
      await expect(steps.nth(index)).toHaveAttribute('aria-current', 'step');
      const image = flow.locator('img');
      const label = await steps.nth(index).locator('strong').textContent();
      await expect(image).toHaveAttribute('src', bikecareScreens.find(screen => screen.label === label).src);
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(element => element.decode());
      await expect(flow.locator('figcaption a')).toHaveAttribute('href', await image.getAttribute('src'));
      await expect(steps.nth(index)).toHaveAttribute('aria-current', 'step');
    }
    await expect(flow.getByRole('button', { name: 'Next step', exact: true })).toBeDisabled();
    await flow.getByRole('button', { name: 'Previous step', exact: true }).click();
    await expect(flow.getByRole('button', { name: 'Next step', exact: true })).toBeEnabled();
  }
  const app = page.locator('[data-bikecare-app]');
  await workspace(app, 'Rider'); await more(app, 'Design system and theme');
  const board = page.locator('.bikecare-system-board');
  for (const theme of ['light', 'dark']) {
    await page.getByRole('button', { name: `Preview ${theme} theme`, exact: true }).click();
    await app.getByLabel('Product theme').selectOption(theme);
    const tokens = (element, names) => Object.fromEntries(names.map(name => [name, getComputedStyle(element).getPropertyValue(name).trim()]));
    const names = Object.keys(bikecareThemes[theme]);
    expect(await board.evaluate(tokens, names)).toEqual(bikecareThemes[theme]);
    expect(await app.evaluate(tokens, names)).toEqual(bikecareThemes[theme]);
  }
  for (const width of [320, 390, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const flow = page.locator('.bikecare-flow-map');
    expect(await flow.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
  }
});

test('Signal component examples explain recovery and deliver the matching theme document', async ({ page }) => {
  await page.goto('/bikecare.html#bikecare-design-documentation');
  const board = page.locator('.bikecare-system-board');
  const lab = board.locator('.bikecare-component-lab');
  const note = lab.getByLabel('Example workshop note');
  await lab.getByRole('button', { name: 'Check example field' }).click();
  await expect(note).toHaveAttribute('aria-invalid', 'true');
  await expect(lab.getByRole('alert')).toContainText('at least 10 characters');
  await note.fill('Fictional chain inspection requested.');
  await lab.getByRole('button', { name: 'Check example field' }).click();
  await expect(note).toHaveAttribute('aria-invalid', 'false');
  await expect(lab.getByRole('status')).toHaveText('Example field accepted. Nothing saved or sent.');
  await expect(lab.getByRole('button', { name: 'Unavailable example' })).toBeDisabled();
  await expect(lab.locator('.bikecare-status')).toHaveCount(4);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const action = lab.getByRole('button', { name: 'Check example field' });
  await action.focus(); await page.keyboard.down('Space');
  expect(await action.evaluate(element => getComputedStyle(element).transform)).toBe('none');
  await page.keyboard.up('Space');
  await page.getByRole('button', { name: 'Preview dark theme', exact: true }).click();
  await expect(lab.getByRole('status')).toBeVisible();
  const download = page.getByRole('link', { name: 'Download the design-system explanation (.md)', exact: true });
  await expect(download).toHaveAttribute('download', '');
  const response = await page.request.get(await download.getAttribute('href'));
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('text/markdown');
  const document = await response.text();
  expect(document).toContain('# BikeCare Signal');
  for (const theme of Object.values(bikecareThemes)) {
    for (const value of Object.values(theme)) expect(document).toContain(value);
  }
  expect(document).toContain('no real upload, secure storage, authentication or persistence');
  for (const width of [320, 390, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await board.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
  }
});

test('fictional documents support add, view, replace, expiry, cancel and deletion without leaking across bikes or roles', async ({ page }) => {
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await workspace(app, 'Rider');
  await more(app, 'Documents: licence, insurance and RC');
  const vault = app.getByRole('region', { name: 'Fictional rider document vault' });
  await expect(vault.locator('input[type="file"]')).toHaveCount(0);
  await vault.getByRole('button', { name: 'Add Insurance sample', exact: true }).click();
  await vault.getByRole('button', { name: 'Save fictional document' }).click();
  await expect(vault.getByRole('alert')).toContainText('Select a fictional sample');
  await vault.getByLabel('Use the fictional sample').check();
  await vault.getByLabel('Document expiry date (optional)').fill('2026-12-10');
  await vault.getByRole('button', { name: 'Save fictional document' }).click();
  await expect(vault).toContainText('DEMO-POLICY-001');
  await expect(vault).toContainText('Due within 30 days');
  await vault.getByRole('button', { name: 'Replace sample' }).click();
  await vault.getByRole('button', { name: 'Cancel document changes' }).click();
  await expect(vault).toContainText('Version 1');
  await vault.getByRole('button', { name: 'Replace sample' }).click();
  await vault.getByLabel('Use the fictional sample').check();
  await vault.getByLabel('Document expiry date (optional)').fill('');
  await vault.getByRole('button', { name: 'Confirm replacement' }).click();
  await expect(vault).toContainText('Version 2');
  await expect(vault).toContainText('Expiry not supplied');
  await vault.getByRole('button', { name: 'Delete sample' }).click();
  await vault.getByRole('button', { name: 'Keep document' }).click();
  await expect(vault).toContainText('Version 2');
  await vault.getByRole('button', { name: 'Back to document vault' }).click();
  await vault.getByRole('button', { name: 'Add Driving licence sample' }).click();
  await vault.getByLabel('Use the fictional sample').check();
  await vault.getByLabel('Document expiry date (optional)').fill('2026-11-25');
  await vault.getByRole('button', { name: 'Save fictional document' }).click();
  await selectBike(app, 'Yamaha FZ');
  await more(app, 'Documents: licence, insurance and RC');
  await expect(vault.getByRole('button', { name: 'View Driving licence', exact: true })).toBeVisible();
  await expect(vault.getByRole('button', { name: 'Add Insurance sample', exact: true })).toBeVisible();
  await selectBike(app, 'Honda Shine');
  await more(app, 'Documents: licence, insurance and RC');
  await vault.getByText('Expiry scenario controls', { exact: true }).click();
  await vault.getByRole('button', { name: 'Advance document demo 30 days' }).click();
  await expect(vault).toContainText('Expired date');
  await vault.getByRole('button', { name: 'View Insurance', exact: true }).click();
  await vault.getByRole('button', { name: 'Delete sample', exact: true }).click();
  await vault.getByRole('button', { name: 'Confirm document deletion' }).click();
  await expect(vault.getByRole('button', { name: 'Add Insurance sample', exact: true })).toBeVisible();
  await nav(app, 'History'); await expect(app).toContainText('Engine oil replaced');
  await workspace(app, 'Service advisor'); await nav(app, 'More');
  await expect(app.getByRole('button', { name: 'Documents: licence, insurance and RC' })).toHaveCount(0);
  await expect(app).not.toContainText('DEMO-LICENCE-001');
  await page.reload(); await workspace(app, 'Rider'); await more(app, 'Documents: licence, insurance and RC');
  await expect(vault.getByRole('button', { name: 'Add Driving licence sample', exact: true })).toBeVisible();
});

test('vehicle numbers save into the private profile and registration follows the job without exposing chassis', async ({ page }) => {
  await page.goto('/bikecare.html#bikecare-prototype');
  const app = page.locator('[data-bikecare-app]');
  await workspace(app, 'Rider'); await more(app, 'Vehicles and EV setup');
  await app.getByRole('button', { name: 'Add a two-wheeler' }).click();
  await app.getByRole('button', { name: 'Continue vehicle setup' }).click();
  await app.getByRole('button', { name: 'Continue vehicle setup' }).click();
  await app.getByLabel('Bike registration number (optional)').fill('demo-reg-991');
  await app.getByLabel('Chassis / VIN number (optional)').fill('demo-chassis-991');
  await app.getByRole('button', { name: 'Save demo vehicle' }).click();
  await more(app, 'Selected vehicle details');
  await app.getByText('Vehicle numbers / Private details', { exact: true }).click();
  await expect(app).toContainText('DEMO-REG-991');
  await expect(app).toContainText('DEMO-CHASSIS-991');
  await workspace(app, 'Service advisor'); await nav(app, 'Job card');
  await expect(app).toContainText('DEMO-REG-991');
  await expect(app).not.toContainText('DEMO-CHASSIS-991');
});
