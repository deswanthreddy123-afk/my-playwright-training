import { Page, Locator } from '@playwright/test';

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
 uploadFilePath  = "C:\\Users\\Deswanth.Reddy\\Downloads\\Testing.jpg";
 // Image used for the Plan Version section scenarios.
 uploadFilePath2 = "C:\\Users\\Deswanth.Reddy\\Downloads\\Testing.jpg";

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

  async login(): Promise<void> {
    // With a valid storageState session, authentik redirects away before the
    // login form appears. Check for the form first; if it never shows, the
    // session is already active and no credentials need to be entered.
    const emailField = this.page.getByPlaceholder(this.emailInput);
    const formVisible = await emailField
      .waitFor({ state: 'visible', timeout: 10000 })
      .then(() => true)
      .catch(() => false);

    if (formVisible) {
      await emailField.fill(this.username);
      await this.page.getByPlaceholder(this.passwordInput).fill(this.password);
      await this.page.locator(this.loginButton).click();
      // After login, authentik redirects to its library page (still an authentik
      // URL). Wait for the form to disappear as the signal that auth completed.
      await this.page
        .waitForURL(/\/if\/user|\/library/, { timeout: 60000 })
        .catch(() => emailField.waitFor({ state: 'hidden', timeout: 60000 }))
        .catch(() => undefined);
    }
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => undefined);
  }

  async gotoDOS() {
    await this.page.goto(this.DOSUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => undefined);
    await this.page.waitForTimeout(5000);
  }
  async clickAllWells() {
    // Wait for the DOS home loading overlay to be fully removed from the DOM.
    await this.page.locator('digital-dos-loading-overlay').waitFor({ state: 'detached', timeout: 30000 }).catch(() => undefined);
    await this.page.locator('.loading-card').waitFor({ state: 'detached', timeout: 30000 }).catch(() => undefined);
    await this.page.getByText(this.allWellsButton).waitFor({ state: 'visible', timeout: 90000 });
    await this.page.getByText(this.allWellsButton).click({ force: true });
  }

  async clickDeswanthWellCard() {
    await this.page.locator('.card-title').filter({ hasText: this.DeswanthWellCard }).first().click();
    await this.page.waitForTimeout(5000);
 }
 async navigateTrajectorytab() {
   // await this.page.locator('a[href*="/digital-design-of-service/trajectory"]').click();
   // await this.page.waitForLoadState('networkidle').catch(() => undefined);
   await this.page.click(this.Trajectorytab);
   await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => undefined);    
  }

  // Cached URL discovered after the first full navigation. Once set, all
  // subsequent scenarios skip the navigation and use a single goto.
  private static cachedTrajectoryUrl: string = '';

  // Navigate to the Trajectory page.
  //
  // Short path (used when the Background has already navigated to the DOS app):
  //   If the page URL is already inside the app (not blank, not authentik),
  //   click the Deswanth Well card and then the Trajectory link directly.
  //
  // Cached-URL path (scenarios 2–N within the same worker process):
  //   Navigate directly to the cached trajectory URL — one goto instead of
  //   multiple sequential clicks.
  //
  // Full path (first scenario, no Background, or recovery after failure):
  //   authentik login → DOS home → All Wells → Deswanth Well card → Trajectory.
  async ensureOnTrajectoryPage() {
    const url = this.page.url();
    if (url.includes('/trajectory')) return;

    if (LoginPage.cachedTrajectoryUrl) {
      await this.page.goto(LoginPage.cachedTrajectoryUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => undefined);
      await this.page.waitForTimeout(2000);
      return;
    }

    // If the Background already navigated to the DOS app (home / All Wells page),
    // take the short path: click the well card then the Trajectory link.
    const isInApp = url.includes('sperrydigital.ienergy.halliburton.com') && !url.includes('authentik');
    if (isInApp) {
      await this.clickDeswanthWellCard();
      await this.navigateTrajectorytab();
      if (this.page.url().includes('/trajectory')) {
        LoginPage.cachedTrajectoryUrl = this.page.url();
        return;
      }
    }

    // Full path — runs on first scenario when there is no Background.
    await this.navigate();              // open authentik login URL
    await this.login();                 // fill credentials (or skip if session active)
    await this.gotoDOS();               // navigate to DOS home page
    await this.clickAllWells();         // click All Wells
    await this.clickDeswanthWellCard(); // select Deswanth Well
    await this.navigateTrajectorytab(); // click Trajectory in the left panel
    LoginPage.cachedTrajectoryUrl = this.page.url();
  }

  // Re-navigate to the Trajectory tab without re-login (used between panels in combined spec).
  async reNavigateToTrajectory() {
    await this.page.goto(this.DOSUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => undefined);
    await this.page.waitForTimeout(3000);
    await this.page.getByText(this.allWellsButton).waitFor({ state: 'visible', timeout: 90000 });
    await this.page.getByText(this.allWellsButton).click();
    await this.page.locator('.card-title').filter({ hasText: this.DeswanthWellCard }).first().click();
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