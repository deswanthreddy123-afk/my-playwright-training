import { expect, Locator } from '@playwright/test';
import { LoginPage } from '../login.page';

type RevisionField = 'plan number' | 'date' | 'description';

export class PlanVersionPage extends LoginPage {
  private draft: Locator | undefined;

  private get panel(): Locator {
    return this.page.locator('digital-dos-panel-wrapper').filter({
      has: this.page.locator('.panel-title').filter({ hasText: /^\s*Plan Version\s*$/ }),
    });
  }

  private get rows(): Locator {
    return this.panel.locator('tbody tr');
  }

  private get saveButton(): Locator {
    return this.panel.getByRole('button', { name: /\bSave$/ });
  }

  private get addButton(): Locator {
    return this.panel.getByRole('button', { name: /\bAdd Revision$/ });
  }

  private get draftRow(): Locator {
    if (!this.draft) throw new Error('Create a draft revision before editing or deleting it.');
    return this.draft;
  }

  async expandPanel(): Promise<void> {
    await this.panel.getByLabel('Expand panel').click();
    await expect(this.panel.locator('.p-panel-content-container')).toBeVisible();
    await expect(this.panel.getByText('Plan Revisions', { exact: true })).toBeVisible();
    await expect(this.rows.first().getByPlaceholder('Plan #', { exact: true })).toBeVisible();
  }

  async verifyTable(): Promise<void> {
    await expect(this.panel.getByRole('columnheader')).toHaveText([
      'Plan Number',
      'Date',
      'Name',
      'Description',
      '',
    ]);
    for (const row of await this.rows.all()) {
      await expect(row.getByPlaceholder('Name', { exact: true })).toHaveAttribute('readonly', '');
      await expect(row.getByPlaceholder('Name', { exact: true })).not.toHaveValue('');
    }
    if ((await this.rows.count()) === 1) {
      await expect(this.rows.getByRole('button', { name: 'Delete', exact: true })).toBeDisabled();
    }
  }

  async verifySaveDisabled(): Promise<void> {
    await expect(this.saveButton).toBeDisabled();
  }

  private async chooseDate(row: Locator): Promise<void> {
    await row.getByPlaceholder('MM/DD/YYYY', { exact: true }).click();
    await this.page
      .getByRole('dialog', { name: 'Choose Date' })
      .getByRole('gridcell', { name: '15', exact: true })
      .click();
  }

  private async fillRevision(row: Locator, omitted?: RevisionField): Promise<void> {
    if (omitted !== 'plan number') {
      await row.getByPlaceholder('Plan #', { exact: true }).fill('PW-Revision');
    }
    if (omitted !== 'description') {
      await row
        .getByPlaceholder('Description of changes', { exact: true })
        .fill('Playwright draft validation. Not saved.');
    }
    if (omitted !== 'date') await this.chooseDate(row);
  }

  async addDraft(): Promise<void> {
    // Complete required fields locally to enable Add Revision; never save over existing records.
    for (const row of await this.rows.all()) await this.fillRevision(row);
    await expect(this.addButton).toBeEnabled();
    const before = await this.rows.count();
    await this.addButton.click();
    await expect(this.rows).toHaveCount(before + 1);
    this.draft = this.rows.nth(before);
  }

  async verifyBlankDraft(): Promise<void> {
    await expect(this.draftRow.getByPlaceholder('Plan #', { exact: true })).toHaveValue('');
    await expect(this.draftRow.getByPlaceholder('MM/DD/YYYY', { exact: true })).toHaveValue('');
    await expect(
      this.draftRow.getByPlaceholder('Description of changes', { exact: true }),
    ).toHaveValue('');
    await expect(this.draftRow.getByPlaceholder('Name', { exact: true })).not.toHaveValue('');
    await expect(this.draftRow.getByPlaceholder('Name', { exact: true })).toHaveAttribute(
      'readonly',
      '',
    );
    await expect(this.addButton).toBeDisabled();
    await this.verifySaveDisabled();
  }

  async leaveRequiredFieldBlank(field: string): Promise<void> {
    if (field !== 'plan number' && field !== 'date' && field !== 'description') {
      throw new Error(`Unknown required revision field: ${field}`);
    }
    await this.fillRevision(this.draftRow, field);
    const placeholders: Record<RevisionField, string> = {
      'plan number': 'Plan #',
      date: 'MM/DD/YYYY',
      description: 'Description of changes',
    };
    await expect(this.draftRow.getByPlaceholder(placeholders[field], { exact: true })).toHaveValue(
      '',
    );
    await expect(this.saveButton).toBeDisabled();
    await expect(this.addButton).toBeDisabled();
  }

  async verifyValidDraft(): Promise<void> {
    await this.fillRevision(this.draftRow);
    await expect(this.saveButton).toBeEnabled();
    await expect(this.addButton).toBeEnabled();
  }

  async deleteDraft(confirm: boolean): Promise<void> {
    const before = await this.rows.count();
    await this.draftRow.getByRole('button', { name: 'Delete', exact: true }).click();
    const dialog = this.page.getByRole('alertdialog').filter({ visible: true });
    await expect(dialog).toContainText('Are you sure you want to delete this plan revision?');
    await dialog.getByRole('button', { name: confirm ? 'Yes' : 'No', exact: true }).click();
    await expect(dialog).toHaveCount(0);
    await expect(this.rows).toHaveCount(confirm ? before - 1 : before);
    if (confirm) this.draft = undefined;
    else await this.verifyBlankDraft();
  }
}
