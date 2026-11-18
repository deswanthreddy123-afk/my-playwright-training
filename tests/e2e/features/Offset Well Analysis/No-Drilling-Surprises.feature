Feature: No Drilling Surprises section

  # Well: Deswanth Well / Deswanth Wellbore / Deswanth Design
  # Navigation: Offset Well Analysis > Subsurface > No Drilling Surprises section
  # Upload file: testdata/Testing.jpg (other files such as DOS_121.png are left untouched)
  # The Mark as Completed toggle is not touched.

  Background:
    Given the user opens Subsurface under Offset Well Analysis
    And the user expands the No Drilling Surprises panel

  @no-drilling-surprises
  Scenario: Delete an existing No Drilling Surprises file
    Then the user deletes an existing No Drilling Surprises file

  @no-drilling-surprises
  Scenario: Upload a file to the No Drilling Surprises panel
    When the user uploads a file to No Drilling Surprises

  @no-drilling-surprises
  Scenario: Cancel deleting a No Drilling Surprises file
    Then the user cancels the No Drilling Surprises delete action

  @no-drilling-surprises
  Scenario: Confirm deleting a No Drilling Surprises file
    Then the user confirms the No Drilling Surprises delete action

  @no-drilling-surprises
  Scenario: Upload a second No Drilling Surprises file
    Then the user uploads a second file to No Drilling Surprises

  @no-drilling-surprises
  Scenario: Upload a No Drilling Surprises file to Schematic
    Then the user uploads a No Drilling Surprises file to Schematic

  @no-drilling-surprises
  Scenario: Download the No Drilling Surprises file
    When the user uploads a file to No Drilling Surprises
    Then the user downloads the No Drilling Surprises file

  @no-drilling-surprises
  Scenario: Cancel overwriting a No Drilling Surprises file
    When the user attempts to overwrite the No Drilling Surprises file
    Then the user cancels the No Drilling Surprises overwrite action

  @no-drilling-surprises
  Scenario: Overwrite a No Drilling Surprises file
    When the user attempts to overwrite the No Drilling Surprises file
    Then the user overwrites the No Drilling Surprises file

  @no-drilling-surprises
  Scenario: Translate the Kannada text in the No Drilling Surprises editor
    When the user enters this text in the No Drilling Surprises editor
      """
      ಪೆದ್ದಿರೆಡ್ಡಿ ದೇಶವಂತ್ ರೆಡ್ಡಿ
      """
    And the user clicks the empty area to save the No Drilling Surprises text
    And the user clicks Translate in the No Drilling Surprises editor
    Then the No Drilling Surprises editor shows the text translated to English
