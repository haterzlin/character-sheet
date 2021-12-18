const SkillList = [
    "Athlethics","Brawl", "Craft", "Drive", "Firearms", "Larceny", "Melee", "Stealth", "Survival",
    "Animal Ken","Etiquette", "Insight", "Intimidation", "Leadership", "Performance", "Persuasion", "Streetwise", "Subterfuge",
    "Academics","Awareness", "Finance", "Investigation", "Medicine", "Occult", "Politics", "Science", "Technology"
]
const Distributions = {
    "Balanced": [12,7,5,3,0,0],
    "Jack-of-all-trades": [8,10,8,1,0,0],
    "Specialist": [17,3,3,3,1,0]
}
const Balanced3LvlSkills = [0,1,2]
const Balanced2LvlSkills = [3,4,5,6,7]
const Balanced1LvlSkills = [8,9,10,11,12,13,14]
const Jack2LvlSkills = [15,16,17]
const Jack1LvlSkills = [18,19,20]
const Jack0LvlSkills = [0,2]

function checkNumberOfDots(Item, Expected) {
    cy.checkNumberOfPoints(Item, 0, Expected, 5)
}


describe('Skill test', () => {

    it('Check skill distribution is Balanced', () => {
        cy.visit('/')
        cy.contains('Skills').children().should('have.value', String(Distributions["Balanced"]))
    })
    
    Balanced3LvlSkills.forEach(i => {
        it('When we click on 5th dot of ' + SkillList[i] + ', only three dots are allowed', () => {
            cy.getNthPointOf(SkillList[i], 5).click()
            checkNumberOfDots(SkillList[i], 3)
        })
    })

    Balanced2LvlSkills.forEach(i => {
        it('When we click on 5th dot of ' + SkillList[i] + ', only two dots are allowed', () => {
            cy.getNthPointOf(SkillList[i], 5).click()
            checkNumberOfDots(SkillList[i], 2)
        })
    })

    Balanced1LvlSkills.forEach(i => {
        it('When we click on 5th dot of ' + SkillList[i] + ', only one dot is allowed', () => {
            cy.getNthPointOf(SkillList[i], 5).click()
            checkNumberOfDots(SkillList[i], 1)
        })
    })

    it('When we click on 1st dot of Brawl, two dots removed as we are allowed to remove', () => {
        var i = 1
        cy.getNthPointOf(SkillList[i], 1).click()
        checkNumberOfDots(SkillList[i], 1)
    })

    it('When we click on 1st dot of Brawl, additional dot is removed', () => {
        var i = 1
        cy.getNthPointOf(SkillList[i], 1).click()
        checkNumberOfDots(SkillList[i], 0)
    })

    it('When we click on 1st dot of Brawl, nothing changes as we are not allowed to add one dot', () => {
        var i = 1
        cy.getNthPointOf(SkillList[i], 1).click()
        checkNumberOfDots(SkillList[i], 0)
    })

    it('When we click on 2nd dot of Brawl, nothing changes as we are not allowed to add two dots', () => {
        var i = 1
        cy.getNthPointOf(SkillList[i], 2).click()
        checkNumberOfDots(SkillList[i], 0)
    })

    it('But when we click on 3rd dot of Brawl, three dots are set as we are allowed to add three dots', () => {
        var i = 1
        cy.getNthPointOf(SkillList[i], 3).click()
        checkNumberOfDots(SkillList[i], 3)
    })

    it('When we click on 5th dot of Persuation, no dots are set as no picks are available now', () => {
        var i = 15
        cy.getNthPointOf(SkillList[i], 5).click()
        checkNumberOfDots(SkillList[i], 0)
    })

    it('All picked is displayed', () => {                
        cy.get('#skills').contains('All picked').should('be.visible')
    })  

    it('Change skill distribution to Jack of all Trades', () => {
        cy.contains('Skills').children().select(String(Distributions["Jack-of-all-trades"]))
        cy.contains('Skills').children().should('have.value', String(Distributions["Jack-of-all-trades"]))
    })

    Jack2LvlSkills.forEach(i => {
        it('When we click on 5th dot of ' + SkillList[i] + ', two dots is allowed', () => {
            cy.getNthPointOf(SkillList[i], 5).click()
            checkNumberOfDots(SkillList[i], 2)
        })
    })

    Jack1LvlSkills.forEach(i => {
        it('When we click on 5th dot of ' + SkillList[i] + ', only one dot is allowed', () => {
            cy.getNthPointOf(SkillList[i], 5).click()
            checkNumberOfDots(SkillList[i], 1)
        })
    })

    Jack0LvlSkills.forEach(i => {
        it('When we click on 1st dot of ' + SkillList[i] + ' twice, all dots are removed', () => {
            cy.getNthPointOf(SkillList[i], 1).click().click()
            checkNumberOfDots(SkillList[i], 0)
        })
    })

    it('When we click on 5th dot of Investigation, zero dots is added', () => {
        var i = 21
        cy.getNthPointOf(SkillList[i], 5).click()
        checkNumberOfDots(SkillList[i], 0)
    })

    it('Change skill distribution to Specialist', () => {
        cy.contains('Skills').children().select(String(Distributions["Specialist"]))
        cy.contains('Skills').children().should('have.value', String(Distributions["Specialist"]))
    })

    it('When we click on 5th dot of Investigation, four dots are added', () => {
        var i = 21
        cy.getNthPointOf(SkillList[i], 5).click()
        checkNumberOfDots(SkillList[i], 4)
    })

})