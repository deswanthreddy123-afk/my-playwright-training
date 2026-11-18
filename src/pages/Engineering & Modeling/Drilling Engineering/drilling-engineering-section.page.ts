import { expect, Locator } from '@playwright/test';
import { LoginPage } from '../../login.page';

// A section panel on Engineering & Modeling > Drilling Engineering. Every hole-section tab holds
// its own copy of each panel, but only the selected tab is rendered.
export abstract class DrillingEngineeringSectionPage extends LoginPage {
  protected holeSection = '';

  protected abstract get panelTitle(): RegExp;

  protected get panel(): Locator {
    return this.page
      .getByRole('tabpanel', { name: this.holeSection, exact: true })
      .locator('digital-dos-panel-wrapper')
      .filter({ has: this.page.locator('.panel-title').filter({ hasText: this.panelTitle }) });
  }

  async openDrillingEngineering(): Promise<void> {
    await this.openEngineeringModelingDrillingEngineering();
  }

  async selectHoleSection(name: string): Promise<void> {
    this.holeSection = name;
    const tab = this.page.getByRole('tab', { name, exact: true });
    await tab.click();
    await expect(tab).toHaveAttribute('aria-selected', 'true');
    await expect(this.panel).toHaveCount(1, { timeout: 30000 });
  }

  // A release notice pinned to the bottom of the page can cover controls near the bottom.
  protected async dismissReleaseNotice(): Promise<void> {
    const notice = this.page.getByRole('region', { name: 'Latest release update' });
    if (await notice.isVisible()) {
      await notice.getByRole('button', { name: 'Dismiss release update' }).click();
      await expect(notice).toBeHidden();
    }
  }

  async expandPanel(): Promise<void> {
    await this.dismissReleaseNotice();
    await this.panel.getByLabel('Expand panel').click();
    await expect(this.panel.locator('.p-panel-content-container')).toBeVisible();
  }
}
