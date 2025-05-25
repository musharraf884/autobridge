export class HomePage {
  gotoDashboard(){
    cy.get('.gap-5 button[class="text-sm hover:text-primaryLight"]').contains('Dashboard').should('be.visible').click()

  }
  goToAdminDashboard(){
    cy.visit('/admin/home')
    cy.get('h6.text-primaryDark.font-bold').should('be.visible').and('contain.text','AutoBridge Admin')
  }
  gotoEPar(){
    cy.get('button.text-primaryDark.font-bold p').contains('E-PAR').should('exist').click()
    cy.url().should('include','/admin/e-par')
    cy.get('h2.font-bold.text-primaryDark').should('contain.text','E-PAR').and('be.visible') //heading
  }
}
