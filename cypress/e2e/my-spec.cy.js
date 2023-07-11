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
          .contains(Cypress.env('column_name'))
      })

      it("Test if second column title 'Phone' is present", () => {
        cy.get('th')
          .eq(1)
          .contains(Cypress.env('column_phone'))
      })

      it("Test if third column title 'Email' is present", () => {
        cy.get('th')
          .eq(2)
          .contains(Cypress.env('column_email'))
      })

      it("Test if fourth column title 'Actions' is present", () => {
        cy.get('th')
          .eq(3)
          .contains(Cypress.env('column_actions'))
      })
    })

    context("Input elements", () => {
      it("Test if first input has placeholder 'Name'", () => {
        cy.get('input')
          .eq(0)
          .should('have.attr', 'placeholder')
          .and('equal', Cypress.env('column_name'))
      })

      it("Test if second input has placeholder 'Phone", () => {
        cy.get('input')
          .eq(1)
          .should('have.attr', 'placeholder')
          .and('equal', Cypress.env('column_phone'))
      })

      it("Test if third input has placeholder 'Email", () => {
        cy.get('input')
          .eq(2)
          .should('have.attr', 'placeholder')
          .and('equal', Cypress.env('column_email'))
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
      cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
      // check if new contact is added and data is correct
      const tr_array = () => cy.get('tr')
      tr_array()
        .should('have.length', 2)
      tr_array()
        .eq(1)
        .find('td')
        .eq(0)
        .contains(Cypress.env('default_name'))
      tr_array()
        .eq(1)
        .find('td')
        .eq(1)
        .contains(Cypress.env('default_phone'))
      tr_array()
        .eq(1)
        .find('td')
        .eq(2)
        .contains(Cypress.env('default_email'))
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
      cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
      // Edit all 3 values of contact
      cy.get('tr')
        .eq(1)
        .getByButton('edit')
        .click()
      const added_contact_inputs = () => cy.get('tr').eq(1).find('input')
      added_contact_inputs()
        .eq(0)
        .clear()
        .type(Cypress.env('correct_name'))
      added_contact_inputs()
        .eq(1)
        .clear()
        .type(Cypress.env('correct_phone'))
      added_contact_inputs()
        .eq(2)
        .clear()
        .type(Cypress.env('correct_email'))
      cy.getByButton('update')
        .click()
      // Check if edited values are correct (phone and email should be blank)
      const td_array = () => cy.get('tr').eq(1).find('td')
      td_array()
        .eq(0)
        .contains(Cypress.env('correct_name'))
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
      cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
      // Edit phone and email values only
      cy.get('tr')
        .eq(1)
        .getByButton('edit')
        .click()
      const added_contact_inputs = () => cy.get('tr').eq(1).find('input')
      added_contact_inputs()
        .eq(1)
        .clear()
        .type(Cypress.env('correct_phone'))
      added_contact_inputs()
        .eq(2)
        .clear()
        .type(Cypress.env('correct_email'))
      cy.getByButton('update')
        .click()
      // Check if edited values are correct
      const td_array = () => cy.get('tr').eq(1).find('td')
      td_array()
        .eq(0)
        .contains(Cypress.env('default_name'))
      td_array()
        .eq(1)
        .contains(Cypress.env('correct_phone'))
      td_array()
        .eq(2)
        .contains(Cypress.env('correct_email'))
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

    it("Delete a contact", () => {
      cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
      cy.getByButton('delete')
        .click()
      cy.get('tr')
        .should('have.length', 1)
    })
  })

  // Negative test to check if future implementation will fix checking of values for input
  context("Negative tests", () => {
    context("Adding incorrect name values", () => {
      it("Test if name can contain numbers", () => {
        cy.addContact("999", Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.numberOfTrInTableShouldBeX(2)
      })

      it("Test if name can be empty", () => {
        cy.addContact("", Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.numberOfTrInTableShouldBeX(2)
      })

      it("Test if name can can contain non alphanumeric characters", () => {
        cy.addContact("-=@%(^*", Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.numberOfTrInTableShouldBeX(2)
      })

      it("Test if name can be longer than 100 characters", () => {
        cy.addContact("Fivefivefivefivefivefivefivefivefivefivefivefivefivefivefivefivefivefivefivefivefivefivefivefivea",
          Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.numberOfTrInTableShouldBeX(2)
      })
    })

    // just some simple tests for phone numbers without knowing requirements or region
    context("Adding incorrect phone values", () => {
      it("Test if phone can contain letters", () => {
        cy.addContact(Cypress.env('default_name'), "60X-12Y-456Z", Cypress.env('default_email'))
        cy.numberOfTrInTableShouldBeX(2)
      })

      it("Test if phone can be empty", () => {
        cy.addContact(Cypress.env('default_name'), "", Cypress.env('default_email'))
        cy.numberOfTrInTableShouldBeX(2)
      })

      it("Test if phone can contain non alphanumeric characters other than '-'", () => {
        cy.addContact(Cypress.env('default_name'), "6!4-12@-456$", Cypress.env('default_email'))
        cy.numberOfTrInTableShouldBeX(2)
      })

      it("Test if phone can be delimited by white space", () => {
        cy.addContact(Cypress.env('default_name'), "604 123 4567", Cypress.env('default_email'))
        cy.numberOfTrInTableShouldBeX(2)
      })

      it("Test if phone can be longer than 10 digits", () => {
        cy.addContact(Cypress.env('default_name'), "1-604-123-4567", Cypress.env('default_email'))
        cy.numberOfTrInTableShouldBeX(2)
      })
    })

    // Of course this is not an exhaustive list, depends on provider and requirements
    context("Adding incorrect email values", () => {
      it("Test email without @", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), "johnemail.com")
        cy.numberOfTrInTableShouldBeX(2)
      })

      it("Test if email can be empty", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), "")
        cy.numberOfTrInTableShouldBeX(2)
      })

      it("Test email with bad domain", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), "john@999")
        cy.numberOfTrInTableShouldBeX(2)
      })

      it("Test email with non alphanumeric username", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), "(#%@email.com")
        cy.numberOfTrInTableShouldBeX(2)
      })

      it("Test email with non consecutive '.' username", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), "john..smith@email.com")
        cy.numberOfTrInTableShouldBeX(2)
      })

      it("Test if email can be longer than 100 characters", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'),
          "johnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnj@email.com")
        cy.numberOfTrInTableShouldBeX(2)
      })
    })

    context("Editing incorrect name values", () => {
      it("Test if name can contain numbers", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.changeAndCheckIfYValueChanged(1, "name", "jo9n")
      })

      it("Test if name can be empty", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.changeAndCheckIfYValueChanged(1, "name", "")
      })

      it("Test if name can can contain non alphanumeric characters", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.changeAndCheckIfYValueChanged(1, "name", "-=@%(^*")
      })

      it("Test if name can be longer than 100 characters", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.changeAndCheckIfYValueChanged(1, "name", "Fivefivefivefivefivefivefivefivefivefivefivefivefivefivefivefivefivefivefivefivefivefivefivefivea")
      })
    })

    context("Editing incorrect phone values", () => {
      it("Test if phone can contain letters", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.changeAndCheckIfYValueChanged(1, "phone", "60X-12Y-456Z")
      })

      it("Test if phone can be empty", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.changeAndCheckIfYValueChanged(1, "phone", "")
      })

      it("Test if phone can contain non alphanumeric characters other than '-'", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.changeAndCheckIfYValueChanged(1, "phone", "6!4-12@-456$")
      })

      it("Test if phone can be delimited by white space", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.changeAndCheckIfYValueChanged(1, "phone", "604 123 4567")
      })

      it("Test if phone can be longer than 10 digits", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.changeAndCheckIfYValueChanged(1, "phone", "1-604-123-4567")
      })
    })

    context.only("Editing incorrect email values", () => {
      it("Test email without @", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.changeAndCheckIfYValueChanged(1, "email", "johnemail.com")
      })

      it("Test if email can be empty", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.changeAndCheckIfYValueChanged(1, "email", "")
      })

      it("Test email with bad domain", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.changeAndCheckIfYValueChanged(1, "email", "john@999")
      })

      it("Test email with non alphanumeric username", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.changeAndCheckIfYValueChanged(1, "email", "(#%@email.com")
      })

      it("Test email with non consecutive '.' username", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.changeAndCheckIfYValueChanged(1, "email", "john..smith@email.com")
      })

      it("Test if email can be longer than 100 characters", () => {
        cy.addContact(Cypress.env('default_name'), Cypress.env('default_phone'), Cypress.env('default_email'))
        cy.changeAndCheckIfYValueChanged(1, "email",
          "johnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnjohnj@email.com")
      })
    })
  })
});