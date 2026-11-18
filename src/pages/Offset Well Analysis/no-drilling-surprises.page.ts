import { expect, Locator } from '@playwright/test';
import { RichTextEditor } from '../rich-text-editor';
import { TrajectoryFilePanelPage } from '../trajectory-file-panel.page';

export class NoDrillingSurprisesPage extends TrajectoryFilePanelPage {
  protected get panel(): Locator {
    return this.page.locator('digital-dos-panel-wrapper').filter({
      has: this.page.locator('.panel-title').filter({
        hasText: /^\s*No Drilling Surprises\s*$/,
      }),
    });
  }

  readonly textEditor = new RichTextEditor(
    this.page,
    this.panel,
    this.panel.locator('.p-panel-content-container'),
    'No Drilling Surprises',
  );

  async openSubsurface(): Promise<void> {
    await this.openOffsetWellAnalysisSubsurface();
    await expect(this.panel).toHaveCount(1, { timeout: 30000 });
  }

  async uploadToSchematic(): Promise<void> {
    await this.upload();
  }
}
