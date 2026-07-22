Feature: CF Plot / Ladder Plot / TC Plot file management

  # Step definitions: tests/e2e/steps/Steps/CF-Ladder-TC-Plot.step.ts
  # Section: CF Plot panel containing CF Plot (index 0), Ladder Plot (index 1), TC Plot (index 2)
  # Upload file: Automation-Testing.png

  Background:
    Given the user navigates to the home page
    And the user navigates to All Wells

  # ─── CF Plot ───────────────────────────────────────────────────────────────

  @cf-plot
  Scenario: Delete an existing CF Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    Then the user deletes an existing CF Plot file

  @cf-plot
  Scenario: Upload a file to CF Plot
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    And the user uploads a file to CF Plot

  @cf-plot
  Scenario: Cancel deleting a CF Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    Then the user cancels the CF Plot delete action

  @cf-plot
  Scenario: Confirm deleting a CF Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    Then the user confirms the CF Plot delete action

  @cf-plot
  Scenario: Upload a second CF Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    Then the user uploads a second file to CF Plot

  @cf-plot
  Scenario: Download the CF Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    And the user uploads a file to CF Plot
    Then the user downloads the CF Plot file

  @cf-plot
  Scenario: Cancel overwriting a CF Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    And the user uploads a file to CF Plot
    Then the user cancels the CF Plot overwrite action

  @cf-plot
  Scenario: Overwrite a CF Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    And the user uploads a file to CF Plot
    Then the user overwrites the CF Plot file

  # ─── Ladder Plot ───────────────────────────────────────────────────────────

  @ladder-plot
  Scenario: Delete an existing Ladder Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    Then the user deletes an existing Ladder Plot file

  @ladder-plot
  Scenario: Upload a file to Ladder Plot
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    And the user uploads a file to Ladder Plot

  @ladder-plot
  Scenario: Cancel deleting a Ladder Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    Then the user cancels the Ladder Plot delete action

  @ladder-plot
  Scenario: Confirm deleting a Ladder Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    Then the user confirms the Ladder Plot delete action

  @ladder-plot
  Scenario: Upload a second Ladder Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    Then the user uploads a second file to Ladder Plot

  @ladder-plot
  Scenario: Download the Ladder Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    And the user uploads a file to Ladder Plot
    Then the user downloads the Ladder Plot file

  @ladder-plot
  Scenario: Cancel overwriting a Ladder Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    And the user uploads a file to Ladder Plot
    Then the user cancels the Ladder Plot overwrite action

  @ladder-plot
  Scenario: Overwrite a Ladder Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    And the user uploads a file to Ladder Plot
    Then the user overwrites the Ladder Plot file

  # ─── TC Plot ───────────────────────────────────────────────────────────────

  @tc-plot
  Scenario: Delete an existing TC Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    Then the user deletes an existing TC Plot file

  @tc-plot
  Scenario: Upload a file to TC Plot
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    And the user uploads a file to TC Plot

  @tc-plot
  Scenario: Cancel deleting a TC Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    Then the user cancels the TC Plot delete action

  @tc-plot
  Scenario: Confirm deleting a TC Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    Then the user confirms the TC Plot delete action

  @tc-plot
  Scenario: Upload a second TC Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    Then the user uploads a second file to TC Plot

  @tc-plot
  Scenario: Download the TC Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    And the user uploads a file to TC Plot
    Then the user downloads the TC Plot file

  @tc-plot
  Scenario: Cancel overwriting a TC Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    And the user uploads a file to TC Plot
    Then the user cancels the TC Plot overwrite action

  @tc-plot
  Scenario: Overwrite a TC Plot file
    When the user navigates to the Trajectory tab
    And the user expands the CF Plot panel
    And the user uploads a file to TC Plot
    Then the user overwrites the TC Plot file
