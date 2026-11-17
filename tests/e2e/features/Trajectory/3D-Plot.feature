Feature: 3D Plot file management

  # Well: Deswanth Well / Deswanth Wellbore / Deswanth Design
  # Section: 3D Plot panel
  # Upload file: testdata/Testing.jpg

  Background:
    Given the user opens the Deswanth Design for 3D Plot
    And the user expands the 3D Plot panel

  @3d-plot
  Scenario: Delete an existing 3D Plot file
    Then the user deletes an existing 3D Plot file

  @3d-plot
  Scenario: Upload a file to the 3D Plot panel
    When the user uploads a file to 3D Plot

  @3d-plot
  Scenario: Cancel deleting a 3D Plot file
    Then the user cancels the 3D Plot delete action

  @3d-plot
  Scenario: Confirm deleting a 3D Plot file
    Then the user confirms the 3D Plot delete action

  @3d-plot
  Scenario: Upload a second 3D Plot file
    Then the user uploads a second file to 3D Plot

  @3d-plot
  Scenario: Upload a 3D Plot file to Schematic
    Then the user uploads a 3D Plot file to Schematic

  @3d-plot
  Scenario: Download the 3D Plot file
    When the user uploads a file to 3D Plot
    Then the user downloads the 3D Plot file

  @3d-plot
  Scenario: Cancel overwriting a 3D Plot file
    When the user attempts to overwrite the 3D Plot file
    Then the user cancels the 3D Plot overwrite action

  @3d-plot
  Scenario: Overwrite a 3D Plot file
    When the user attempts to overwrite the 3D Plot file
    Then the user overwrites the 3D Plot file
