import { Locator } from '@playwright/test';
import { WellMultiSelectPanelPage } from './well-multiselect-panel.page';

export class OffsetWellRunDetailsPage extends WellMultiSelectPanelPage {
  protected get panel(): Locator {
    return this.page.locator('digital-dos-panel-wrapper').filter({
      has: this.page.locator('.panel-title').filter({
        hasText: /^\s*Offset Well Run Details\s*$/,
      }),
    });
  }

  protected get wellSelect(): Locator {
    return this.panel.locator('p-multiselect', { has: this.page.locator('#rd-well-selection') });
  }

  protected get summaryTabName(): string {
    return 'Parameter Distributions';
  }
}
