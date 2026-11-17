Feature: Well Plan & Consideration file management

  # Well: Deswanth Well / Deswanth Wellbore / Deswanth Design
  # Section: Well Plan & Consideration panel
  # Upload file: testdata/Testing.jpg

  Background:
    Given the user opens the Deswanth Design for Well Plan
    And the user expands the Well Plan & Consideration panel

  @well-plan
  Scenario: Delete an existing file from Well Plan & Consideration
    Then the user deletes an existing file from Well Plan & Consideration

  @well-plan
  Scenario: Upload a file from the Well Plan & Consideration panel
    When the user uploads a file to Well Plan & Consideration

  @well-plan
  Scenario: Cancel deleting a Well Plan file
    Then the user cancels the Well Plan delete action

  @well-plan
  Scenario: Confirm deleting a Well Plan file
    Then the user confirms the Well Plan delete action

  @well-plan
  Scenario: Upload a second Well Plan file
    Then the user uploads a second file to Well Plan & Consideration

  @well-plan
  Scenario: Upload a Well Plan file to Schematic
    Then the user uploads a Well Plan file to Schematic

  @well-plan
  Scenario: Download the Well Plan file
    When the user uploads a file to Well Plan & Consideration
    Then the user downloads the Well Plan file

  @well-plan
  Scenario: Cancel overwriting a Well Plan file
    When the user attempts to overwrite the Well Plan file
    Then the user cancels the Well Plan overwrite action

  @well-plan
  Scenario: Overwrite a Well Plan file
    When the user attempts to overwrite the Well Plan file
    Then the user overwrites the Well Plan file
