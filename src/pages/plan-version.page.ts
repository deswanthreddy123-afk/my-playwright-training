import { LoginPage } from './login.page';

/**
 * PlanVersionPage — page object for the Plan Version panel.
 * File index: 1  |  Upload file: Testing.jpg
 */
export class PlanVersionPage extends LoginPage {

  // Expand the Plan Version panel
  async expandPanel(): Promise<void> {
    await this.clickPlanVersionPanel();
  }

  // Upload file — cancels overwrite dialog if it appears
  async upload(): Promise<void> {
    await this.uploadFilePlanVersion();
  }

  // Upload second file
  async uploadSecond(): Promise<void> {
    await this.uploadFile1PlanVersion();
  }

  // Upload file to Schematic
  async uploadToSchematic(): Promise<void> {
    await this.uploadFile2PlanVersion();
  }

  // Delete file at index 1 if it exists
  async deleteFile(): Promise<void> {
    await this.deleteIfExists(1);
  }

  // Cancel the delete action
  async cancelDelete(): Promise<void> {
    await this.clickDeleteButtonCancel(1);
  }

  // Confirm the delete action
  async confirmDelete(): Promise<void> {
    await this.clickDeleteButton(1);
  }

  // Download the file at index 1
  async downloadFile(): Promise<string> {
    return this.clickDownloadButton(1);
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
