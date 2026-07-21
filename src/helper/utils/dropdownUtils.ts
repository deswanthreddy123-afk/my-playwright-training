/**
 * Dropdown Utility Functions
 */

import { Locator } from '@playwright/test';

export class DropdownUtils {
  static async selectByValue(dropdown: Locator, value: string): Promise<void> {
    await dropdown.selectOption({ value });
  }

  static async selectByLabel(dropdown: Locator, label: string): Promise<void> {
    await dropdown.selectOption({ label });
  }

  static async selectByIndex(dropdown: Locator, index: number): Promise<void> {
    await dropdown.selectOption({ index });
  }

  static async getSelectedValue(dropdown: Locator): Promise<string> {
    return await dropdown.inputValue();
  }

  static async getSelectedText(dropdown: Locator): Promise<string> {
    const selectedOption = dropdown.locator('option:checked');
    return (await selectedOption.textContent()) || '';
  }

  static async getAllOptions(dropdown: Locator): Promise<string[]> {
    const options = await dropdown.locator('option').allTextContents();
    return options;
  }

  static async selectMultiple(dropdown: Locator, values: string[]): Promise<void> {
    await dropdown.selectOption(values);
  }
}
