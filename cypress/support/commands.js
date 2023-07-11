Cypress.Commands.add("getByButton", (value) => {
    return cy.get(`button[name=${value}]`)
})