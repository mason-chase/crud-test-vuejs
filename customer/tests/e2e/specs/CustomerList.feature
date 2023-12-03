Feature: Customer List

  Scenario: Saving Customer
    Given Filling empty form and then clicking on submit
    Then Should add 1 submited customer

  Scenario: Updating Existing Customer
    Given Update firstName of existing customer
    Then Should change firstName to updated value

  Scenario: Deleting Customer
    Given Clicking on trash icon should delete the existing customer
    Then Customer list should be empty after delete

  Scenario: Deleting All Customers
    Given Clicking on Delete All should delete all customers
    Then Customer list should be empty after delete all

  Scenario: Before Saving Customer validate the given data
    Given Clicking save on not validated data
    Then Should display formErors

  Scenario: Stroing Customers in DB
    Given Refreshing page with 1 customer
    Then Added customers should exist
