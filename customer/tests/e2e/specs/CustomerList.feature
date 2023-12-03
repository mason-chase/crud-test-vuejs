Feature: Customer List

  Scenario: Clicking on Add button
    Given I click on the button
    Then Empty customer card should be added

  Scenario: Clicking On Add Button 3 Times
    Given I click on the button 3 times
    Then 3 empty customer card should be added

  Scenario: Saving Customer
    Given Filling empty form and then clicking on submit
    Then should add 1 submited customer

  Scenario: Updating Existing Customer
    Given Update firstName of existing customer
    Then Should change firstName to updated value

  Scenario: Deleting Customer
    Given Clicking on trash icon should delete the existing customer
    Then customer list should be empty

  Scenario: Deleting All Customers
    Given Clicking on Delete All should delete all customers
    Then customer list should be empty

  Scenario: Before Saving Customer validate the given data
    Given Clicking save on not validated data
    Then Should display formErors

  Scenario: Stroing Customers in DB
    Given Refreshing page
    Then Added customers should exist
