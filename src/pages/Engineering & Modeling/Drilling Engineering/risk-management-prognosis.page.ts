import { expect, Locator } from '@playwright/test';
import { DrillingEngineeringSectionPage } from './drilling-engineering-section.page';

export type RpcName = 'Initial RPC' | 'Residual RPC';
export type SolutionName = 'Prevention' | 'Mitigation';

export class RiskManagementPrognosisPage extends DrillingEngineeringSectionPage {
  private riskRowCountBefore = 0;
  private enteredRisk = '';
  private enteredConsequences = '';
  private readonly solutions = new Map<SolutionName, string>();
  private readonly rpcScores = new Map<RpcName, string>();

  protected get panelTitle(): RegExp {
    return /^\s*Risk Management \+ Prognosis\s*$/;
  }

  // The Add Row form opens in a side drawer, not a dialog.
  private get drawer(): Locator {
    return this.page.getByRole('complementary').filter({ hasText: 'Add Row' });
  }

  private get addButton(): Locator {
    return this.drawer.getByRole('button', { name: 'Add', exact: true });
  }

  private get riskRows(): Locator {
    return this.panel.locator('tbody tr').filter({ hasNotText: 'No risks added yet' });
  }

  private rpcBlock(name: RpcName): Locator {
    return this.drawer.locator('.drawer-rpc-block').filter({ hasText: name });
  }

  private solutionField(name: SolutionName): Locator {
    return this.drawer.locator('.drawer-field').filter({ hasText: new RegExp(`^\\s*${name}`) });
  }

  // The table body always has a row, either a risk or the "No risks added yet" message,
  // so waiting for one means the saved risks have loaded.
  async expandPanel(): Promise<void> {
    await super.expandPanel();
    await expect(this.panel.locator('tbody tr').first()).toBeVisible({ timeout: 30000 });
  }

  async clickAddRow(): Promise<void> {
    await this.dismissReleaseNotice();
    this.riskRowCountBefore = await this.riskRows.count();
    await this.panel.getByRole('button', { name: /Add Row$/ }).click();
    await expect(this.drawer).toBeVisible();
    await expect(this.addButton).toBeDisabled();
  }

  async enterRisk(text: string): Promise<void> {
    await this.drawer.getByPlaceholder('Enter risk').fill(text);
    this.enteredRisk = text;
  }

  async enterConsequences(text: string): Promise<void> {
    await this.drawer.getByPlaceholder('Enter consequences').fill(text);
    this.enteredConsequences = text;
  }

  async setRpc(name: RpcName, severity: string, probability: string): Promise<void> {
    // Each RPC block has a severity select followed by a probability select.
    const block = this.rpcBlock(name);
    const selects = block.locator('.drawer-rpc-select');
    await this.pickOption(selects.nth(0), severity);
    await this.pickOption(selects.nth(1), probability);

    // Once both are set the block shows the resulting score, which the table row repeats.
    const score = block.locator('.p-tag');
    await expect(score).toHaveText(/\d/);
    this.rpcScores.set(name, (await score.innerText()).replace(/\D/g, ''));
  }

  private async pickOption(select: Locator, option: string): Promise<void> {
    await select.getByRole('combobox').click();
    // The option list is appended to the page body, outside the drawer.
    const listbox = this.page.getByRole('listbox').filter({ visible: true });
    await listbox.getByRole('option', { name: option, exact: true }).click();
    await expect(listbox).toHaveCount(0);
    await expect(select).toContainText(option);
  }

  // The text box is read-only until Edit is clicked, and the text only counts once confirmed.
  async editAndConfirm(name: SolutionName, text: string): Promise<void> {
    const field = this.solutionField(name);
    await field.getByRole('button', { name: `Edit ${name.toLowerCase()}` }).click();
    await field.getByPlaceholder(`Enter ${name.toLowerCase()}`).fill(text);
    await field.getByRole('button', { name: 'Confirm' }).click();
    await expect(field.getByText('Confirmed!')).toBeVisible();
    await expect(field.getByPlaceholder(`Enter ${name.toLowerCase()}`)).toHaveValue(text);
    this.solutions.set(name, text);
  }

  async verifyAddDisabled(): Promise<void> {
    await expect(this.addButton).toBeDisabled();
  }

  async verifyAddEnabled(): Promise<void> {
    await expect(this.addButton).toBeEnabled();
  }

  async clickAdd(): Promise<void> {
    await this.addButton.click();
    await expect(this.drawer).toHaveCount(0);
  }

  // Columns: Risk, Consequences, Initial RPC, Prevention, Mitigation, Residual RPC, Actions.
  async verifyRowAdded(): Promise<void> {
    await expect(this.riskRows).toHaveCount(this.riskRowCountBefore + 1);
    const row = this.riskRows.filter({ hasText: this.enteredRisk }).last();
    const cells = row.locator('td');
    await expect(cells.nth(0)).toHaveText(this.enteredRisk);
    await expect(cells.nth(1)).toHaveText(this.enteredConsequences);
    await expect(cells.nth(2).locator('.p-tag')).toContainText(this.rpcScores.get('Initial RPC') ?? '');
    await expect(cells.nth(3)).toHaveText(this.solutions.get('Prevention') ?? '');
    await expect(cells.nth(4)).toHaveText(this.solutions.get('Mitigation') ?? '');
    await expect(cells.nth(5).locator('.p-tag')).toContainText(this.rpcScores.get('Residual RPC') ?? '');
  }
}
