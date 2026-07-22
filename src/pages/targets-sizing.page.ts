import { LoginPage } from './login.page';

/**
 * TargetsSizingPage — page object for the Targets Sizing panel.
 * Section-scoped via targetsSizingSection  |  Upload file: Testing.jpg
 */
export class TargetsSizingPage extends LoginPage {

  // Expand the Targets Sizing panel (poll-retry approach)
  async expandPanel(): Promise<void> {
    await this.clickTargetsSizingPanel();
  }

  // Upload file — cancels overwrite dialog if it appears
  async upload(): Promise<void> {
    await this.uploadFileTargetsSizing();
  }

  // Upload second file
  async uploadSecond(): Promise<void> {
    await this.uploadFile1TargetsSizing();
  }

  // Upload file to Schematic
  async uploadToSchematic(): Promise<void> {
    await this.uploadFile2TargetsSizing();
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
