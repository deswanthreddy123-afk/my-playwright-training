import { createBdd, DataTable } from 'playwright-bdd';
import { test } from '../../../../src/fixtures/bdd-fixtures';

const { Given, When, Then } = createBdd(test);

Given(
  'the user opens the Deswanth Design for Anti-Collision Overview',
  async ({ antiCollisionOverviewPage }) => {
    await antiCollisionOverviewPage.openDesignTrajectory();
  },
);

When(
  'the user expands the Anti-Collision Overview panel',
  async ({ antiCollisionOverviewPage }) => {
    await antiCollisionOverviewPage.expandPanel();
  },
);

When(
  'the user enters {string}, {string}, and {string} for the Anti-Collision surveying questions',
  async ({ antiCollisionOverviewPage }, program: string, backup: string, interference: string) => {
    await antiCollisionOverviewPage.fillSurveyAnswers(program, backup, interference);
  },
);

When(
  'the user enters {string} as the Anti-Collision policy',
  async ({ antiCollisionOverviewPage }, policy: string) => {
    await antiCollisionOverviewPage.fillPolicy(policy);
  },
);

When(
  'the user selects {string} for the more stringent Anti-Collision policy question',
  async ({ antiCollisionOverviewPage }, answer: string) => {
    await antiCollisionOverviewPage.selectStringentPolicy(answer);
  },
);

When(
  'the user enters {string} as the Anti-Collision sigma',
  async ({ antiCollisionOverviewPage }, sigma: string) => {
    await antiCollisionOverviewPage.fillSigma(sigma);
  },
);

Then(
  'the Anti-Collision surveying answers should be {string}, {string}, and {string}',
  async ({ antiCollisionOverviewPage }, program: string, backup: string, interference: string) => {
    await antiCollisionOverviewPage.verifySurveyAnswers(program, backup, interference);
  },
);

Then(
  'the Anti-Collision policy should be {string} with {string} selected and sigma {string}',
  async ({ antiCollisionOverviewPage }, policy: string, stringent: string, sigma: string) => {
    await antiCollisionOverviewPage.verifyPolicyAnswers(policy, stringent, sigma);
  },
);

When(
  'the user opens Add Well in Anti-Collision Overview',
  async ({ antiCollisionOverviewPage }) => {
    await antiCollisionOverviewPage.openAddWell();
  },
);

When(
  'the user fills the Anti-Collision Add Well form with:',
  async ({ antiCollisionOverviewPage }, table: DataTable) => {
    const details = table.hashes().map(({ Field, Value }) => ({ field: Field, value: Value }));
    await antiCollisionOverviewPage.fillWellDetails(details);
  },
);

When('the user clicks Add in the Add Well form', async ({ antiCollisionOverviewPage }) => {
  await antiCollisionOverviewPage.addWell();
});

Then(
  'the Anti-Collision summary should show the added well with all supplied values',
  async ({ antiCollisionOverviewPage }) => {
    await antiCollisionOverviewPage.verifyAddedWell();
  },
);
