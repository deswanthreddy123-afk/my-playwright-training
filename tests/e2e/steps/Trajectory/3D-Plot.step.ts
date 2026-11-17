import { createBdd } from 'playwright-bdd';
import { test } from '../../../../src/fixtures/bdd-fixtures';

const { Given, When, Then } = createBdd(test);

Given('the user opens the Deswanth Design for 3D Plot', async ({ threeDPlotPage }) => {
  await threeDPlotPage.openDesignTrajectory();
});

When('the user expands the 3D Plot panel', async ({ threeDPlotPage }) => {
  await threeDPlotPage.expandPanel();
});

Then('the user deletes an existing 3D Plot file', async ({ threeDPlotPage }) => {
  await threeDPlotPage.ensureFile();
  await threeDPlotPage.deleteFile();
});

When('the user uploads a file to 3D Plot', async ({ threeDPlotPage }) => {
  await threeDPlotPage.upload();
});

Then('the user cancels the 3D Plot delete action', async ({ threeDPlotPage }) => {
  await threeDPlotPage.cancelDelete();
});

Then('the user confirms the 3D Plot delete action', async ({ threeDPlotPage }) => {
  await threeDPlotPage.confirmDelete();
});

Then('the user uploads a second file to 3D Plot', async ({ threeDPlotPage }) => {
  await threeDPlotPage.uploadSecond();
});

Then('the user uploads a 3D Plot file to Schematic', async ({ threeDPlotPage }) => {
  await threeDPlotPage.uploadToSchematic();
});

Then('the user downloads the 3D Plot file', async ({ threeDPlotPage }) => {
  await threeDPlotPage.downloadFile();
});

When('the user attempts to overwrite the 3D Plot file', async ({ threeDPlotPage }) => {
  await threeDPlotPage.beginOverwrite();
});

Then('the user cancels the 3D Plot overwrite action', async ({ threeDPlotPage }) => {
  await threeDPlotPage.cancelOverwrite();
});

Then('the user overwrites the 3D Plot file', async ({ threeDPlotPage }) => {
  await threeDPlotPage.overwrite();
});
