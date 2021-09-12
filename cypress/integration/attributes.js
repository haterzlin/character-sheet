describe('Attributes test', () => {
    it('Click on Strenght 2nd point', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Strength').next().children().next().first().click()
        cy.contains('Strength').next().children().next().first().should('have.class', 'fill')
    })
  })
  