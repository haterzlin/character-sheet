
describe('Help test', () => {
    it('Page Exists', () => {
        cy.visit('/')
    })
    it('Help window can be opened and closed', () => {
        cy.get('#helpOpen').click()
        cy.get('#help').should('be.visible')
        cy.get('#helpExit').click()
    })
    it('Help window contains initial help for help window', () => {
        cy.get('#helpOpen').click()
        cy.get('#helpSelect').contains('Help').parent().should('have.class','selected')
        cy.get('#help').contains('help window').should('be.visible')
    })
    it('After clicking on (?), help should close and sheet should be visible, clicking on Strength should open help and info for strength should be visible', () => {
        cy.get('#helpClick').click()
        cy.contains('Strength').click()
        cy.get('#helpSelect').contains('Strength').parent().should('have.class','selected')
        cy.get('#help').contains('Strength governs').should('be.visible')
    })
    it('After selecting Dexterity in select, help for Dexterity should be visible', () => {
        cy.get('#helpSelect').contains('Dexterity').click().parent().should('have.class','selected')
        cy.get('#help').contains('Dexterity governs').should('be.visible')
    })
})