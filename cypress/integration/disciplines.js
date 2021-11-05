const ClanList = ["Brujah", "Gangrel", "Malkavian", "Nosferatu", "Toreador", "Tremere", "Ventrue"]
const DisciplineList = ["Animalism", "Auspex", "Blood Sorcery", "Celerity", "Dominate", "Fortitude", 
                        "Obfuscate", "Potence", "Presence", "Protean"]
const PrimaryDisciplines = []
PrimaryDisciplines[0] = [3, 7, 8]
PrimaryDisciplines[1] = [0, 5, 9]
PrimaryDisciplines[2] = [1, 4, 6]
PrimaryDisciplines[3] = [0, 6, 7]
PrimaryDisciplines[4] = [1, 3, 8]
PrimaryDisciplines[5] = [1, 2, 4]
PrimaryDisciplines[6] = [4, 5, 8]

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

function checkNumberOfDots(Item, Expected) {
    checkNumberOfPoints(Item, 0, Expected, 5)
}


describe('Clans & Disciplines relations test', () => {
    it('Thin-Blood has no Primary Disciplines', () => {
        cy.visit('/')        
        cy.contains('Clan:').next().select("Thin-Blood")
        cy.contains('Primary').next().should('not.be.visible')
    })    
    it('Caitiff has no Primary Disciplines', () => {
        cy.contains('Clan:').next().select("Caitiff")
        cy.contains('Primary').next().should('not.be.visible')
    })
    ClanList.forEach((ClanName, ClanIndex) => {
        it('Check primary disciplines when we choose clan ' + ClanName , () => {
            cy.contains('Clan:').next().select(ClanName)
            PrimaryDisciplines[ClanIndex].forEach(DisciplineIndex => {
                // Primary Disciplines are first and if they are not active, they are just invisible
                cy.contains(DisciplineList[DisciplineIndex]).should('be.visible')
            })
        })
    })
})

describe('Restrictions test', () => {
    it('Select Brujah clan and click on last dot of Celerity results in 2 dots', () => {
        cy.contains('Clan:').next().select('Brujah')
        cy.contains('Celerity').next().children().last().click()
        checkNumberOfDots('Celerity', 2)
    })
    it('Click on last dot of Potence results in 1 dots', () => {
        cy.contains('Potence').next().children().last().click()
        checkNumberOfDots('Potence', 1)
    })
    it('Click on last dot of Presence results in 0 dots', () => {        
        cy.contains('Presence').next().children().last().click()
        checkNumberOfDots('Presence', 0)
    })
    it('We can see "All picked"', () => { 
        cy.get('#disciplines').contains('All picked').should('be.visible')
    })
    it('Click on first dot of Celerity results in 0 dots', () => {
        cy.contains('Celerity').next().children().first().click()
        checkNumberOfDots('Celerity', 0)
    })
    it('We can\'t add Animalism as it is Secondary Discipline', () => {
        cy.contains('Secondary').parent().contains('Animalism').next().children().last().click()
        cy.contains('Secondary').parent().contains('Animalism').next().children().first().should('not.have.class', 'fill')
    })
    it('But we can add secondary discipline for Caitiff clan', () => {
        cy.contains('Clan:').next().select('Caitiff')
        cy.contains('Secondary').parent().contains("Animalism").next().children().last().click()
        cy.contains('Secondary').parent().contains("Animalism").next().children().first().should('have.class', 'fill')
    })
    it('We can see "All picked"', () => { 
        cy.get('#disciplines').contains('All picked').should('be.visible')
    })
})