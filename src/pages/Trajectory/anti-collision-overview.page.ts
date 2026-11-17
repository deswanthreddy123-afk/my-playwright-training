import { expect, Locator } from '@playwright/test';
import { LoginPage } from '../login.page';

const surveyQuestions = [
  'Are we confident we can provide the planned survey program?',
  'Does backup survey program that will deteriorate the EOU?',
  'Are we expecting magnetic interference? (close Approach)',
] as const;
const policyQuestion = 'What Policy is being followed for AC criteria?';
const stringentQuestion = 'Is the selected policy more stringent than Halliburton Standard?';
const sigmaQuestion = 'What \u03c3 will be used?';

export type AntiCollisionWellField = {
  field: string;
  value: string;
};

export class AntiCollisionOverviewPage extends LoginPage {
  private wellDetails: AntiCollisionWellField[] | undefined;
  private addedWellRow: Locator | undefined;

  private get panel(): Locator {
    return this.page.locator('digital-dos-panel-wrapper').filter({
      has: this.page.locator('.panel-title').filter({
        hasText: /^\s*Anti-Collision Overview\s*$/,
      }),
    });
  }

  private questionRow(question: string): Locator {
    return this.panel.locator('.question-row').filter({
      has: this.page.getByText(question, { exact: true }),
    });
  }

  private textAnswer(question: string): Locator {
    return this.questionRow(question).getByRole('textbox');
  }

  async expandPanel(): Promise<void> {
    await this.panel.getByLabel('Expand panel').click();
    await expect(this.panel.locator('.p-panel-content-container')).toBeVisible();
    for (const question of surveyQuestions) {
      await expect(this.textAnswer(question)).toBeEditable({ timeout: 30000 });
    }
    await expect(this.textAnswer(policyQuestion)).toBeEditable();
    await expect(this.questionRow(stringentQuestion).getByRole('radio')).toHaveCount(2);
    await expect(this.questionRow(sigmaQuestion).getByRole('spinbutton')).toBeEditable();
  }

  async fillSurveyAnswers(program: string, backup: string, interference: string): Promise<void> {
    const answers = [program, backup, interference];
    for (const [index, question] of surveyQuestions.entries()) {
      const field = this.textAnswer(question);
      await field.fill(answers[index]);
      await field.press('Tab');
    }
  }

  async fillPolicy(policy: string): Promise<void> {
    const field = this.textAnswer(policyQuestion);
    await field.fill(policy);
    await field.press('Tab');
  }

  async selectStringentPolicy(answer: string): Promise<void> {
    if (answer !== 'Yes' && answer !== 'No') {
      throw new Error(`Unsupported more stringent policy answer: ${answer}`);
    }
    await this.questionRow(stringentQuestion)
      .getByRole('radio', { name: answer, exact: true })
      .check();
  }

  async fillSigma(sigma: string): Promise<void> {
    const field = this.questionRow(sigmaQuestion).getByRole('spinbutton');
    await field.fill(sigma);
    await field.press('Tab');
  }

  async verifySurveyAnswers(program: string, backup: string, interference: string): Promise<void> {
    const answers = [program, backup, interference];
    for (const [index, question] of surveyQuestions.entries()) {
      await expect(this.textAnswer(question)).toHaveValue(answers[index]);
    }
  }

  async verifyPolicyAnswers(policy: string, stringent: string, sigma: string): Promise<void> {
    await expect(this.textAnswer(policyQuestion)).toHaveValue(policy);
    await expect(
      this.questionRow(stringentQuestion).getByRole('radio', { name: stringent, exact: true }),
    ).toBeChecked();
    await expect(this.questionRow(sigmaQuestion).getByRole('spinbutton')).toHaveValue(sigma);
  }

  private get addWellDrawer(): Locator {
    return this.page.getByRole('complementary').filter({
      has: this.page.getByText('Add Well', { exact: true }),
    });
  }

  private wellField(label: string): Locator {
    return this.addWellDrawer.locator('.drawer-field').filter({
      has: this.page.locator('label').filter({ hasText: label }),
    });
  }

  async openAddWell(): Promise<void> {
    await this.panel.getByRole('button', { name: /\bAdd Well$/ }).click();
    await expect(this.addWellDrawer).toBeVisible();
    await expect(
      this.addWellDrawer.getByPlaceholder('Enter offset well name', { exact: true }),
    ).toBeEditable();
  }

  async fillWellDetails(details: AntiCollisionWellField[]): Promise<void> {
    for (const { field, value } of details) {
      const control = this.wellField(field).locator('input, textarea, [role="combobox"]');
      await expect(control).toHaveCount(1);
      const isDropdown = (await control.getAttribute('role')) === 'combobox';
      if (field === 'Offshore well?' || field === 'PTD Level') {
        await expect(control).toBeDisabled();
      } else if (isDropdown) {
        await control.click();
        const options = this.page.getByRole('listbox').filter({ visible: true });
        await expect(options).toHaveCount(1);
        await options.getByRole('option', { name: value, exact: true }).click();
        await expect(options).toHaveCount(0);
      } else {
        await control.fill(value);
        await control.press('Tab');
      }
    }
    // PTD Level recalculates after the reviewer escalation choice.
    for (const { field, value } of details) {
      const control = this.wellField(field).locator('input, textarea, [role="combobox"]');
      if ((await control.getAttribute('role')) === 'combobox') {
        await expect(control).toHaveText(value);
      } else await expect(control).toHaveValue(value);
    }
    this.wellDetails = details;
  }

  private wellValue(field: string): string {
    const detail = this.wellDetails?.find((detail) => detail.field === field);
    if (!detail) throw new Error(`Fill the Add Well field "${field}" before submitting.`);
    return detail.value;
  }

  async addWell(): Promise<void> {
    const matchingRows = this.panel
      .getByRole('row')
      .filter({
        has: this.page.getByRole('cell', {
          name: this.wellValue('Offset well name'),
          exact: true,
        }),
      })
      .filter({
        has: this.page.getByRole('cell', { name: this.wellValue('Section'), exact: true }),
      });
    const before = await matchingRows.count();
    const addButton = this.addWellDrawer.getByRole('button', { name: 'Add', exact: true });
    await expect(addButton).toBeEnabled();
    await addButton.click();
    await expect(this.addWellDrawer).toBeHidden();
    await expect(matchingRows).toHaveCount(before + 1);
    this.addedWellRow = matchingRows.nth(before);
  }

  async verifyAddedWell(): Promise<void> {
    if (!this.addedWellRow || !this.wellDetails) {
      throw new Error('Add the filled well before verifying the summary row.');
    }
    await expect(this.panel.getByRole('columnheader')).toHaveText([
      ...this.wellDetails.map(({ field }) => field),
      'Actions',
    ]);
    const cells = this.addedWellRow.getByRole('cell');
    await expect(cells).toHaveCount(this.wellDetails.length + 1);
    for (const [index, { value }] of this.wellDetails.entries()) {
      await expect(cells.nth(index)).toHaveText(value);
    }
  }
}
