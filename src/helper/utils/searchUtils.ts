/**
 * Search Utility Functions
 */

import { Locator, Page } from '@playwright/test';

export class SearchUtils {
  constructor(private readonly page: Page) {}

  async search(searchInput: Locator, searchTerm: string): Promise<void> {
    await searchInput.fill(searchTerm);
    await searchInput.press('Enter');
  }

  async searchAndWait(
    searchInput: Locator,
    searchTerm: string,
    resultLocator: Locator,
  ): Promise<void> {
    await searchInput.fill(searchTerm);
    await searchInput.press('Enter');
    await resultLocator.first().waitFor({ state: 'visible' });
  }

  async clearSearch(searchInput: Locator): Promise<void> {
    await searchInput.clear();
  }

  async getSearchResults(resultLocator: Locator): Promise<string[]> {
    return await resultLocator.allTextContents();
  }

  async getSearchResultCount(resultLocator: Locator): Promise<number> {
    return await resultLocator.count();
  }

  async filterResults(filterLocator: Locator, filterValue: string): Promise<void> {
    await filterLocator.selectOption(filterValue);
  }
}
