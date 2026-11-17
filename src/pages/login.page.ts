import { expect, Page, Locator } from '@playwright/test';
import * as path from 'node:path';
import { URL } from 'node:url';

export class LoginPage {
  downloadFile() {
    throw new Error('Method not implemented.');
  }
  page: Page;
  emailInput = 'Email or Username';
  passwordInput = 'Please enter your password';
  loginButton = 'button:has-text("Log In")';
  url ='https://authentik.sperrydigital-dev.ienergy.halliburton.com/if/flow/hal-local-authentication-flow/';
  username = 'autotest@righive.local';
  password = 'G7#vL9@pX2!rQz$e';
  allWellsButton = 'All Wells';
  DeswanthWellCard = 'Deswanth Well';
  // Trajectorytab  = 'Trajectory';
  Trajectorytab = 'a[href*="/digital-design-of-service/trajectory"]';
  // dropdownpannel = '#pn_id_43_header';
  DeleteButton = '.file-actions .p-button-danger';
  DownloadButton = '.file-actions .pi-download, .file-actions a[download], .file-actions button:not(.p-button-danger)';
  DeleteButtonCancel = '.p-ripple.p-button.p-component.p-button-text.p-button-plain';
  Overwrite = 'button[data-pc-name="button"].p-button-text:has(.pi-upload), button.p-button-text:has-text("Overwrite")';
  OverwriteCancel = 'button[data-pc-name="button"].p-button-text:has(.pi-upload), button.p-button-text:has-text("Overwrite")';
  // uploadFilePath = 'C:\\Users\\Deswanth.Reddy\\Downloads\\Automation-Testing.png';
 uploadFilePath  = path.resolve(__dirname, '../../testdata/Testing.jpg');
 // Image used for the Plan Version section scenarios.
 uploadFilePath2 = path.resolve(__dirname, '../../testdata/Testing.jpg');

  constructor(page: Page) { 
    this.page = page;
  }

  // Section scopes: the same file scenarios run inside different panels on the page.
  // Without a scope the locators resolve page-wide (first match = Schematic Diagram),
  // preserving the original behavior. Pass a section scope to target a specific panel.
  get schematicSection(): Locator {
    return this.page.getByRole('region').filter({
      has: this.page.getByText('Schematic Diagram'),
    }).first();
  }

  get planVersionSection(): Locator {
    return this.page.getByRole('region').filter({
      has: this.page.getByRole('button', { name: /^Plan Version/ }),
    }).first();
  }

  get wellPlanSection(): Locator {
    return this.page.getByRole('region').filter({
      has: this.page.getByRole('button', { name: /^Well Plan/ }),
    }).first();
  }

  get cfPlotSection(): Locator {
    return this.page.getByRole('region').filter({
      has: this.page.getByRole('button', { name: /CF Plot/ }),
    }).first();
  }

  get targetsSizingSection(): Locator {
    return this.page.getByRole('region').filter({
      has: this.page.getByRole('button', { name: /Targets Sizing/ }),
    }).first();
  }

  // Returns the base to resolve section-relative locators from.
  protected base(scope?: Locator): Page | Locator {
    return scope ?? this.page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => undefined);
  }

  public DOSUrl =
    'https://test.sperrydigital.ienergy.halliburton.com/digital-design-of-service/home';
  public plannedOperationsUrl =
    'https://test.sperrydigital.ienergy.halliburton.com/digital-design-of-service/planned-operations?job=96f99f6b-6b24-4cea-9ff8-613eed2948ea';

  async openDesignTrajectory(): Promise<void> {
    // Duplicate home-page cards share well/wellbore names but reference different designs.
    const url = new URL('/digital-design-of-service/trajectory', this.DOSUrl);
    url.searchParams.set('job', 'f67c6a06-8c6d-467e-8e7f-bcc5e4a417ce');
    await this.page.goto(url.href, { waitUntil: 'domcontentloaded' });
    await expect(this.page.locator('.well-select').getByRole('combobox')).toHaveText(
      'Deswanth Well',
      { timeout: 30000 },
    );
    await expect(this.page.locator('.wellbore-select').getByRole('combobox')).toHaveText(
      'Deswanth Wellbore',
      { timeout: 30000 },
    );
    await expect(
      this.page.locator('.design-name-value'),
      'Expected Deswanth Design, not a duplicate well design',
    ).toHaveText('Deswanth Design', { timeout: 30000 });
    await expect(this.page).toHaveURL(url.href);
  }

  async login(): Promise<void> {
    const emailField = this.page.getByPlaceholder(this.emailInput);
    const isAuthenticated = () => /\/if\/user(?:\/|$)|\/library(?:\/|$)/.test(
      new URL(this.page.url()).pathname,
    );
    if (!isAuthenticated()) {
      await emailField.waitFor({ state: 'visible', timeout: 30000 });
      await emailField.fill(this.username);
      await this.page.getByPlaceholder(this.passwordInput).fill(this.password);
      await this.page.locator(this.loginButton).click();
      await this.page.waitForURL(/\/if\/user(?:\/|$)|\/library(?:\/|$)/, { timeout: 60000 });
    }
    console.log('[Login] Authentik login completed.');
  }

  async gotoDOS() {
    await this.page.goto(this.DOSUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => undefined);
    await this.page.waitForTimeout(5000);

    const appUrl = new URL(this.DOSUrl);
    const currentUrl = new URL(this.page.url());
    if (
      currentUrl.hostname !== appUrl.hostname ||
      !currentUrl.pathname.startsWith('/digital-design-of-service/')
    ) {
      throw new Error('DOS authentication did not complete; the browser did not reach the DOS application.');
    }
  }

  async gotoPlannedOperations(): Promise<void> {
    await this.page.goto(this.plannedOperationsUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => undefined);

    const targetUrl = new URL(this.plannedOperationsUrl);
    const currentUrl = new URL(this.page.url());
    if (
      currentUrl.hostname !== targetUrl.hostname ||
      currentUrl.pathname !== targetUrl.pathname ||
      currentUrl.searchParams.get('job') !== targetUrl.searchParams.get('job')
    ) {
      throw new Error(
        `DOS authentication did not complete; current page is ${currentUrl.hostname}${currentUrl.pathname}.`,
      );
    }
  }

  // When the app redirects to the authentik chooser, click "Login with Halliburton
  // Account" and complete the Microsoft sign-in using the credentials above.
  async signInWithHalliburtonAccount(): Promise<void> {
    const chooserButton = this.page.getByText('Login with Halliburton Account');
    const onChooser = await chooserButton
      .waitFor({ state: 'visible', timeout: 15000 })
      .then(() => true)
      .catch(() => false);
    if (onChooser) {
      await chooserButton.click();
    } else if (new URL(this.page.url()).hostname !== 'login.microsoftonline.com') {
      return;
    }

    const msEmail = this.page.locator('input[name="loginfmt"]');
    await msEmail.waitFor({ state: 'visible', timeout: 30000 });
    await msEmail.fill(this.username);
    await this.page.locator('#idSIButton9').click();
    const msPassword = this.page.locator('input[name="passwd"]');
    await msPassword.waitFor({ state: 'visible', timeout: 30000 });
    await msPassword.fill(this.password);
    await this.page.locator('#idSIButton9').click();
    // Optional "Stay signed in?" prompt.
    const staySignedIn = this.page.locator('#idSIButton9');
    if (await staySignedIn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await staySignedIn.click();
    }
    await this.page.waitForURL(/test\.sperrydigital\.ienergy\.halliburton\.com/, { timeout: 60000 });
  }
  async clickAllWells() {
    // Wait for the DOS home loading overlay to be fully removed from the DOM.
    await this.page.locator('digital-dos-loading-overlay').waitFor({ state: 'detached', timeout: 30000 }).catch(() => undefined);
    await this.page.locator('.loading-card').waitFor({ state: 'detached', timeout: 30000 }).catch(() => undefined);
    await this.page.getByText(this.allWellsButton).waitFor({ state: 'visible', timeout: 90000 });
    await this.page.getByText(this.allWellsButton).click({ force: true });
  }

  async clickDeswanthWellCard() {
    const wellCard = this.page.locator('.card-title').filter({
      hasText: /^\s*Deswanth Well\s*$/,
    });
    await expect(wellCard, 'Exactly one Deswanth Well card must be available').toHaveCount(1);
    await wellCard.click();
    await this.page.waitForTimeout(5000);
 }
 async navigateTrajectorytab() {
   // await this.page.locator('a[href*="/digital-design-of-service/trajectory"]').click();
   // await this.page.waitForLoadState('networkidle').catch(() => undefined);
   await this.page.click(this.Trajectorytab);
   await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => undefined);    
  }

  async ensureOnTrajectoryPage() {
    const url = new URL(this.page.url());
    const isInApp = url.hostname === new URL(this.DOSUrl).hostname;
    if (!isInApp || url.pathname.includes('/trajectory')) {
      await this.gotoDOS();
      await this.clickAllWells();
    }

    await this.clickDeswanthWellCard();
    await this.navigateTrajectorytab();
  }

  // Re-navigate to the Trajectory tab without re-login (used between panels in combined spec).
  async reNavigateToTrajectory() {
    await this.page.goto(this.DOSUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => undefined);
    await this.page.waitForTimeout(3000);
    await this.page.getByText(this.allWellsButton).waitFor({ state: 'visible', timeout: 90000 });
    await this.page.getByText(this.allWellsButton).click();
    await this.clickDeswanthWellCard();
    await this.page.waitForTimeout(3000);
    await this.page.click(this.Trajectorytab);
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => undefined);
    await this.page.waitForTimeout(2000);
  }
  async clickdropdownpannel() {
    await this.page.getByTitle('Well Details').getByLabel('Expand panel').click();
    await this.page.waitForTimeout(2000);
 }
 // Scenario: Delete an existing file
 // Deletes the file at fileIndex if one exists. Does NOT upload if no file exists.
 // Use this when you want to guarantee a clean (empty) state before uploading.
 async deleteIfExists(fileIndex: number = 0) {
    const deleteButton = this.page.locator(this.DeleteButton).nth(fileIndex);
    await deleteButton.waitFor({ state: 'visible', timeout: 15000 }).catch(() => undefined);
    if (await deleteButton.isVisible()) {
      const dialog = await this.openDeleteConfirm(fileIndex);
      await dialog.getByRole('button', { name: 'Delete', exact: true }).click();
      await dialog.first().waitFor({ state: 'hidden' });
    }
  }

 // Scenario: Upload a file from the Well Details panel
 async uploadFile(scope?: Locator) {
    await this.base(scope).locator('input[type="file"]').first().setInputFiles(this.uploadFilePath);
    // If overwrite dialog appears (file already exists), cancel it so delete button is accessible
    const dialogMask = this.page.locator('.p-dialog-mask');
    await this.page.waitForTimeout(1000);
    if (await dialogMask.isVisible().catch(() => false)) {
      await this.page.getByRole('button', { name: 'Cancel' }).click();
      await dialogMask.waitFor({ state: 'hidden' });
    }
  }
 // Clicks the file delete button and reliably waits for the confirm dialog/popup.
 // fileIndex: 0 = first section (Schematic Diagram), 1 = second section (Plan Version).
 // File action rows (.file-actions) are rendered outside the panel region element in PrimeNG,
 // so we use page-level nth(fileIndex) instead of a region scope.
 async openDeleteConfirm(fileIndex: number = 0) {
  const dialog = this.page.locator('.p-confirmdialog, .p-confirmpopup');
  if (await dialog.first().isVisible().catch(() => false)) return dialog;

  // An overwrite/confirm dialog may still be open from a previous upload.
  // Its overlay mask blocks all clicks – dismiss it before proceeding.
  await this.page.locator('.p-dialog-mask, .p-overlay-mask')
    .waitFor({ state: 'hidden', timeout: 10000 })
    .catch(() => undefined);

  for (let attempt = 0; attempt < 3; attempt++) {
    await this.page.locator(this.DeleteButton).nth(fileIndex).click();
    const appeared = await dialog.first().waitFor({ state: 'visible', timeout: 7000 }).then(() => true).catch(() => false);
    if (appeared) return dialog;
  }
  // Surface a clear failure if it still never appears.
  await dialog.first().waitFor({ state: 'visible' });
  return dialog;
 }

 // Scenario: Cancel deleting a file
 async clickDeleteButtonCancel(fileIndex: number = 0) {
  const dialog = await this.openDeleteConfirm(fileIndex);
  const cancelBtn = dialog.getByRole('button', { name: 'Cancel' });
  await cancelBtn.waitFor({ state: 'visible', timeout: 15000 });
  // PrimeNG ripple animation can cause brief DOM detach; use force to bypass stability check.
  await cancelBtn.click({ force: true });
  await dialog.first().waitFor({ state: 'hidden', timeout: 15000 });
  }

 
  // Scenario: Confirm deleting a file
  async clickDeleteButton(fileIndex: number = 0) {
  const dialog = await this.openDeleteConfirm(fileIndex);
  await dialog.getByRole('button', { name: 'Delete' }).click();
  await dialog.first().waitFor({ state: 'hidden' });
 }


  // Scenario: Upload a second file
  async uploadFile1(scope?: Locator) {
    await this.base(scope).locator('input[type="file"]').first().setInputFiles(this.uploadFilePath);
  }

  // Scenario: Upload a file to Schematic
 async uploadFile2(scope?: Locator) {
  await this.base(scope).locator('input[type="file"]').first().setInputFiles(this.uploadFilePath);
 }

  // Scenario: Download the uploaded file
  // Clicks the download icon in the file row and saves the downloaded file.
  // fileIndex: 0 = Schematic Diagram, 1 = Plan Version.
  async clickDownloadButton(fileIndex: number = 0): Promise<string> {
    // A re-upload can leave an overwrite/confirm dialog open. Its overlay mask sits on
    // top of the file row and intercepts pointer events, so resolve it first.
    const dialog = this.page.locator('.p-confirmdialog, .p-confirmpopup');
    if (await dialog.first().isVisible().catch(() => false)) {
      const overwrite = dialog.getByRole('button', { name: 'Overwrite' });
      if (await overwrite.isVisible().catch(() => false)) {
        await overwrite.click();
      } else {
        await dialog.getByRole('button', { name: 'Cancel' }).click();
      }
    }
    // Ensure no overlay mask remains before interacting with the file row.
    await this.page.locator('.p-dialog-mask, .p-overlay-mask')
      .waitFor({ state: 'hidden', timeout: 15000 })
      .catch(() => undefined);

    const downloadButton = this.page.locator(this.DownloadButton).nth(fileIndex);
    await downloadButton.waitFor({ state: 'visible', timeout: 60000 });
    await downloadButton.scrollIntoViewIfNeeded();
    const [download] = await Promise.all([
      this.page.waitForEvent('download', { timeout: 60000 }),
      downloadButton.click(),
    ]);
    const savePath = `C:\\Automation\\test\\test-results\\${download.suggestedFilename()}`;
    await download.saveAs(savePath);
    return savePath;
  }

  // async clickDeleteButtonCancel1() {
  // await this.page.locator(this.DeleteButtonCancel).click();
  // await this.page.getByRole('button', { name: 'Cancel' }).click();
  // }

  // Scenario: Cancel overwriting an existing file
 async clickOverwriteCancel() {
  const dialog = this.page.locator('.p-confirmdialog, .p-confirmpopup');
  const appeared = await dialog.first().waitFor({ state: 'visible', timeout: 10000 }).then(() => true).catch(() => false);
  if (!appeared) return; // No overwrite dialog (no conflict) - nothing to cancel
  await dialog.getByRole('button', { name: 'Cancel' }).click();
  await dialog.first().waitFor({ state: 'hidden' });
 }
 // Scenario: Overwrite an existing file
 async clickOverwrite() {
  const dialog = this.page.locator('.p-confirmdialog, .p-confirmpopup');
  const appeared = await dialog.first().waitFor({ state: 'visible', timeout: 10000 }).then(() => true).catch(() => false);
  if (!appeared) return; // No overwrite dialog (no conflict) - upload already completed
  await dialog.getByRole('button', { name: 'Overwrite' }).click();
  await dialog.first().waitFor({ state: 'hidden' });
 } 

 // fileIndex: page-level nth index for delete button (0 = Schematic Diagram, 1 = Plan Version).
 // scope: section locator used for scoping the file-input (upload path).
 async deleteIfExistsOrUpload(fileIndex: number = 0, scope?: Locator) {
    const deleteButton = this.page.locator(this.DeleteButton).nth(fileIndex);
    const fileInput = this.page.locator('input[type="file"]').nth(fileIndex);

    // Wait for the panel to fully render: either the delete button (file exists)
    // or the file input (no file) must appear before we decide which path to take.
    await Promise.race([
      deleteButton.waitFor({ state: 'visible', timeout: 20000 }).then(() => 'delete'),
      fileInput.waitFor({ state: 'attached', timeout: 20000 }).then(() => 'upload'),
    ]).catch(() => undefined);

    const isVisible = await deleteButton.isVisible();
    if (isVisible) {
      const dialog = await this.openDeleteConfirm(fileIndex);
      await dialog.getByRole('button', { name: 'Delete', exact: true }).click();
      await dialog.first().waitFor({ state: 'hidden' });
    } else {
      await fileInput.waitFor({ state: 'attached', timeout: 15000 });
      await fileInput.setInputFiles(this.uploadFilePath);
    }
  }

 // ===== Plan Version section (file index 1, image: Testing.jpg) =====

 // Expands the Plan Version panel so its file input/actions become available.
 async clickPlanVersionPanel() {
   // The Plan Version panel has no title attribute (unlike Well Details), so locate it
   // via its section header button, then click that section's Expand panel control.
   await this.planVersionSection.getByLabel('Expand panel').first().click();
   await this.page.waitForTimeout(2000);
 }

 // Scenario: Upload a file from the Plan Version panel
 async uploadFilePlanVersion() {
   await this.page.locator('input[type="file"]').first().setInputFiles(this.uploadFilePath2);
   // If overwrite dialog appears (file already exists), cancel it so delete button is accessible
   const dialogMask = this.page.locator('.p-dialog-mask');
   await this.page.waitForTimeout(1000);
   if (await dialogMask.isVisible().catch(() => false)) {
     await this.page.getByRole('button', { name: 'Cancel' }).click();
     await dialogMask.waitFor({ state: 'hidden' });
   }
 }

 // Scenario: Upload a second file
 async uploadFile1PlanVersion() {
   await this.page.locator('input[type="file"]').first().setInputFiles(this.uploadFilePath2);
 }

 // Scenario: Upload a file to Schematic
 async uploadFile2PlanVersion() {
   await this.page.locator('input[type="file"]').first().setInputFiles(this.uploadFilePath2);
 }

 // ===== Well Plan & Consideration section (single panel expanded → index 0) =====

 // Expands the Well Plan & Consideration panel so its file input/actions become available.
 // The uploader can be slow to render after expanding, and re-clicking an already-open panel
 // would collapse it, so we poll for the region's file input and only click "Expand panel"
 // while it is still absent. Retry a few times to absorb the app's rendering latency.
 async clickWellPlanPanel() {
   const section = this.wellPlanSection;
   const fileInput = section.locator('input[type="file"]').first();
   for (let attempt = 0; attempt < 4; attempt++) {
     if ((await fileInput.count()) > 0) break;
     const expandBtn = section.getByLabel('Expand panel').first();
     if ((await expandBtn.count()) > 0) {
       await expandBtn.click().catch(() => undefined);
     }
     await this.page.waitForTimeout(3000);
   }
   await fileInput.waitFor({ state: 'attached', timeout: 20000 });
 }

 // Robust upload for the Well Plan & Consideration section. The section has exactly one
 // p-fileupload input (hidden, persists even when a file exists), so scope strictly to the
 // Well Plan region rather than a page-wide locator that could resolve to another section.
 private async uploadToWellPlan() {
   const fileInput = this.wellPlanSection.locator('input[type="file"]').first();
   await fileInput.waitFor({ state: 'attached', timeout: 20000 });
   await fileInput.setInputFiles(this.uploadFilePath);
   // If an overwrite dialog appears (file already exists), cancel it so actions stay accessible.
   const dialogMask = this.page.locator('.p-dialog-mask');
   await this.page.waitForTimeout(1000);
   if (await dialogMask.isVisible().catch(() => false)) {
     await this.page.getByRole('button', { name: 'Cancel' }).click();
     await dialogMask.waitFor({ state: 'hidden' }).catch(() => undefined);
   }
 }

 // Scenario: Upload a file from the Well Plan & Consideration panel
 async uploadFileWellPlan() {
   await this.uploadToWellPlan();
 }

 // Scenario: Upload a second file
 async uploadFile1WellPlan() {
   await this.uploadToWellPlan();
 }

 // Scenario: Upload a file to Schematic
 async uploadFile2WellPlan() {
   await this.uploadToWellPlan();
 }

 // ===== Targets Sizing section (single panel expanded → index 0) =====

 // Expands the Targets Sizing panel so its file input/actions become available.
 // Same robust approach as Well Plan: poll for the region's file input and only click
 // "Expand panel" while it is still absent, retrying to absorb rendering latency.
 async clickTargetsSizingPanel() {
   const section = this.targetsSizingSection;
   const fileInput = section.locator('input[type="file"]').first();
   for (let attempt = 0; attempt < 4; attempt++) {
     if ((await fileInput.count()) > 0) break;
     const expandBtn = section.getByLabel('Expand panel').first();
     if ((await expandBtn.count()) > 0) {
       await expandBtn.click().catch(() => undefined);
     }
     await this.page.waitForTimeout(3000);
   }
   await fileInput.waitFor({ state: 'attached', timeout: 20000 });
 }

 // Robust upload for the Targets Sizing section, strictly scoped to the Targets Sizing region.
 private async uploadToTargetsSizing() {
   const fileInput = this.targetsSizingSection.locator('input[type="file"]').first();
   await fileInput.waitFor({ state: 'attached', timeout: 20000 });
   await fileInput.setInputFiles(this.uploadFilePath);
   // If an overwrite dialog appears (file already exists), cancel it so actions stay accessible.
   const dialogMask = this.page.locator('.p-dialog-mask');
   await this.page.waitForTimeout(1000);
   if (await dialogMask.isVisible().catch(() => false)) {
     await this.page.getByRole('button', { name: 'Cancel' }).click();
     await dialogMask.waitFor({ state: 'hidden' }).catch(() => undefined);
   }
 }

 // Scenario: Upload a file from the Targets Sizing panel
 async uploadFileTargetsSizing() {
   await this.uploadToTargetsSizing();
 }

 // Scenario: Upload a second file
 async uploadFile1TargetsSizing() {
   await this.uploadToTargetsSizing();
 }

 // Scenario: Upload a file to Schematic
 async uploadFile2TargetsSizing() {
   await this.uploadToTargetsSizing();
 }

 async uploadFile3(scope?: Locator) {
  await this.base(scope).locator('input[type="file"]').first().setInputFiles(this.uploadFilePath);
 }

 async uploadFile4(scope?: Locator) {
  await this.base(scope).locator('input[type="file"]').first().setInputFiles(this.uploadFilePath);
 }

 async uploadFile5(scope?: Locator) {
  await this.base(scope).locator('input[type="file"]').first().setInputFiles(this.uploadFilePath);
 }

 async uploadFile6(scope?: Locator) {
  await this.base(scope).locator('input[type="file"]').first().setInputFiles(this.uploadFilePath);
 }

 async uploadFile7(scope?: Locator) {
  // CF Plot (index 0)
  await this.page.locator('input[type="file"]').nth(0).setInputFiles(this.uploadFilePath);
 }

 async uploadFile8(scope?: Locator) {
  // CF Plot final (index 0)
  await this.page.locator('input[type="file"]').nth(0).setInputFiles(this.uploadFilePath);
 }

 async uploadFile9(scope?: Locator) {
  // Ladder Plot (index 1)
  await this.page.locator('input[type="file"]').nth(1).setInputFiles(this.uploadFilePath);
 }

 async uploadFile10(scope?: Locator) {
  // Ladder Plot overwrite cancel (index 1)
  await this.page.locator('input[type="file"]').nth(1).setInputFiles(this.uploadFilePath);
 }

 async uploadFile11(scope?: Locator) {
  await this.page.locator('input[type="file"]').nth(1).setInputFiles(this.uploadFilePath);
 }

 async uploadFile12(scope?: Locator) {
  await this.page.locator('input[type="file"]').nth(2).setInputFiles(this.uploadFilePath);
 }

 // Targets Sizing upload methods (PDF file, index 0 in standalone spec)
 private readonly targetsPdfPath = 'C:\\Users\\Deswanth.Reddy\\Downloads\\MFA Enrollemnt Intructions.pdf';

 async uploadFileTS() {
  await this.page.locator('input[type="file"]').nth(0).setInputFiles(this.targetsPdfPath);
 }

 async uploadFileTSFinal() {
  await this.page.locator('input[type="file"]').nth(0).setInputFiles(this.targetsPdfPath);
 }

 async deleteIfExistsOrUploadTS(fileIndex: number = 0) {
  const deleteButton = this.page.locator(this.DeleteButton).nth(fileIndex);
  const isVisible = await deleteButton.isVisible();
  if (isVisible) {
    await deleteButton.click();
    await this.page.getByRole('button', { name: 'Delete' }).click();
  } else {
    const input = this.page.locator('input[type="file"]').nth(fileIndex);
    await input.waitFor({ state: 'attached', timeout: 15000 });
    await input.setInputFiles(this.targetsPdfPath);
  }
 }

 async clickdropdownpannel2() {
   // Use getByLabel to target the aria-label="Expand panel" button directly (same approach as clickdropdownpannel).
   const panel = this.page.getByRole('region').filter({
     has: this.page.getByRole('button', { name: /^Plan Version/ }),
   });
   await panel.getByLabel('Expand panel').first().click();
   await this.page.waitForTimeout(2000);
 }

 async clickdropdownpannel3() {
   const panel = this.page.getByRole('region').filter({
     has: this.page.getByRole('button', { name: /^Well Plan/ }),
   });
   await panel.getByLabel('Expand panel').first().click();
   await this.page.waitForTimeout(2000);
 }

 async clickdropdownpannel4() {
   const panel = this.page.getByRole('region').filter({
     has: this.page.getByRole('button', { name: /CF Plot/ }),
   });
   await panel.getByLabel('Expand panel').first().click();
   await this.page.waitForTimeout(2000);
 }

 async clickdropdownpannel5() {
   const panel = this.page.getByRole('region').filter({
     has: this.page.getByRole('button', { name: /Targets Sizing/ }),
   });
   await panel.getByLabel('Expand panel').first().click();
   await this.page.waitForTimeout(2000);
 }

 async clickdropdownpannel6() {
   const panel = this.page.getByRole('region').filter({
     has: this.page.getByRole('button', { name: /Directional Plot/ }),
   });
   await panel.getByLabel('Expand panel').first().click();
   await this.page.waitForTimeout(2000);
 }

 // Directional Plot upload methods (PDF file, index 0 in standalone spec)
 private readonly directionalPlotPdfPath = 'C:\\Users\\Deswanth.Reddy\\Downloads\\MFA Enrollemnt Intructions.pdf';

 async uploadFileDP() {
  await this.page.locator('input[type="file"]').nth(0).setInputFiles(this.directionalPlotPdfPath);
 }

 async uploadFileDPFinal() {
  await this.page.locator('input[type="file"]').nth(0).setInputFiles(this.directionalPlotPdfPath);
 }

 async deleteIfExistsOrUploadDP(fileIndex: number = 0) {
  const deleteButton = this.page.locator(this.DeleteButton).nth(fileIndex);
  const isVisible = await deleteButton.isVisible();
  if (isVisible) {
    await deleteButton.click();
    await this.page.getByRole('button', { name: 'Delete' }).click();
  } else {
    const input = this.page.locator('input[type="file"]').nth(fileIndex);
    await input.waitFor({ state: 'attached', timeout: 15000 });
    await input.setInputFiles(this.directionalPlotPdfPath);
  }
 }

 get directionalPlotSection(): Locator {
   return this.page.getByRole('region').filter({
     has: this.page.getByRole('button', { name: /Directional Plot/ }),
   }).first();
 }


  }