Feature: DES Verification Checklist questionnaire

  # Well: Deswanth Well / Deswanth Wellbore / Deswanth Design
  # Requested test-site answers only; no signing or approval actions are performed.
  # The read-only Anticollision policy answer is preserved.

  Background:
    Given the user opens the Deswanth Design for DES Verification Checklist
    And the user expands the DES Verification Checklist panel

  @des-verification-checklist
  Scenario: Select Yes to all in every questionnaire tab and save
    When the user clicks Edit in DES Verification Checklist
    And the user selects Yes to all in every DES questionnaire tab:
      | Tab                                            | Questions |
      | Header details compliant with activity program? | 6         |
      | Planning details                               | 10        |
      | Platform details                               | 7         |
      | Targets/Objectives                             | 10        |
      | Survey standards                               | 11        |
      | Survey program                                 | 10        |
      | Anticollision                                  | 15        |
      | Geological & Well Integrity                     | 7         |
      | Geoscience                                     | 6         |
      | Sidetrack                                      | 6         |
      | Open Hole                                      | 5         |
      | Open Hole (without cement)                      | 4         |
    And the user saves the DES Verification Checklist if there are changes
    Then all 96 editable DES answers should remain Yes after reload and the read-only policy answer should be unchanged
