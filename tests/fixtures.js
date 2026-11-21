import { expect } from '@playwright/test';

export { test, expect } from '@playwright/test';

export async function openListeningControls(page) {
  const trigger = page.getByRole('button', { name: 'Sound settings', exact: true });
  if (await trigger.getAttribute('aria-expanded') !== 'true') await trigger.click();
  await expect(page.getByRole('region', { name: 'Sound settings', exact: true })).toBeVisible();
}

export async function openWorkspaceNavigation(page) {
  await expect(page.locator('#main')).not.toHaveAttribute('aria-busy', 'true');
  const navigation = page.locator('.workspace-navigation');
  await expect(navigation).toHaveCount(1);
  await expect(navigation.locator('.workspace-feature-tabs')).toBeVisible();
}

export async function openCaseDetails(page) {
  const fullEvidence = page.locator('#full-case-evidence');
  if (await fullEvidence.count() && await fullEvidence.getAttribute('open') === null) {
    await fullEvidence.locator(':scope > summary').click();
  }
  if (await page.locator('#case-details').getAttribute('open') === null) {
    await page.locator('#case-details > summary').click();
  }
}
