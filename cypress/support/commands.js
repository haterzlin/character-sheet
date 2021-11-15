function nthChild(CyElement, Iterator) {
    if (Iterator < 1 ){
        return undefined
    }
    if (Iterator !== 1) {
        return nthChild(CyElement.next(), Iterator - 1)
    }
    return CyElement.first()
}

Cypress.Commands.add('getNthPointOf', (Item, Number) => {
    return nthChild(cy.contains(Item).next().children(), Number)
})

Cypress.Commands.add('checkNumberOfPoints', (Item, ExpectedInit, ExpectedFill, Scale) => {
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
})