import { Locator } from '@playwright/test';
import { WellMultiSelectPanelPage } from './well-multiselect-panel.page';

export class DdrSummaryPage extends WellMultiSelectPanelPage {
  protected get panel(): Locator {
    return this.page.locator('digital-dos-panel-wrapper').filter({
      has: this.page.locator('.panel-title').filter({
        hasText: /^\s*DDR Summary\s*$/,
      }),
    });
  }

  protected get wellSelect(): Locator {
    return this.panel.locator('p-multiselect.well-multiselect');
  }

  protected get summaryTabName(): string {
    return 'NPT Summary';
  }
}
