describe('Buscar fotos e dados', () => {

    it('buscar fotos da juliana', () => {
        cy.request({
            method: 'GET',
            url: 'https://apialurapic.herokuapp.com/jumartins/photos'
        }).then((res) => {
            expect(res.status).to.be.equal(200)
            expect(res.body).is.not.empty
            expect(res.body[0]).to.have.property('description')
            expect(res.body[0].description).to.be.equal('logo criativik')
        })
    })

    it.only('fazer login da juliana', () => {
        cy.request({
            method: 'POST',
            url: 'https://apialurapic.herokuapp.com/user/login',
            body: Cypress.env()
        }).then((res) => {
            expect(res.status).to.be.equal(200)
            expect(res.body).is.not.empty
            expect(res.body).to.have.property('id')
            expect(res.body.id).to.be.equal(6)
            expect(res.body).to.have.property('email')
            expect(res.body.email).to.be.equal('martins.juuliana@gmail.com')
        })
    })
})