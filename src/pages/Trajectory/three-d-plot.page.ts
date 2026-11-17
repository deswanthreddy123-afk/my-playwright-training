import { Locator } from '@playwright/test';
import { TrajectoryFilePanelPage } from '../trajectory-file-panel.page';

export class ThreeDPlotPage extends TrajectoryFilePanelPage {
  protected get panel(): Locator {
    return this.page.locator('digital-dos-panel-wrapper').filter({
      has: this.page.locator('.panel-title').filter({
        hasText: /^\s*3D Plot\s*$/,
      }),
    });
  }

  async uploadToSchematic(): Promise<void> {
    await this.upload();
  }
}
