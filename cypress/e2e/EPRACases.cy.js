/// <reference types ="cypress" />

import { LoginPage } from '../pageObject/LoginPage'
import { HomePage } from '../pageObject/HomePage'
import { EParPage } from '../pageObject/EParPage'
import { ReuseableCode } from "../support/ReuseableCode"

const loginPage = new LoginPage
const homePage = new HomePage
const eParPage = new EParPage
const reuseableCode = new ReuseableCode

describe('EPRA test cases', () => {
  const loginEmail = Cypress.config('users').user1.username
  const loginPassword = Cypress.config('users').user1.password

  beforeEach(() => {
    cy.visit('/')
    loginPage.goToLogin()
    loginPage.login(loginEmail, loginPassword)
    homePage.goToAdminDashboard()
  })
  it('TC_EPRA_001 - Verify that the user is able to redirect on the EPRA page', () => {
    homePage.gotoEPar()
  })
  it('TC_EPRA_002 - Verify that the user is able to search on the "Search Project" field', () => {
    homePage.gotoEPar()
    const projectName = 'Template demo'
    eParPage.searchProject(projectName)
  })
  it('TC_EPRA_003 - Verify "All location" filters functionality', () => {
    homePage.gotoEPar()
    eParPage.applyAllLocationFilter('Ward 1') //location
    cy.reload()
    eParPage.applyAllLocationFilter('Ward 2') //location
    cy.reload()
    eParPage.applyAllLocationFilter('Ward 3') //location
  })
  it('TC_EPRA_004 - Verify "Request type" filters functionality', () => {
    homePage.gotoEPar()
    eParPage.applyRequestTypeFilter('Administrative Change Allocation (Local/Non-FHWA)')
    cy.reload()
    eParPage.applyRequestTypeFilter('Allocation (Local/Non-FHWA)')
    cy.reload()
    eParPage.applyRequestTypeFilter('Obligation Construction (FHWA)')
    cy.reload()
    eParPage.applyRequestTypeFilter('Obligation Design (FHWA)')
    cy.reload()
    eParPage.applyRequestTypeFilter('Post Allocation/Deobligation')
    cy.reload()
    eParPage.applyRequestTypeFilter('Reallocation')
  })
  it('TC_EPRA_005 - Verify "Status" filters functionality', () => {
    homePage.gotoEPar()
    eParPage.applyStatusFilter('DRAFT')
    cy.reload()
    eParPage.applyStatusFilter('Protrack Review')
    cy.reload()
    eParPage.applyStatusFilter('Protrack Approved')
    cy.reload()
    eParPage.applyStatusFilter('RAD Approved')
    cy.reload()
    eParPage.applyStatusFilter('OCFO Approved')
    cy.reload()
    eParPage.applyStatusFilter('DIFS Review')
    cy.reload()
    eParPage.applyStatusFilter('FHWA Review')
    cy.reload()
    eParPage.applyStatusFilter('FHWA Approved')
    cy.reload()
    eParPage.applyStatusFilter('DIFS Approved')
    cy.reload()
    eParPage.applyStatusFilter('Released Funds')
  })
  it('TC_EPRA_006 - Verify that when user click on "Start a new par" then the new construction page will redirect', () => {
    homePage.gotoEPar()
    eParPage.clickOnStartNewPAR()
  })
  it('TC_EPRA_007 - Verify that user can add General Information while creating a new PAR', () => {
    const typeOfRequest = 'allocation_local_non_fhwa'
    const projectName = ('Test project' + reuseableCode.generateRandomString(5))
    const justification = 'Justification - Test Automation'
    const description = 'Description - Test Automation'
    const location = 'ward_2'
    const administration = 'Planning'
    const division = 'operations'
    const branch = 'qualityAssurance'
    homePage.gotoEPar()
    eParPage.clickOnStartNewPAR()
    eParPage.clickContinue()
    eParPage.validateGeneralFieldsError()
    eParPage.addGeneralInformation(typeOfRequest, projectName, justification, description, location, administration, division, branch)
    eParPage.clickContinue()
    cy.url().should('include','e-par/create/details')
  })
})