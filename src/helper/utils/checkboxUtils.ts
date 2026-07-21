/**
 * Checkbox Utility Functions
 */

import { Locator } from '@playwright/test';

export class CheckboxUtils {
  static async check(checkbox: Locator): Promise<void> {
    const isChecked = await checkbox.isChecked();
    if (!isChecked) {
      await checkbox.check();
    }
  }

  static async uncheck(checkbox: Locator): Promise<void> {
    const isChecked = await checkbox.isChecked();
    if (isChecked) {
      await checkbox.uncheck();
    }
  }

  static async toggle(checkbox: Locator): Promise<void> {
    const isChecked = await checkbox.isChecked();
    if (isChecked) {
      await checkbox.uncheck();
    } else {
      await checkbox.check();
    }
  }

  static async isChecked(checkbox: Locator): Promise<boolean> {
    return await checkbox.isChecked();
  }
}
