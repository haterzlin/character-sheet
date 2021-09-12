describe('Attributes test', () => {
    const AttributeList = ["Strength","Dexterity", "Stamina", "Charisma", "Manipulation", "Composure", "Intelligence", "Wits", "Resolve"]
    const lvl3Attrs = ["Dexterity", "Stamina", "Charisma"]
    const lvl2Attrs = ["Manipulation", "Composure", "Intelligence", "Wits"]

    it('All Attributes has initial one dot', () => {
        cy.visit('http://localhost:3000')        
        AttributeList.forEach(element => {
            cy.contains('Strength').next().children().first().should('have.class', 'init') 
        })
    })
    it('Click on Strength 1st dot will not add fill class or remove init class', () => {
        cy.contains('Strength').next().children().first().click()
        cy.contains('Strength').next().children().first().should('not.have.class', 'fill')
        cy.contains('Strength').next().children().first().should('have.class', 'init')
    })   
    it('Click on Strength 2nd dot will add fill class', () => {
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
    lvl3Attrs.forEach(element => {
        it('When we click on 5th dot of ' + element + ', only three dots are allowed', () => {                
            cy.contains(element).next().children().last().click()
            cy.contains(element).next().children().last().should('not.have.class', 'fill')
            cy.contains(element).next().children().next().next().should('have.class', 'fill')        
            cy.contains(element).next().children().next().should('have.class', 'fill')
        })
    })
    lvl2Attrs.forEach(element => {
        it('When we click on 5th dot of ' + element + ', only two dots are allowed', () => {                
            cy.contains(element).next().children().last().click()
            cy.contains(element).next().children().last().should('not.have.class', 'fill')
            cy.contains(element).next().children().next().next().should('not.have.class', 'fill')        
            cy.contains(element).next().children().next().should('have.class', 'fill')
        })
    })
    it('When we click on 5th dot of Resolve, no dots added', () => {                
        cy.contains('Resolve').next().children().last().click()
        cy.contains('Resolve').next().children().last().should('not.have.class', 'fill')
        cy.contains('Resolve').next().children().next().next().should('not.have.class', 'fill')
        cy.contains('Resolve').next().children().next().should('not.have.class', 'fill')
    })
    it('When all dots are divided, we click on 1st dot of Strength and there will be only one dot there', () => {                
        cy.contains('Strength').next().children().first().click()
        cy.contains('Strength').next().children().last().should('not.have.class', 'fill')
        cy.contains('Strength').next().children().next().next().should('not.have.class', 'fill')
        cy.contains('Strength').next().children().next().should('not.have.class', 'fill')
        cy.contains('Strength').next().children().first().should('not.have.class', 'fill')
        cy.contains('Strength').next().children().first().should('have.class', 'init')
    })
  })
  