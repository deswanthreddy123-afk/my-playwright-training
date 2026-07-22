Feature: Targets Sizing file management

  # Step definitions: tests/e2e/steps/Steps/Targets-Sizing.step.ts
  # Section: Targets Sizing panel (section-scoped, file index 0)
  # Upload file: Automation-Testing.png

  Background:
    Given the user navigates to the home page
    And the user navigates to All Wells

  @targets-sizing
  Scenario: Delete an existing file from Targets Sizing
    When the user navigates to the Trajectory tab
    And the user expands the Targets Sizing panel
    Then the user deletes an existing file from Targets Sizing

  @targets-sizing
  Scenario: Upload a file from the Targets Sizing panel
    When the user navigates to the Trajectory tab
    And the user expands the Targets Sizing panel
    And the user uploads a file to Targets Sizing

  @targets-sizing
  Scenario: Cancel deleting a Targets Sizing file
    When the user navigates to the Trajectory tab
    And the user expands the Targets Sizing panel
    Then the user cancels the Targets Sizing delete action

  @targets-sizing
  Scenario: Confirm deleting a Targets Sizing file
    When the user navigates to the Trajectory tab
    And the user expands the Targets Sizing panel
    Then the user confirms the Targets Sizing delete action

  @targets-sizing
  Scenario: Upload a second Targets Sizing file
    When the user navigates to the Trajectory tab
    And the user expands the Targets Sizing panel
    Then the user uploads a second file to Targets Sizing

  @targets-sizing
  Scenario: Upload a Targets Sizing file to Schematic
    When the user navigates to the Trajectory tab
    And the user expands the Targets Sizing panel
    Then the user uploads a Targets Sizing file to Schematic

  @targets-sizing
  Scenario: Download the Targets Sizing file
    When the user navigates to the Trajectory tab
    And the user expands the Targets Sizing panel
    And the user uploads a file to Targets Sizing
    Then the user downloads the Targets Sizing file

  @targets-sizing
  Scenario: Cancel overwriting a Targets Sizing file
    When the user navigates to the Trajectory tab
    And the user expands the Targets Sizing panel
    And the user uploads a file to Targets Sizing
    Then the user cancels the Targets Sizing overwrite action

  @targets-sizing
  Scenario: Overwrite a Targets Sizing file
    When the user navigates to the Trajectory tab
    And the user expands the Targets Sizing panel
    And the user uploads a file to Targets Sizing
    Then the user overwrites the Targets Sizing file
