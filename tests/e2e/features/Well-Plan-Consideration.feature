Feature: Well Plan & Consideration file management

  # Step definitions: tests/e2e/steps/Steps/Well-Plan-Consideration.step.ts
  # Section: Well Plan & Consideration panel (section-scoped, file index 0)
  # Upload file: Automation-Testing.png

  Background:
    Given the user navigates to the home page
    And the user navigates to All Wells

  @well-plan
  Scenario: Delete an existing file from Well Plan & Consideration
    When the user navigates to the Trajectory tab
    And the user expands the Well Plan & Consideration panel
    Then the user deletes an existing file from Well Plan & Consideration

  @well-plan
  Scenario: Upload a file from the Well Plan & Consideration panel
    When the user navigates to the Trajectory tab
    And the user expands the Well Plan & Consideration panel
    And the user uploads a file to Well Plan & Consideration

  @well-plan
  Scenario: Cancel deleting a Well Plan file
    When the user navigates to the Trajectory tab
    And the user expands the Well Plan & Consideration panel
    Then the user cancels the Well Plan delete action

  @well-plan
  Scenario: Confirm deleting a Well Plan file
    When the user navigates to the Trajectory tab
    And the user expands the Well Plan & Consideration panel
    Then the user confirms the Well Plan delete action

  @well-plan
  Scenario: Upload a second Well Plan file
    When the user navigates to the Trajectory tab
    And the user expands the Well Plan & Consideration panel
    Then the user uploads a second file to Well Plan & Consideration

  @well-plan
  Scenario: Upload a Well Plan file to Schematic
    When the user navigates to the Trajectory tab
    And the user expands the Well Plan & Consideration panel
    Then the user uploads a Well Plan file to Schematic

  @well-plan
  Scenario: Download the Well Plan file
    When the user navigates to the Trajectory tab
    And the user expands the Well Plan & Consideration panel
    And the user uploads a file to Well Plan & Consideration
    Then the user downloads the Well Plan file

  @well-plan
  Scenario: Cancel overwriting a Well Plan file
    When the user navigates to the Trajectory tab
    And the user expands the Well Plan & Consideration panel
    And the user uploads a file to Well Plan & Consideration
    Then the user cancels the Well Plan overwrite action

  @well-plan
  Scenario: Overwrite a Well Plan file
    When the user navigates to the Trajectory tab
    And the user expands the Well Plan & Consideration panel
    And the user uploads a file to Well Plan & Consideration
    Then the user overwrites the Well Plan file
