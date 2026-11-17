Feature: Targets Sizing file management

  # Well: Deswanth Well / Deswanth Wellbore / Deswanth Design
  # Section: Targets Sizing panel
  # Upload file: testdata/Testing.jpg

  Background:
    Given the user opens the Deswanth Design for Targets Sizing
    And the user expands the Targets Sizing panel

  @targets-sizing
  Scenario: Delete an existing file from Targets Sizing
    Then the user deletes an existing file from Targets Sizing

  @targets-sizing
  Scenario: Upload a file from the Targets Sizing panel
    When the user uploads a file to Targets Sizing

  @targets-sizing
  Scenario: Cancel deleting a Targets Sizing file
    Then the user cancels the Targets Sizing delete action

  @targets-sizing
  Scenario: Confirm deleting a Targets Sizing file
    Then the user confirms the Targets Sizing delete action

  @targets-sizing
  Scenario: Upload a second Targets Sizing file
    Then the user uploads a second file to Targets Sizing

  @targets-sizing
  Scenario: Upload a Targets Sizing file to Schematic
    Then the user uploads a Targets Sizing file to Schematic

  @targets-sizing
  Scenario: Download the Targets Sizing file
    When the user uploads a file to Targets Sizing
    Then the user downloads the Targets Sizing file

  @targets-sizing
  Scenario: Cancel overwriting a Targets Sizing file
    When the user attempts to overwrite the Targets Sizing file
    Then the user cancels the Targets Sizing overwrite action

  @targets-sizing
  Scenario: Overwrite a Targets Sizing file
    When the user attempts to overwrite the Targets Sizing file
    Then the user overwrites the Targets Sizing file
