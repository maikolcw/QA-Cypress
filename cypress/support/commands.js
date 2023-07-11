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

Cypress.Commands.add("changeAndCheckIfYValueChanged", (row_number, field_name, new_value) => {
    var td_index = 0
    switch (field_name) {
        case 'name':
            td_index = 0
            break;
        case 'phone':
            td_index = 1
            break;
        default:
            td_index = 2
    }
    cy.get('tr')
        .eq(row_number)
        .getByButton('edit')
        .click()
    if (new_value) {
        cy.get('tr')
            .eq(row_number)
            .find('input')
            .eq(td_index)
            .clear()
            .type(new_value)
    } else {
        cy.get('tr')
            .eq(row_number)
            .find('input')
            .eq(td_index)
            .clear()
    }
    cy.getByButton('update')
        .click()
    // Check if edited values are correct
    if (new_value) {
        cy.get('tr')
            .eq(row_number)
            .find('td')
            .eq(td_index)
            .contains(new_value)
    } else {
        cy.get('tr')
            .eq(row_number)
            .find('td')
            .eq(td_index)
            .should('be.empty') 
    }
})

