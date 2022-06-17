// Solution.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
describe('E2E Test Cypress', function () {

    beforeEach(function () {
        cy.visit('/');
    })
    it('Add Items', () => {
        for(let i=0;i<9;i++){
        cy.get('#newtodo').clear();
        cy.get('#newtodo').type(makeid(5))
        cy.get('[type="submit"]').click()
        }
    })
    it('Add XSS example test', () => {
        cy.get('#newtodo').clear();
        cy.get('#newtodo')
            .type('<a href="https://www.w3schools.com">Visit W3Schools</a>')
            .type('{enter}')
        cy.on('window:alert', (t) => {
            //assertions
            expect(t).to.contains('Attack');
        })

    })
    it('View the list of TODOs', () => {
        const exists = Cypress.$('li').length > 0;
        if (exists) {
            //action 1 
            cy.get('li').its('length').should('be.gt', 0)
        } else {
            cy.contains('li').should('not.exist')

        }
    })
   

    it('Modify Items', () => {
        cy.get('[href="/todo/0"]').click()
        cy.get('#editTodo').type(makeid(3)).type('{enter}')

    })
    it('Remove items', () => {
        cy.get('ul').children().each(($el, index) => {
            //console.log("Index", $el, index)
            cy.get('[href="/todo/delete/0"]').click()
        })
       
    })
})

