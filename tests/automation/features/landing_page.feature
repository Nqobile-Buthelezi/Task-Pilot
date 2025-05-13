Feature: Landing page UI

  Scenario: I see the application title
    Given I am on the Task Pilot homepage
    Then I should see the title "Task Pilot - Task Management App"

  Scenario: I see the main heading
    Given I am on the Task Pilot homepage
    Then the page should display a heading "Task Pilot"

  Scenario: I see the task input form
    Given I am on the Task Pilot homepage
    Then I should see an input field with placeholder "Enter your task..."
    And I should see an "Add" button

  Scenario: I see the theme toggle control
    Given I am on the Task Pilot homepage
    Then I should see a button labeled "Toggle Theme"
