Feature: Directional Plot file management

  # Well: Deswanth Well / Deswanth Wellbore / Deswanth Design
  # Section: Directional Plot panel
  # Upload file: testdata/Testing.jpg

  Background:
    Given the user opens the Deswanth Design for Directional Plot
    And the user expands the Directional Plot panel

  @directional-plot
  Scenario: Delete an existing Directional Plot file
    Then the user deletes an existing Directional Plot file

  @directional-plot
  Scenario: Upload a file to the Directional Plot panel
    When the user uploads a file to Directional Plot

  @directional-plot
  Scenario: Cancel deleting a Directional Plot file
    Then the user cancels the Directional Plot delete action

  @directional-plot
  Scenario: Confirm deleting a Directional Plot file
    Then the user confirms the Directional Plot delete action

  @directional-plot
  Scenario: Upload a second Directional Plot file
    Then the user uploads a second file to Directional Plot

  @directional-plot
  Scenario: Upload a Directional Plot file to Schematic
    Then the user uploads a Directional Plot file to Schematic

  @directional-plot
  Scenario: Download the Directional Plot file
    When the user uploads a file to Directional Plot
    Then the user downloads the Directional Plot file

  @directional-plot
  Scenario: Cancel overwriting a Directional Plot file
    When the user attempts to overwrite the Directional Plot file
    Then the user cancels the Directional Plot overwrite action

  @directional-plot
  Scenario: Overwrite a Directional Plot file
    When the user attempts to overwrite the Directional Plot file
    Then the user overwrites the Directional Plot file
