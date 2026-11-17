import { expect, Locator } from '@playwright/test';
import { LoginPage } from '../login.page';

export type DesVerificationSection = {
  name: string;
  questions: number;
};

const readOnlyPolicyQuestion = 'Is the selected policy more stringent than Halliburton Standard?';

export class DesVerificationChecklistPage extends LoginPage {
  private sections: DesVerificationSection[] = [];
  private policyAnswer: string | undefined;

  private get panel(): Locator {
    return this.page.locator('digital-dos-panel-wrapper').filter({
      has: this.page.locator('.panel-title').filter({
        hasText: /^\s*DES Verification Checklist\s*$/,
      }),
    });
  }

  async expandPanel(): Promise<void> {
    await this.panel.getByLabel('Expand panel').click();
    await expect(this.panel.locator('.p-panel-content-container')).toBeVisible();
    await expect(this.panel.getByRole('button', { name: /\bEdit$/ })).toBeVisible({
      timeout: 30000,
    });
  }

  async startEditing(): Promise<void> {
    await this.panel.getByRole('button', { name: /\bEdit$/ }).click();
    await expect(this.panel.getByRole('button', { name: /\bSave$/ })).toBeVisible();
  }

  private async openQuestionnaire(name: string): Promise<Locator> {
    if (name === 'Sign-Offs & Approvals') {
      throw new Error('Sign-Offs & Approvals is not a questionnaire tab.');
    }
    const tab = this.panel.getByRole('tab', { name, exact: true });
    await tab.click();
    await expect(tab).toHaveAttribute('aria-selected', 'true');
    const section = this.panel.getByRole('tabpanel', { name, exact: true });
    await expect(section).toBeVisible();
    return section;
  }

  private policyRow(section: Locator): Locator {
    return section.getByRole('row').filter({
      has: this.page.getByText(readOnlyPolicyQuestion, { exact: true }),
    });
  }

  private async preservePolicyAnswer(section: Locator): Promise<void> {
    const row = this.policyRow(section);
    await expect(row.getByRole('radio')).toHaveCount(3);
    for (const radio of await row.getByRole('radio').all()) await expect(radio).toBeDisabled();
    for (const answer of ['Yes', 'No', 'N/A']) {
      if (await row.getByRole('radio', { name: answer, exact: true }).isChecked()) {
        this.policyAnswer = answer;
        return;
      }
    }
    throw new Error('The read-only policy question must have an existing answer to preserve.');
  }

  private async verifyAnswers(section: Locator, name: string, questions: number): Promise<void> {
    await expect(section.getByRole('radio', { name: 'Yes', exact: true })).toHaveCount(questions);
    await expect(section.getByRole('radio')).toHaveCount(questions * 3);
    let yesAnswers = section.getByRole('radio', { name: 'Yes', exact: true });
    if (name === 'Anticollision') {
      if (this.policyAnswer === undefined) {
        throw new Error('Capture the read-only policy answer before verifying Anticollision.');
      }
      await expect(
        this.policyRow(section).getByRole('radio', { name: this.policyAnswer, exact: true }),
      ).toBeChecked();
      yesAnswers = section
        .getByRole('row')
        .filter({
          hasNot: this.page.getByText(readOnlyPolicyQuestion, { exact: true }),
        })
        .getByRole('radio', { name: 'Yes', exact: true });
      await expect(yesAnswers).toHaveCount(questions - 1);
    }
    for (const answer of await yesAnswers.all()) await expect(answer).toBeChecked();
  }

  async selectYesInAllTabs(sections: DesVerificationSection[]): Promise<void> {
    await expect(this.panel.getByRole('tab')).toHaveText([
      'Sign-Offs & Approvals',
      ...sections.map(({ name }) => name),
    ]);
    for (const { name, questions } of sections) {
      const section = await this.openQuestionnaire(name);
      if (name === 'Anticollision') await this.preservePolicyAnswer(section);
      await section.getByRole('button', { name: /\bYes to all$/ }).click();
      for (const answer of await section.getByRole('radio', { name: 'Yes', exact: true }).all()) {
        if (await answer.isEnabled()) await answer.check();
      }
      await this.verifyAnswers(section, name, questions);
    }
    this.sections = sections;
  }

  async saveChecklist(): Promise<void> {
    const saveButton = this.panel.getByRole('button', { name: /\bSave$/ });
    await expect(saveButton).toBeVisible();
    if (await saveButton.isDisabled()) {
      console.log(
        '[DES Verification Checklist] Save is disabled with unchanged answers; verifying persisted answers after reload.',
      );
      return;
    }
    await saveButton.click();
    await expect(saveButton).toBeHidden({ timeout: 30000 });
    await expect(this.panel.getByRole('button', { name: /\bEdit$/ })).toBeVisible();
  }

  async verifySavedAnswers(totalAnswers: number): Promise<void> {
    if (this.sections.length === 0) {
      throw new Error('Select Yes in the questionnaire tabs before verifying saved answers.');
    }
    expect(this.sections.reduce((total, { questions }) => total + questions, 0) - 1).toBe(
      totalAnswers,
    );
    await this.openDesignTrajectory();
    await this.expandPanel();
    await expect(this.panel.getByRole('tab')).toHaveText([
      'Sign-Offs & Approvals',
      ...this.sections.map(({ name }) => name),
    ]);
    for (const { name, questions } of this.sections) {
      const section = await this.openQuestionnaire(name);
      await this.verifyAnswers(section, name, questions);
    }
  }
}
