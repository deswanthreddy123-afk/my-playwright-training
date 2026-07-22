import { createBdd } from 'playwright-bdd';
import { test } from '../../../src/fixtures/bdd-fixtures';

const { When, Then } = createBdd(test);

// ─── Targets Sizing panel steps ───────────────────────────────────────────────
// Section-scoped via targetsSizingSection  |  Upload file: Testing.jpg

When('the user expands the Targets Sizing panel', async ({ loginPage }) => {
  await loginPage.clickTargetsSizingPanel();
});

Then('the user deletes an existing file from Targets Sizing', async ({ loginPage }) => {
  await loginPage.deleteIfExists(0);
});

When('the user uploads a file to Targets Sizing', async ({ loginPage }) => {
  await loginPage.uploadFileTargetsSizing();
});

Then('the user cancels the Targets Sizing delete action', async ({ loginPage }) => {
  await loginPage.clickDeleteButtonCancel(0);
});

Then('the user confirms the Targets Sizing delete action', async ({ loginPage }) => {
  await loginPage.clickDeleteButton(0);
});

Then('the user uploads a second file to Targets Sizing', async ({ loginPage }) => {
  await loginPage.uploadFile1TargetsSizing();
});

Then('the user uploads a Targets Sizing file to Schematic', async ({ loginPage }) => {
  await loginPage.uploadFile2TargetsSizing();
});

Then('the user downloads the Targets Sizing file', async ({ loginPage }) => {
  await loginPage.clickDownloadButton(0);
});

Then('the user cancels the Targets Sizing overwrite action', async ({ loginPage }) => {
  await loginPage.clickOverwriteCancel();
});

Then('the user overwrites the Targets Sizing file', async ({ loginPage }) => {
  await loginPage.clickOverwrite();
});
