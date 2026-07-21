Feature: API Testing Examples - TEMPLATE

  # TODO: Update these scenarios for your API endpoints
  # This demonstrates BDD-style API testing with Playwright

  Background:
    Given the API base URL is configured

  Scenario: Health check endpoint returns success
    When I send a GET request to "/health"
    Then the response status should be 200
    And the response should contain "status"
    And the response JSON should have "status" equal to "ok"

  Scenario: Create a new resource via POST
    Given I have a request body with:
      """
      {
        "name": "Test Resource",
        "type": "example",
        "active": true
      }
      """
    When I send a POST request to "/api/resources"
    Then the response status should be 201
    And the response should contain "id"
    And the response JSON should have "name" equal to "Test Resource"

  Scenario: Retrieve resource by ID
    Given a resource exists with id "123"
    When I send a GET request to "/api/resources/123"
    Then the response status should be 200
    And the response should contain "name"

  Scenario: Update resource via PUT
    Given a resource exists with id "123"
    And I have a request body with:
      """
      {
        "name": "Updated Resource",
        "type": "modified"
      }
      """
    When I send a PUT request to "/api/resources/123"
    Then the response status should be 200
    And the response JSON should have "name" equal to "Updated Resource"

  Scenario: Delete a resource
    Given a resource exists with id "123"
    When I send a DELETE request to "/api/resources/123"
    Then the response status should be 204

  Scenario: Handle invalid request
    When I send a POST request to "/api/resources" with invalid data
    Then the response status should be 400
    And the response should contain "error"

  Scenario Outline: Test multiple endpoints
    When I send a GET request to "<endpoint>"
    Then the response status should be <status>

    Examples:
      | endpoint          | status |
      | /health           | 200    |
      | /api/resources    | 200    |
      | /api/users        | 200    |
      | /api/nonexistent  | 404    |

  # TODO: Add more scenarios for your specific API requirements
