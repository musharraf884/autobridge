/// <reference types ="cypress" />

import {LoginPage} from '../pageObject/LoginPage'

const loginPage = new LoginPage

describe('Login test cases', () => {
  const loginEmail = Cypress.config('users').user1.username
  const loginPassword = Cypress.config('users').user1.password

  beforeEach(() => {

  })
  it('TC_Login_001 - Verify login with valid credentials', () => {
    cy.visit('/')
    loginPage.goToLogin()
    loginPage.login(loginEmail, loginPassword)

  })
})