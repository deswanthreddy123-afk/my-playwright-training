import { expect, Locator } from '@playwright/test';
import { TrajectoryFilePanelPage } from '../trajectory-file-panel.page';

export class OffsetWellDetailsPage extends TrajectoryFilePanelPage {
  protected get panel(): Locator {
    return this.page.locator('digital-dos-panel-wrapper').filter({
      has: this.page.locator('.panel-title').filter({
        hasText: /^\s*Offset Well Details\s*$/,
      }),
    });
  }

  async openDrillingEngineering(): Promise<void> {
    await this.openOffsetWellAnalysisDrillingEngineering();
    await expect(this.panel).toHaveCount(1, { timeout: 30000 });
  }

  async uploadToSchematic(): Promise<void> {
    await this.upload();
  }
}
