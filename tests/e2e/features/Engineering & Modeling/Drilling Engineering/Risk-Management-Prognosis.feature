Feature: Risk Management + Prognosis risk rows

  # Well: Deswanth Well / Deswanth Wellbore / Deswanth Design
  # Navigation: Engineering & Modeling > Drilling Engineering > 6.250 (in) Section tab >
  #             Risk Management + Prognosis section
  # Every field in the Add Row drawer is mandatory, so Add stays disabled until all are filled.
  # Each run adds one more risk row to the section.
  # The Generate Risks, Copy to Sections and Copy to Domains buttons and the Mark as Completed
  # toggle are not touched.

  Background:
    Given the user opens Drilling Engineering for Risk Management + Prognosis
    And the user selects the "6.250 (in) Section" tab for Risk Management + Prognosis
    And the user expands the Risk Management + Prognosis panel

  @risk-management
  Scenario: Add a risk row with every mandatory field filled
    When the user clicks Add Row
    And the user enters "Sensor" in the Risk field
    And the user enters "SAMPLE" in the Consequences field
    And the user sets the "Initial RPC" to severity "II — Significant" and probability "C — Occasional"
    And the user edits and confirms the Prevention text "SAMPLE"
    And the user edits and confirms the Mitigation text "SAMPLE"
    Then the Add button is disabled while the Residual RPC is not set
    When the user sets the "Residual RPC" to severity "III — Marginal" and probability "D — Remote"
    Then the Add button is enabled
    When the user clicks Add
    Then the new risk row is shown in the Risk Management + Prognosis table
