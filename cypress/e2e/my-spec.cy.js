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

  
});