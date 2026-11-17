import { createBdd } from 'playwright-bdd';
import { test } from '../../../../src/fixtures/bdd-fixtures';

const { Given, When, Then } = createBdd(test);

Given('the user opens the Deswanth Design for Well Plan', async ({ wellPlanPage }) => {
  await wellPlanPage.openDesignTrajectory();
});

When('the user expands the Well Plan & Consideration panel', async ({ wellPlanPage }) => {
  await wellPlanPage.expandPanel();
});

Then(
  'the user deletes an existing file from Well Plan & Consideration',
  async ({ wellPlanPage }) => {
    await wellPlanPage.ensureFile();
    await wellPlanPage.deleteFile();
  },
);

When('the user uploads a file to Well Plan & Consideration', async ({ wellPlanPage }) => {
  await wellPlanPage.upload();
});

Then('the user cancels the Well Plan delete action', async ({ wellPlanPage }) => {
  await wellPlanPage.cancelDelete();
});

Then('the user confirms the Well Plan delete action', async ({ wellPlanPage }) => {
  await wellPlanPage.confirmDelete();
});

Then('the user uploads a second file to Well Plan & Consideration', async ({ wellPlanPage }) => {
  await wellPlanPage.uploadSecond();
});

Then('the user uploads a Well Plan file to Schematic', async ({ wellPlanPage }) => {
  await wellPlanPage.uploadToSchematic();
});

Then('the user downloads the Well Plan file', async ({ wellPlanPage }) => {
  await wellPlanPage.downloadFile();
});

When('the user attempts to overwrite the Well Plan file', async ({ wellPlanPage }) => {
  await wellPlanPage.beginOverwrite();
});

Then('the user cancels the Well Plan overwrite action', async ({ wellPlanPage }) => {
  await wellPlanPage.cancelOverwrite();
});

Then('the user overwrites the Well Plan file', async ({ wellPlanPage }) => {
  await wellPlanPage.overwrite();
});
