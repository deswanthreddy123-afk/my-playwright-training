Feature: Well Planning Checklist component selections

  # Well: Deswanth Well / Deswanth Wellbore / Deswanth Design
  # Saves changed selections and verifies persistence; no sign-off actions are performed.

  Background:
    Given the user opens the Deswanth Design for Well Planning Checklist
    And the user expands the Well Planning Checklist panel

  @well-planning-checklist
  Scenario: Select both checklist sections and save all component checks
    When the user starts editing the Well Planning Checklist
    And the user opens the Wellplan Components tab
    And the user selects the WP1, WP2, MWDC, and DDC header checkboxes
    Then all four role headers and 103 Wellplan Components checkboxes should be selected without changing sign-offs
    When the user opens the Anti-Collision Analysis checklist tab
    And the user selects the WP1, WP2, and DDC Anti-Collision header checkboxes
    Then all three role headers and 27 Anti-Collision Analysis checkboxes should be selected without changing sign-offs
    When the user saves the Well Planning Checklist if there are changes
    Then the saved checklist should retain 103 component checks and 27 Anti-Collision checks after reload
