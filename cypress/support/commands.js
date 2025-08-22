//fillMandatoryFieldsAndSubmit
//  Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (email, password) => {})
    //cy.get('#firstName').type('nome')
    //cy.get('#lastName').type('sobrenome')
   //cy.get('#email').type('email')
   // cy.get('#open-text-area').type('elogio ou feedback')
    //cy.get('button[type="submit"]').click()


    Cypress.Commands.add('fillMandatoryFieldsAndSubmiiit', data => {
    cy.get('#firstName').type(data.firstname)
    cy.get('#lastName').type(data.lastname)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.get('button[type="submit"]').click()

})



// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })