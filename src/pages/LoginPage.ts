import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage - Generic template for authentication
 * TODO: Customize selectors and methods for your application
 */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   * TODO: Update path if your login URL is different
   */
  async goto(): Promise<void> {
    await super.goto('/login');
    await this.waitForPageLoad();
  }

  /**
   * Perform login action
   * TODO: Update selectors to match your application's login form
   */
  async login(username: string, password: string): Promise<void> {
    // TODO: Customize these selectors for your application
    const usernameSelectors = [
      this.page.getByLabel('Username'),
      this.page.getByLabel('Email'),
      this.page.locator('input[name="username"]'),
      this.page.locator('input[type="email"]'),
      this.page.locator('#username'),
    ];

    const passwordSelectors = [
      this.page.getByLabel('Password'),
      this.page.locator('input[name="password"]'),
      this.page.locator('input[type="password"]'),
      this.page.locator('#password'),
    ];

    const submitSelectors = [
      this.page.getByRole('button', { name: /log.*in/i }),
      this.page.getByRole('button', { name: /sign.*in/i }),
      this.page.locator('button[type="submit"]'),
      this.page.locator('[data-testid="login-button"]'),
    ];

    await this.fillField(usernameSelectors, username, 'Username field');
    await this.fillField(passwordSelectors, password, 'Password field');
    await this.clickElement(submitSelectors, 'Login button');
    await this.waitForPageLoad();
  }
}
