import { LoginPage } from './login.page';

/**
 * DirectionalPlotPage — page object for the Directional Plot panel.
 * Page-level file index: 0  |  Upload file: MFA Enrollemnt Intructions.pdf
 */
export class DirectionalPlotPage extends LoginPage {

  // Expand the Directional Plot panel
  async expandPanel(): Promise<void> {
    await this.clickdropdownpannel6();
  }

  // Upload PDF file (index 0)
  async upload(): Promise<void> {
    await this.uploadFileDP();
  }

  // Upload second / final PDF file (index 0)
  async uploadFinal(): Promise<void> {
    await this.uploadFileDPFinal();
  }

  // Delete file at index 0 if it exists, otherwise upload
  async deleteOrUpload(): Promise<void> {
    await this.deleteIfExistsOrUploadDP(0);
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
