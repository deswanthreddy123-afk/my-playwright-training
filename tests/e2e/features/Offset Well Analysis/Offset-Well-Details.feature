Feature: Offset Well Details file management

  # Well: Deswanth Well / Deswanth Wellbore / Deswanth Design
  # Navigation: Offset Well Analysis > Drilling Engineering > Offset Well Details section
  # Upload file: testdata/Testing.jpg

  Background:
    Given the user opens Drilling Engineering under Offset Well Analysis
    And the user expands the Offset Well Details panel

  @offset-well-details
  Scenario: Delete an existing Offset Well Details file
    Then the user deletes an existing Offset Well Details file

  @offset-well-details
  Scenario: Upload a file to the Offset Well Details panel
    When the user uploads a file to Offset Well Details

  @offset-well-details
  Scenario: Cancel deleting an Offset Well Details file
    Then the user cancels the Offset Well Details delete action

  @offset-well-details
  Scenario: Confirm deleting an Offset Well Details file
    Then the user confirms the Offset Well Details delete action

  @offset-well-details
  Scenario: Upload a second Offset Well Details file
    Then the user uploads a second file to Offset Well Details

  @offset-well-details
  Scenario: Upload an Offset Well Details file to Schematic
    Then the user uploads an Offset Well Details file to Schematic

  @offset-well-details
  Scenario: Download the Offset Well Details file
    When the user uploads a file to Offset Well Details
    Then the user downloads the Offset Well Details file

  @offset-well-details
  Scenario: Cancel overwriting an Offset Well Details file
    When the user attempts to overwrite the Offset Well Details file
    Then the user cancels the Offset Well Details overwrite action

  @offset-well-details
  Scenario: Overwrite an Offset Well Details file
    When the user attempts to overwrite the Offset Well Details file
    Then the user overwrites the Offset Well Details file
