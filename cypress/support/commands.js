Cypress.Commands.add("getByButton", (value) => {
    return cy.get(`button[name=${value}]`)
})

Cypress.Commands.add("getByInput", (value) => {
    return cy.get(`input[placeholder=${value}]`)
})