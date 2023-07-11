Cypress.Commands.add("getByButton", (value) => {
    return cy.get(`button[name=${value}]`)
})

Cypress.Commands.add("getByInput", (value) => {
    return cy.get(`input[placeholder=${value}]`)
})

Cypress.Commands.add("addContact", (name, phone, email) => {
    if (name) {
        cy.getByInput('Name')
            .type(name)
    }
    if (phone) {
        cy.getByInput('Phone')
            .type(phone)
    }
    if (email) {
        cy.getByInput('Email')
            .type(email)
    }
    cy.getByButton('add')
        .click()
})

Cypress.Commands.add("numberOfTrInTableShouldBeX", (length) => {
    return cy.get('tr')
        .should('have.length', length)
})