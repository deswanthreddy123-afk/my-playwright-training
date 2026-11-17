Feature: Anti-Collision Overview questionnaire

  # Well: Deswanth Well / Deswanth Wellbore / Deswanth Design
  # Answers supplied in the reference screenshot; not engineering recommendations.

  Background:
    Given the user opens the Deswanth Design for Anti-Collision Overview
    And the user expands the Anti-Collision Overview panel

  @anti-collision-overview
  Scenario: Fill the surveying and AC policy answers from the reference image
    When the user enters "TEST", "SAMPLE", and "DEMO" for the Anti-Collision surveying questions
    And the user enters "sensor" as the Anti-Collision policy
    And the user selects "Yes" for the more stringent Anti-Collision policy question
    And the user enters "3" as the Anti-Collision sigma
    Then the Anti-Collision surveying answers should be "TEST", "SAMPLE", and "DEMO"
    And the Anti-Collision policy should be "sensor" with "Yes" selected and sigma "3"

  @anti-collision-overview
  Scenario: Add an offset well using the values from the reference image
    When the user opens Add Well in Anti-Collision Overview
    And the user fills the Anti-Collision Add Well form with:
      | Field                                         | Value                             |
      | Offset well name                              | DESHU                             |
      | Section                                       | 3124                              |
      | Min CF* value                                 | 564                               |
      | CF ≤ 1.0?                                     | Yes                               |
      | Min ct-ct* distance                            | 50-100m                           |
      | Min distance between ellipse                  | 3265                              |
      | Proximity Interval MD/TVD                      | 65489                             |
      | Trajectory demands at close approach          | 3214654685                        |
      | Is 1.0 ≤ CF ≤ 1.5 and/or ADP ≤ 15m?            | Yes                               |
      | Offset well status                            | P&A with Radioactive source       |
      | Offshore well?                                | No                                |
      | Offset Survey Status                          | Partial Survey List with Good IPMs |
      | PTD Level                                     | Level 3                           |
      | Does Tech reviewer escalate to One Level Up?   | Yes                               |
      | Comments                                      |                                   |
    And the user clicks Add in the Add Well form
    Then the Anti-Collision summary should show the added well with all supplied values
