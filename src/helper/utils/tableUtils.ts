/**
 * Table Utility Functions
 */

import { Locator } from '@playwright/test';

export class TableUtils {
  static async getRowCount(table: Locator): Promise<number> {
    return await table.locator('tbody tr').count();
  }

  static async getColumnCount(table: Locator): Promise<number> {
    return await table.locator('thead th').count();
  }

  static async getCellValue(table: Locator, row: number, column: number): Promise<string> {
    const cell = table.locator(`tbody tr:nth-child(${row}) td:nth-child(${column})`);
    return (await cell.textContent()) || '';
  }

  static async getRowByText(table: Locator, text: string): Promise<Locator> {
    return table.locator(`tbody tr:has-text("${text}")`);
  }

  static async clickCellButton(
    table: Locator,
    row: number,
    column: number,
    buttonText?: string,
  ): Promise<void> {
    const cell = table.locator(`tbody tr:nth-child(${row}) td:nth-child(${column})`);
    if (buttonText) {
      await cell.locator(`button:has-text("${buttonText}")`).click();
    } else {
      await cell.locator('button').first().click();
    }
  }

  static async getAllRowsData(table: Locator): Promise<string[][]> {
    const rows = await table.locator('tbody tr').all();
    const data: string[][] = [];

    for (const row of rows) {
      const cells = await row.locator('td').allTextContents();
      data.push(cells);
    }

    return data;
  }

  static async sortByColumn(table: Locator, columnIndex: number): Promise<void> {
    const header = table.locator(`thead th:nth-child(${columnIndex})`);
    await header.click();
  }
}
