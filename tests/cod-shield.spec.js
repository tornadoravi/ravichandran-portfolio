import { test, expect } from './fixtures.js';
import { readFileSync } from 'node:fs';
import { codFilmScenes, codFilmSections } from '../src/cod-film-story.js';
import { codScreens } from '../src/cod-shield-story.js';
import { codPlatforms } from '../src/cod-platforms.js';

test.use({ reducedMotion: 'reduce' });

async function openPrototype(page) {
  await page.goto('/cod-shield.html');
  await page.locator('.cod-live-demo > summary').click();
  await page.getByRole('region', { name: 'Recipient concept prototype' }).getByRole('button', { name: 'Open my case', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Request support', exact: true })).toBeEnabled();
  return page.getByRole('region', { name: 'Recipient concept prototype' });
}

test('Home links to an independent COD concept, with direct refresh and shared navigation', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
  const concept = page.getByRole('link', { name: 'Read COD Shield concept case study', exact: true });
  await expect(concept).toContainText('Not launched or user-tested.');
  await expect(concept.locator('.product-live-badge')).toHaveCount(0);
  await concept.click();
  await expect(page).toHaveURL(/\/cod-shield\.html$/);
  await expect(page.locator('main h1')).toHaveText('COD Shield');
  await expect(page).toHaveTitle('COD Shield Concept — Ravichandran V');
  await page.reload();
  await expect(page.locator('main h1')).toHaveText('COD Shield');
  await expect(page.locator('.case-player')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Walkthrough', exact: true })).toHaveCount(1);
  await expect(page.locator('#full-case-evidence')).not.toHaveAttribute('open');
  const chapters = page.getByRole('navigation', { name: 'Case study chapters' });
  await expect(chapters.getByRole('link')).toHaveCount(3);
  await chapters.getByRole('link', { name: 'Interface walkthrough' }).click();
  await expect(page).toHaveURL(/cod-shield\.html#case-screens$/);
  await expect(chapters.getByRole('link', { name: 'Interface walkthrough' })).toHaveAttribute('aria-current', 'location');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page.locator('.portrait-title')).toHaveText('I’m a product designer making complex products easier to use.');
  await page.goBack();
  await expect(page.locator('main h1')).toHaveText('COD Shield');
  expect(errors).toEqual([]);
});

test('recipient journey validates the home, separates verification, gates consent and resets locally', async ({ page }) => {
  const prototype = await openPrototype(page);
  const network = [];
  page.on('request', request => network.push({ method: request.method(), url: request.url() }));
  const address = prototype.getByLabel('Affected home and unit', { exact: true });
  for (const invalid of ['', '   ']) {
    await address.fill(invalid);
    await prototype.getByRole('button', { name: 'Request support', exact: true }).click();
    await expect(prototype.getByRole('alert')).toHaveText('Enter an example home and unit.');
    await expect(address).toBeFocused();
    await expect(address).toHaveAttribute('aria-invalid', 'true');
    await expect(prototype.getByRole('heading', { name: 'Orders I never placed' })).toBeVisible();
  }
  await address.fill('  Example court · Unit 9A  ');
  await expect(prototype.getByRole('alert')).toHaveCount(0);
  await address.press('Enter');
  await expect(prototype.getByRole('heading', { name: 'Orders I never placed' })).toBeVisible();
  await prototype.getByRole('button', { name: 'Request support', exact: true }).click();
  await expect(prototype.getByRole('button', { name: 'Continue to residence review', exact: true })).toBeDisabled();
  await prototype.getByRole('button', { name: 'Demo: preview contact check', exact: true }).click();
  await expect(prototype).toContainText('No code was sent and nobody was verified.');
  await prototype.getByRole('button', { name: 'Continue to residence review', exact: true }).click();
  await expect(prototype).toContainText('Protection not active yet');
  await expect(prototype.getByRole('heading', { name: 'We are reviewing your report' })).toBeFocused();
  await expect(prototype.getByRole('button', { name: 'Activate COD protection', exact: true })).toHaveCount(0);
  await prototype.getByRole('button', { name: 'Demo: simulate support approval', exact: true }).click();
  await expect(prototype).toContainText('Illustrative verification approved');
  const activate = prototype.getByRole('button', { name: 'Activate COD protection', exact: true });
  const consent = prototype.getByRole('checkbox');
  await expect(activate).toBeDisabled();
  await consent.check();
  await expect(activate).toBeEnabled();
  await consent.uncheck();
  await expect(activate).toBeDisabled();
  await prototype.getByLabel('Illustrative duration', { exact: true }).selectOption('3');
  await consent.check();
  await activate.click();
  await expect(prototype).toContainText('Protection not active yet');
  const mobileNav = prototype.getByRole('navigation', { name: 'Mobile concept navigation', exact: true });
  await mobileNav.getByRole('button', { name: 'Help', exact: true }).click();
  await expect(prototype.getByRole('heading', { name: 'Challenge a wrong restriction.', exact: true })).toBeFocused();
  await prototype.getByRole('button', { name: 'Back to my case', exact: true }).click();
  await expect(prototype).toContainText('Activation is awaiting acknowledgement.');
  await mobileNav.getByRole('button', { name: 'Home', exact: true }).click();
  await expect(prototype).toContainText('Demo activation awaiting acknowledgement');
  await prototype.getByRole('button', { name: 'Open my case', exact: true }).click();
  await prototype.getByRole('button', { name: 'Demo: preview acknowledgement failure', exact: true }).click();
  await expect(prototype.getByRole('alert')).toContainText('Protection is not active.');
  await prototype.getByRole('button', { name: 'Demo: acknowledge enforcement', exact: true }).click();
  await expect(prototype).toContainText('Example court · Unit 9A');
  await expect(prototype).toContainText('Example duration: 3 days');
  await expect(prototype).toContainText('Stopping an existing delivery is not guaranteed.');
  await expect(prototype).toContainText('No actual protection has been activated.');
  await prototype.getByRole('button', { name: 'End demo protection', exact: true }).click();
  await expect(prototype).toContainText('Do not promise normal COD has resumed');
  await prototype.getByRole('button', { name: 'Demo: acknowledge verified removal', exact: true }).click();
  await expect(prototype.getByRole('heading', { name: 'Normal COD can resume.' })).toBeFocused();
  await prototype.getByRole('button', { name: 'Restart the demo', exact: true }).click();
  await prototype.getByRole('button', { name: 'Open my case', exact: true }).click();
  await expect(address).toHaveValue('Example home · Unit 4B');
  await expect(prototype.getByLabel('Order ID (optional)', { exact: true })).toHaveValue('');
  await prototype.getByRole('button', { name: 'Request support', exact: true }).click();
  await prototype.getByRole('button', { name: 'Demo: preview contact check', exact: true }).click();
  await prototype.getByRole('button', { name: 'Continue to residence review', exact: true }).click();
  await prototype.getByRole('button', { name: 'Demo: simulate support approval', exact: true }).click();
  await expect(prototype.getByLabel('Illustrative duration', { exact: true })).toHaveValue('7');
  await expect(prototype.getByRole('checkbox')).not.toBeChecked();
  await expect(prototype.getByRole('button', { name: 'Activate COD protection', exact: true })).toBeDisabled();
  expect(network.filter(request => {
    const url = new URL(request.url);
    return request.method !== 'GET' || url.origin !== new URL(page.url()).origin || url.search ||
      !codScreens.some(screen => screen.src === url.pathname);
  })).toEqual([]);
});

test('multi-buyer coverage is explicit without claiming a verified incident count or real protection', async ({ page }) => {
  await page.goto('/cod-shield.html');
  const summary = page.getByText('100+ orders, different buyers: covered?', { exact: true });
  await summary.click();
  const explanation = summary.locator('..');
  await expect(explanation).toContainText('not a verified count for Veeramani');
  await expect(explanation).toContainText('regardless of the buyer account or phone number');
  await expect(explanation).toContainText('3- or 7-day restriction');
  await expect(explanation).toContainText('Already-dispatched parcels need interception, which is not guaranteed.');
  const businessCase = page.getByRole('group', { name: 'COD Shield business case', exact: true });
  await expect(businessCase).toContainText('Fewer household interruptions, wasted deliveries and repeat support requests.');
  await expect(businessCase).toContainText('Proposed benefits, not measured results.');
});

for (const days of ['3', '7']) {
  test(`${days}-day demo expiry is separate from early removal and requires individual confirmations`, async ({ page }) => {
    await page.setViewportSize(days === '3' ? { width: 390, height: 844 } : { width: 1280, height: 720 });
    if (days === '3') await page.addInitScript(() => localStorage.setItem('portfolio-appearance', 'dark'));
    const prototype = await openPrototype(page);
    await prototype.getByRole('button', { name: 'Request support', exact: true }).click();
    await prototype.getByRole('button', { name: 'Demo: preview contact check', exact: true }).click();
    await prototype.getByRole('button', { name: 'Continue to residence review', exact: true }).click();
    await prototype.getByRole('button', { name: 'Demo: simulate support approval', exact: true }).click();
    await prototype.getByLabel('Illustrative duration', { exact: true }).selectOption(days);
    await prototype.getByRole('checkbox').check();
    await prototype.getByRole('button', { name: 'Activate COD protection', exact: true }).click();
    await prototype.getByRole('button', { name: 'Demo: acknowledge enforcement', exact: true }).click();
    await expect(prototype).toContainText('regardless of the buyer account or phone number');
    await prototype.getByRole('button', { name: `Demo: advance ${days} days to expiry`, exact: true }).click();
    await expect(prototype).toContainText(`The example clock advanced ${days} days.`);
    await expect(prototype).toContainText('no new household approval is required');
    const amazon = prototype.locator('[data-platform="amazon"]');
    await expect(prototype.locator('[data-platform]')).toHaveCount(1);
    await amazon.getByRole('button', { name: 'Demo: fail Amazon expiry', exact: true }).click();
    await expect(prototype.getByRole('alert')).toContainText('expiry confirmation failed');
    await expect(prototype).toContainText('Expiry is awaiting confirmation in this app.');
    await prototype.getByRole('navigation', { name: 'Mobile concept navigation', exact: true }).getByRole('button', { name: 'Status', exact: true }).click();
    await expect(prototype).toContainText('This app has not confirmed the change yet.');
    await expect(amazon).toContainText('Demo expiry confirmation failed');
    await amazon.getByRole('button', { name: 'Demo: retry Amazon expiry', exact: true }).click();
    await expect(amazon).toHaveAttribute('data-sync-status', 'removal-pending');
    await prototype.getByRole('button', { name: 'Back to my case', exact: true }).click();
    await expect(prototype.getByRole('heading', { name: 'Normal COD can resume.', exact: true })).toHaveCount(0);
    await prototype.getByRole('button', { name: 'Demo: acknowledge Amazon expiry', exact: true }).click();
    await expect(prototype.getByRole('heading', { name: 'Normal COD can resume.', exact: true })).toBeVisible();
    await expect(prototype).toContainText('The temporary restriction is not renewed automatically.');
    await expect(prototype.locator('[data-sync-status="removed"]')).toHaveCount(1);
    await prototype.getByRole('button', { name: 'Restart the demo', exact: true }).click();
    await prototype.getByRole('button', { name: 'Open my case', exact: true }).click();
    await expect(prototype.getByRole('button', { name: /advance .* days to expiry/ })).toHaveCount(0);
  });
}

test('sample screens are clearly demo bypasses and refresh discards example data', async ({ page }) => {
  const prototype = await openPrototype(page);
  await expect(page.locator('.cod-demo-intro')).toContainText('bypassing the demo journey');
  const previews = page.getByRole('group', { name: 'Preview recipient states' });
  await previews.getByRole('button', { name: '4. Active example', exact: true }).click();
  await expect(prototype).toContainText('COD protection active · Demo');
  await previews.getByRole('button', { name: '3. Verified', exact: true }).click();
  await expect(prototype.getByRole('checkbox')).not.toBeChecked();
  await previews.getByRole('button', { name: '2. Review pending', exact: true }).click();
  await expect(prototype).toContainText('Protection not active yet');
  await previews.getByRole('button', { name: '1. Report', exact: true }).click();
  await prototype.getByLabel('Affected home and unit', { exact: true }).fill('Example flat · Unit 8');
  await prototype.getByLabel('Order ID (optional)', { exact: true }).fill('DEMO-ONLY-42');
  await page.reload();
  await page.locator('.cod-live-demo > summary').click();
  await prototype.getByRole('button', { name: 'Open my case', exact: true }).click();
  await expect(prototype.getByLabel('Affected home and unit', { exact: true })).toHaveValue('Example home · Unit 4B');
  await expect(prototype.getByLabel('Order ID (optional)', { exact: true })).toHaveValue('');
});

test('the Amazon example gates its own confirmation and removal without competitor restrictions', async ({ page }) => {
  const prototype = await openPrototype(page);
  const requests = [];
  page.on('request', request => requests.push({ method: request.method(), url: request.url() }));
  const nav = prototype.getByRole('navigation', { name: 'Mobile concept navigation', exact: true });
  const row = prototype.locator('[data-platform="amazon"]');
  await nav.getByRole('button', { name: 'Status', exact: true }).click();
  await expect(prototype.locator('[data-platform]')).toHaveCount(1);
  await expect(row).toHaveAttribute('data-sync-status', 'unconnected');
  await expect(prototype).toContainText('No partnership, login, API, order access or delivery sync exists.');
  await page.getByRole('group', { name: 'Preview recipient states' }).getByRole('button', { name: '3. Verified', exact: true }).click();
  await prototype.getByRole('checkbox').check();
  await prototype.getByRole('button', { name: 'Activate COD protection', exact: true }).click();
  await expect(row).toHaveAttribute('data-sync-status', 'pending');
  await row.getByRole('button', { name: 'Demo: fail Amazon', exact: true }).click();
  await expect(prototype).toContainText('Waiting for Amazon to confirm.');
  await expect(prototype.getByRole('alert')).toContainText('Protection is not active.');
  await nav.getByRole('button', { name: 'Home', exact: true }).click();
  await nav.getByRole('button', { name: 'Status', exact: true }).click();
  await expect(row).toHaveAttribute('data-sync-status', 'failed');
  await row.getByRole('button', { name: 'Demo: retry Amazon', exact: true }).click();
  await expect(row).toHaveAttribute('data-sync-status', 'pending');
  await expect(prototype.getByRole('heading', { name: 'Your home. Fewer interruptions.', exact: true })).toHaveCount(0);
  await row.getByRole('button', { name: 'Demo: acknowledge Amazon', exact: true }).click();
  await expect(prototype.getByRole('heading', { name: 'Your home. Fewer interruptions.', exact: true })).toBeFocused();
  await expect(prototype.locator('[data-sync-status="confirmed"]')).toHaveCount(1);
  await prototype.getByRole('button', { name: 'End demo protection', exact: true }).click();
  await row.getByRole('button', { name: 'Demo: fail Amazon removal', exact: true }).click();
  await expect(prototype.getByRole('alert')).toContainText('Normal COD resumption is not confirmed in this app.');
  await expect(prototype).toContainText('Removal is awaiting confirmation in this app.');
  await row.getByRole('button', { name: 'Demo: retry Amazon removal', exact: true }).click();
  await row.getByRole('button', { name: 'Demo: acknowledge Amazon removal', exact: true }).click();
  await expect(prototype.getByRole('heading', { name: 'Normal COD can resume.', exact: true })).toBeFocused();
  await expect(prototype.locator('[data-sync-status="removed"]')).toHaveCount(1);
  await prototype.getByRole('button', { name: 'Restart the demo', exact: true }).click();
  await nav.getByRole('button', { name: 'Status', exact: true }).click();
  await expect(prototype.locator('[data-sync-status="unconnected"]')).toHaveCount(1);
  expect(requests.filter(request => request.method !== 'GET' || new URL(request.url).origin !== new URL(page.url()).origin)).toEqual([]);
});

test('separate app placements gate consent and open the selected app’s working flow', async ({ page }) => {
  await page.goto('/cod-shield.html#partner-placement');
  const experience = page.locator('.cod-partner-experience');
  const frame = experience.locator('.cod-partner-phone');
  await expect(page.locator('.cod-partner-placement')).toHaveAttribute('open');
  await expect(experience).toContainText('App-inspired colours and layouts, not exact current app screens or approved features.');
  const requests = [];
  page.on('request', request => requests.push({ method: request.method(), url: request.url() }));
  const storage = await page.evaluate(() => ({ local: { ...localStorage }, session: { ...sessionStorage } }));
  const colours = [];
  for (const partner of codPlatforms) {
    await experience.getByRole('group', { name: 'Choose a proposed partner app' }).getByRole('button', { name: partner.name, exact: true }).click();
    await expect(experience.locator('.cod-partner-rationale h3')).toHaveText(partner.placement);
    await expect(frame).toHaveAttribute('aria-label', `${partner.name} COD Shield placement concept`);
    colours.push(await frame.locator('.cod-partner-header').evaluate(element => getComputedStyle(element).backgroundColor));
    await expect(frame.locator('[data-integration-stage="entry"]')).toBeVisible();
    await frame.getByRole('button', { name: 'Report without an order', exact: true }).click();
    await expect(frame.getByLabel('Order ID (optional)')).toHaveValue('');
    await expect(frame.getByLabel('Affected home and unit')).toHaveAttribute('readonly', '');
    await frame.getByRole('button', { name: 'Continue to household review', exact: true }).click();
    await expect(frame).toContainText('No protection is active');
    await frame.getByRole('button', { name: 'Demo: preview approved review', exact: true }).click();
    const request = frame.getByRole('button', { name: 'Request temporary protection', exact: true });
    await expect(request).toBeDisabled();
    await frame.getByRole('checkbox').check();
    await expect(request).toBeEnabled();
    await experience.getByRole('group', { name: 'Preview integration stages' }).getByRole('button', { name: '04 / Choose the scope', exact: true }).click();
    await expect(frame.getByRole('checkbox')).not.toBeChecked();
    await frame.getByRole('checkbox').check();
    await request.click();
    await expect(frame.locator('[data-platform]')).toHaveCount(1);
    await expect(frame.locator(`[data-platform="${partner.id}"]`)).toHaveAttribute('data-sync-status', 'pending');
    await expect(frame).toContainText('Waiting for this app to confirm. No actual protection or connection.');
    await frame.getByRole('button', { name: 'Restart this placement preview', exact: true }).click();
  }
  expect(new Set(colours).size).toBe(4);
  await experience.getByRole('group', { name: 'Preview integration stages' }).getByRole('button', { name: '04 / Choose the scope', exact: true }).click();
  await frame.getByRole('checkbox').check();
  await experience.getByRole('group', { name: 'Choose a proposed partner app' }).getByRole('button', { name: 'Amazon', exact: true }).click();
  await experience.getByRole('group', { name: 'Preview integration stages' }).getByRole('button', { name: '04 / Choose the scope', exact: true }).click();
  await expect(frame.getByRole('checkbox')).not.toBeChecked();
  await frame.getByRole('checkbox').check();
  await frame.getByRole('button', { name: 'Request temporary protection', exact: true }).click();
  await frame.getByRole('button', { name: 'Try this app’s working flow', exact: true }).click();
  await expect(experience.getByRole('region', { name: 'Amazon working COD Shield prototype', exact: true })).toBeVisible();
  expect(await page.evaluate(() => ({ local: { ...localStorage }, session: { ...sessionStorage } }))).toEqual(storage);
  expect(requests.filter(request => request.method !== 'GET' || new URL(request.url).origin !== new URL(page.url()).origin)).toEqual([]);
});

test('embedded app text stays readable in dark mode and narrow navigation labels remain whole', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('portfolio-appearance', 'dark'));
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto('/cod-shield.html#partner-placement');
  const experience = page.locator('.cod-partner-experience').first();
  await experience.getByRole('group', { name: 'Choose a proposed partner app' }).getByRole('button', { name: 'Blinkit', exact: true }).click();
  await experience.getByRole('button', { name: 'Try working flow', exact: true }).click();
  await experience.getByRole('button', { name: 'Report without an order', exact: true }).click();
  const prototype = experience.getByRole('region', { name: 'Blinkit working COD Shield prototype', exact: true });
  const checkContrast = async () => {
    const contrasts = await prototype.locator('.cod-phone-body').evaluate(body => {
      const rgb = color => color.match(/[\d.]+/g).map(Number);
      const luminance = color => rgb(color).slice(0, 3).map(value => value / 255)
        .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4)
        .reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
      return [...body.querySelectorAll('h3, label, .cod-notice, .cod-address-card strong, .cod-consent span')].map(element => {
        let background = element;
        while (rgb(getComputedStyle(background).backgroundColor)[3] === 0) background = background.parentElement;
        const values = [luminance(getComputedStyle(element).color), luminance(getComputedStyle(background).backgroundColor)].sort((a, b) => a - b);
        return (values[1] + .05) / (values[0] + .05);
      });
    });
    for (const contrast of contrasts) expect(contrast).toBeGreaterThanOrEqual(4.5);
  };
  await checkContrast();
  expect(await prototype.locator('.cod-phone-nav button').evaluateAll(buttons => buttons.every(button => {
    const range = document.createRange();
    range.selectNodeContents(button);
    const text = range.getBoundingClientRect();
    const box = button.getBoundingClientRect();
    return range.getClientRects().length === 1 && text.left >= box.left && text.right <= box.right;
  }))).toBe(true);
  await prototype.getByRole('button', { name: 'Request support', exact: true }).click();
  await prototype.getByRole('button', { name: 'Demo: preview contact check', exact: true }).click();
  await prototype.getByRole('button', { name: 'Continue to residence review', exact: true }).click();
  await prototype.getByRole('button', { name: 'Demo: simulate support approval', exact: true }).click();
  await checkContrast();
});

test('each app gates its own confirmation, retries failure, supports removal and resets on app changes', async ({ page }) => {
  await page.goto('/cod-shield.html#partner-placement');
  const experience = page.locator('.cod-partner-experience').first();
  const requests = [];
  page.on('request', request => requests.push({ method: request.method(), url: request.url() }));
  for (const [index, partner] of codPlatforms.entries()) {
    const width = [320, 390, 768, 1440][index];
    await page.setViewportSize({ width, height: 844 });
    await experience.getByRole('group', { name: 'Choose a proposed partner app' }).getByRole('button', { name: partner.name, exact: true }).click();
    await experience.getByRole('button', { name: 'Try working flow', exact: true }).click();
    await expect(experience.getByRole('group', { name: 'Preview integration stages' })).toHaveCount(0);
    await experience.getByRole('button', { name: 'Report without an order', exact: true }).click();
    const prototype = experience.getByRole('region', { name: `${partner.name} working COD Shield prototype`, exact: true });
    await prototype.getByRole('button', { name: 'Status', exact: true }).click();
    await expect(experience.locator('.cod-partner-flow li[aria-current="step"]')).toContainText('Report once');
    await prototype.getByRole('button', { name: 'My case', exact: true }).click();
    const address = prototype.getByLabel('Affected home and unit', { exact: true });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    expect(await prototype.evaluate(element => {
      const frame = element.getBoundingClientRect();
      return [...element.querySelectorAll('input, select, button')].every(control => {
        const box = control.getBoundingClientRect();
        return box.left >= frame.left && box.right <= frame.right &&
          (control.matches('input[type="checkbox"]') || box.height >= 44);
      });
    })).toBe(true);
    await address.fill(' ');
    await prototype.getByRole('button', { name: 'Request support', exact: true }).click();
    await expect(address).toBeFocused();
    await expect(prototype.getByRole('alert')).toContainText('Enter an example home and unit.');
    await address.fill('Example court / Unit 8');
    await prototype.getByRole('button', { name: 'Request support', exact: true }).click();
    await expect(prototype.getByRole('button', { name: 'Continue to residence review', exact: true })).toBeDisabled();
    await prototype.getByRole('button', { name: 'Demo: preview contact check', exact: true }).click();
    await prototype.getByRole('button', { name: 'Continue to residence review', exact: true }).click();
    await prototype.getByRole('button', { name: 'Demo: simulate support approval', exact: true }).click();
    const activate = prototype.getByRole('button', { name: 'Activate COD protection', exact: true });
    await expect(activate).toBeDisabled();
    await prototype.getByRole('checkbox').check();
    await activate.click();
    await expect(prototype.locator('[data-platform]')).toHaveCount(1);
    const ownStatus = prototype.locator(`[data-platform="${partner.id}"]`);
    await ownStatus.getByRole('button', { name: `Demo: fail ${partner.name}`, exact: true }).click();
    await expect(ownStatus).toHaveAttribute('data-sync-status', 'failed');
    await expect(prototype).toContainText(`Waiting for ${partner.name} to confirm.`);
    await ownStatus.getByRole('button', { name: `Demo: retry ${partner.name}`, exact: true }).click();
    await expect(ownStatus).toHaveAttribute('data-sync-status', 'pending');
    await ownStatus.getByRole('button', { name: `Demo: acknowledge ${partner.name}`, exact: true }).click();
    await prototype.getByRole('button', { name: 'End demo protection', exact: true }).click();
    await expect(prototype).toContainText('Removal is awaiting confirmation in this app.');
    await prototype.getByRole('button', { name: 'Demo: acknowledge verified removal', exact: true }).click();
    await expect(prototype).toContainText('Normal COD can resume.');
  }
  await experience.getByRole('group', { name: 'Choose a proposed partner app' }).getByRole('button', { name: 'Amazon', exact: true }).click();
  await experience.getByRole('button', { name: 'Report without an order', exact: true }).click();
  await expect(experience.getByLabel('Affected home and unit', { exact: true })).toHaveValue('Example home · Unit 4B');
  await experience.getByRole('button', { name: 'Explore screens', exact: true }).click();
  await experience.getByRole('button', { name: 'Try working flow', exact: true }).click();
  await expect(experience.getByRole('region', { name: 'Amazon working COD Shield prototype', exact: true })).toHaveCount(0);
  await expect(experience.getByRole('button', { name: 'Report without an order', exact: true })).toBeEnabled();
  expect(requests.filter(request => request.method !== 'GET' || new URL(request.url).origin !== new URL(page.url()).origin)).toEqual([]);
});

for (const appearance of ['light', 'dark']) {
  test(`all app placements and stages fit narrow screens in ${appearance}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
    await page.goto('/cod-shield.html#partner-placement');
    const experience = page.locator('.cod-partner-experience');
    for (const partner of codPlatforms) {
      await experience.getByRole('group', { name: 'Choose a proposed partner app' }).getByRole('button', { name: partner.name, exact: true }).click();
      for (let stage = 0; stage < 5; stage++) {
        await experience.getByRole('group', { name: 'Preview integration stages' }).getByRole('button').nth(stage).click();
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
        expect(await experience.locator('.cod-partner-phone').evaluate(element => {
          const bounds = element.getBoundingClientRect();
          return [...element.querySelectorAll('button, input, a')].every(control => {
            const box = control.getBoundingClientRect();
            return box.left >= bounds.left && box.right <= bounds.right &&
              (control.matches('input[type="checkbox"]') || box.height >= 44);
          });
        })).toBe(true);
        expect(await experience.locator('input[type="text"]').evaluateAll(controls => controls.every(control => parseFloat(getComputedStyle(control).fontSize) >= 16))).toBe(true);
      }
    }
  });
}

for (const appearance of ['light', 'dark']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`COD case and all prototype screens fit ${appearance} at ${width}px`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('portfolio-appearance', value), appearance);
      const prototype = await openPrototype(page);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('.cod-scope-note').first()).toContainText('Not launched or user-tested.');
      await expect(page.locator('.case-chapter')).toHaveCount(6);
      await expect(page.locator('#full-case-evidence')).not.toHaveAttribute('open');
      expect(await page.locator('main').evaluate(element => element.innerText.trim().split(/\s+/).length)).toBeLessThanOrEqual(1000);
      if (width === 1440) {
        const hero = await page.locator('.case-hero').boundingBox();
        const illustration = await page.locator('.case-presentation-hero').boundingBox();
        expect(hero.x + hero.width).toBeLessThanOrEqual(illustration.x);
      }
      for (const label of ['Home', '1. Report', 'Contact & unit', '2. Review pending', '3. Verified', 'Platform status', 'Activation pending', 'Removal pending', '5. Ended', 'Support & appeal', '4. Active example']) {
        await page.getByRole('group', { name: 'Preview recipient states' }).getByRole('button', { name: label, exact: true }).click();
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
        expect(await prototype.evaluate(element => {
          const parent = element.getBoundingClientRect();
          return [...element.querySelectorAll('input, select, button')].every(control => {
            const box = control.getBoundingClientRect();
            return box.left >= parent.left && box.right <= parent.right &&
              (control.matches('input[type="checkbox"]') || box.height >= 44);
          });
        })).toBe(true);
        expect(await prototype.locator('input[type="text"], select').evaluateAll(controls =>
          controls.every(control => parseFloat(getComputedStyle(control).fontSize) >= 16))).toBe(true);
      }
      await prototype.getByRole('button', { name: 'End demo protection', exact: true }).click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      await page.locator('#full-case-evidence > summary').click();
      await page.locator('#safeguards summary').nth(2).click();
      await expect(page.locator('#safeguards details').nth(2)).toContainText('wrong-address appeal');
      await page.locator('.cod-operations summary').click();
      await expect(page.locator('.cod-operations details p')).toBeVisible();
      await expect(page.locator('#measures')).toContainText('not results from a launch');
      await page.goto('/');
      const cover = page.locator('#project-cod-shield .cover-poster-content');
      expect(await cover.evaluate(element => {
        const copy = element.querySelector('.cover-poster-copy').getBoundingClientRect();
        const art = element.querySelector('.cover-screen').getBoundingClientRect();
        return copy.right <= art.left || copy.bottom <= art.top || art.right <= copy.left || art.bottom <= copy.top;
      })).toBe(true);
      expect(errors).toEqual([]);
    });
  }
}

test('the concept and safeguards remain readable without JavaScript and cannot submit data', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  try {
    await page.goto('/cod-shield.html');
    await expect(page.locator('main h1')).toHaveText('COD Shield');
    await expect(page.locator('#main')).toContainText('Not launched or user-tested.');
    await expect(page.locator('.case-demo-panel').first()).toBeVisible();
    await page.locator('.cod-live-demo > summary').click();
    await expect(page.getByRole('region', { name: 'Recipient concept prototype' }).getByRole('button', { name: 'Open my case', exact: true })).toBeDisabled();
    await expect(page.locator('.cod-recipient-demo form')).toHaveCount(0);
    await page.locator('.cod-sample-states summary').click();
    await expect(page.locator('.cod-sample-states li')).toHaveCount(11);
    await expect(page.locator('.cod-sample-states li').last()).toBeVisible();
    await page.locator('.cod-partner-placement > summary').click();
    await page.locator('.cod-partner-placement-list > summary').click();
    await expect(page.locator('.cod-partner-placement-list li')).toHaveCount(4);
    for (const partner of codPlatforms) await expect(page.locator('.cod-partner-placement-list')).toContainText(partner.placement);
    await expect(page.locator('.cod-partner-experience button:enabled')).toHaveCount(0);
    await page.locator('#full-case-evidence > summary').click();
    await page.locator('#coverage summary').click();
    await expect(page.locator('#coverage a')).toHaveCount(6);
    await page.locator('#safeguards summary').nth(3).click();
    await expect(page.locator('#safeguards details').nth(3).locator('p')).toBeVisible();
    await page.locator('.cod-operations summary').click();
    await expect(page.locator('.cod-operations details p')).toBeVisible();
    expect(await page.locator('#reflection').innerText()).toContain('No interviews or usability studies are claimed.');
    await page.goto('/');
    await page.getByRole('link', { name: 'Read COD Shield concept case study', exact: true }).click();
    await expect(page.locator('main h1')).toHaveText('COD Shield');
  } finally {
    await context.close();
  }
});

test('legacy prototype and safeguard bookmarks still open the intended content', async ({ page }) => {
  await page.goto('/cod-shield.html#prototype');
  await page.getByRole('region', { name: 'Recipient concept prototype' }).getByRole('button', { name: 'Open my case', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Request support', exact: true })).toBeEnabled();
  await expect(page.locator('#full-case-evidence')).not.toHaveAttribute('open');
  await page.goto('/cod-shield.html#safeguards');
  await expect(page.locator('#full-case-evidence')).toHaveAttribute('open');
  await expect(page.locator('#safeguards h2')).toBeVisible();
});

test('concept screen gallery uses the shared keyboard tabs and original-image links', async ({ page }) => {
  await page.goto('/cod-shield.html');
  await expect(page.locator('.header-brand [data-companion]')).toBeEnabled();
  await expect(page.locator('.cod-live-demo')).not.toHaveAttribute('open');
  const tabs = page.getByRole('tablist', { name: 'Original design screens' }).getByRole('tab');
  await expect(tabs).toHaveCount(11);
  await tabs.first().focus();
  for (const [index, { id }] of codScreens.entries()) {
    if (index) await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(index)).toBeFocused();
    await expect(tabs.nth(index)).toHaveAttribute('aria-selected', 'true');
    const panel = page.getByRole('tabpanel');
    await expect(panel).toHaveCount(1);
    await panel.locator('img').evaluate(image => image.decode());
    await expect(panel.locator('img')).toHaveAttribute('src', `/assets/cod-shield-${id}.svg`);
    expect(await panel.locator('img').evaluate(image => [image.naturalWidth, image.naturalHeight])).toEqual([390, 844]);
    expect(await panel.locator('img').evaluate(image => {
      const box = image.getBoundingClientRect();
      const frame = image.parentElement.getBoundingClientRect();
      return Math.abs(box.width / box.height - image.naturalWidth / image.naturalHeight) < .002 &&
        box.left >= frame.left && box.top >= frame.top && box.right <= frame.right && box.bottom <= frame.bottom &&
        getComputedStyle(image).objectFit === 'contain';
    })).toBe(true);
    await expect(panel.locator('a')).toHaveAttribute('href', `/assets/cod-shield-${id}.svg`);
    await expect(panel).toContainText('Not a shipped product, real verification, or activated protection.');
  }
  await page.keyboard.press('Home');
  await expect(tabs.first()).toBeFocused();
  await page.keyboard.press('End');
  await expect(tabs.last()).toBeFocused();
});

for (const width of [390, 1440]) {
  test(`cover and walkthrough frame styles match Chart Wizard's pattern at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const style = async selector => page.locator(selector).first().evaluate(element => {
      const css = getComputedStyle(element);
      return Object.fromEntries(['padding', 'gap', 'borderRadius', 'borderWidth', 'backgroundColor', 'fontFamily', 'fontSize'].map(key => [key, css[key]]));
    });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    for (const selector of ['.cover-poster-content', '.cover-headline', '.cover-screen']) {
      expect(await style(`.product-cover-art--codShield ${selector}`)).toEqual(await style(`.product-cover-art--analytics ${selector}`));
    }
    const selectors = ['.case-hero-preview', '.case-demo-image', '.case-demo-tabs', '.case-demo-panel', '.case-watch-entry', '.case-play-button'];
    await page.goto('/analytics.html');
    await expect(page.locator('.case-watch-entry')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const reference = await Promise.all(selectors.map(style));
    await page.goto('/cod-shield.html');
    await expect(page.locator('.case-watch-entry')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    expect(await Promise.all(selectors.map(style))).toEqual(reference);
  });
}

test('COD cinematic walkthrough plays the ten local recordings and keeps incident and concept boundaries explicit', async ({ page }) => {
  const recorded = JSON.parse(readFileSync(new URL('../src/cod-film-audio.json', import.meta.url), 'utf8'));
  const scripts = codFilmScenes.map(scene => scene.narration);
  expect(recorded.scenes.map(clip => clip.text)).toEqual(scripts);
  await page.addInitScript(clips => {
    window.__codNarration = [];
    HTMLMediaElement.prototype.play = function () {
      const clip = clips.find(item => this.src.includes(item.file.replace('.m4a', '')));
      if (!clip) return Promise.reject(new Error('Unexpected COD narration source.'));
      window.__codNarration.push(clip.text);
      queueMicrotask(() => this.dispatchEvent(new Event('playing')));
      return Promise.resolve();
    };
    HTMLMediaElement.prototype.pause = function () {};
  }, recorded.scenes);
  const errors = [];
  const liveRequests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('request', request => { if (request.url().includes(':4176/')) liveRequests.push(request.url()); });
  await page.goto('/cod-shield.html');
  expect(await page.evaluate(() => window.__codNarration)).toEqual([]);
  const trigger = page.locator('.case-watch-entry .case-play-button');
  await trigger.click();
  const player = page.locator('.case-player');
  await expect(player.getByRole('button', { name: 'Voice on', exact: true })).toBeEnabled();
  for (const [index, scene] of codFilmScenes.entries()) {
    const sectionIndex = codFilmSections.findIndex(section => index >= section.start && index <= section.end);
    const section = codFilmSections[sectionIndex];
    await player.getByRole('button', { name: `Go to section ${sectionIndex + 1}: ${section.label}`, exact: true }).click();
    if (section.label === 'Solution') await player.getByRole('group', { name: 'Solution steps', exact: true }).getByRole('button').nth(index - section.start).click();
    await player.getByRole('button', { name: 'Read this scene', exact: true }).click();
    await expect.poll(() => page.evaluate(() => window.__codNarration.at(-1))).toBe(scripts[index]);
    await expect(player.locator('.cod-film-stage')).toBeVisible();
    await expect(player.locator('.cod-film-captions')).toContainText(scripts[index]);
    if (scene.id === 'coverage') await expect(player).toContainText('Source digest / original summary');
    if (scene.id === 'scope') {
      await expect(player).toContainText('Households: fewer interruptions');
      await expect(player).toContainText('Delivery teams: fewer wasted trips');
      await expect(player).toContainText('Platforms: less repeat support work');
      await expect(player).toContainText('Proposed benefits, not measured results.');
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(1280);
  }
  await player.getByRole('button', { name: 'Finish', exact: true }).click();
  await expect(player).toHaveCount(0);
  await expect(trigger).toBeFocused();
  expect(errors).toEqual([]);
  expect(liveRequests).toEqual([]);
});
