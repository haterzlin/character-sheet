function nthChild(CyElement, Iterator) {
    if (Iterator < 1 ){
        return undefined
    }
    if (Iterator !== 1) {
        return nthChild(CyElement.next(), Iterator - 1)
    }
    return CyElement.first()
}

function getNthPointOf(Item, Number) {
    return nthChild(cy.contains(Item).next().children(), Number)
}

function checkNumberOfPoints(Item, ExpectedInit, ExpectedFill, Scale) {
    var CurrentItem = cy.contains(Item).next().children()
    var i = 1
    while ('UP DOG'){
        if (i <= ExpectedFill) {
            CurrentItem.first().should('have.class', (i <= ExpectedInit) ? 'init' : 'fill')
        }
        else {
            CurrentItem.first().should('not.have.class', 'fill').or('not.have.class', 'init')      
        }
        if (i !== Scale){
            break
        }
        CurrentItem = CurrentItem.next()
        i++
    }
}

describe('Vitals test',()=>{
    it('Page Exists', () => {
        cy.visit('/')
    })
    it('Initialization check of Stamina, Composure, Resolve, Health, Willpower', () => {
        checkNumberOfPoints('Stamina', 1, 1, 5)
        checkNumberOfPoints('Composure', 1, 1, 5)
        checkNumberOfPoints('Resolve', 1, 1, 5)
        checkNumberOfPoints('Health', 4, 4, 15) // health = stamina + 3
        checkNumberOfPoints('Willpower', 2, 2, 15) // willpower = resolve + composure
    })
    it('Click on Stamina 4th dot will add fill class and Health will have added fill class up to 7th Point', () => {
        getNthPointOf('Stamina', 4).click()
        checkNumberOfPoints('Stamina', 1, 4, 5)
        checkNumberOfPoints('Health', 4, 7, 15) // health = stamina + 3
    })
    it('Click on Composure 3rd dot will add fill class and Willpower shall have added fill class up to 4th Point', () => {
        getNthPointOf('Composure', 3).click()
        checkNumberOfPoints('Composure', 1, 3, 5)
        checkNumberOfPoints('Willpower', 2, 4, 15) // willpower = resolve + composure
    })
    it('Click on Resolve 3rd dot will add fill class and Willpower shall have added fill class up to 4th Point', () => {
        getNthPointOf('Resolve', 3).click()
        checkNumberOfPoints('Resolve', 1, 3, 5)
        checkNumberOfPoints('Willpower', 2, 6, 15) // willpower = resolve + composure
    })
})