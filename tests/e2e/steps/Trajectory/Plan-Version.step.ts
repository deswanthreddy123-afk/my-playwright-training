import { createBdd } from 'playwright-bdd';
import { test } from '../../../../src/fixtures/bdd-fixtures';

const { Given, When, Then } = createBdd(test);

Given('the user opens the Deswanth Design for Plan Version', async ({ planVersionPage }) => {
  await planVersionPage.openDesignTrajectory();
  await planVersionPage.expandPanel();
});

Then(
  'the Plan Revisions table displays its columns and read-only authors',
  async ({ planVersionPage }) => {
    await planVersionPage.verifyTable();
  },
);

Then('the Plan Version Save button is disabled', async ({ planVersionPage }) => {
  await planVersionPage.verifySaveDisabled();
});

When('the user adds an unsaved plan revision', async ({ planVersionPage }) => {
  await planVersionPage.addDraft();
});

Then('the new plan revision is blank with a read-only author', async ({ planVersionPage }) => {
  await planVersionPage.verifyBlankDraft();
});

When('the user leaves the revision {string} blank', async ({ planVersionPage }, field: string) => {
  await planVersionPage.leaveRequiredFieldBlank(field);
});

Then('a complete revision enables Save and Add Revision', async ({ planVersionPage }) => {
  await planVersionPage.verifyValidDraft();
});

Then('the user cancels deleting the unsaved plan revision', async ({ planVersionPage }) => {
  await planVersionPage.deleteDraft(false);
});

Then('the user confirms deleting the unsaved plan revision', async ({ planVersionPage }) => {
  await planVersionPage.deleteDraft(true);
});
