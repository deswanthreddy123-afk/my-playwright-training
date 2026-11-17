import { createBdd } from 'playwright-bdd';
import { test } from '../../../../src/fixtures/bdd-fixtures';

const { Given, When, Then } = createBdd(test);

Given('the user opens the Deswanth Design for CF Ladder TC Plot', async ({ cfPlotPage }) => {
  await cfPlotPage.openDesignTrajectory();
});

When('the user expands the CF Plot panel', async ({ cfPlotPage }) => {
  await cfPlotPage.expandPanel();
});

Then('the user deletes an existing CF Plot file', async ({ cfPlotPage }) => {
  await cfPlotPage.ensureFile();
  await cfPlotPage.deleteFile();
});

When('the user uploads a file to CF Plot', async ({ cfPlotPage }) => {
  await cfPlotPage.upload();
});

Then('the user cancels the CF Plot delete action', async ({ cfPlotPage }) => {
  await cfPlotPage.cancelDelete();
});

Then('the user confirms the CF Plot delete action', async ({ cfPlotPage }) => {
  await cfPlotPage.confirmDelete();
});

Then('the user uploads a second file to CF Plot', async ({ cfPlotPage }) => {
  await cfPlotPage.uploadSecond();
});

Then('the user downloads the CF Plot file', async ({ cfPlotPage }) => {
  await cfPlotPage.downloadFile();
});

When('the user attempts to overwrite the CF Plot file', async ({ cfPlotPage }) => {
  await cfPlotPage.beginOverwrite();
});

Then('the user cancels the CF Plot overwrite action', async ({ cfPlotPage }) => {
  await cfPlotPage.cancelOverwrite();
});

Then('the user overwrites the CF Plot file', async ({ cfPlotPage }) => {
  await cfPlotPage.overwrite();
});

Then('the user deletes an existing Ladder Plot file', async ({ ladderPlotPage }) => {
  await ladderPlotPage.ensureFile();
  await ladderPlotPage.deleteFile();
});

When('the user uploads a file to Ladder Plot', async ({ ladderPlotPage }) => {
  await ladderPlotPage.upload();
});

Then('the user cancels the Ladder Plot delete action', async ({ ladderPlotPage }) => {
  await ladderPlotPage.cancelDelete();
});

Then('the user confirms the Ladder Plot delete action', async ({ ladderPlotPage }) => {
  await ladderPlotPage.confirmDelete();
});

Then('the user uploads a second file to Ladder Plot', async ({ ladderPlotPage }) => {
  await ladderPlotPage.uploadSecond();
});

Then('the user downloads the Ladder Plot file', async ({ ladderPlotPage }) => {
  await ladderPlotPage.downloadFile();
});

When('the user attempts to overwrite the Ladder Plot file', async ({ ladderPlotPage }) => {
  await ladderPlotPage.beginOverwrite();
});

Then('the user cancels the Ladder Plot overwrite action', async ({ ladderPlotPage }) => {
  await ladderPlotPage.cancelOverwrite();
});

Then('the user overwrites the Ladder Plot file', async ({ ladderPlotPage }) => {
  await ladderPlotPage.overwrite();
});

Then('the user deletes an existing TC Plot file', async ({ tcPlotPage }) => {
  await tcPlotPage.ensureFile();
  await tcPlotPage.deleteFile();
});

When('the user uploads a file to TC Plot', async ({ tcPlotPage }) => {
  await tcPlotPage.upload();
});

Then('the user cancels the TC Plot delete action', async ({ tcPlotPage }) => {
  await tcPlotPage.cancelDelete();
});

Then('the user confirms the TC Plot delete action', async ({ tcPlotPage }) => {
  await tcPlotPage.confirmDelete();
});

Then('the user uploads a second file to TC Plot', async ({ tcPlotPage }) => {
  await tcPlotPage.uploadSecond();
});

Then('the user downloads the TC Plot file', async ({ tcPlotPage }) => {
  await tcPlotPage.downloadFile();
});

When('the user attempts to overwrite the TC Plot file', async ({ tcPlotPage }) => {
  await tcPlotPage.beginOverwrite();
});

Then('the user cancels the TC Plot overwrite action', async ({ tcPlotPage }) => {
  await tcPlotPage.cancelOverwrite();
});

Then('the user overwrites the TC Plot file', async ({ tcPlotPage }) => {
  await tcPlotPage.overwrite();
});
