import { createBdd } from 'playwright-bdd';
import { test } from '../../../../src/fixtures/bdd-fixtures';

const { Given, When, Then } = createBdd(test);

Given(
  'the user opens the Deswanth Design for Directional Plot',
  async ({ directionalPlotPage }) => {
    await directionalPlotPage.openDesignTrajectory();
  },
);

When('the user expands the Directional Plot panel', async ({ directionalPlotPage }) => {
  await directionalPlotPage.expandPanel();
});

Then('the user deletes an existing Directional Plot file', async ({ directionalPlotPage }) => {
  await directionalPlotPage.ensureFile();
  await directionalPlotPage.deleteFile();
});

When('the user uploads a file to Directional Plot', async ({ directionalPlotPage }) => {
  await directionalPlotPage.upload();
});

Then('the user cancels the Directional Plot delete action', async ({ directionalPlotPage }) => {
  await directionalPlotPage.cancelDelete();
});

Then('the user confirms the Directional Plot delete action', async ({ directionalPlotPage }) => {
  await directionalPlotPage.confirmDelete();
});

Then('the user uploads a second file to Directional Plot', async ({ directionalPlotPage }) => {
  await directionalPlotPage.uploadSecond();
});

Then('the user uploads a Directional Plot file to Schematic', async ({ directionalPlotPage }) => {
  await directionalPlotPage.uploadToSchematic();
});

Then('the user downloads the Directional Plot file', async ({ directionalPlotPage }) => {
  await directionalPlotPage.downloadFile();
});

When(
  'the user attempts to overwrite the Directional Plot file',
  async ({ directionalPlotPage }) => {
    await directionalPlotPage.beginOverwrite();
  },
);

Then('the user cancels the Directional Plot overwrite action', async ({ directionalPlotPage }) => {
  await directionalPlotPage.cancelOverwrite();
});

Then('the user overwrites the Directional Plot file', async ({ directionalPlotPage }) => {
  await directionalPlotPage.overwrite();
});
