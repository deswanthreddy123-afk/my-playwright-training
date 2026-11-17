import { expect, Locator, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { URL } from 'node:url';
import { LoginPage } from './login.page';

export abstract class TrajectoryFilePanelPage extends LoginPage {
  protected abstract get panel(): Locator;

  private fileRow(name = 'Testing.jpg'): Locator {
    return this.panel.locator('.file-item').filter({
      has: this.page.getByText(name, { exact: true }),
    });
  }

  private get dialog(): Locator {
    return this.page.getByRole('alertdialog').filter({ visible: true });
  }

  async expandPanel(): Promise<void> {
    await this.panel.getByLabel('Expand panel').click();
    await expect(this.panel.locator('.p-panel-content-container')).toBeVisible();
    await this.panel.locator('input[type="file"]').waitFor({ state: 'attached', timeout: 30000 });
  }

  async ensureFile(): Promise<void> {
    if ((await this.fileRow().count()) === 0) {
      await this.upload();
    }
    await expect(this.fileRow().getByText('Completed', { exact: true })).toBeVisible();
  }

  private async uploadFileAndWait(name = 'Testing.jpg'): Promise<void> {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (response) =>
          new URL(response.url()).pathname === '/digital-design-of-service/api/v1/files' &&
          response.request().method() === 'POST',
      ),
      this.panel.locator('input[type="file"]').setInputFiles({
        name,
        mimeType: 'image/jpeg',
        buffer: await readFile(this.uploadFilePath),
      }),
    ]);
    expect(response.ok(), `Upload failed with HTTP ${response.status()}`).toBeTruthy();
    await expect(this.fileRow(name).getByText('Completed', { exact: true })).toBeVisible();
  }

  async upload(): Promise<void> {
    await this.deleteFile();
    await this.uploadFileAndWait();
  }

  async uploadSecond(): Promise<void> {
    await this.ensureFile();
    await this.deleteNamedFile('Testing-second.jpg');
    await this.uploadFileAndWait('Testing-second.jpg');
    await expect(this.fileRow()).toHaveCount(1);
    await expect(this.fileRow('Testing-second.jpg')).toHaveCount(1);
  }

  private async deleteNamedFile(name: string): Promise<void> {
    const row = this.fileRow(name);
    if ((await row.count()) === 0) return;

    await row.locator(`p-button[aria-label="Delete file ${name}"] button`).click();
    await expect(this.dialog).toContainText(`Are you sure you want to delete "${name}"?`);
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (response) =>
          new URL(response.url()).pathname === '/digital-design-of-service/api/v1/files/delete' &&
          response.request().method() === 'POST',
      ),
      this.dialog.getByRole('button', { name: 'Delete', exact: true }).click(),
    ]);
    expect(response.ok(), `Delete failed with HTTP ${response.status()}`).toBeTruthy();
    await expect(row).toHaveCount(0);
    await expect(this.dialog).toHaveCount(0);
  }

  async deleteFile(): Promise<void> {
    await this.deleteNamedFile('Testing.jpg');
  }

  async cancelDelete(): Promise<void> {
    await this.ensureFile();
    await this.fileRow().locator('p-button[aria-label="Delete file Testing.jpg"] button').click();
    await expect(this.dialog).toContainText('Are you sure you want to delete "Testing.jpg"?');
    await this.dialog.getByRole('button', { name: 'Cancel', exact: true }).click();
    await expect(this.dialog).toHaveCount(0);
    await expect(this.fileRow().getByText('Completed', { exact: true })).toBeVisible();
  }

  async confirmDelete(): Promise<void> {
    await this.ensureFile();
    await this.deleteFile();
  }

  async downloadFile(): Promise<string> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.fileRow().locator('p-button[aria-label="Download file Testing.jpg"] button').click(),
    ]);
    expect(await download.failure()).toBeNull();
    expect(download.suggestedFilename()).toBe('Testing.jpg');
    const savePath = test.info().outputPath(download.suggestedFilename());
    await download.saveAs(savePath);
    expect(await readFile(savePath)).toEqual(await readFile(this.uploadFilePath));
    return savePath;
  }

  async beginOverwrite(): Promise<void> {
    await this.ensureFile();
    await this.panel.locator('input[type="file"]').setInputFiles(this.uploadFilePath);
    await expect(this.dialog).toContainText('The file "Testing.jpg" already exists.');
    await expect(this.dialog.getByRole('button', { name: 'Overwrite', exact: true })).toBeVisible();
  }

  async cancelOverwrite(): Promise<void> {
    await this.dialog.getByRole('button', { name: 'Cancel', exact: true }).click();
    await expect(this.dialog).toHaveCount(0);
    await expect(this.fileRow()).toHaveCount(1);
    await expect(this.fileRow().getByText('Completed', { exact: true })).toBeVisible();
  }

  async overwrite(): Promise<void> {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (response) =>
          new URL(response.url()).pathname === '/digital-design-of-service/api/v1/files' &&
          response.request().method() === 'POST',
      ),
      this.dialog.getByRole('button', { name: 'Overwrite', exact: true }).click(),
    ]);
    expect(response.ok(), `Overwrite failed with HTTP ${response.status()}`).toBeTruthy();
    await expect(this.dialog).toHaveCount(0);
    await expect(this.fileRow()).toHaveCount(1);
    await expect(this.fileRow().getByText('Completed', { exact: true })).toBeVisible();
  }
}
