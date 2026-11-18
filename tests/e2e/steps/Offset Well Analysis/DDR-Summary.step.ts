import { createBdd, DataTable } from 'playwright-bdd';
import { test } from '../../../../src/fixtures/bdd-fixtures';

const { Given, When, Then } = createBdd(test);

Given('the user opens Drilling Engineering for DDR Summary', async ({ ddrSummaryPage }) => {
  await ddrSummaryPage.openDrillingEngineering();
});

When('the user expands the DDR Summary panel', async ({ ddrSummaryPage }) => {
  await ddrSummaryPage.expandPanel();
});

When(
  'the user selects these wells in the DDR Summary dropdown',
  async ({ ddrSummaryPage }, table: DataTable) => {
    const names = table.hashes().map((row) => row['Well Name']);
    await ddrSummaryPage.selectWells(names);
  },
);

Then('the DDR Summary shows all selected wells', async ({ ddrSummaryPage }) => {
  await ddrSummaryPage.verifySelectedWells();
});
