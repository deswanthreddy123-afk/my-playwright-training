import { expect, Locator } from '@playwright/test';
import { LoginPage } from '../login.page';

// Shared behavior for Drilling Engineering panels that filter data through a well multiselect.
export abstract class WellMultiSelectPanelPage extends LoginPage {
  private selectedWells: string[] = [];

  protected abstract get panel(): Locator;
  protected abstract get wellSelect(): Locator;
  // The tab that is always shown before the per-well tabs.
  protected abstract get summaryTabName(): string;

  // The overlay is appended outside the panel, and only one is open at a time.
  private get wellOverlay(): Locator {
    return this.page.locator('.p-multiselect-overlay').filter({ visible: true });
  }

  private get selectedSummary(): Locator {
    return this.panel.getByText(/^Selected: \d+ wells$/);
  }

  async openDrillingEngineering(): Promise<void> {
    await this.openOffsetWellAnalysisDrillingEngineering();
    await expect(this.panel).toHaveCount(1, { timeout: 30000 });
  }

  async expandPanel(): Promise<void> {
    await this.panel.getByLabel('Expand panel').click();
    await expect(this.panel.locator('.p-panel-content-container')).toBeVisible();
    // The well list loads asynchronously; options are awaited when the dropdown opens.
    await expect(this.wellSelect).toBeVisible({ timeout: 30000 });
  }

  async selectWells(names: string[]): Promise<void> {
    // A release notice pinned to the bottom of the page covers the lower dropdown options.
    const releaseNotice = this.page.getByRole('region', { name: 'Latest release update' });
    if (await releaseNotice.isVisible()) {
      await releaseNotice.getByRole('button', { name: 'Dismiss release update' }).click();
      await expect(releaseNotice).toBeHidden();
    }

    // The app reloads the data after a selection change and can close the dropdown, so each
    // well reopens it and checks the current state before clicking. Long lists are
    // virtual-scrolled, so each option is found through the search box.
    for (const name of names) {
      await expect(async () => {
        if ((await this.wellOverlay.count()) === 0) {
          await this.wellSelect.locator('.p-multiselect-label-container').click({ timeout: 5000 });
        }
        await this.wellOverlay.getByRole('searchbox').fill(name, { timeout: 5000 });
        const option = this.wellOverlay.getByRole('option', { name, exact: true });
        await expect(option, `Well "${name}" was not found in the list`).toHaveCount(1, {
          timeout: 10000,
        });
        if ((await option.getAttribute('aria-selected', { timeout: 5000 })) !== 'true') {
          await option.click({ timeout: 5000 });
        }
        await expect(option).toHaveAttribute('aria-selected', 'true', { timeout: 5000 });
      }).toPass({ timeout: 60000, intervals: [500, 1000, 2000] });
    }

    if ((await this.wellOverlay.count()) > 0) {
      await this.page.keyboard.press('Escape');
    }
    await expect(this.wellOverlay).toHaveCount(0);
    this.selectedWells = names;
  }

  async verifySelectedWells(): Promise<void> {
    const count = this.selectedWells.length;
    expect(count, 'No wells were selected before verification').toBeGreaterThan(0);

    await expect(this.wellSelect.locator('.p-multiselect-label')).toHaveText(
      `${count} items selected`,
    );
    await expect(this.selectedSummary).toHaveText(`Selected: ${count} wells`);

    // One summary tab plus one per selected well.
    const tabs = this.panel.getByRole('tab');
    await expect(tabs).toHaveCount(count + 1);
    await expect(tabs.first()).toHaveText(this.summaryTabName);
    for (const name of this.selectedWells) {
      await expect(this.panel.getByRole('tab', { name, exact: true })).toBeVisible();
    }
  }
}
