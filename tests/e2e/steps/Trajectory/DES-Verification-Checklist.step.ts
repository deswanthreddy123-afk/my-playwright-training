import { createBdd, DataTable } from 'playwright-bdd';
import { test } from '../../../../src/fixtures/bdd-fixtures';

const { Given, When, Then } = createBdd(test);

Given(
  'the user opens the Deswanth Design for DES Verification Checklist',
  async ({ desVerificationChecklistPage }) => {
    await desVerificationChecklistPage.openDesignTrajectory();
  },
);

When(
  'the user expands the DES Verification Checklist panel',
  async ({ desVerificationChecklistPage }) => {
    await desVerificationChecklistPage.expandPanel();
  },
);

When(
  'the user clicks Edit in DES Verification Checklist',
  async ({ desVerificationChecklistPage }) => {
    await desVerificationChecklistPage.startEditing();
  },
);

When(
  'the user selects Yes to all in every DES questionnaire tab:',
  async ({ desVerificationChecklistPage }, table: DataTable) => {
    const sections = table.hashes().map(({ Tab, Questions }) => {
      const questions = Number(Questions);
      if (!Number.isSafeInteger(questions) || questions <= 0) {
        throw new Error(`Invalid question count for DES tab "${Tab}": ${Questions}`);
      }
      return { name: Tab, questions };
    });
    await desVerificationChecklistPage.selectYesInAllTabs(sections);
  },
);

When(
  'the user saves the DES Verification Checklist if there are changes',
  async ({ desVerificationChecklistPage }) => {
    await desVerificationChecklistPage.saveChecklist();
  },
);

Then(
  'all {int} editable DES answers should remain Yes after reload and the read-only policy answer should be unchanged',
  async ({ desVerificationChecklistPage }, total: number) => {
    await desVerificationChecklistPage.verifySavedAnswers(total);
  },
);
