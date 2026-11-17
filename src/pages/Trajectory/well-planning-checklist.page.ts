import { expect, Locator } from '@playwright/test';
import { LoginPage } from '../login.page';

const roleLabels = {
  WP1: 'Select all Well Planner 1 items',
  WP2: 'Select all Well Planner 2 items',
  MWDC: 'Select all MWD Coordinator items',
  DDC: 'Select all DD Coordinator items',
} as const;
const componentRoleLabels = Object.values(roleLabels);
const analysisRoleLabels = [roleLabels.WP1, roleLabels.WP2, roleLabels.DDC];
type ChecklistTab = 'Wellplan Components' | 'Anti-Collision Analysis';

export class WellPlanningChecklistPage extends LoginPage {
  private signOffsBefore: string | undefined;

  private get panel(): Locator {
    return this.page.locator('digital-dos-panel-wrapper').filter({
      has: this.page.locator('.panel-title').filter({
        hasText: /^\s*Well Planning Checklist\s*$/,
      }),
    });
  }

  private get components(): Locator {
    return this.panel.getByRole('tabpanel', { name: 'Wellplan Components', exact: true });
  }

  private get analysis(): Locator {
    return this.panel.getByRole('tabpanel', { name: 'Anti-Collision Analysis', exact: true });
  }

  private get signOffSummary(): Locator {
    return this.panel.getByText(/^\d+ of \d+ sign-offs signed$/);
  }

  async expandPanel(): Promise<void> {
    await this.panel.getByLabel('Expand panel').click();
    await expect(this.panel.locator('.p-panel-content-container')).toBeVisible();
    await expect(this.panel.getByRole('button', { name: /\b(?:Start|Edit)$/ })).toBeVisible({
      timeout: 30000,
    });
  }

  async startChecklist(): Promise<void> {
    this.signOffsBefore = await this.signOffSummary.innerText();
    await this.panel.getByRole('button', { name: /\b(?:Start|Edit)$/ }).click();
    await expect(this.panel.getByRole('button', { name: /\bSave$/ })).toBeVisible();
    await expect(this.panel.getByRole('button', { name: /\bCancel$/ })).toBeVisible();
  }

  private async openTab(name: ChecklistTab): Promise<void> {
    const tab = this.panel.getByRole('tab', { name, exact: true });
    await tab.click();
    await expect(tab).toHaveAttribute('aria-selected', 'true');
    await expect(this.panel.getByRole('tabpanel', { name, exact: true })).toBeVisible();
  }

  async openComponents(): Promise<void> {
    await this.openTab('Wellplan Components');
    for (const label of componentRoleLabels) {
      await expect(
        this.components.getByRole('checkbox', { name: label, exact: true }),
      ).toBeEnabled();
    }
  }

  async selectAllComponentRoles(): Promise<void> {
    for (const label of componentRoleLabels) {
      await this.components.getByRole('checkbox', { name: label, exact: true }).check();
    }
  }

  async verifySelectedComponents(expectedCount: number): Promise<void> {
    await this.verifyCheckedSection(
      this.components,
      componentRoleLabels,
      '.checksheet-item-row',
      expectedCount,
    );
    await this.verifySignOffsUnchanged();
  }

  private async verifySignOffsUnchanged(): Promise<void> {
    if (this.signOffsBefore === undefined) {
      throw new Error('Start the checklist before verifying the sign-off count.');
    }
    await expect(this.signOffSummary).toHaveText(this.signOffsBefore);
  }

  private async verifyCheckedSection(
    section: Locator,
    labels: readonly string[],
    rowSelector: string,
    expectedCount: number,
  ): Promise<void> {
    for (const label of labels) {
      await expect(section.getByRole('checkbox', { name: label, exact: true })).toBeChecked();
    }
    const items = section.locator(rowSelector).getByRole('checkbox');
    await expect(items).toHaveCount(expectedCount, { timeout: 30000 });
    for (const item of await items.all()) await expect(item).toBeChecked();
  }

  async openAnalysis(): Promise<void> {
    await this.openTab('Anti-Collision Analysis');
    for (const label of analysisRoleLabels) {
      await expect(this.analysis.getByRole('checkbox', { name: label, exact: true })).toBeEnabled();
    }
  }

  async selectAllAnalysisRoles(): Promise<void> {
    for (const label of analysisRoleLabels) {
      await this.analysis.getByRole('checkbox', { name: label, exact: true }).check();
    }
  }

  async verifySelectedAnalysis(expectedCount: number): Promise<void> {
    await this.verifyCheckedSection(
      this.analysis,
      analysisRoleLabels,
      '.anticollision-item-row',
      expectedCount,
    );
    await this.verifySignOffsUnchanged();
  }

  async saveChecklist(): Promise<void> {
    const saveButton = this.panel.getByRole('button', { name: /\bSave$/ });
    await expect(saveButton).toBeVisible();
    if (await saveButton.isDisabled()) {
      console.log(
        '[Well Planning Checklist] Save is disabled with unchanged selections; verifying persisted values after reload.',
      );
      await this.verifySignOffsUnchanged();
      return;
    }
    await expect(saveButton).toBeEnabled();
    await saveButton.click();
    await expect(saveButton).toBeHidden({ timeout: 30000 });
    await expect(this.panel.getByRole('button', { name: /\b(?:Start|Edit)$/ })).toBeVisible();
  }

  async verifySavedChecklist(componentCount: number, analysisCount: number): Promise<void> {
    await this.openDesignTrajectory();
    await this.expandPanel();
    await this.openTab('Wellplan Components');
    await this.verifySelectedComponents(componentCount);
    await this.openTab('Anti-Collision Analysis');
    await this.verifySelectedAnalysis(analysisCount);
    const total = componentCount + analysisCount;
    await expect(this.panel).toContainText(`${total} of ${total} marked complete`);
  }
}
