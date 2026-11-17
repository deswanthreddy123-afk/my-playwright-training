import { createBdd } from 'playwright-bdd';
import { test } from '../../../../src/fixtures/bdd-fixtures';
import { LoginPage } from '../../../../src/pages/login.page';

const { Given, When, Then } = createBdd(test);

// ─── Shared navigation steps (global — reused by all feature files) ──────────

Given('the user navigates to the home page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoDOS();
});

Given('the user navigates to the login page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
});

Given('the user logs in with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login();
});

Given('the user navigates to All Wells', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.clickAllWells();
});

When('the user goes to the DOS home page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoDOS();
});

When('the user clicks All Wells', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.clickAllWells();
});

When('the user clicks the Deswanth Well card', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.clickDeswanthWellCard();
});

When('the user navigates to the Trajectory tab', async ({ loginPage }) => {
  await loginPage.ensureOnTrajectoryPage();
});

// ─── Well Details panel steps ─────────────────────────────────────────────────

Given('the user opens the Deswanth Design Trajectory', async ({ wellDetailsPage }) => {
  await wellDetailsPage.openDesignTrajectory();
});

When('the user expands the Well Details panel', async ({ wellDetailsPage }) => {
  await wellDetailsPage.expandPanel();
});

Then('the user deletes an existing file', async ({ wellDetailsPage }) => {
  await wellDetailsPage.ensureFile();
  await wellDetailsPage.deleteFile();
});

When('the user uploads a file', async ({ wellDetailsPage }) => {
  await wellDetailsPage.upload();
});

Then('the user cancels the delete action', async ({ wellDetailsPage }) => {
  await wellDetailsPage.cancelDelete();
});

Then('the user confirms the delete action', async ({ wellDetailsPage }) => {
  await wellDetailsPage.confirmDelete();
});

Then('the user uploads a second file', async ({ wellDetailsPage }) => {
  await wellDetailsPage.uploadSecond();
});

Then('the user uploads a file to Schematic', async ({ wellDetailsPage }) => {
  await wellDetailsPage.upload();
});

Then('the user downloads the file', async ({ wellDetailsPage }) => {
  await wellDetailsPage.downloadFile();
});

When('the user attempts to overwrite the Well Details file', async ({ wellDetailsPage }) => {
  await wellDetailsPage.beginOverwrite();
});

Then('the user cancels the overwrite action', async ({ wellDetailsPage }) => {
  await wellDetailsPage.cancelOverwrite();
});

Then('the user overwrites the file', async ({ wellDetailsPage }) => {
  await wellDetailsPage.overwrite();
});

Then('the user deletes an existing file or uploads a new one', async ({ loginPage }) => {
  await loginPage.deleteIfExistsOrUpload(0);
});
