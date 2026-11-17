import { expect, Locator } from '@playwright/test';
import { LoginPage } from '../login.page';

export class RiskAssessmentPage extends LoginPage {
  private selectedWell: string | undefined;

  private get panel(): Locator {
    return this.page.locator('digital-dos-panel-wrapper').filter({
      has: this.page.locator('.panel-title').filter({
        hasText: /^\s*Risk Assessment\s*$/,
      }),
    });
  }

  private get assessment(): Locator {
    if (!this.selectedWell)
      throw new Error('Select an offset well before answering risk questions.');
    return this.panel.getByRole('tabpanel', { name: this.selectedWell, exact: true });
  }

  async expandPanel(): Promise<void> {
    await this.panel.getByLabel('Expand panel').click();
    await expect(this.panel.locator('.p-panel-content-container')).toBeVisible();
    await expect(this.panel.getByRole('tab').first()).toBeVisible({ timeout: 30000 });
  }

  async selectWell(well: string): Promise<void> {
    const tab = this.panel.getByRole('tab', { name: well, exact: true });
    await expect(tab).toBeVisible({ timeout: 30000 });
    await tab.click();
    await expect(tab).toHaveAttribute('aria-selected', 'true');
    this.selectedWell = well;
    await expect(this.assessment).toBeVisible();
    await expect(this.assessment.getByRole('textbox').first()).toBeEditable();
  }

  async fillAnswers(questions: string[], answer: string): Promise<void> {
    await expect(this.assessment.getByRole('textbox')).toHaveCount(questions.length);
    for (const question of questions) {
      const field = this.assessment.getByRole('textbox', { name: question, exact: true });
      await field.fill(answer);
      await field.press('Tab');
      await expect(field).toHaveValue(answer);
    }
  }

  async verifyAnswers(count: number, answer: string): Promise<void> {
    const fields = this.assessment.getByRole('textbox');
    await expect(fields).toHaveCount(count);
    for (const field of await fields.all()) await expect(field).toHaveValue(answer);
  }
}
