import { expect, Locator, Page } from '@playwright/test';
import { TrajectoryFilePanelPage } from '../trajectory-file-panel.page';

type PlotName = 'CF Plot' | 'Ladder Plot' | 'TC Plot';

export class CfLadderTcPlotPage extends TrajectoryFilePanelPage {
  constructor(
    page: Page,
    private readonly plotName: PlotName,
  ) {
    super(page);
  }

  private get outerPanel(): Locator {
    return this.page.locator('digital-dos-panel-wrapper').filter({
      has: this.page.locator('.panel-title').filter({
        hasText: /^\s*CF Plot\/Ladder Plot\/TC Plot\s*$/,
      }),
    });
  }

  protected get panel(): Locator {
    return this.outerPanel.locator('.content-editor-container').filter({
      has: this.page.locator('.tab-section-title').filter({
        hasText: new RegExp(`^\\s*${this.plotName}\\s*$`),
      }),
    });
  }

  async expandPanel(): Promise<void> {
    await this.outerPanel.getByLabel('Expand panel').click();
    await expect(this.outerPanel.locator('.p-panel-content-container')).toBeVisible();
    await expect(this.panel).toBeVisible();
    await this.panel.locator('input[type="file"]').waitFor({ state: 'attached', timeout: 30000 });
  }
}
