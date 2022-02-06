describe('Adding discipline', () => {
    it('Select try to add two points without selecting discipline', () => {
        cy.visit('/')
        cy.get('#disciplines').within(() => {
            cy.get('.points').first().children().next().first().click()
            cy.get('.points').first().children().next().first().should('not.have.class', 'fill')
            cy.get('.discipline-ability').next().first().children().should('be.disabled')
        })
    })
    it('Select Animalism and then add two points', () => {
        cy.get('.discipline-select').first().select('Animalism')
        cy.get('#disciplines').within(() => {
            cy.get('.points').first().children().next().first().click()
            cy.get('.points').first().children().next().first().should('have.class', 'fill')
            cy.get('.points').first().children().next().next().first().should('not.have.class', 'fill')
            cy.get('.discipline-ability').next().first().children().should('not.be.disabled')
            cy.get('.discipline-ability').first().children().should('contain', 'bond famulus')
            cy.get('.discipline-ability').next().next().first().children().should('be.disabled')
        })
    })
    it('Select second discipline', () => {
        cy.get('.discipline-select').eq(1).select('Potence')
        cy.get('#disciplines').within(() => {
            cy.get('.points').eq(1).children().first().click()
            cy.get('.points').eq(1).children().first().should('have.class', 'fill')
            cy.get('.points').eq(1).children().next().first().should('not.have.class', 'fill')
            cy.get('.discipline-ability').eq(5).first().children().should('not.be.disabled')
            cy.get('.discipline-ability').eq(5).first().children().should('contain', 'lethal body')
            cy.get('.discipline-ability').eq(5).next().first().children().should('be.disabled')
        })
    })
    it('We can see "All picked"', () => { 
        cy.get('#disciplines').contains('All picked').should('be.visible')
    })
    it('Select different clans and check Clan disciplines', () => {
        cy.contains('Clan:').next().select('Brujah')
        cy.get('.discipline-select').eq(0).should('not.have.class', 'clanDiscipline')
        cy.get('.discipline-select').eq(1).should('have.class', 'clanDiscipline')
    })
    it('Can\'t select same discipline twice', () => {
        cy.get('.discipline-select').eq(2).should('not.contain','Potence')
    })
    it('Can\'t select third discipline despite restrictions and assign level 5', () => {
        cy.get('.discipline-select').eq(2).select('Celerity')
        cy.get('#disciplines').within(() => {
            cy.get('.points').eq(2).children().last().click()
            cy.get('.points').eq(2).children().last().should('not.have.class', 'fill')
            cy.get('.discipline-ability').eq(14).first().children().should('be.disabled')
        })
    })
    it('Second click will lower discipline level by 1', () => {
        cy.get('#disciplines').within(() => {
            cy.get('.points').eq(2).children().last().click()
            cy.get('.points').eq(2).children().last().should('not.have.class', 'fill')
            cy.get('.discipline-ability').eq(14).first().children().should('be.disabled')
        })
    })
    it('Predator type discipline', () => {
        cy.contains('Predator Type:').next().select('Cleaver')
        cy.contains('Predator Discipline:').next().select('Animalism')
        cy.get('#disciplines').within(() => {
            cy.get('.points').first().children().next().first().should('have.class', 'fill')
            cy.get('.points').first().children().next().next().first().should('have.class', 'bonus')
            cy.get('.points').first().children().next().next().next().first().should('not.have.class', 'fill')
            cy.get('.points').first().children().next().next().next().first().should('not.have.class', 'bonus')
            cy.get('.discipline-ability').next().next().first().children().should('not.be.disabled')
            cy.get('.discipline-ability').next().next().first().children().should('contain', 'quell the beast')
            cy.get('.discipline-ability').next().next().next().first().children().should('be.disabled')
        })
    })
    it('Predator type discipline is not removed when Animalism is predator discipline for selected Predator type', () => {
        cy.contains('Predator Type:').next().select('Farmer')
        cy.get('#disciplines').within(() => {
            cy.get('.points').first().children().next().first().should('have.class', 'fill')
            cy.get('.points').first().children().next().next().first().should('have.class', 'bonus')
            cy.get('.points').first().children().next().next().first().should('not.have.class', 'fill')
            cy.get('.discipline-ability').next().next().first().children().should('not.be.disabled')
        })
    })
    it('Predator type discipline is removed when Animalism is not predator discipline for selected Predator type', () => {
        cy.contains('Predator Type:').next().select('Alleycat')
        cy.get('#disciplines').within(() => {
            var points = cy.get('.points').first().children()
            points.next().first().should('have.class', 'fill')
            points.next().should('not.have.class', 'bonus')
            points.should('not.have.class', 'fill')
            cy.get('.discipline-ability').next().next().first().children().should('be.disabled')
        })
    })
})