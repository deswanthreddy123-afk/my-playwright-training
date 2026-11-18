import { createBdd } from 'playwright-bdd';
import { test } from '../../../../src/fixtures/bdd-fixtures';

const { Given, When, Then } = createBdd(test);

Given(
  'the user opens Subsurface under Offset Well Analysis',
  async ({ noDrillingSurprisesPage }) => {
    await noDrillingSurprisesPage.openSubsurface();
  },
);

When('the user expands the No Drilling Surprises panel', async ({ noDrillingSurprisesPage }) => {
  await noDrillingSurprisesPage.expandPanel();
});

Then(
  'the user deletes an existing No Drilling Surprises file',
  async ({ noDrillingSurprisesPage }) => {
    await noDrillingSurprisesPage.ensureFile();
    await noDrillingSurprisesPage.deleteFile();
  },
);

When('the user uploads a file to No Drilling Surprises', async ({ noDrillingSurprisesPage }) => {
  await noDrillingSurprisesPage.upload();
});

Then(
  'the user cancels the No Drilling Surprises delete action',
  async ({ noDrillingSurprisesPage }) => {
    await noDrillingSurprisesPage.cancelDelete();
  },
);

Then(
  'the user confirms the No Drilling Surprises delete action',
  async ({ noDrillingSurprisesPage }) => {
    await noDrillingSurprisesPage.confirmDelete();
  },
);

Then(
  'the user uploads a second file to No Drilling Surprises',
  async ({ noDrillingSurprisesPage }) => {
    await noDrillingSurprisesPage.uploadSecond();
  },
);

Then(
  'the user uploads a No Drilling Surprises file to Schematic',
  async ({ noDrillingSurprisesPage }) => {
    await noDrillingSurprisesPage.uploadToSchematic();
  },
);

Then('the user downloads the No Drilling Surprises file', async ({ noDrillingSurprisesPage }) => {
  await noDrillingSurprisesPage.downloadFile();
});

When(
  'the user attempts to overwrite the No Drilling Surprises file',
  async ({ noDrillingSurprisesPage }) => {
    await noDrillingSurprisesPage.beginOverwrite();
  },
);

Then(
  'the user cancels the No Drilling Surprises overwrite action',
  async ({ noDrillingSurprisesPage }) => {
    await noDrillingSurprisesPage.cancelOverwrite();
  },
);

Then('the user overwrites the No Drilling Surprises file', async ({ noDrillingSurprisesPage }) => {
  await noDrillingSurprisesPage.overwrite();
});

When(
  'the user enters this text in the No Drilling Surprises editor',
  async ({ noDrillingSurprisesPage }, docString: string) => {
    await noDrillingSurprisesPage.textEditor.enterText(docString.trim());
  },
);

When(
  'the user clicks the empty area to save the No Drilling Surprises text',
  async ({ noDrillingSurprisesPage }) => {
    await noDrillingSurprisesPage.textEditor.saveByClickingEmptyArea();
  },
);

When(
  'the user clicks Translate in the No Drilling Surprises editor',
  async ({ noDrillingSurprisesPage }) => {
    await noDrillingSurprisesPage.textEditor.clickTranslate();
  },
);

Then(
  'the No Drilling Surprises editor shows the text translated to English',
  async ({ noDrillingSurprisesPage }) => {
    await noDrillingSurprisesPage.textEditor.verifyTranslated();
  },
);
