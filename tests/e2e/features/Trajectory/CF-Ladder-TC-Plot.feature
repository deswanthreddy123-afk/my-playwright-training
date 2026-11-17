Feature: CF Plot / Ladder Plot / TC Plot file management

  # Well: Deswanth Well / Deswanth Wellbore / Deswanth Design
  # Section: CF Plot/Ladder Plot/TC Plot panel, scoped by subsection name
  # Upload file: testdata/Testing.jpg

  Background:
    Given the user opens the Deswanth Design for CF Ladder TC Plot
    And the user expands the CF Plot panel

  @cf-plot
  Scenario: Delete an existing CF Plot file
    Then the user deletes an existing CF Plot file

  @cf-plot
  Scenario: Upload a file to CF Plot
    When the user uploads a file to CF Plot

  @cf-plot
  Scenario: Cancel deleting a CF Plot file
    Then the user cancels the CF Plot delete action

  @cf-plot
  Scenario: Confirm deleting a CF Plot file
    Then the user confirms the CF Plot delete action

  @cf-plot
  Scenario: Upload a second CF Plot file
    Then the user uploads a second file to CF Plot

  @cf-plot
  Scenario: Download the CF Plot file
    When the user uploads a file to CF Plot
    Then the user downloads the CF Plot file

  @cf-plot
  Scenario: Cancel overwriting a CF Plot file
    When the user attempts to overwrite the CF Plot file
    Then the user cancels the CF Plot overwrite action

  @cf-plot
  Scenario: Overwrite a CF Plot file
    When the user attempts to overwrite the CF Plot file
    Then the user overwrites the CF Plot file

  @ladder-plot
  Scenario: Delete an existing Ladder Plot file
    Then the user deletes an existing Ladder Plot file

  @ladder-plot
  Scenario: Upload a file to Ladder Plot
    When the user uploads a file to Ladder Plot

  @ladder-plot
  Scenario: Cancel deleting a Ladder Plot file
    Then the user cancels the Ladder Plot delete action

  @ladder-plot
  Scenario: Confirm deleting a Ladder Plot file
    Then the user confirms the Ladder Plot delete action

  @ladder-plot
  Scenario: Upload a second Ladder Plot file
    Then the user uploads a second file to Ladder Plot

  @ladder-plot
  Scenario: Download the Ladder Plot file
    When the user uploads a file to Ladder Plot
    Then the user downloads the Ladder Plot file

  @ladder-plot
  Scenario: Cancel overwriting a Ladder Plot file
    When the user attempts to overwrite the Ladder Plot file
    Then the user cancels the Ladder Plot overwrite action

  @ladder-plot
  Scenario: Overwrite a Ladder Plot file
    When the user attempts to overwrite the Ladder Plot file
    Then the user overwrites the Ladder Plot file

  @tc-plot
  Scenario: Delete an existing TC Plot file
    Then the user deletes an existing TC Plot file

  @tc-plot
  Scenario: Upload a file to TC Plot
    When the user uploads a file to TC Plot

  @tc-plot
  Scenario: Cancel deleting a TC Plot file
    Then the user cancels the TC Plot delete action

  @tc-plot
  Scenario: Confirm deleting a TC Plot file
    Then the user confirms the TC Plot delete action

  @tc-plot
  Scenario: Upload a second TC Plot file
    Then the user uploads a second file to TC Plot

  @tc-plot
  Scenario: Download the TC Plot file
    When the user uploads a file to TC Plot
    Then the user downloads the TC Plot file

  @tc-plot
  Scenario: Cancel overwriting a TC Plot file
    When the user attempts to overwrite the TC Plot file
    Then the user cancels the TC Plot overwrite action

  @tc-plot
  Scenario: Overwrite a TC Plot file
    When the user attempts to overwrite the TC Plot file
    Then the user overwrites the TC Plot file
