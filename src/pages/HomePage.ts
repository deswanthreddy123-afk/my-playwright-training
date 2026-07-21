import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage - Generic template for main application page
 * 
 * INSTRUCTIONS FOR CUSTOMIZATION:
 * 1. Rename this class if needed (e.g., DashboardPage, LandingPage)
 * 2. Update all selectors to match your application
 * 3. Add page-specific methods for your use cases
 * 4. Remove the deprecated methods at the bottom of this file
 * 5. See examples folder for a complete implementation reference
 */
export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to home page
   * TODO: Update path if your home page is different
   */
  async goto(): Promise<void> {
    await super.goto('/');
    await this.waitForPageLoad();
  }

  /**
   * Verify user is logged in
   * TODO: Customize selectors to match your app's logged-in indicators
   */
  async verifyLoggedIn(): Promise<void> {
    const loggedInIndicators = [
      this.page.locator('[data-testid="user-menu"]'),
      this.page.locator('.user-avatar'),
      this.page.locator('.profile-icon'),
      this.page.getByRole('button', { name: /account|profile|user/i }),
    ];

    await this.verifyElementVisible(loggedInIndicators, 'User menu or avatar');
  }

  /**
   * EXAMPLE: Navigate to a section
   * TODO: Customize for your application's navigation
   */
  async navigateToSection(sectionName: string): Promise<void> {
    const navSelectors = [
      this.page.getByRole('link', { name: new RegExp(sectionName, 'i') }),
      this.page.locator(`[data-testid="nav-${sectionName.toLowerCase()}"]`),
      this.page.locator(`a:has-text("${sectionName}")`),
    ];

    await this.clickElement(navSelectors, `${sectionName} navigation link`);
    await this.waitForPageLoad();
  }

  /**
   * EXAMPLE: Search functionality
   * TODO: Customize for your search implementation
   */
  async search(query: string): Promise<void> {
    const searchInputSelectors = [
      this.page.getByPlaceholder(/search/i),
      this.page.locator('input[type="search"]'),
      this.page.locator('[data-testid="search-input"]'),
    ];

    const searchButtonSelectors = [
      this.page.getByRole('button', { name: /search/i }),
      this.page.locator('[data-testid="search-button"]'),
      this.page.locator('button[type="submit"]'),
    ];

    await this.fillField(searchInputSelectors, query, 'Search input');
    await this.clickElement(searchButtonSelectors, 'Search button');
    await this.waitForLoadingToComplete();
  }

  // =============================================================================
  // TODO: Add your page-specific methods below this line
  // Examples:
  // - async openUserMenu()
  // - async selectMenuItem(item: string)
  // - async verifyPageTitle(expectedTitle: string)
  // - async getNotificationCount(): Promise<number>
  // =============================================================================
}