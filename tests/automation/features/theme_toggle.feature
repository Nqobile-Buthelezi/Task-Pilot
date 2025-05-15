Feature: Theme toggling
  As a user
  I want to toggle between light and dark themes
  So that I can personalise my experience based on my preference

  Background:
    Given I am on the Task Pilot homepage

  Scenario: Switching from light to dark theme
    When I click the theme toggle button
    Then the application should switch to dark mode

  Scenario: Switching from dark to light theme
    Given the application is in dark mode
    When I click the theme toggle button
    Then the application should switch to light mode
