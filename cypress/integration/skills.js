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



describe('Skill test', () => {

    it('Check skill distribution is Balanced', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Skills').children().should('have.value', String(Distributions["Balanced"]))
    })
    
    Balanced3LvlSkills.forEach(i => {
        it('When we click on 5th dot of ' + SkillList[i] + ', only three dots are allowed', () => {
            cy.contains(SkillList[i]).next().children().last().click()
            cy.contains(SkillList[i]).next().children().last().should('not.have.class', 'fill')
            cy.contains(SkillList[i]).next().children().next().next().next().should('not.have.class', 'fill')
            cy.contains(SkillList[i]).next().children().next().next().should('have.class', 'fill')        
            cy.contains(SkillList[i]).next().children().next().should('have.class', 'fill')
            cy.contains(SkillList[i]).next().children().first().should('have.class', 'fill')
        })
    })

    Balanced2LvlSkills.forEach(i => {
        it('When we click on 5th dot of ' + SkillList[i] + ', only two dots are allowed', () => {
            cy.contains(SkillList[i]).next().children().last().click()
            cy.contains(SkillList[i]).next().children().last().should('not.have.class', 'fill')
            cy.contains(SkillList[i]).next().children().next().next().next().should('not.have.class', 'fill')
            cy.contains(SkillList[i]).next().children().next().next().should('not.have.class', 'fill')        
            cy.contains(SkillList[i]).next().children().next().should('have.class', 'fill')
            cy.contains(SkillList[i]).next().children().first().should('have.class', 'fill')
        })
    })

    Balanced1LvlSkills.forEach(i => {
        it('When we click on 5th dot of ' + SkillList[i] + ', only one dot is allowed', () => {
            cy.contains(SkillList[i]).next().children().last().click()
            cy.contains(SkillList[i]).next().children().last().should('not.have.class', 'fill')
            cy.contains(SkillList[i]).next().children().next().next().next().should('not.have.class', 'fill')
            cy.contains(SkillList[i]).next().children().next().next().should('not.have.class', 'fill')        
            cy.contains(SkillList[i]).next().children().next().should('not.have.class', 'fill')
            cy.contains(SkillList[i]).next().children().first().should('have.class', 'fill')
        })
    })

    it('When we click on 2nd dot of Brawl, two dots are removed as we are allowed to add only 1 lvlv skills now', () => {
        var i = 1
        cy.contains(SkillList[i]).next().children().first().next().click()
        cy.contains(SkillList[i]).next().children().last().should('not.have.class', 'fill')
        cy.contains(SkillList[i]).next().children().next().next().next().should('not.have.class', 'fill')
        cy.contains(SkillList[i]).next().children().next().next().should('not.have.class', 'fill')        
        cy.contains(SkillList[i]).next().children().next().should('not.have.class', 'fill')
        cy.contains(SkillList[i]).next().children().first().should('have.class', 'fill')
    })

    it('When we click on 2nd dot of Brawl again, nothing changes', () => {
        var i = 1
        cy.contains(SkillList[i]).next().children().first().next().click()
        cy.contains(SkillList[i]).next().children().last().should('not.have.class', 'fill')
        cy.contains(SkillList[i]).next().children().next().next().next().should('not.have.class', 'fill')
        cy.contains(SkillList[i]).next().children().next().next().should('not.have.class', 'fill')        
        cy.contains(SkillList[i]).next().children().next().should('not.have.class', 'fill')
        cy.contains(SkillList[i]).next().children().first().should('have.class', 'fill')
    })

    it('When we click on 3rd dot of Brawl, three dots are set', () => {
        var i = 1
        cy.contains(SkillList[i]).next().children().next().next().first().click()
        cy.contains(SkillList[i]).next().children().last().should('not.have.class', 'fill')
        cy.contains(SkillList[i]).next().children().next().next().next().should('not.have.class', 'fill')
        cy.contains(SkillList[i]).next().children().next().next().should('have.class', 'fill')        
        cy.contains(SkillList[i]).next().children().next().should('have.class', 'fill')
        cy.contains(SkillList[i]).next().children().first().should('have.class', 'fill')
    })

    it('When we click on 5th dot of Persuation, no dots are set as no picks are available now', () => {
        var i = 15
        cy.contains(SkillList[i]).next().children().last().click()
        cy.contains(SkillList[i]).next().children().last().should('not.have.class', 'fill')
        cy.contains(SkillList[i]).next().children().next().next().next().should('not.have.class', 'fill')
        cy.contains(SkillList[i]).next().children().next().next().should('not.have.class', 'fill')        
        cy.contains(SkillList[i]).next().children().next().should('not.have.class', 'fill')
        cy.contains(SkillList[i]).next().children().first().should('not.have.class', 'fill')
    })

    it('Change skill distribution to Jack of all Trades', () => {
        cy.contains('Skills').children().select(String(Distributions["Jack-of-all-trades"]))
        cy.contains('Skills').children().should('have.value', String(Distributions["Jack-of-all-trades"]))
    })

    Jack2LvlSkills.forEach(i => {
        it('When we click on 5th dot of ' + SkillList[i] + ', two dots is allowed', () => {
            cy.contains(SkillList[i]).next().children().last().click()
            cy.contains(SkillList[i]).next().children().last().should('not.have.class', 'fill')
            cy.contains(SkillList[i]).next().children().next().next().next().should('not.have.class', 'fill')
            cy.contains(SkillList[i]).next().children().next().next().should('not.have.class', 'fill')        
            cy.contains(SkillList[i]).next().children().next().should('have.class', 'fill')
            cy.contains(SkillList[i]).next().children().first().should('have.class', 'fill')
        })
    })

    Jack1LvlSkills.forEach(i => {
        it('When we click on 5th dot of ' + SkillList[i] + ', only one dot is allowed', () => {
            cy.contains(SkillList[i]).next().children().last().click()
            cy.contains(SkillList[i]).next().children().last().should('not.have.class', 'fill')
            cy.contains(SkillList[i]).next().children().next().next().next().should('not.have.class', 'fill')
            cy.contains(SkillList[i]).next().children().next().next().should('not.have.class', 'fill')        
            cy.contains(SkillList[i]).next().children().next().should('not.have.class', 'fill')
            cy.contains(SkillList[i]).next().children().first().should('have.class', 'fill')
        })
    })

    Jack0LvlSkills.forEach(i => {
        it('When we click on 1st dot of ' + SkillList[i] + ', all dots are removed', () => {
            cy.contains(SkillList[i]).next().children().first().click()
            cy.contains(SkillList[i]).next().children().last().should('not.have.class', 'fill')
            cy.contains(SkillList[i]).next().children().next().next().next().should('not.have.class', 'fill')
            cy.contains(SkillList[i]).next().children().next().next().should('not.have.class', 'fill')        
            cy.contains(SkillList[i]).next().children().next().should('not.have.class', 'fill')
            cy.contains(SkillList[i]).next().children().first().should('not.have.class', 'fill')
        })
    })

    it('When we click on 5th dot of Investigation, zero dots is added', () => {
        var i = 21
        cy.contains(SkillList[i]).next().children().last().click()
        cy.contains(SkillList[i]).next().children().last().should('not.have.class', 'fill')
        cy.contains(SkillList[i]).next().children().next().next().next().should('not.have.class', 'fill')
        cy.contains(SkillList[i]).next().children().next().next().should('not.have.class', 'fill')        
        cy.contains(SkillList[i]).next().children().next().should('not.have.class', 'fill')
        cy.contains(SkillList[i]).next().children().first().should('not.have.class', 'fill')
    })

    it('Change skill distribution to Specialist', () => {
        cy.contains('Skills').children().select(String(Distributions["Specialist"]))
        cy.contains('Skills').children().should('have.value', String(Distributions["Specialist"]))
    })

    it('When we click on 5th dot of Investigation, four dots are added', () => {
        var i = 21
        cy.contains(SkillList[i]).next().children().last().click()
        cy.contains(SkillList[i]).next().children().last().should('not.have.class', 'fill')
        cy.contains(SkillList[i]).next().children().next().next().next().should('have.class', 'fill')
        cy.contains(SkillList[i]).next().children().next().next().should('have.class', 'fill')        
        cy.contains(SkillList[i]).next().children().next().should('have.class', 'fill')
        cy.contains(SkillList[i]).next().children().first().should('have.class', 'fill')
    })

})
  