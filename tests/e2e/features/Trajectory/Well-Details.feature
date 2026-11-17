Feature: Well Details file management

  # Well: Deswanth Well / Deswanth Wellbore / Deswanth Design
  # Section: Well Details (Schematic Diagram)
  # Upload file: testdata/Testing.jpg

  Background:
    Given the user opens the Deswanth Design Trajectory
    And the user expands the Well Details panel

  @well-details
  Scenario: Delete an existing file
    Then the user deletes an existing file

  @well-details
  Scenario: Upload a file from the Well Details panel
    When the user uploads a file

  @well-details
  Scenario: Cancel deleting a file
    Then the user cancels the delete action

  @well-details
  Scenario: Confirm deleting a file
    Then the user confirms the delete action

  @well-details
  Scenario: Upload a second file
    Then the user uploads a second file

  @well-details
  Scenario: Upload a file to Schematic
    Then the user uploads a file to Schematic

  @well-details
  Scenario: Download the uploaded file
    When the user uploads a file
    Then the user downloads the file

  @well-details
  Scenario: Cancel overwriting an existing file
    When the user attempts to overwrite the Well Details file
    Then the user cancels the overwrite action

  @well-details
  Scenario: Overwrite an existing file
    When the user attempts to overwrite the Well Details file
    Then the user overwrites the file
