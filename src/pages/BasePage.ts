import { Locator, Page, expect } from '@playwright/test';

/**
 * BasePage - Simplified parent class for all Page Object Models
 * Provides essential common functionality to reduce code duplication
 */
export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ============================================================================
  // NAVIGATION
  // ============================================================================

  /**
   * Navigate to a URL (path or full URL)
   */
  async goto(url?: string): Promise<void> {
    await this.page.goto(url || '/');
  }

  /**
   * Get current page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Verify current URL contains specific text
   */
  async verifyUrlContains(text: string): Promise<void> {
    expect(this.page.url()).toContain(text);
  }

  // ============================================================================
  // WAITING
  // ============================================================================

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(timeout = 30000): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout }).catch(() => {});
    await this.page.waitForLoadState('domcontentloaded', { timeout });
  }

  /**
   * Wait for common loading indicators to disappear
   */
  async waitForLoadingToComplete(): Promise<void> {
    const loadingIndicators = [
      this.page.locator('.loader, .spinner, .loading'),
      this.page.locator('[role="status"]'),
      this.page.getByText(/loading/i),
    ];

    for (const indicator of loadingIndicators) {
      const isVisible = await indicator
        .first()
        .isVisible()
        .catch(() => false);
      if (isVisible) {
        await indicator.first().waitFor({ state: 'hidden', timeout: 30000 });
        break;
      }
    }
  }

  // ============================================================================
  // ELEMENT FINDING (Protected - for use in page classes)
  // ============================================================================

  /**
   * Find first visible element from array of selectors (fallback pattern)
   */
  protected async findVisibleElement(
    selectors: Locator[],
  ): Promise<{ found: boolean; element?: Locator; count?: number }> {
    for (const selector of selectors) {
      const count = await selector.count();
      if (count > 0) {
        const isVisible = await selector
          .first()
          .isVisible()
          .catch(() => false);
        if (isVisible) {
          return { found: true, element: selector.first(), count };
        }
      }
    }
    return { found: false };
  }

  // ============================================================================
  // COMMON ACTIONS (Protected - for use in page classes)
  // ============================================================================

  /**
   * Click element with fallback selectors
   */
  protected async clickElement(selectors: Locator[], description: string): Promise<void> {
    const result = await this.findVisibleElement(selectors);
    if (result.found && result.element) {
      await result.element.click();
      console.log(`Clicked: ${description}`);
    } else {
      throw new Error(`${description} not found`);
    }
  }

  /**
   * Fill input field with fallback selectors
   */
  protected async fillField(
    selectors: Locator[],
    value: string,
    description: string,
  ): Promise<void> {
    for (const selector of selectors) {
      const isVisible = await selector.isVisible().catch(() => false);
      if (isVisible) {
        await selector.fill(value);
        console.log(`Filled ${description}: "${value}"`);
        return;
      }
    }
    throw new Error(`${description} field not found`);
  }

  /**
   * Verify element is visible
   */
  protected async verifyElementVisible(selectors: Locator[], description: string): Promise<void> {
    const result = await this.findVisibleElement(selectors);
    if (result.found && result.element) {
      await expect(result.element).toBeVisible();
    } else {
      throw new Error(`${description} not found`);
    }
  }
}
