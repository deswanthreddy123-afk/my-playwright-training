Feature: Risk Assessment questionnaire

  # Well: Deswanth Well / Deswanth Wellbore / Deswanth Design
  # Offset well: DESHU must already exist in the Anti-Collision summary.
  # Answers supplied in the reference image; not engineering recommendations.

  Background:
    Given the user opens the Deswanth Design for Risk Assessment
    And the user expands the Risk Assessment panel
    And the user selects the "DESHU" Risk Assessment tab

  @risk-assessment     
  Scenario: Fill all DESHU risk answers from the reference image
    When the user answers the following Risk Assessment questions with "Sensors":
      | Does proximity interval share same TVD?                                                           |
      | Do we have partial or complete stratigraphic control?                                             |
      | Are we expecting magnetic interference?                                                           |
      | Number of casing string at zone of interest?                                                      |
      | Do we have more than One barrier in subject well? (Fluid + BOP)                                    |
      | Proximity below/above DHSV* in offset well?                                                        |
      | Pressure in Annuli A/B/C known? What is pressures value?                                           |
      | Can we maintain overbalanced with Sea water? What is reservoir pore pressure?                      |
      | Do we expect losses to be consequence of possible collision? Extra Mud Volume need to be mobilized? |
      | Customer plan to shut In producer/injector offset well with proximity?                             |
      | Do we know the reservoir flowing mechanism? (Natural- Artificial lift)                             |
      | Customer plan to install listening device on offset during shallow KO?                            |
    Then all 12 Risk Assessment answers should be "Sensors"
