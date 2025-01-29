describe('Users Page Tests', () => {
    it('should load the users page', () => {
        cy.visit('/users'); // Visit the users page
        cy.url().should('include', '/users'); // Check the URL
        cy.get('h1').contains('Users'); // Check page heading
    });

    it('should display a list of users', () => {
        cy.visit('/users');
        cy.intercept('GET', '/api/users', { fixture: 'users.json' }).as('getUsers');
        cy.get('.user-list')
            .should('be.visible')
            .find('li') // assuming users are in list items
            .should('have.length.gt', 0) // verify there are items in the list
            .then(($items) => {
                // get all user items as an array
                const users = $items.toArray().map(item => item.innerText);
                // verify we have users
                expect(users).to.be.an('array').that.is.not.empty;
                // verify each user in the list
                users.forEach(user => {
                    cy.contains(user);
                });
            });
    });
})