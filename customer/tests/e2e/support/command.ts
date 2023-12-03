// @ts-nocheck

Cypress.Commands.add("existsThe", testSelector =>
  cy.get(`[data-test=${testSelector}]`).should('exist')
)

Cypress.Commands.add("clickThe", testSelector => {
  cy.get(`[data-test=${testSelector}]`).click()
})
