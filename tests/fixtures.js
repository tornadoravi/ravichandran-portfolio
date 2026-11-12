import { expect } from '@playwright/test';

export { test, expect } from '@playwright/test';

export async function openWorkspaceNavigation(page) {
  await expect(page.locator('#main')).not.toHaveAttribute('aria-busy', 'true');
  const navigation = page.locator('details.workspace-navigation');
  await expect(navigation).toHaveCount(1);
  if (!await navigation.evaluate(element => element.open)) {
    await navigation.locator(':scope > summary').click();
  }
  await expect(navigation).toHaveAttribute('open', '');
}

export async function openCaseDetails(page) {
  if (await page.locator('#case-details').getAttribute('open') === null) {
    await page.locator('#case-details > summary').click();
  }
}
