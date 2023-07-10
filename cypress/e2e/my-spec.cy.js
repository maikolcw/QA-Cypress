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
        cy.get('tr')
          .eq(0)
          .find('th')
          .eq(0)
          .contains('Name')
      })

      it("Test if second column title 'Phone' is present", () => {
        cy.get('tr')
          .eq(0)
          .find('th')
          .eq(1)
          .contains('Phone')
      })

      it("Test if third column title 'Email' is present", () => {
        cy.get('tr')
          .eq(0)
          .find('th')
          .eq(2)
          .contains('Email')
      })

      it("Test if fourth column title 'Actions' is present", () => {
        cy.get('tr')
          .eq(0)
          .find('th')
          .eq(3)
          .contains('Actions')
      })
    })
  })
});