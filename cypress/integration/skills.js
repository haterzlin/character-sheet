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

describe('Skill test', () => {

    it('Check skill distribution is Balanced', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Skills').children().should('have.value', String(Distributions["Balanced"]))
    })
    
    //Distributions["Balanced"][4]

    var myArr = [0,1,2]
    myArr.forEach(i => {
        it('When we click on 5th dot of ' + SkillList[i] + ', only three dots are allowed', () => {
            cy.contains(SkillList[i]).next().children().last().click()
            cy.contains(SkillList[i]).next().children().last().should('not.have.class', 'fill')
            cy.contains(SkillList[i]).next().children().next().next().next().should('not.have.class', 'fill')
            cy.contains(SkillList[i]).next().children().next().next().should('have.class', 'fill')        
            cy.contains(SkillList[i]).next().children().next().should('have.class', 'fill')
            cy.contains(SkillList[i]).next().children().first().should('have.class', 'fill')
        })
    })
})
  