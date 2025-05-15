Feature: Landing page UI

  Background:
    Given I am on the Task Pilot homepage

  Scenario: I see the application title
    Then I should see the title "Task Pilot - Task Management App"

  Scenario: I see the main heading
    Then the page should display a heading "Task Pilot"

  Scenario: I see the task input form
    Then I should see an input field with placeholder "Enter your task..."
    And I should see an "Add" button

  Scenario: I see the theme toggle control
    Then I should see a button labeled "Toggle Theme"
