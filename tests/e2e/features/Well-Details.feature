Feature: Well Details file management

  # Step definitions: tests/e2e/steps/Steps/Well-Details.step.ts
  # Section: Well Details (Schematic Diagram panel, file index 0)
  # Upload file: Automation-Testing.png

  Background:
    Given the user navigates to the home page
    And the user navigates to All Wells

  @well-details
  Scenario: Delete an existing file
    When the user navigates to the Trajectory tab
    And the user expands the Well Details panel
    Then the user deletes an existing file

  @well-details
  Scenario: Upload a file from the Well Details panel
    When the user navigates to the Trajectory tab
    And the user expands the Well Details panel
    And the user uploads a file

  @well-details
  Scenario: Cancel deleting a file
    When the user navigates to the Trajectory tab
    And the user expands the Well Details panel
    Then the user cancels the delete action

  @well-details
  Scenario: Confirm deleting a file
    When the user navigates to the Trajectory tab
    And the user expands the Well Details panel
    Then the user confirms the delete action

  @well-details
  Scenario: Upload a second file
    When the user navigates to the Trajectory tab
    And the user expands the Well Details panel
    Then the user uploads a second file

  @well-details
  Scenario: Upload a file to Schematic
    When the user navigates to the Trajectory tab
    Then the user uploads a file to Schematic

  @well-details
  Scenario: Download the uploaded file
    When the user navigates to the Trajectory tab
    And the user expands the Well Details panel
    And the user uploads a file
    Then the user downloads the file

  @well-details
  Scenario: Cancel overwriting an existing file
    When the user navigates to the Trajectory tab
    And the user expands the Well Details panel
    And the user uploads a file
    Then the user cancels the overwrite action

  @well-details
  Scenario: Overwrite an existing file
    When the user navigates to the Trajectory tab
    And the user expands the Well Details panel
    And the user uploads a file
    Then the user overwrites the file
