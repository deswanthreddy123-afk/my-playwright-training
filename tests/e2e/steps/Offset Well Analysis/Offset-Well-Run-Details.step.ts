import { createBdd, DataTable } from 'playwright-bdd';
import { test } from '../../../../src/fixtures/bdd-fixtures';

const { Given, When, Then } = createBdd(test);

Given(
  'the user opens Drilling Engineering for Offset Well Run Details',
  async ({ offsetWellRunDetailsPage }) => {
    await offsetWellRunDetailsPage.openDrillingEngineering();
  },
);

When('the user expands the Offset Well Run Details panel', async ({ offsetWellRunDetailsPage }) => {
  await offsetWellRunDetailsPage.expandPanel();
});

When(
  'the user selects these wells in the Well Name dropdown',
  async ({ offsetWellRunDetailsPage }, table: DataTable) => {
    const names = table.hashes().map((row) => row['Well Name']);
    await offsetWellRunDetailsPage.selectWells(names);
  },
);

Then(
  'the Offset Well Run Details shows all selected wells',
  async ({ offsetWellRunDetailsPage }) => {
    await offsetWellRunDetailsPage.verifySelectedWells();
  },
);
