import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect the page title to contain "Playwright".
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('/');

  // Click the "Get started" link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expect the page to have a heading named "Installation".
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
