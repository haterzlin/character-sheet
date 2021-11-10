const Generation2BloodPotency = [
    { generation: '16th', bloodPotency: 0 },
    { generation: '15th', bloodPotency: 0 },
    { generation: '14th', bloodPotency: 0 },
    { generation: '13th', bloodPotency: 1 },
    { generation: '12th', bloodPotency: 1 },
    { generation: '11th', bloodPotency: 2 },
    { generation: '10th', bloodPotency: 2 }
]

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
    var CurrentChild = cy.contains(Item).next().children().first()
    for (var i=1; i <= Scale; i++) {        
        if (i != 1) {
            CurrentChild = CurrentChild.next().first()
        }
        if (i <= ExpectedFill) {
            CurrentChild.should('have.class', (i <= ExpectedInit) ? 'init' : 'fill')
        }
        else {
            CurrentChild.should('not.have.class', 'fill')
            CurrentChild.should('not.have.class', 'init')      
        }        
    }
}

describe('Vitals test', () => {
    it('Page Exists', () => {
        cy.visit('/')
    })
    it('Initialization check of Stamina, Composure, Resolve, Health, Willpower', () => {
        checkNumberOfPoints('Stamina', 1, 1, 5)
        checkNumberOfPoints('Composure', 1, 1, 5)
        checkNumberOfPoints('Resolve', 1, 1, 5)
        checkNumberOfPoints('Health', 4, 4, 15)
        checkNumberOfPoints('Willpower', 2, 2, 15)
    })
    it('Click on Stamina 4th dot will add fill class and Health will have added fill class up to 7th Point', () => {
        getNthPointOf('Stamina', 4).click()
        checkNumberOfPoints('Health', 4, 7, 15)
    })
    it('Click on Composure 3rd dot will add fill class and Willpower shall have added fill class up to 4th Point', () => {
        getNthPointOf('Composure', 3).click()
        checkNumberOfPoints('Willpower', 2, 4, 15)
    })
    it('Click on Resolve 3rd dot will add fill class and Willpower shall have added fill class up to 4th Point', () => {
        getNthPointOf('Resolve', 3).click()
        checkNumberOfPoints('Willpower', 2, 6, 15)
    })
    it('Click on Stamina 3rd dot will remove fill class and Health will have removed fill class up to 6th Point', () => {
        getNthPointOf('Stamina', 3).click()
        checkNumberOfPoints('Health', 4, 5, 15)
    })
    it('Click on Composure 3rd dot will remove fill class and Willpower shall have removed fill class at 4th Point', () => {
        getNthPointOf('Composure', 3).click()
        checkNumberOfPoints('Willpower', 2, 5, 15)
    })
})

describe('Generation 2 Blood Potency test', () => {
    it('Initialization check of Blood Potency', () => {
        checkNumberOfPoints('Blood Potency', 0, 0, 10)
    })

    Generation2BloodPotency.forEach(item => {
        it('Select ' + item.generation + ' generation and check that the value of blood potency is ' + item.bloodPotency, () => {
            cy.contains('Generation').get('select:first').select(item.generation)
            checkNumberOfPoints('Blood Potency', 0, item.bloodPotency, 10)
        })
    })
})