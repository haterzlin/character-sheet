const AttributeList = ["Strength","Dexterity", "Stamina", "Charisma", "Manipulation", "Composure", "Intelligence", "Wits", "Resolve"]
const lvl3Attrs = ["Dexterity", "Stamina", "Charisma"]
const lvl2Attrs = ["Manipulation", "Composure", "Intelligence", "Wits"]    

function checkNumberOfDots(Item, Expected) {
    cy.checkNumberOfPoints(Item, 1, Expected, 5)
}

describe('Attributes test', () => {
    it('All Attributes has initial one dot', () => {
        cy.visit('/')
        AttributeList.forEach(element => {
            cy.getNthPointOf(element, 1).should('have.class', 'init')
        })
    })
    it('Click on Strength 1st dot will not add fill class or remove init class', () => {
        cy.getNthPointOf('Strength', 1).click()
        checkNumberOfDots('Strength', 1)
    })   
    it('Click on Strength 2nd dot will add fill class', () => {
        cy.getNthPointOf('Strength', 2).click()
        checkNumberOfDots('Strength', 2)
    })
    it('Second click on Strength 2nd dot will remove fill class', () => {        
        cy.getNthPointOf('Strength', 2).click()
        checkNumberOfDots('Strength', 1)
    })
    it('Click on Strength 5th point will not add fill class to the fifth dot', () => {   
        cy.getNthPointOf('Strength', 5).click()
        checkNumberOfDots('Strength', 4)
    })
    lvl3Attrs.forEach(element => {
        it('When we click on 5th dot of ' + element + ', only three dots are allowed', () => {                
            cy.getNthPointOf(element, 5).click()
            checkNumberOfDots(element, 3)
        })
    })
    lvl2Attrs.forEach(element => {
        it('When we click on 5th dot of ' + element + ', only two dots are allowed', () => {                
            cy.getNthPointOf(element, 5).click()
            checkNumberOfDots(element, 2)
        })
    })
    it('When we click on 5th dot of Resolve, no dots added', () => {
        cy.getNthPointOf('Resolve', 5).click()              
        checkNumberOfDots('Resolve', 1)
    })
    it('All picked is displayed', () => {                
        cy.get('#attributes').contains('All picked').should('be.visible')
    })    
    it('When all dots are divided, we click on 1st dot of Strength and there will be only one dot there', () => {                
        cy.getNthPointOf('Strength', 1).click()
        checkNumberOfDots('Strength', 1)
    })
  })
  