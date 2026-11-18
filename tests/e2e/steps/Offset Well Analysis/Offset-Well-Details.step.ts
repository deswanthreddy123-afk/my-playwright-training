import { createBdd } from 'playwright-bdd';
import { test } from '../../../../src/fixtures/bdd-fixtures';

const { Given, When, Then } = createBdd(test);

Given(
  'the user opens Drilling Engineering under Offset Well Analysis',
  async ({ offsetWellDetailsPage }) => {
    await offsetWellDetailsPage.openDrillingEngineering();
  },
);

When('the user expands the Offset Well Details panel', async ({ offsetWellDetailsPage }) => {
  await offsetWellDetailsPage.expandPanel();
});

Then('the user deletes an existing Offset Well Details file', async ({ offsetWellDetailsPage }) => {
  await offsetWellDetailsPage.ensureFile();
  await offsetWellDetailsPage.deleteFile();
});

When('the user uploads a file to Offset Well Details', async ({ offsetWellDetailsPage }) => {
  await offsetWellDetailsPage.upload();
});

Then('the user cancels the Offset Well Details delete action', async ({ offsetWellDetailsPage }) => {
  await offsetWellDetailsPage.cancelDelete();
});

Then('the user confirms the Offset Well Details delete action', async ({ offsetWellDetailsPage }) => {
  await offsetWellDetailsPage.confirmDelete();
});

Then('the user uploads a second file to Offset Well Details', async ({ offsetWellDetailsPage }) => {
  await offsetWellDetailsPage.uploadSecond();
});

Then(
  'the user uploads an Offset Well Details file to Schematic',
  async ({ offsetWellDetailsPage }) => {
    await offsetWellDetailsPage.uploadToSchematic();
  },
);

Then('the user downloads the Offset Well Details file', async ({ offsetWellDetailsPage }) => {
  await offsetWellDetailsPage.downloadFile();
});

When(
  'the user attempts to overwrite the Offset Well Details file',
  async ({ offsetWellDetailsPage }) => {
    await offsetWellDetailsPage.beginOverwrite();
  },
);

Then(
  'the user cancels the Offset Well Details overwrite action',
  async ({ offsetWellDetailsPage }) => {
    await offsetWellDetailsPage.cancelOverwrite();
  },
);

Then('the user overwrites the Offset Well Details file', async ({ offsetWellDetailsPage }) => {
  await offsetWellDetailsPage.overwrite();
});
