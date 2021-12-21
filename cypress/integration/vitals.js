const Generation2BloodPotency = [
    { generation: '16th', bloodPotency: 0 },
    { generation: '15th', bloodPotency: 0 },
    { generation: '14th', bloodPotency: 0 },
    { generation: '13th', bloodPotency: 1 },
    { generation: '12th', bloodPotency: 1 },
    { generation: '11th', bloodPotency: 2 },
    { generation: '10th', bloodPotency: 2 }
]

describe('Vitals test', () => {
    it('Page Exists', () => {
        cy.visit('/')
    })
    it('Initialization check of Stamina, Composure, Resolve, Health, Willpower', () => {
        cy.checkNumberOfPoints('Stamina', 1, 1, 5)
        cy.checkNumberOfPoints('Composure', 1, 1, 5)
        cy.checkNumberOfPoints('Resolve', 1, 1, 5)
        cy.checkNumberOfPoints('Health', 4, 4, 15)
        cy.checkNumberOfPoints('Willpower', 2, 2, 15)
    })
    it('Click on Stamina 4th dot will add fill class and Health will have added fill class up to 7th Point', () => {
        cy.getNthPointOf('Stamina', 4).click()
        cy.checkNumberOfPoints('Health', 4, 7, 15)
    })
    it('Click on Composure 3rd dot will add fill class and Willpower shall have added fill class up to 4th Point', () => {
        cy.getNthPointOf('Composure', 3).click()
        cy.checkNumberOfPoints('Willpower', 2, 4, 15)
    })
    it('Click on Resolve 3rd dot will add fill class and Willpower shall have added fill class up to 4th Point', () => {
        cy.getNthPointOf('Resolve', 3).click()
        cy.checkNumberOfPoints('Willpower', 2, 6, 15)
    })
    it('Click on Stamina 2nd dot will remove fill class and Health will have removed fill class up to 6th Point', () => {
        cy.getNthPointOf('Stamina', 2).click()
        cy.checkNumberOfPoints('Health', 4, 5, 15)
    })
    it('Click on Composure 3rd dot will remove fill class and Willpower shall have removed fill class at 4th Point', () => {
        cy.getNthPointOf('Composure', 3).click()
        cy.checkNumberOfPoints('Willpower', 2, 4, 15)
    })
})

describe('Generation 2 Blood Potency test', () => {
    it('Initialization check of Blood Potency', () => {
        cy.checkNumberOfPoints('Blood Potency', 0, 0, 10)
    })

    Generation2BloodPotency.forEach(item => {
        it('Select ' + item.generation + ' generation and check that the value of blood potency is ' + item.bloodPotency, () => {
            cy.contains('Generation').next().select(item.generation)
            cy.checkNumberOfPoints('Blood Potency', 0, item.bloodPotency, 10)
        })
    })
})