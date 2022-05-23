describe('Login e Cadastro de Novo Usuário', () => {
    beforeEach(() => {
        cy.visit('https://alura-fotos.herokuapp.com/');
    })

    it('verifica mensagens validacao', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Email is required').should('be.visible');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
    })

    it('verifica mensagem de e-mail invalido', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="email"]').type('juliana');
        cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
    })

    it('verifica mensagem de nome incompleto', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="email"]').type('juliana@gmail.com');
        cy.get('input[formcontrolname="fullName"]').type('j');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible');
    })

    it('verifica mensagem de que o username deve estar em minusculo', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="userName"]').type('JUJU');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Must be lower case').should('be.visible');
    })

    it('verifica mensagem de senha com menos de oito caracteres', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="password"]').type('1234');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');
    })

    it('fazer login com usuário válido', () => {
        cy.login('jumartins', 'ju546172');
        cy.contains('a', '(Logout)').should('be.visible');
    })

    it('fazer login com usuário inválido', () => {
        cy.login('juumartins', 'ju546172');
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Invalid user name or password');
        })
    })

    const usuarios = require('../../fixtures/usuarios.json');
    usuarios.forEach(usuario => {
        it.only(`registra novo usuário ${usuario.userName}`, () => {
            cy.cadastro(usuario.email, usuario.fullName, usuario.userName, usuario.password);
        })
    })
})