Feature: DDR Summary well selection

  # Well: Deswanth Well / Deswanth Wellbore / Deswanth Design
  # Navigation: Offset Well Analysis > Drilling Engineering > DDR Summary section
  # Only the well dropdown is changed; the Country and Company filters and the
  # Mark as Completed toggle are not touched.

  @ddr-summary
  Scenario: Select six wells from the Select wells to view data dropdown
    Given the user opens Drilling Engineering for DDR Summary
    When the user expands the DDR Summary panel
    And the user selects these wells in the DDR Summary dropdown
      | Well Name                      |
      | 25/11-BT-3                     |
      | AFRAA-1                        |
      | ARMB-002R1S1                   |
      | BISBITA_SUR-01-ST2             |
      | Business Insights Well - LOL!  |
      | Business Insights Well - LOL!!!|
    Then the DDR Summary shows all selected wells
