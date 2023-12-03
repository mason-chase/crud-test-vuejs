// cypress/e2e/duckduckgo.ts
import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor"
import { customer } from '../mock'

function init() {
  cy.visit("http://localhost:3001/")
}

function create_customer(index = 1) {
  cy.clickThe('addBtn')
  cy.existsThe('customerCard-0')
  cy.fillThe('firstName', `${customer.firstName}${index}`)
  cy.fillThe('lastName', `${customer.lastName}${index}`)
  cy.fillThe('email', `${index}${customer.email}`)
  cy.fillThe('phoneNumber', `${customer.phoneNumber}`.replace(customer.phoneNumber.at(-1), index.toString()))
  cy.fillThe('bankAccountNumber', `${customer.bankAccountNumber}`.replace(customer.bankAccountNumber.at(-1), index.toString()))
  cy.fillThe('dateOfBirth', `2023-01-0${index}`)
  cy.clickThe('saveBtn')
  cy.existsThe('fullName')
}

Given("Filling empty form and then clicking on submit", () => {
  init()
})

Then("Should add 1 submited customer", () => {
  create_customer()
})

Given("Update firstName of existing customer", () => {
  init()
  create_customer()
  cy.existsThe('customerCard-0')
})

Then("Should change firstName to updated value", () => {
  cy.clickThe('editBtn')
  cy.fillThe('firstName', 'updated')
  cy.clickThe('saveBtn')
  cy.existsThe('fullName').contains('updated')
})

Given("Clicking on trash icon should delete the existing customer", () => {
  init()
  create_customer()
  cy.existsThe('customerCard-0')
})

Then("Customer list should be empty after delete", () => {
  cy.clickThe('deleteBtn')
  cy.notExistsThe('customerCard-0')
})


Given("Clicking on Delete All should delete all customers", () => {
  init()
  create_customer(1)
  create_customer(2)
  create_customer(3)
  cy.existsThe('customerCard-0')
  cy.existsThe('customerCard-1')
  cy.existsThe('customerCard-2')
})

Then("Customer list should be empty after delete all", () => {
  cy.clickThe('deleteAllBtn')
  cy.notExistsThe('customerCard-0')
  cy.notExistsThe('customerCard-1')
  cy.notExistsThe('customerCard-2')
})

Given("Clicking save on not validated data", () => {
  init()
  create_customer(1)
  cy.existsThe('customerCard-0')
})

Then("Should display formErors", () => {
  create_customer(1)
  cy.existsThe('formErrors')
})

Given("Refreshing page with 1 customer", () => {
  init()
  create_customer()
  cy.existsThe('customerCard-0')
})

Then("Added customers should exist", () => {
  cy.reload()
  cy.existsThe('customerCard-0')
})