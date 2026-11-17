import { createBdd } from 'playwright-bdd';
import { test } from '../../../../src/fixtures/bdd-fixtures';

const { Given, When, Then } = createBdd(test);

Given('the user opens the Deswanth Design for Targets Sizing', async ({ targetsSizingPage }) => {
  await targetsSizingPage.openDesignTrajectory();
});

When('the user expands the Targets Sizing panel', async ({ targetsSizingPage }) => {
  await targetsSizingPage.expandPanel();
});

Then('the user deletes an existing file from Targets Sizing', async ({ targetsSizingPage }) => {
  await targetsSizingPage.ensureFile();
  await targetsSizingPage.deleteFile();
});

When('the user uploads a file to Targets Sizing', async ({ targetsSizingPage }) => {
  await targetsSizingPage.upload();
});

Then('the user cancels the Targets Sizing delete action', async ({ targetsSizingPage }) => {
  await targetsSizingPage.cancelDelete();
});

Then('the user confirms the Targets Sizing delete action', async ({ targetsSizingPage }) => {
  await targetsSizingPage.confirmDelete();
});

Then('the user uploads a second file to Targets Sizing', async ({ targetsSizingPage }) => {
  await targetsSizingPage.uploadSecond();
});

Then('the user uploads a Targets Sizing file to Schematic', async ({ targetsSizingPage }) => {
  await targetsSizingPage.uploadToSchematic();
});

Then('the user downloads the Targets Sizing file', async ({ targetsSizingPage }) => {
  await targetsSizingPage.downloadFile();
});

When('the user attempts to overwrite the Targets Sizing file', async ({ targetsSizingPage }) => {
  await targetsSizingPage.beginOverwrite();
});

Then('the user cancels the Targets Sizing overwrite action', async ({ targetsSizingPage }) => {
  await targetsSizingPage.cancelOverwrite();
});

Then('the user overwrites the Targets Sizing file', async ({ targetsSizingPage }) => {
  await targetsSizingPage.overwrite();
});
