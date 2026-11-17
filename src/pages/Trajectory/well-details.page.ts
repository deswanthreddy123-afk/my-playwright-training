import { Locator } from '@playwright/test';
import { TrajectoryFilePanelPage } from '../trajectory-file-panel.page';

export class WellDetailsPage extends TrajectoryFilePanelPage {
  protected get panel(): Locator {
    return this.page.getByTitle('Well Details', { exact: true });
  }
}
