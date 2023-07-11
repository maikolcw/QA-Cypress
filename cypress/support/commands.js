Cypress.Commands.add("getByButton", (value) => {
    return cy.get(`button[name=${value}]`)
})

Cypress.Commands.add("getByInput", (value) => {
    return cy.get(`input[placeholder=${value}]`)
})

Cypress.Commands.add("addContact", (name, phone, email) => {
    cy.getByInput('Name')
        .type(name)
    cy.getByInput('Phone')
        .type(phone)
    cy.getByInput('Email')
        .type(email)
    cy.getByButton('add')
        .click()
})