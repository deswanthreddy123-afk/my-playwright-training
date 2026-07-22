import { createBdd } from 'playwright-bdd';
import { test } from '../../../src/fixtures/bdd-fixtures';

const { When, Then } = createBdd(test);

// ─── CF Plot / Ladder Plot / TC Plot panel steps ──────────────────────────────
// CF Plot: index 0 | Ladder Plot: index 1 | TC Plot: index 2
// Upload file: Testing.jpg

When('the user expands the CF Plot panel', async ({ loginPage }) => {
  await loginPage.clickdropdownpannel4();
});

// ── CF Plot (index 0) ────────────────────────────────────────────────────────

Then('the user deletes an existing CF Plot file', async ({ loginPage }) => {
  await loginPage.deleteIfExists(0);
});

When('the user uploads a file to CF Plot', async ({ loginPage }) => {
  await loginPage.uploadFile7();
});

Then('the user cancels the CF Plot delete action', async ({ loginPage }) => {
  await loginPage.clickDeleteButtonCancel(0);
});

Then('the user confirms the CF Plot delete action', async ({ loginPage }) => {
  await loginPage.clickDeleteButton(0);
});

Then('the user uploads a second file to CF Plot', async ({ loginPage }) => {
  await loginPage.uploadFile8();
});

Then('the user downloads the CF Plot file', async ({ loginPage }) => {
  await loginPage.clickDownloadButton(0);
});

Then('the user cancels the CF Plot overwrite action', async ({ loginPage }) => {
  await loginPage.clickOverwriteCancel();
});

Then('the user overwrites the CF Plot file', async ({ loginPage }) => {
  await loginPage.clickOverwrite();
});

// ── Ladder Plot (index 1) ────────────────────────────────────────────────────

Then('the user deletes an existing Ladder Plot file', async ({ loginPage }) => {
  await loginPage.deleteIfExists(1);
});

When('the user uploads a file to Ladder Plot', async ({ loginPage }) => {
  await loginPage.uploadFile9();
});

Then('the user cancels the Ladder Plot delete action', async ({ loginPage }) => {
  await loginPage.clickDeleteButtonCancel(1);
});

Then('the user confirms the Ladder Plot delete action', async ({ loginPage }) => {
  await loginPage.clickDeleteButton(1);
});

Then('the user uploads a second file to Ladder Plot', async ({ loginPage }) => {
  await loginPage.uploadFile11();
});

Then('the user downloads the Ladder Plot file', async ({ loginPage }) => {
  await loginPage.clickDownloadButton(1);
});

Then('the user cancels the Ladder Plot overwrite action', async ({ loginPage }) => {
  await loginPage.clickOverwriteCancel();
});

Then('the user overwrites the Ladder Plot file', async ({ loginPage }) => {
  await loginPage.clickOverwrite();
});

// ── TC Plot (index 2) ────────────────────────────────────────────────────────

Then('the user deletes an existing TC Plot file', async ({ loginPage }) => {
  await loginPage.deleteIfExists(2);
});

When('the user uploads a file to TC Plot', async ({ loginPage }) => {
  await loginPage.uploadFile12();
});

Then('the user cancels the TC Plot delete action', async ({ loginPage }) => {
  await loginPage.clickDeleteButtonCancel(2);
});

Then('the user confirms the TC Plot delete action', async ({ loginPage }) => {
  await loginPage.clickDeleteButton(2);
});

Then('the user uploads a second file to TC Plot', async ({ loginPage }) => {
  await loginPage.uploadFile12();
});

Then('the user downloads the TC Plot file', async ({ loginPage }) => {
  await loginPage.clickDownloadButton(2);
});

Then('the user cancels the TC Plot overwrite action', async ({ loginPage }) => {
  await loginPage.clickOverwriteCancel();
});

Then('the user overwrites the TC Plot file', async ({ loginPage }) => {
  await loginPage.clickOverwrite();
});
