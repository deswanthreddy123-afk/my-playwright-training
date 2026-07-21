import { createBdd } from 'playwright-bdd';
import { test } from '../../../src/fixtures/bdd-fixtures';
import { HomePage } from '../../../src/pages/HomePage';
import { LoginPage } from '../../../src/pages/LoginPage';

/**
 * BDD Step Definitions - TEMPLATE
 *
 * TODO: Customize these steps for your application
 * - Update step implementations to match your page objects
 * - Add more steps as your scenarios grow
 * - Use descriptive step names that match your feature files
 *
 * See tests/examples folder for complete implementation examples
 */

const { Given, When, Then } = createBdd(test);

// =============================================================================
// Login Steps
// =============================================================================

Given('I am on the login page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('I enter valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  // TODO: Replace with your test credentials or use test data
  await loginPage.login('your-username', 'your-password');
});

When(
  'I login with username {string} and password {string}',
  async ({ page }, username: string, password: string) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(username, password);
  },
);

// =============================================================================
// Home Page Steps
// =============================================================================

Then('I should be logged in', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.verifyLoggedIn();
});

Then('I should see the home page', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
});

When('I navigate to {string} section', async ({ page }, sectionName: string) => {
  const homePage = new HomePage(page);
  await homePage.navigateToSection(sectionName);
});

When('I search for {string}', async ({ page }, query: string) => {
  const homePage = new HomePage(page);
  await homePage.search(query);
});

// =============================================================================
// TODO: Add more step definitions below for your application's features
// Examples:
// - Form filling steps
// - Navigation steps
// - Verification steps
// - Data manipulation steps
// =============================================================================
