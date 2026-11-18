import { createBdd } from 'playwright-bdd';
import { test } from '../../../../../src/fixtures/bdd-fixtures';
import type { RpcName, SolutionName } from '../../../../../src/pages/Engineering & Modeling/Drilling Engineering/risk-management-prognosis.page';

const { Given, When, Then } = createBdd(test);

Given(
  'the user opens Drilling Engineering for Risk Management + Prognosis',
  async ({ riskManagementPrognosisPage }) => {
    await riskManagementPrognosisPage.openDrillingEngineering();
  },
);

Given(
  'the user selects the {string} tab for Risk Management + Prognosis',
  async ({ riskManagementPrognosisPage }, name: string) => {
    await riskManagementPrognosisPage.selectHoleSection(name);
  },
);

Given(
  'the user expands the Risk Management + Prognosis panel',
  async ({ riskManagementPrognosisPage }) => {
    await riskManagementPrognosisPage.expandPanel();
  },
);

When('the user clicks Add Row', async ({ riskManagementPrognosisPage }) => {
  await riskManagementPrognosisPage.clickAddRow();
});

When(
  'the user enters {string} in the Risk field',
  async ({ riskManagementPrognosisPage }, text: string) => {
    await riskManagementPrognosisPage.enterRisk(text);
  },
);

When(
  'the user enters {string} in the Consequences field',
  async ({ riskManagementPrognosisPage }, text: string) => {
    await riskManagementPrognosisPage.enterConsequences(text);
  },
);

When(
  'the user sets the {string} to severity {string} and probability {string}',
  async ({ riskManagementPrognosisPage }, rpc: string, severity: string, probability: string) => {
    await riskManagementPrognosisPage.setRpc(rpc as RpcName, severity, probability);
  },
);

When(
  'the user edits and confirms the {word} text {string}',
  async ({ riskManagementPrognosisPage }, field: string, text: string) => {
    await riskManagementPrognosisPage.editAndConfirm(field as SolutionName, text);
  },
);

Then(
  'the Add button is disabled while the Residual RPC is not set',
  async ({ riskManagementPrognosisPage }) => {
    await riskManagementPrognosisPage.verifyAddDisabled();
  },
);

Then('the Add button is enabled', async ({ riskManagementPrognosisPage }) => {
  await riskManagementPrognosisPage.verifyAddEnabled();
});

When('the user clicks Add', async ({ riskManagementPrognosisPage }) => {
  await riskManagementPrognosisPage.clickAdd();
});

Then(
  'the new risk row is shown in the Risk Management + Prognosis table',
  async ({ riskManagementPrognosisPage }) => {
    await riskManagementPrognosisPage.verifyRowAdded();
  },
);
