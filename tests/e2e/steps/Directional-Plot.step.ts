import { createBdd } from 'playwright-bdd';
import { test } from '../../../src/fixtures/bdd-fixtures';

const { When, Then } = createBdd(test);

// ─── Directional Plot panel steps ─────────────────────────────────────────────
// Page-level file index 0  |  Upload file: MFA Enrollemnt Intructions.pdf

When('the user expands the Directional Plot panel', async ({ loginPage }) => {
  await loginPage.clickdropdownpannel6();
});

Then('the user deletes an existing Directional Plot file', async ({ loginPage }) => {
  await loginPage.deleteIfExists(0);
});

When('the user uploads a file to Directional Plot', async ({ loginPage }) => {
  await loginPage.uploadFileDP();
});

Then('the user cancels the Directional Plot delete action', async ({ loginPage }) => {
  await loginPage.clickDeleteButtonCancel(0);
});

Then('the user confirms the Directional Plot delete action', async ({ loginPage }) => {
  await loginPage.clickDeleteButton(0);
});

Then('the user uploads a second file to Directional Plot', async ({ loginPage }) => {
  await loginPage.uploadFileDPFinal();
});

Then('the user uploads a Directional Plot file to Schematic', async ({ loginPage }) => {
  await loginPage.uploadFileDP();
});

Then('the user downloads the Directional Plot file', async ({ loginPage }) => {
  await loginPage.clickDownloadButton(0);
});

Then('the user cancels the Directional Plot overwrite action', async ({ loginPage }) => {
  await loginPage.clickOverwriteCancel();
});

Then('the user overwrites the Directional Plot file', async ({ loginPage }) => {
  await loginPage.clickOverwrite();
});
