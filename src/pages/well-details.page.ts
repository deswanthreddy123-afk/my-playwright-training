import { Locator } from '@playwright/test';
import { LoginPage } from './login.page';

/**
 * WellDetailsPage — page object for the Well Details (Schematic Diagram) panel.
 * File index: 0  |  Upload file: Testing.jpg
 */
export class WellDetailsPage extends LoginPage {

  // Expand the Well Details panel
  async expandPanel(): Promise<void> {
    await this.page.getByTitle('Well Details').getByLabel('Expand panel').click();
    await this.page.waitForTimeout(2000);
  }

  // Upload file — cancels overwrite dialog if it appears
  async upload(scope?: Locator): Promise<void> {
    await this.base(scope).locator('input[type="file"]').first().setInputFiles(this.uploadFilePath);
    const dialogMask = this.page.locator('.p-dialog-mask');
    await this.page.waitForTimeout(1000);
    if (await dialogMask.isVisible().catch(() => false)) {
      await this.page.getByRole('button', { name: 'Cancel' }).click();
      await dialogMask.waitFor({ state: 'hidden' });
    }
  }

  // Upload second file (no overwrite handling)
  async uploadSecond(scope?: Locator): Promise<void> {
    await this.base(scope).locator('input[type="file"]').first().setInputFiles(this.uploadFilePath);
  }

  // Delete file at index 0 if it exists
  async deleteFile(): Promise<void> {
    await this.deleteIfExists(0);
  }

  // Cancel the delete action (opens confirm dialog then cancels)
  async cancelDelete(): Promise<void> {
    await this.clickDeleteButtonCancel(0);
  }

  // Confirm the delete action
  async confirmDelete(): Promise<void> {
    await this.clickDeleteButton(0);
  }

  // Download the file at index 0
  async downloadFile(): Promise<string> {
    return this.clickDownloadButton(0);
  }

  // Cancel the overwrite dialog
  async cancelOverwrite(): Promise<void> {
    await this.clickOverwriteCancel();
  }

  // Confirm overwrite
  async overwrite(): Promise<void> {
    await this.clickOverwrite();
  }
}
