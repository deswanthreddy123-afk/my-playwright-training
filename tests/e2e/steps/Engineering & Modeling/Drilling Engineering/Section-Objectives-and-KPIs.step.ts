import { createBdd } from 'playwright-bdd';
import { test } from '../../../../../src/fixtures/bdd-fixtures';

const { Given, When, Then } = createBdd(test);

Given(
  'the user opens Drilling Engineering under Engineering & Modeling',
  async ({ sectionObjectivesAndKpisPage }) => {
    await sectionObjectivesAndKpisPage.openDrillingEngineering();
  },
);

Given(
  'the user selects the {string} tab',
  async ({ sectionObjectivesAndKpisPage }, name: string) => {
    await sectionObjectivesAndKpisPage.selectHoleSection(name);
  },
);

Given(
  'the user expands the Section Objectives and KPIs panel',
  async ({ sectionObjectivesAndKpisPage }) => {
    await sectionObjectivesAndKpisPage.expandPanel();
  },
);

When(
  'the user enters {string} in the {string} editor',
  async ({ sectionObjectivesAndKpisPage }, text: string, editor: string) => {
    await sectionObjectivesAndKpisPage.editor(editor).enterText(text);
  },
);

When(
  'the user clicks the empty area to save the {string} text',
  async ({ sectionObjectivesAndKpisPage }, editor: string) => {
    await sectionObjectivesAndKpisPage.editor(editor).saveByClickingEmptyArea();
  },
);

When(
  'the user clicks Translate in the {string} editor',
  async ({ sectionObjectivesAndKpisPage }, editor: string) => {
    await sectionObjectivesAndKpisPage.editor(editor).clickTranslate();
  },
);

Then(
  'the {string} editor shows the text translated to English',
  async ({ sectionObjectivesAndKpisPage }, editor: string) => {
    await sectionObjectivesAndKpisPage.editor(editor).verifyTranslated();
  },
);

When(
  'the user reopens the Section Objectives and KPIs panel from the saved design',
  async ({ sectionObjectivesAndKpisPage }) => {
    await sectionObjectivesAndKpisPage.reopenPanel();
  },
);

Then(
  'the saved text is shown in the {string} editor',
  async ({ sectionObjectivesAndKpisPage }, editor: string) => {
    await sectionObjectivesAndKpisPage.editor(editor).verifySavedText();
  },
);
