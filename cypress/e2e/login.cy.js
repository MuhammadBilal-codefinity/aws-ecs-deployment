describe('Login Page Tests', () => {
    it('should load the login page', () => {
      cy.visit('/'); // Visit the base route (Login page)
      cy.url().should('include', '/');  
      // Check for Login form elements

      cy.get('h1').contains('Login Page'); // Check page heading
      cy.get('input[placeholder="Username"]').should('exist'); // Check username input
      cy.get('input[placeholder="Password"]').should('exist'); // Check password input
      cy.get('button').contains('Login').should('exist'); // Check login button
    });
  
    it('should display error for invalid login', () => {
      // Mock API response for invalid login
      cy.intercept('POST', '/api/login', { success: false, message: 'Invalid credentials' }).as('login');
  
      cy.visit('/');
      cy.get('input[placeholder="Username"]').type('wronguser');
      cy.get('input[placeholder="Password"]').type('wrongpass');
      cy.get('button').contains('Login').click();
  
      cy.wait('@login'); // Wait for the mocked API response
      cy.contains('Invalid credentials'); // Check error message
    });
  
    it('should navigate to the users page on successful login', () => {
      // Mock API response for successful login
      cy.intercept('POST', '/api/login', { success: true }).as('login');
  
      cy.visit('/');
      cy.get('input[placeholder="Username"]').type('admin');
      cy.get('input[placeholder="Password"]').type('1234');
      cy.get('button').contains('Login').click();
  
      cy.wait('@login'); // Wait for the mocked API response
      cy.url().should('include', '/users'); // Check the redirection
    });
  });
  