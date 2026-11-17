import { createBdd } from 'playwright-bdd';
import { test } from '../../../../src/fixtures/bdd-fixtures';

const { Given, When, Then } = createBdd(test);

Given(
  'the user opens the Deswanth Design for Well Planning Checklist',
  async ({ wellPlanningChecklistPage }) => {
    await wellPlanningChecklistPage.openDesignTrajectory();
  },
);

When(
  'the user expands the Well Planning Checklist panel',
  async ({ wellPlanningChecklistPage }) => {
    await wellPlanningChecklistPage.expandPanel();
  },
);

When(
  'the user starts editing the Well Planning Checklist',
  async ({ wellPlanningChecklistPage }) => {
    await wellPlanningChecklistPage.startChecklist();
  },
);

When('the user opens the Wellplan Components tab', async ({ wellPlanningChecklistPage }) => {
  await wellPlanningChecklistPage.openComponents();
});

When(
  'the user selects the WP1, WP2, MWDC, and DDC header checkboxes',
  async ({ wellPlanningChecklistPage }) => {
    await wellPlanningChecklistPage.selectAllComponentRoles();
  },
);

Then(
  'all four role headers and {int} Wellplan Components checkboxes should be selected without changing sign-offs',
  async ({ wellPlanningChecklistPage }, count: number) => {
    await wellPlanningChecklistPage.verifySelectedComponents(count);
  },
);

When(
  'the user opens the Anti-Collision Analysis checklist tab',
  async ({ wellPlanningChecklistPage }) => {
    await wellPlanningChecklistPage.openAnalysis();
  },
);

When(
  'the user selects the WP1, WP2, and DDC Anti-Collision header checkboxes',
  async ({ wellPlanningChecklistPage }) => {
    await wellPlanningChecklistPage.selectAllAnalysisRoles();
  },
);

Then(
  'all three role headers and {int} Anti-Collision Analysis checkboxes should be selected without changing sign-offs',
  async ({ wellPlanningChecklistPage }, count: number) => {
    await wellPlanningChecklistPage.verifySelectedAnalysis(count);
  },
);

When(
  'the user saves the Well Planning Checklist if there are changes',
  async ({ wellPlanningChecklistPage }) => {
    await wellPlanningChecklistPage.saveChecklist();
  },
);

Then(
  'the saved checklist should retain {int} component checks and {int} Anti-Collision checks after reload',
  async ({ wellPlanningChecklistPage }, componentCount: number, analysisCount: number) => {
    await wellPlanningChecklistPage.verifySavedChecklist(componentCount, analysisCount);
  },
);
