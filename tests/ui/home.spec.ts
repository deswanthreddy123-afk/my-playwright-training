import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { LoginPage } from '../../src/pages/LoginPage';

/**
 * UI Test Suite - TEMPLATE
 *
 * TODO: Customize these tests for your application
 * - Update test data (usernames, passwords)
 * - Modify assertions to match your app's behavior
 * - Add more test cases as needed
 *
 * See tests/examples folder for app-specific test examples
 */
test.describe('UI - Home', () => {
  test('should login and verify user is logged in', async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);

    // TODO: Replace with your test credentials
    await login.goto();
    await login.login('your-username', 'your-password');

    await home.goto();
    await home.verifyLoggedIn();
  });

  test('should navigate to a section', async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);

    // TODO: Replace with your test credentials and section name
    await login.goto();
    await login.login('your-username', 'your-password');

    await home.goto();
    await home.navigateToSection('Settings'); // TODO: Replace with your section
  });

  test('should perform search', async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);

    // TODO: Replace with your test credentials and search query
    await login.goto();
    await login.login('your-username', 'your-password');

    await home.goto();
    await home.search('test query'); // TODO: Replace with your search term
  });

  // TODO: Add more test cases specific to your application
});
