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

function checkNumberOfDots(Item, Expected) {
    var i = 0;
    var ExpectedResults = []
    for (i; i < 5; i++) {
        if (i<Expected) {
            ExpectedResults.push('have.class')
        }
        else {
            ExpectedResults.push('not.have.class')        
        }     
    }
    cy.contains(Item).next().children().last().should(ExpectedResults[4], 'fill')
    cy.contains(Item).next().children().next().next().next().should(ExpectedResults[3], 'fill')
    cy.contains(Item).next().children().next().next().should(ExpectedResults[2], 'fill')        
    cy.contains(Item).next().children().next().should(ExpectedResults[1], 'fill')
    cy.contains(Item).next().children().first().should(ExpectedResults[0], 'fill')
}

describe('Clans & Disciplines test', () => {

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

    it('Check restriction works for Brujah clan', () => {
        cy.contains('Clan:').next().select('Brujah')
        cy.contains('Celerity').next().children().last().click()
        checkNumberOfDots('Celerity', 2)
        cy.contains('Potence').next().children().last().click()
        checkNumberOfDots('Potence', 1)
        cy.contains('Presence').next().children().last().click()
        checkNumberOfDots('Presence', 0)
        cy.contains('All picked')
        cy.contains('Celerity').next().children().first().click()
        checkNumberOfDots('Celerity', 0)
        cy.contains('Secondary').parent().contains('Animalism').next().children().last().click()
        cy.contains('Secondary').parent().contains('Animalism').next().children().first().should('not.have.class', 'fill')
    })

    it('Check we can add secondary discipline for Caitiff clan', () => {
        cy.contains('Clan:').next().select('Caitiff')
        cy.contains('Secondary').parent().contains("Animalism").next().children().last().click()
        cy.contains('Secondary').parent().contains("Animalism").next().children().first().should('have.class', 'fill')
    })
})