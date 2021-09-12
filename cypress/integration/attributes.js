describe('Attributes test', () => {
    it('Click on Strength 2nd dot will add fill class', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Strength').next().children().next().first().click()
        cy.contains('Strength').next().children().next().first().should('have.class', 'fill')
    })
    it('Second click on Strength 2nd dot will remove fill class', () => {        
        cy.contains('Strength').next().children().next().first().click()
        cy.contains('Strength').next().children().next().first().should('not.have.class', 'fill')
    })
    it('Click on Strength 5th point will not add fill class to the fith dot', () => {        
        cy.contains('Strength').next().children().last().click()
        cy.contains('Strength').next().children().last().first().should('not.have.class', 'fill')
    })
    it('But will add fill class to all previous dots', () => {                
        cy.contains('Strength').next().children().next().next().next().should('have.class', 'fill')
        cy.contains('Strength').next().children().next().next().should('have.class', 'fill')
        cy.contains('Strength').next().children().next().should('have.class', 'fill')
    })
    it('When we click on 5th dot of Dexterity, only three dots are added', () => {                
        cy.contains('Dexterity').next().children().last().click()
        cy.contains('Dexterity').next().children().last().should('not.have.class', 'fill')
        cy.contains('Dexterity').next().children().next().next().should('have.class', 'fill')        
        cy.contains('Dexterity').next().children().next().should('have.class', 'fill')
    })
    it('When we click on 5th dot of Stamina, only three dots are added', () => {                
        cy.contains('Stamina').next().children().last().click()
        cy.contains('Stamina').next().children().last().should('not.have.class', 'fill')
        cy.contains('Stamina').next().children().next().next().should('have.class', 'fill')
        cy.contains('Stamina').next().children().next().should('have.class', 'fill')
    })
    it('When we click on 5th dot of Charisma, only three dots are added', () => {                
        cy.contains('Charisma').next().children().last().click()
        cy.contains('Charisma').next().children().last().should('not.have.class', 'fill')
        cy.contains('Charisma').next().children().next().next().should('have.class', 'fill')
        cy.contains('Charisma').next().children().next().should('have.class', 'fill')
    })
    it('When we click on 5th dot of Manipulation, only two dots are added', () => {                
        cy.contains('Manipulation').next().children().last().click()
        cy.contains('Manipulation').next().children().last().should('not.have.class', 'fill')
        cy.contains('Manipulation').next().children().next().next().should('not.have.class', 'fill')
        cy.contains('Manipulation').next().children().next().should('have.class', 'fill')
    })
    it('When we click on 5th dot of Composure, only one dot is added', () => {                
        cy.contains('Composure').next().children().last().click()
        cy.contains('Composure').next().children().last().should('not.have.class', 'fill')
        cy.contains('Composure').next().children().next().next().should('not.have.class', 'fill')
        cy.contains('Composure').next().children().next().should('have.class', 'fill')
    })
    it('When we click on 5th dot of Intelligence, only one dot is added', () => {                
        cy.contains('Intelligence').next().children().last().click()
        cy.contains('Intelligence').next().children().last().should('not.have.class', 'fill')
        cy.contains('Intelligence').next().children().next().next().should('not.have.class', 'fill')
        cy.contains('Intelligence').next().children().next().should('have.class', 'fill')
    })
    it('When we click on 5th dot of Wits, only one dot is added', () => {                
        cy.contains('Wits').next().children().last().click()
        cy.contains('Wits').next().children().last().should('not.have.class', 'fill')
        cy.contains('Wits').next().children().next().next().should('not.have.class', 'fill')
        cy.contains('Wits').next().children().next().should('have.class', 'fill')
    })
    it('When we click on 5th dot of Resolve, no dotis added', () => {                
        cy.contains('Resolve').next().children().last().click()
        cy.contains('Resolve').next().children().last().should('not.have.class', 'fill')
        cy.contains('Resolve').next().children().next().next().should('not.have.class', 'fill')
        cy.contains('Resolve').next().children().next().should('not.have.class', 'fill')
    })
  })
  