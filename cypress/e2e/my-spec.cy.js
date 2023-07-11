describe('Test Contact App', () => {

  beforeEach(() => {
    cy.visit('./contact_app.html')
  })

  it('Test if the application loads correctly', () => {
    cy.get('h1.text-center').should('have.text', 'Contact List App');
    cy.get('table tbody tr').should('have.length', 1)
  })

  // Add tests here

  context('Test if starter elements are present', () => {
    context('Table element', () => {
      it("Test if first column title 'Name' is present", () => {
        cy.get('th')
          .eq(0)
          .contains('Name')
      })

      it("Test if second column title 'Phone' is present", () => {
        cy.get('th')
          .eq(1)
          .contains('Phone')
      })

      it("Test if third column title 'Email' is present", () => {
        cy.get('th')
          .eq(2)
          .contains('Email')
      })

      it("Test if fourth column title 'Actions' is present", () => {
        cy.get('th')
          .eq(3)
          .contains('Actions')
      })
    })

    context("Input elements", () => {
      it("Test if first input has placeholder 'Name'", () => {
        cy.get('input')
          .eq(0)
          .should('have.attr', 'placeholder')
          .and('equal', 'Name')
      })

      it("Test if second input has placeholder 'Phone", () => {
        cy.get('input')
          .eq(1)
          .should('have.attr', 'placeholder')
          .and('equal', 'Phone')
      })

      it("Test if third input has placeholder 'Email", () => {
        cy.get('input')
          .eq(2)
          .should('have.attr', 'placeholder')
          .and('equal', 'Email')
      })
    })

    context("Add button", () => {
      it("Test if 'Add' button is present", () => {
        cy.getByButton('add')
          .should('exist')
      })
    })
  })

  context("Test user journeys", () => {
    it("Add a contact", () => {
      // fill in data for 3 input fields and click add
      cy.addContact("John", "604-123-4567", "john@email.com")
      // check if new contact is added and data is correct
      const tr_array = () => cy.get('tr')
      tr_array()
        .should('have.length', 2)
      tr_array()
        .eq(1)
        .find('td')
        .eq(0)
        .contains('John')
      tr_array()
        .eq(1)
        .find('td')
        .eq(1)
        .contains('604-123-4567')
      tr_array()
        .eq(1)
        .find('td')
        .eq(2)
        .contains('john@email.com')
      // check if edit and delete button is present in row
      tr_array()
        .eq(1)
        .find('td')
        .eq(3)
        .find(`button[name=edit]`)
        .should('exist')
      tr_array()
        .eq(1)
        .find('td')
        .eq(3)
        .find(`button[name=delete]`)
        .should('exist')
    })
    it("Edit a contact with name change", () => {
      cy.addContact("John", "604-123-4567", "john@email.com")
      // Edit all 3 values of contact
      cy.get('tr')
        .eq(1)
        .getByButton('edit')
        .click()
      const added_contact_inputs = () => cy.get('tr').eq(1).find('input')
      added_contact_inputs()
        .eq(0)
        .clear()
        .type("Jane")
      added_contact_inputs()
        .eq(1)
        .clear()
        .type("604-111-1111")
      added_contact_inputs()
        .eq(2)
        .clear()
        .type("jane@email.com")
      cy.getByButton('update')
        .click()
      // Check if edited values are correct (phone and email should be blank)
      const td_array = () => cy.get('tr').eq(1).find('td')
      td_array()
        .eq(0)
        .contains("Jane")
      td_array()
        .eq(1)
        .should('have.value', "")
      td_array()
        .eq(2)
        .should('have.value', "")
      // Check if edit and delete button is still present
      td_array()
        .eq(3)
        .find(`button[name=edit]`)
        .should('exist')
      td_array()
        .eq(3)
        .find(`button[name=delete]`)
        .should('exist')
    })
    it("Edit a contact with no name change", () => {
      cy.addContact("John", "604-123-4567", "john@email.com")
      // Edit phone and email values only
      cy.get('tr')
        .eq(1)
        .getByButton('edit')
        .click()
      const added_contact_inputs = () => cy.get('tr').eq(1).find('input')
      added_contact_inputs()
        .eq(1)
        .clear()
        .type("604-111-1111")
      added_contact_inputs()
        .eq(2)
        .clear()
        .type("jane@email.com")
      cy.getByButton('update')
        .click()
      // Check if edited values are correct
      const td_array = () => cy.get('tr').eq(1).find('td')
      td_array()
        .eq(0)
        .contains("John")
      td_array()
        .eq(1)
        .contains("604-111-1111")
      td_array()
        .eq(2)
        .contains("jane@email.com")
      // Check if edit and delete button is still present
      td_array()
        .eq(3)
        .find(`button[name=edit]`)
        .should('exist')
      td_array()
        .eq(3)
        .find(`button[name=delete]`)
        .should('exist')
    })
  })
});