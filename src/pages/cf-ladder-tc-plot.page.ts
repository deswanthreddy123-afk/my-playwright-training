import { LoginPage } from './login.page';

/**
 * CfLadderTcPlotPage — page object for the CF Plot accordion panel containing:
 *   CF Plot     → page-level file index 0
 *   Ladder Plot → page-level file index 1
 *   TC Plot     → page-level file index 2
 * Upload file: Testing.jpg
 */
export class CfLadderTcPlotPage extends LoginPage {

  // Expand the CF Plot accordion panel
  async expandPanel(): Promise<void> {
    await this.clickdropdownpannel4();
  }

  // ─── CF Plot (index 0) ──────────────────────────────────────────────────────
  async uploadCfPlot(): Promise<void> {
    await this.uploadFile7();
  }

  async uploadCfPlotFinal(): Promise<void> {
    await this.uploadFile8();
  }

  async deleteCfPlot(): Promise<void> {
    await this.deleteIfExists(0);
  }

  async cancelDeleteCfPlot(): Promise<void> {
    await this.clickDeleteButtonCancel(0);
  }

  async confirmDeleteCfPlot(): Promise<void> {
    await this.clickDeleteButton(0);
  }

  async downloadCfPlot(): Promise<string> {
    return this.clickDownloadButton(0);
  }

  // ─── Ladder Plot (index 1) ──────────────────────────────────────────────────
  async uploadLadderPlot(): Promise<void> {
    await this.uploadFile9();
  }

  async uploadLadderPlotFinal(): Promise<void> {
    await this.uploadFile11();
  }

  async deleteLadderPlot(): Promise<void> {
    await this.deleteIfExists(1);
  }

  async cancelDeleteLadderPlot(): Promise<void> {
    await this.clickDeleteButtonCancel(1);
  }

  async confirmDeleteLadderPlot(): Promise<void> {
    await this.clickDeleteButton(1);
  }

  async downloadLadderPlot(): Promise<string> {
    return this.clickDownloadButton(1);
  }

  // ─── TC Plot (index 2) ──────────────────────────────────────────────────────
  async uploadTcPlot(): Promise<void> {
    await this.uploadFile12();
  }

  async deleteTcPlot(): Promise<void> {
    await this.deleteIfExists(2);
  }

  async cancelDeleteTcPlot(): Promise<void> {
    await this.clickDeleteButtonCancel(2);
  }

  async confirmDeleteTcPlot(): Promise<void> {
    await this.clickDeleteButton(2);
  }

  async downloadTcPlot(): Promise<string> {
    return this.clickDownloadButton(2);
  }

  // ─── Shared overwrite helpers ──────────────────────────────────────────────
  async cancelOverwrite(): Promise<void> {
    await this.clickOverwriteCancel();
  }

  async overwrite(): Promise<void> {
    await this.clickOverwrite();
  }
}
