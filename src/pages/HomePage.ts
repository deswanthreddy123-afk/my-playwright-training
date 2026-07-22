import { Page, expect } from '@playwright/test';
import { getConfig } from '../config/env';

/**
 * HomePage - Page Object for the application home page.
 *
 * TEMPLATE: Update the selectors and URLs to match your application.
 */
export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the home page.
   */
  async goto(): Promise<void> {
    const { baseURL } = getConfig();
    await this.page.goto(baseURL);
  }

  /**
   * Assert that the user is logged in.
   */
  async verifyLoggedIn(): Promise<void> {
    // TODO: Update selector to match a logged-in indicator in your application.
    await expect(this.page.getByRole('button', { name: /log ?out|sign ?out/i })).toBeVisible();
  }

  /**
   * Navigate to a named section from the main navigation.
   */
  async navigateToSection(section: string): Promise<void> {
    // TODO: Update selector to match your application's navigation.
    await this.page.getByRole('link', { name: section }).click();
  }

  /**
   * Perform a search.
   */
  async search(query: string): Promise<void> {
    // TODO: Update selector to match your application's search input.
    await this.page.getByRole('searchbox').fill(query);
    await this.page.keyboard.press('Enter');
  }
}
