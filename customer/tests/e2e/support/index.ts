import '../support/command'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to click DOM elemnt using data-test.
       * @example cy.clickThe('addBtn')
       */
      clickThe(selector: string): Chainable<JQuery<HTMLElement>>
      existsThe(selector: string): Chainable<JQuery<HTMLElement>>
      fillThe(selector: string, value: string): Chainable<JQuery<HTMLElement>>
      getThe(selector: string): Chainable<JQuery<HTMLElement>>
      notExistsThe(selector: string): Chainable<JQuery<HTMLElement>>
    }
  }
}