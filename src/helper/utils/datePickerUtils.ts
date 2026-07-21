/**
 * Date Picker Utility Functions
 */

import { Locator, Page } from '@playwright/test';

export class DatePickerUtils {
  constructor(private readonly page: Page) {}

  async selectDate(datePickerLocator: Locator, date: Date): Promise<void> {
    await datePickerLocator.click();

    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();

    // Navigate to correct month/year
    await this.navigateToMonthYear(month, year);

    // Select day
    await this.page.locator(`[data-day="${day}"]`).click();
  }

  private async navigateToMonthYear(targetMonth: string, targetYear: number): Promise<void> {
    // Implementation depends on your date picker component
    // This is a basic example
    const monthYearSelector = this.page.locator('.datepicker-month-year');
    const currentMonthYear = await monthYearSelector.textContent();

    // Logic to navigate to target month/year would go here
    console.log(`Navigating to ${targetMonth} ${targetYear} from ${currentMonthYear}`);
  }

  async selectDateRange(datePickerLocator: Locator, startDate: Date, endDate: Date): Promise<void> {
    await datePickerLocator.click();
    await this.selectDate(datePickerLocator, startDate);
    await this.selectDate(datePickerLocator, endDate);
  }
}
