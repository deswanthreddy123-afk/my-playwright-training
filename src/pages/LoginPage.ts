import { Page } from '@playwright/test';
import * as path from 'node:path';
import { getConfig } from '../config/env';

/**
 * LoginPage - Page Object for the authentication flow.
 *
 * TEMPLATE: Update the selectors and URLs to match your application.
 */
export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the login page.
   */
  async goto(): Promise<void> {
    const { baseURL } = getConfig();
    await this.page.goto(baseURL);
  }

  /**
   * Alias for {@link goto} kept for hook compatibility.
   */
  async navigate(): Promise<void> {
    await this.goto();
  }

  /**
   * Perform login. Credentials fall back to environment variables when not
   * provided, so hooks can call `login()` without arguments.
   */
  async login(username?: string, password?: string): Promise<void> {
    const user = username ?? process.env.APP_USERNAME ?? '';
    const pass = password ?? process.env.APP_PASSWORD ?? '';

    // TODO: Update these selectors to match your application's login form.
    await this.page.getByLabel(/username|email/i).fill(user);
    await this.page.getByLabel(/password/i).fill(pass);
    await this.page.getByRole('button', { name: /log ?in|sign ?in/i }).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to the DOS home page after a successful login.
   */
  async gotoDOS(): Promise<void> {
    const { baseURL } = getConfig();
    await this.page.goto(baseURL);
    await this.page.waitForLoadState('networkidle');
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Well Details flow
  // TEMPLATE: Update the selectors below to match your application.
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * Open the Trajectory tab.
   */
  async navigateTrajectorytab(): Promise<void> {
    // TODO: Update selector to match your application.
    await this.page.getByRole('tab', { name: /trajectory/i }).click();
  }

  /**
   * Expand the Well Details dropdown panel.
   */
  async clickdropdownpannel(): Promise<void> {
    // TODO: Update selector to match your application.
    await this.page.getByRole('button', { name: /well details/i }).click();
  }

  /**
   * Upload a file.
   */
  async uploadFile(filePath?: string): Promise<void> {
    // TODO: Update selector and default file path to match your application.
    await this.page.setInputFiles('input[type="file"]', filePath ?? '');
  }

  /**
   * Cancel a delete action.
   */
  async clickDeleteButtonCancel(): Promise<void> {
    // TODO: Update selector to match your application.
    await this.page.getByRole('button', { name: /cancel/i }).click();
  }

  /**
   * Confirm a delete action.
   */
  async clickDeleteButton(): Promise<void> {
    // TODO: Update selector to match your application.
    await this.page.getByRole('button', { name: /delete/i }).click();
  }

  /**
   * Upload a second file.
   */
  async uploadFile1(filePath?: string): Promise<void> {
    // TODO: Update selector and default file path to match your application.
    await this.page.setInputFiles('input[type="file"]', filePath ?? '');
  }

  /**
   * Upload a file to the Schematic section.
   */
  async uploadFile2(filePath?: string): Promise<void> {
    // TODO: Update selector and default file path to match your application.
    await this.page.setInputFiles('input[type="file"]', filePath ?? '');
  }

  /**
   * Overwrite an existing file.
   */
  async clickOverwrite(): Promise<void> {
    // TODO: Update selector to match your application.
    await this.page.getByRole('button', { name: /overwrite/i }).click();
  }

  /**
   * Cancel the overwrite action.
   */
  async clickOverwriteCancel(): Promise<void> {
    // TODO: Update selector to match your application.
    await this.page.getByRole('button', { name: /cancel/i }).click();
  }

  /**
   * Delete an existing file if present, otherwise upload a new one.
   */
  async deleteIfExistsOrUpload(): Promise<void> {
    // TODO: Update selectors and logic to match your application.
    const deleteButton = this.page.getByRole('button', { name: /delete/i });
    if (await deleteButton.isVisible().catch(() => false)) {
      await deleteButton.click();
    } else {
      await this.uploadFile();
    }
  }

  /**
   * Delete an existing file if one is present.
   */
  async deleteIfExists(): Promise<void> {
    // TODO: Update selector to match your application.
    const deleteButton = this.page.getByRole('button', { name: /delete/i });
    if (await deleteButton.isVisible().catch(() => false)) {
      await deleteButton.click();
    }
  }

  /**
   * Download the uploaded file and save it to the given directory.
   * Returns the absolute path to the saved file.
   */
  async downloadFile(saveDir = 'downloads'): Promise<string> {
    // TODO: Update selector to match the download control in your application.
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.getByRole('button', { name: /download/i }).click();
    const download = await downloadPromise;

    const savePath = path.resolve(saveDir, download.suggestedFilename());
    await download.saveAs(savePath);
    return savePath;
  }
}
