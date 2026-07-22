import { createBdd } from 'playwright-bdd';
import { test } from '../../../src/fixtures/bdd-fixtures';

const { When, Then } = createBdd(test);

// ─── Well Plan & Consideration panel steps ────────────────────────────────────
// Section-scoped via wellPlanSection  |  Upload file: Testing.jpg

When('the user expands the Well Plan & Consideration panel', async ({ loginPage }) => {
  await loginPage.clickWellPlanPanel();
});

Then('the user deletes an existing file from Well Plan & Consideration', async ({ loginPage }) => {
  await loginPage.deleteIfExists(0);
});

When('the user uploads a file to Well Plan & Consideration', async ({ loginPage }) => {
  await loginPage.uploadFileWellPlan();
});

Then('the user cancels the Well Plan delete action', async ({ loginPage }) => {
  await loginPage.clickDeleteButtonCancel(0);
});

Then('the user confirms the Well Plan delete action', async ({ loginPage }) => {
  await loginPage.clickDeleteButton(0);
});

Then('the user uploads a second file to Well Plan & Consideration', async ({ loginPage }) => {
  await loginPage.uploadFile1WellPlan();
});

Then('the user uploads a Well Plan file to Schematic', async ({ loginPage }) => {
  await loginPage.uploadFile2WellPlan();
});

Then('the user downloads the Well Plan file', async ({ loginPage }) => {
  await loginPage.clickDownloadButton(0);
});

Then('the user cancels the Well Plan overwrite action', async ({ loginPage }) => {
  await loginPage.clickOverwriteCancel();
});

Then('the user overwrites the Well Plan file', async ({ loginPage }) => {
  await loginPage.clickOverwrite();
});
