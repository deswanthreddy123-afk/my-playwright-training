import { createBdd } from 'playwright-bdd';
import { test } from '../../../src/fixtures/bdd-fixtures';
import { LoginPage } from '../../../src/pages/login.page';

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

When('the user expands the Well Details panel', async ({ loginPage }) => {
  await loginPage.clickdropdownpannel();
});

Then('the user deletes an existing file', async ({ loginPage }) => {
  await loginPage.deleteIfExists(0);
});

When('the user uploads a file', async ({ loginPage }) => {
  await loginPage.uploadFile();
});

Then('the user cancels the delete action', async ({ loginPage }) => {
  await loginPage.clickDeleteButtonCancel(0);
});

Then('the user confirms the delete action', async ({ loginPage }) => {
  await loginPage.clickDeleteButton(0);
});

Then('the user uploads a second file', async ({ loginPage }) => {
  await loginPage.uploadFile1();
});

Then('the user uploads a file to Schematic', async ({ loginPage }) => {
  await loginPage.uploadFile2();
});

Then('the user downloads the file', async ({ loginPage }) => {
  await loginPage.clickDownloadButton(0);
});

Then('the user cancels the overwrite action', async ({ loginPage }) => {
  await loginPage.clickOverwriteCancel();
});

Then('the user overwrites the file', async ({ loginPage }) => {
  await loginPage.clickOverwrite();
});

Then('the user deletes an existing file or uploads a new one', async ({ loginPage }) => {
  await loginPage.deleteIfExistsOrUpload(0);
});
