Feature: Section Objectives and KPIs text editors

  # Well: Deswanth Well / Deswanth Wellbore / Deswanth Design
  # Navigation: Engineering & Modeling > Drilling Engineering > 6.250 (in) Section tab >
  #             Section Objectives and KPIs section
  # Existing text in an editor is deleted (and that deletion saved) before the new text is entered.
  # The Copy to Domains / Copy to Sections buttons and the Mark as Completed toggle are not touched.

  Background:
    Given the user opens Drilling Engineering under Engineering & Modeling
    And the user selects the "6.250 (in) Section" tab
    And the user expands the Section Objectives and KPIs panel

  @section-objectives-kpis
  Scenario: Enter the Kannada text in Objectives and KPI, save both and translate them
    When the user enters "ಪೆದ್ದಿರೆಡ್ಡಿ ದೇಶವಂತ್ ರೆಡ್ಡಿ" in the "Objectives" editor
    And the user clicks the empty area to save the "Objectives" text
    And the user clicks Translate in the "Objectives" editor
    Then the "Objectives" editor shows the text translated to English
    When the user enters "ಪೆದ್ದಿರೆಡ್ಡಿ ದೇಶವಂತ್ ರೆಡ್ಡಿ" in the "KPI" editor
    And the user clicks the empty area to save the "KPI" text
    And the user clicks Translate in the "KPI" editor
    Then the "KPI" editor shows the text translated to English
    When the user reopens the Section Objectives and KPIs panel from the saved design
    Then the saved text is shown in the "Objectives" editor
    And the saved text is shown in the "KPI" editor
