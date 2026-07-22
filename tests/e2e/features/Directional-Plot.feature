Feature: Directional Plot file management

  # Step definitions: tests/e2e/steps/Steps/Directional-Plot.step.ts
  # Section: Directional Plot panel (page-level file index 0)
  # Upload file: MFA Enrollemnt Intructions.pdf

  Background:
    Given the user navigates to the home page
    And the user navigates to All Wells

  @directional-plot
  Scenario: Delete an existing Directional Plot file
    When the user navigates to the Trajectory tab
    And the user expands the Directional Plot panel
    Then the user deletes an existing Directional Plot file

  @directional-plot
  Scenario: Upload a file to the Directional Plot panel
    When the user navigates to the Trajectory tab
    And the user expands the Directional Plot panel
    And the user uploads a file to Directional Plot

  @directional-plot
  Scenario: Cancel deleting a Directional Plot file
    When the user navigates to the Trajectory tab
    And the user expands the Directional Plot panel
    Then the user cancels the Directional Plot delete action

  @directional-plot
  Scenario: Confirm deleting a Directional Plot file
    When the user navigates to the Trajectory tab
    And the user expands the Directional Plot panel
    Then the user confirms the Directional Plot delete action

  @directional-plot
  Scenario: Upload a second Directional Plot file
    When the user navigates to the Trajectory tab
    And the user expands the Directional Plot panel
    Then the user uploads a second file to Directional Plot

  @directional-plot
  Scenario: Upload a Directional Plot file to Schematic
    When the user navigates to the Trajectory tab
    And the user expands the Directional Plot panel
    Then the user uploads a Directional Plot file to Schematic

  @directional-plot
  Scenario: Download the Directional Plot file
    When the user navigates to the Trajectory tab
    And the user expands the Directional Plot panel
    And the user uploads a file to Directional Plot
    Then the user downloads the Directional Plot file

  @directional-plot
  Scenario: Cancel overwriting a Directional Plot file
    When the user navigates to the Trajectory tab
    And the user expands the Directional Plot panel
    And the user uploads a file to Directional Plot
    Then the user cancels the Directional Plot overwrite action

  @directional-plot
  Scenario: Overwrite a Directional Plot file
    When the user navigates to the Trajectory tab
    And the user expands the Directional Plot panel
    And the user uploads a file to Directional Plot
    Then the user overwrites the Directional Plot file
