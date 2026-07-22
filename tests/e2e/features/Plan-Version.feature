Feature: Plan Version file management

  # Step definitions: tests/e2e/steps/Steps/Plan-Version.step.ts
  # Section: Plan Version panel (file index 1 on Trajectory page)
  # Upload file: Testing.jpg

  Background:
    Given the user navigates to the home page
    And the user navigates to All Wells

  @plan-version
  Scenario: Delete an existing file from Plan Version
    When the user navigates to the Trajectory tab
    And the user expands the Plan Version panel
    Then the user deletes an existing file from Plan Version

  @plan-version
  Scenario: Upload a file from the Plan Version panel
    When the user navigates to the Trajectory tab
    And the user expands the Plan Version panel
    And the user uploads a file to Plan Version

  @plan-version
  Scenario: Cancel deleting a Plan Version file
    When the user navigates to the Trajectory tab
    And the user expands the Plan Version panel
    Then the user cancels the Plan Version delete action

  @plan-version
  Scenario: Confirm deleting a Plan Version file
    When the user navigates to the Trajectory tab
    And the user expands the Plan Version panel
    Then the user confirms the Plan Version delete action

  @plan-version
  Scenario: Upload a second Plan Version file
    When the user navigates to the Trajectory tab
    And the user expands the Plan Version panel
    Then the user uploads a second file to Plan Version

  @plan-version
  Scenario: Upload a Plan Version file to Schematic
    When the user navigates to the Trajectory tab
    And the user expands the Plan Version panel
    Then the user uploads a Plan Version file to Schematic

  @plan-version
  Scenario: Download the Plan Version file
    When the user navigates to the Trajectory tab
    And the user expands the Plan Version panel
    And the user uploads a file to Plan Version
    Then the user downloads the Plan Version file

  @plan-version
  Scenario: Cancel overwriting a Plan Version file
    When the user navigates to the Trajectory tab
    And the user expands the Plan Version panel
    And the user uploads a file to Plan Version
    Then the user cancels the Plan Version overwrite action

  @plan-version
  Scenario: Overwrite a Plan Version file
    When the user navigates to the Trajectory tab
    And the user expands the Plan Version panel
    And the user uploads a file to Plan Version
    Then the user overwrites the Plan Version file
