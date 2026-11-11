export { test, expect } from '@playwright/test';

export async function openCaseDetails(page) {
  if (await page.locator('#case-details').getAttribute('open') === null) {
    await page.locator('#case-details > summary').click();
  }
}
