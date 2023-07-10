describe('Test Contact App', () => {

  beforeEach(() => {
    cy.visit('./contact_app.html')
  })

  it('Test if the application loads correctly', () => {
    cy.get('h1.text-center').should('have.text', 'Contact List App');
    cy.get('table tbody tr').should('have.length', 1)
  })

  // Add tests here

  describe('Test if starter elements are present', () => {
    it("Test if first column 'Name' is present", () => {
      cy.get('tr')
        .eq(0)
        .find('th')
        .eq(1)
        .contains('Name')
    })
  })
});