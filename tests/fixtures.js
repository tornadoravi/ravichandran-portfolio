import { expect } from '@playwright/test';

export { test, expect } from '@playwright/test';

export async function openLinkDetails(link) {
  await expect(link).toBeAttached();
  for (const disclosure of await link.locator('xpath=ancestor::details').all()) {
    if (await disclosure.getAttribute('open') === null) await disclosure.locator(':scope > summary').click();
  }
}

export async function followLink(page, href) {
  const link = page.locator(`a[href="${href}"]`).first();
  await openLinkDetails(link);
  await link.click();
}

export async function openProductDetails(page) {
  await expect(page.locator('#main')).not.toHaveAttribute('aria-busy', 'true');
  await expect(page.locator('body')).toHaveAttribute('data-page', /^(powertable|analytics-plus)$/);
  await expect(page.locator('#full-case-evidence')).toHaveCount(1);
  for (const id of ['full-case-evidence', 'study-details']) {
    const disclosure = page.locator(`#${id}`);
    if (await disclosure.count() && await disclosure.getAttribute('open') === null) {
      await disclosure.locator(':scope > summary').click();
    }
  }
}

export async function openListeningControls(page) {
  const trigger = page.getByRole('button', { name: 'Sound settings', exact: true });
  if (await trigger.getAttribute('aria-expanded') !== 'true') await trigger.click();
  await expect(page.getByRole('region', { name: 'Sound settings', exact: true })).toBeVisible();
}

export async function openWorkspaceNavigation(page) {
  await expect(page.locator('#main')).not.toHaveAttribute('aria-busy', 'true');
  const navigation = page.locator('.workspace-navigation');
  await expect(navigation).toHaveCount(1);
  if (await navigation.getAttribute('open') === null) await navigation.locator(':scope > summary').click();
  await expect(navigation.locator('.workspace-feature-tabs')).toBeVisible();
}

export async function openCaseDetails(page) {
  await expect(page.locator('#main')).not.toHaveAttribute('aria-busy', 'true');
  const fullEvidence = page.locator('#full-case-evidence');
  if (await fullEvidence.count() && await fullEvidence.getAttribute('open') === null) {
    await fullEvidence.locator(':scope > summary').click();
  }
  if (await page.locator('#case-details').count() && await page.locator('#case-details').getAttribute('open') === null) {
    await page.locator('#case-details > summary').click();
  }
}
