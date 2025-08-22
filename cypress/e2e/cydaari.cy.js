describe('Central de Atendimento ao Cliente TAT', () => {
beforeEach(() => {
cy.visit('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
})

  //it('verifica o título da aplicação', () => {  
   // cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    //cy.get('input[type="text"]').should('be.visible').type('Olá mundo!').should('have.value', 'Olá mundo!')


  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Anderson')
    cy.get('#lastName').type('Cortezani')
    cy.get('#email').type('anderson_100lbg@hotmail.com')
    cy.get('#open-text-area').type('Meu texto testek testel teste yuio', { delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.success > strong').should('be.visible')
})

})