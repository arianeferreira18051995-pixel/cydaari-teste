describe('Central de Atendimento ao Cliente TAT', () => {
beforeEach(() => {
cy.visit('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
})

  //it('verifica o título da aplicação', () => {  
   // cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    //cy.get('input[type="text"]').should('be.visible').type('Olá mundo!').should('have.value', 'Olá mundo!')


  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()
    cy.get('#firstName').type('Anderson')
    cy.get('#lastName').type('Cortezani')
    cy.get('#email').type('anderson_100lbg@hotmail.com')
    cy.get('#open-text-area').type('Meu texto testek testel teste yuio', { delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.success > strong').should('be.visible')
    cy.tick(5000)
    cy.get('.success > strong').should('not.be.visible')
})
    
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy.clock()
    cy.get('#firstName').type('Anderson')
    cy.get('#lastName').type('Cortezani')
    cy.get('#email').type('anderson_100lbghotmailcom')
    cy.get('#open-text-area').type('Meu texto teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error > strong').should('be.visible')
    cy.tick(5000)
    cy.get('.error > strong').should('not.be.visible')
})

  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone')
    .type('abcde')
    .should('have.value', '')
})

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Anderson')
    cy.get('#lastName').type('Cortezani')
    cy.get('#email').type('anderson_100lbg@hotmail.com')
    cy.get('#open-text-area').type('Meu texto teste')
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
})

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    //cenários abaixo, exemlo da cadeia de comandos.
    cy.get('#firstName').type('Anderson').should('have.value', 'Anderson')
    .clear().should('have.value','')
    cy.get('#lastName').type('Cortezani').should('have.value', 'Cortezani')
    .clear().should('have.value','')
    cy.get('#email').type('anderson_100lbg@hotmail.com').should('have.value', 'anderson_100lbg@hotmail.com')
    .clear().should('have.value','')
    cy.get('#phone').type('45784474').should('have.value', '45784474')
    .clear().should('have.value','')
})

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
})

  it('envia o formuário com sucesso usando um comando customizado', () => {
  //teste com comando personalizado
 const data = {
    firstname: 'Manuela',
    lastname: 'Ferreira',
    email: 'manu@teste.com',
    text: 'Teste Manu'
 }
    cy.fillMandatoryFieldsAndSubmiiit(data)

    cy.get('.success').should('be.visible')
})

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
})

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
})

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(2).should('have.value', 'cursos')
})

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get(':nth-child(4) > input').check() 
})

  it('marca cada tipo de atendimento', () => {
    //valida a marcação dos campos redondos do "tipo de atendimento"
    cy.get('#support-type > :nth-child(2) > input').check().should('be.checked')
    cy.get(':nth-child(3) > input').check().should('be.checked')
    cy.get(':nth-child(4) > input').check().should('be.checked')
})

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('#email-checkbox').check().should('be.checked')
    cy.get('#phone-checkbox').check().should('be.checked').uncheck().should('not.be.checked')

  })

   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    //no passo do telefone, mudando de .click para .check  
     cy.get('#firstName').type('Anderson')
     cy.get('#lastName').type('Cortezani')
     cy.get('#email').type('anderson_100lbg@hotmail.com')
     cy.get('#open-text-area').type('Meu texto teste')
     cy.get('#phone-checkbox').check().should('be.checked')
     cy.get('button[type="submit"]').click()

     cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
  })

   it('seleciona um arquivo da pasta fixtures', () => {
    //adicionando imagem ou anexo em um campo  
     cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
       expect(input[0].files[0].name).to.equal('example.json')
  })
  })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
       expect(input[0].files[0].name).to.equal('example.json')
  })
  })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank');

  })


  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
})

it('faz uma requisição HTTP', () => {
  cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')



    //it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    //nesse teste validará que esta abrindo a segunda URL e valida algum texto da nova aba aberta.
     // cy.contains('a', 'Política de Privacidade')
    //.invoke('removeAttr', 'target')
    //.click()

     // cy.url().should('include', 'privacy.html')
     // cy.get('#white-background > :nth-child(5)').click();

      //cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  //})

  })

})
//})
  
