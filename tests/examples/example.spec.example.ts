import { test, expect } from '@playwright/test';

// Simple smoke test against the Playwright docs site
// Adjust baseURL in playwright.config.ts to target your app

test('homepage has title and get started link', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Playwright/);
  const getStarted = page.getByRole('link', { name: 'Get started' });
  await expect(getStarted).toBeVisible();
});
