import { createBdd } from 'playwright-bdd';
import { test } from '../../../src/fixtures/bdd-fixtures';

const { When, Then } = createBdd(test);

// ─── Plan Version panel steps ─────────────────────────────────────────────────
// File index 1 on the Trajectory page  |  Upload file: Testing.jpg

When('the user expands the Plan Version panel', async ({ loginPage }) => {
  await loginPage.clickPlanVersionPanel();
});

Then('the user deletes an existing file from Plan Version', async ({ loginPage }) => {
  await loginPage.deleteIfExists(1);
});

When('the user uploads a file to Plan Version', async ({ loginPage }) => {
  await loginPage.uploadFilePlanVersion();
});

Then('the user cancels the Plan Version delete action', async ({ loginPage }) => {
  await loginPage.clickDeleteButtonCancel(1);
});

Then('the user confirms the Plan Version delete action', async ({ loginPage }) => {
  await loginPage.clickDeleteButton(1);
});

Then('the user uploads a second file to Plan Version', async ({ loginPage }) => {
  await loginPage.uploadFile1PlanVersion();
});

Then('the user uploads a Plan Version file to Schematic', async ({ loginPage }) => {
  await loginPage.uploadFile2PlanVersion();
});

Then('the user downloads the Plan Version file', async ({ loginPage }) => {
  await loginPage.clickDownloadButton(1);
});

Then('the user cancels the Plan Version overwrite action', async ({ loginPage }) => {
  await loginPage.clickOverwriteCancel();
});

Then('the user overwrites the Plan Version file', async ({ loginPage }) => {
  await loginPage.clickOverwrite();
});
