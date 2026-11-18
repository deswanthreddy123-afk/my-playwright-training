Feature: Offset Well Run Details well selection

  # Well: Deswanth Well / Deswanth Wellbore / Deswanth Design
  # Navigation: Offset Well Analysis > Drilling Engineering > Offset Well Run Details section
  # Only the Well Name filter is changed; the Mark as Completed toggle is not touched.

  @offset-well-run-details
  Scenario: Select five wells from the Well Name dropdown
    Given the user opens Drilling Engineering for Offset Well Run Details
    When the user expands the Offset Well Run Details panel
    And the user selects these wells in the Well Name dropdown
      | Well Name                     |
      | # 863                         |
      | #1                            |
      | #119                          |
      | #867                          |
      | 10150-11400 RA SUA; LL&E #1   |
    Then the Offset Well Run Details shows all selected wells
