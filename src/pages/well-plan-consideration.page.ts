import { LoginPage } from './login.page';

/**
 * WellPlanConsiderationPage — page object for the Well Plan & Consideration panel.
 * Section-scoped via wellPlanSection  |  Upload file: Testing.jpg
 */
export class WellPlanConsiderationPage extends LoginPage {

  // Expand the Well Plan & Consideration panel (poll-retry approach)
  async expandPanel(): Promise<void> {
    await this.clickWellPlanPanel();
  }

  // Upload file — cancels overwrite dialog if it appears
  async upload(): Promise<void> {
    await this.uploadFileWellPlan();
  }

  // Upload second file
  async uploadSecond(): Promise<void> {
    await this.uploadFile1WellPlan();
  }

  // Upload file to Schematic
  async uploadToSchematic(): Promise<void> {
    await this.uploadFile2WellPlan();
  }

  // Delete file at index 0 if it exists
  async deleteFile(): Promise<void> {
    await this.deleteIfExists(0);
  }

  // Cancel the delete action
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
