// cypress/e2e/duckduckgo.ts
import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor"

Given("I click on the button", () => {
  cy.visit("http://localhost:3001/")
})

Then("Empty customer card should be added", () => {
  cy.get("button[test-id=addBtn]").click()
  cy.get("div[test-id=customerCard-0]").should('exist')
})