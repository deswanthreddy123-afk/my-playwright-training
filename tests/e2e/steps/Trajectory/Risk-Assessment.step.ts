import { createBdd, DataTable } from 'playwright-bdd';
import { test } from '../../../../src/fixtures/bdd-fixtures';

const { Given, When, Then } = createBdd(test);

Given('the user opens the Deswanth Design for Risk Assessment', async ({ riskAssessmentPage }) => {
  await riskAssessmentPage.openDesignTrajectory();
});

When('the user expands the Risk Assessment panel', async ({ riskAssessmentPage }) => {
  await riskAssessmentPage.expandPanel();
});

When(
  'the user selects the {string} Risk Assessment tab',
  async ({ riskAssessmentPage }, well: string) => {
    await riskAssessmentPage.selectWell(well);
  },
);

When(
  'the user answers the following Risk Assessment questions with {string}:',
  async ({ riskAssessmentPage }, answer: string, questions: DataTable) => {
    await riskAssessmentPage.fillAnswers(
      questions.raw().map(([question]) => question),
      answer,
    );
  },
);

Then(
  'all {int} Risk Assessment answers should be {string}',
  async ({ riskAssessmentPage }, count: number, answer: string) => {
    await riskAssessmentPage.verifyAnswers(count, answer);
  },
);
