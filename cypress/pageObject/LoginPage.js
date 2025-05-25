export class LoginPage {
    goToLogin() {
        cy.get('.gap-5 button.flex.gap-3').contains('Login').should('be.visible').click()
        cy.url().should('include','/login')
        cy.get('.text-primaryDark.font-bold.mb-3').should('be.visible').and('contain.text','Sign In')
        cy.get('.text-secondaryGray.text-base').should('be.visible').and('contain.text','Sign in to your account')
        cy.get('button.flex.gap-3').should('be.visible').and('contain.text','Login with Microsoft')
    }
    login(email, password){
        cy.get('.text-primaryDark.font-bold.mb-3').should('be.visible').and('contain.text','Sign In')
        cy.get('.text-secondaryGray.text-base').should('be.visible').and('contain.text','Sign in to your account')
        cy.get('button.flex.gap-3').should('be.visible').and('contain.text','Login with Microsoft').click()

        //Microsoft login
        cy.get('input[name="loginfmt"]').should('be.visible').type(email)
        cy.get('input[data-report-event="Signin_Submit"]').should('be.visible').and('contain.value','Next').click() //Next
        cy.get('input[name="passwd"]').should('be.visible').type(password)
        cy.get('button[type="submit"]').should('contain.text','Sign in').click() //Sign in
        cy.get('[role="heading"]').should('be.visible').and('contain.text','Stay signed in?') //Stay signed in?
        cy.get('button[type="submit"][aria-label="Yes"]').should('be.visible').click() //Yes
        cy.get('button.flex.gap-3').contains('Logout').should('be.visible') //user should be login
    }
}
