const AttributeList = ["Strength","Dexterity", "Stamina", "Charisma", "Manipulation", "Composure", "Intelligence", "Wits", "Resolve"]
const lvl3Attrs = ["Dexterity", "Stamina", "Charisma"]
const lvl2Attrs = ["Manipulation", "Composure", "Intelligence", "Wits"]    

function checkNumberOfPoints(Item, ExpectedInit, ExpectedFill, Scale) {
    var CurrentChildren = cy.contains(Item).next().children()
    var i = 1
    while ('UP DOG'){
        if (i <= ExpectedFill) {
            CurrentChildren.first().should('have.class', (i <= ExpectedInit) ? 'init' : 'fill')
        }
        else {
            CurrentChildren.first().should('not.have.class', 'fill')
            CurrentChildren.first().should('not.have.class', 'init')      
        }
        if (i === Scale){
            break
        }
        CurrentChildren = CurrentChildren.next()
        i++
    }
}

function checkNumberOfDots(Item, Expected) {
    checkNumberOfPoints(Item, 1, Expected, 5)
}

describe('Attributes test', () => {
    it('All Attributes has initial one dot', () => {
        cy.visit('/')
        AttributeList.forEach(element => {
            cy.contains(element).next().children().first().should('have.class', 'init') 
        })
    })
    it('Click on Strength 1st dot will not add fill class or remove init class', () => {
        cy.contains('Strength').next().children().first().click()
        checkNumberOfDots('Strength', 1)
    })   
    it('Click on Strength 2nd dot will add fill class', () => {
        cy.contains('Strength').next().children().next().first().click()
        checkNumberOfDots('Strength', 2)
    })
    it('Second click on Strength 2nd dot will remove fill class', () => {        
        cy.contains('Strength').next().children().next().first().click()
        checkNumberOfDots('Strength', 1)
    })
    it('Click on Strength 5th point will not add fill class to the fifth dot', () => {        
        cy.contains('Strength').next().children().last().click()
        checkNumberOfDots('Strength', 4)
    })
    lvl3Attrs.forEach(element => {
        it('When we click on 5th dot of ' + element + ', only three dots are allowed', () => {                
            cy.contains(element).next().children().last().click()
            checkNumberOfDots(element, 3)
        })
    })
    lvl2Attrs.forEach(element => {
        it('When we click on 5th dot of ' + element + ', only two dots are allowed', () => {                
            cy.contains(element).next().children().last().click()
            checkNumberOfDots(element, 2)
        })
    })
    it('When we click on 5th dot of Resolve, no dots added', () => {                
        cy.contains('Resolve').next().children().last().click()
        checkNumberOfDots('Resolve', 1)
    })
    it('All picked is displayed', () => {                
        cy.contains('All picked')
    })    
    it('When all dots are divided, we click on 1st dot of Strength and there will be only one dot there', () => {                
        cy.contains('Strength').next().children().first().click()
        checkNumberOfDots('Strength', 1)
    })
  })
  