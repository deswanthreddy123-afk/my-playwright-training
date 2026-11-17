Feature: Plan Version revision management

  # Well: Deswanth Well / Deswanth Wellbore / Deswanth Design
  # Revisions are edited as local drafts; existing saved revisions are not changed.

  Background:
    Given the user opens the Deswanth Design for Plan Version

  @plan-version
  Scenario: Display the Plan Revisions table
    Then the Plan Revisions table displays its columns and read-only authors

  @plan-version
  Scenario: Prevent saving unchanged revisions
    Then the Plan Version Save button is disabled

  @plan-version
  Scenario Outline: Require a revision's <field>
    When the user adds an unsaved plan revision
    And the user leaves the revision "<field>" blank
    Then the Plan Version Save button is disabled

    Examples:
      | field       |
      | plan number |
      | date        |
      | description |

  @plan-version
  Scenario: Enable saving a complete revision
    When the user adds an unsaved plan revision
    Then a complete revision enables Save and Add Revision

  @plan-version
  Scenario: Add a blank revision with the current author
    When the user adds an unsaved plan revision
    Then the new plan revision is blank with a read-only author

  @plan-version
  Scenario: Cancel deleting an unsaved revision
    When the user adds an unsaved plan revision
    Then the user cancels deleting the unsaved plan revision

  @plan-version
  Scenario: Delete an unsaved revision
    When the user adds an unsaved plan revision
    Then the user confirms deleting the unsaved plan revision
