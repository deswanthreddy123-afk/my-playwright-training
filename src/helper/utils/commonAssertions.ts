/**
 * Common Assertions
 */

import { expect, Locator, Page } from '@playwright/test';

export class CommonAssertions {
  static async verifyElementVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  static async verifyElementNotVisible(locator: Locator): Promise<void> {
    await expect(locator).not.toBeVisible();
  }

  static async verifyElementEnabled(locator: Locator): Promise<void> {
    await expect(locator).toBeEnabled();
  }

  static async verifyElementDisabled(locator: Locator): Promise<void> {
    await expect(locator).toBeDisabled();
  }

  static async verifyText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  static async verifyContainsText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toContainText(expectedText);
  }

  static async verifyUrl(page: Page, expectedUrl: string): Promise<void> {
    await expect(page).toHaveURL(expectedUrl);
  }

  static async verifyTitle(page: Page, expectedTitle: string): Promise<void> {
    await expect(page).toHaveTitle(expectedTitle);
  }

  static async verifyElementCount(locator: Locator, count: number): Promise<void> {
    await expect(locator).toHaveCount(count);
  }
}
