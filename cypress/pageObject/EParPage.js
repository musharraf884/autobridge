export class EParPage {
  searchProject(projectName) {
    cy.get('.border-4').should('not.exist') //loader should not exist
    cy.get('input[placeholder="Search projects..."]').should('be.visible').clear().type(projectName).wait(1000)
    cy.get('table[class*="caption-bottom text-sm w-full"] tr td:nth-child(5)').each(($el) => {
      cy.wrap($el).should('contain.text', projectName)
    })
  }
  applyAllLocationFilter(location) {
    const locationMap = {
      'Ward 1': 'ward_1',
      'Ward 2': 'ward_2',
      'Ward 3': 'ward_3',
    }
    const displayLocation = locationMap[location] || location

    cy.get('.border-4').should('not.exist'); // Loader should not exist
    cy.get('button.inline-flex').contains('All Location').should('exist').click() // Open Location dropdown
    cy.get('.p-1 div[data-value="' + displayLocation + '"]').should('exist').click().wait(1000) // Select location
    cy.get('.border-4').should('not.exist'); // Loader should not exist
    cy.get('table[class*="caption-bottom text-sm w-full"] tr td:nth-child(9)').each(($el) => {
      cy.wrap($el).should('contain.text', location)
    })
  }
  applyRequestTypeFilter(requestType) {

    const requestTypeMap = {
      'Administrative Change Allocation (Local/Non-FHWA)': 'administrative_change_allocation_local_non_fhwa',
      'Allocation (Local/Non-FHWA)': 'allocation_local_non_fhwa',
      'Obligation Construction (FHWA)': 'obligation_construction_fhwa',
      'Obligation Design (FHWA)': 'obligation_design_fhwa',
      'Post Allocation/Deobligation': 'post_allocation_deobligation',
      'Reallocation': 'reallocation'
    }
    const displayRequestType = requestTypeMap[requestType] || requestType

    cy.get('.border-4').should('not.exist'); // Loader should not exist
    cy.get('button.inline-flex').contains('Request Type').should('exist').click() // Open request type dropdown
    cy.get('.p-1 div[data-value="' + displayRequestType + '"]').should('exist').click().wait(1000) // Select request type
    cy.get('.border-4').should('not.exist'); // Loader should not exist
    cy.get('table[class*="caption-bottom text-sm w-full"] tr td:nth-child(2)').each(($el) => {
      cy.wrap($el).should('contain.text', requestType)
    })
  }
  applyStatusFilter(status) {

    const statusMap = {
      'Draft': 'DRAFT',
      'Protrack Review': 'PROTRACK_REVIEW',
      'Protrack Approved': 'PROTRACK_APPROVED',
      'RAD Approved': 'RAD_APPROVED',
      'OCFO Approved': 'OCFO_APPROVED',
      'DIFS Review': 'DIFS_REVIEW',
      'FHWA Review': 'FHWA_REVIEW',
      'FHWA Approved': 'FHWA_APPROVED',
      'DIFS Approved': 'DIFS_APPROVED',
      'Released Funds': 'RELEASED_FUNDS',
    }
    const displayStatus = statusMap[status] || status

    cy.get('.border-4').should('not.exist'); // Loader should not exist
    cy.get('button.inline-flex').contains('All Status').should('exist').click() // Open status filter dropdown
    cy.get('.p-1 div[data-value="' + displayStatus + '"]').eq(0).should('exist').click().wait(1000) // Select status
    cy.get('.border-4').should('not.exist'); // Loader should not exist
    cy.get('table[class*="caption-bottom text-sm w-full"] tr td:nth-child(13)').each(($el) => {
      cy.wrap($el).should('contain.text', displayStatus)
    })
  }
  clickOnStartNewPAR() {
    cy.get('.gap-4 button.font-medium.px-4').should('be.visible').and('contain.text', 'Start a New PAR').click()
    cy.url().should('include', 'e-par/create/general')
    cy.get('h2.text-black-900').should('be.visible').and('contain.text', 'Start a New PAR').and('contain.text', '| New Construction').click()
    cy.get('p.text-base.font-normal').should('be.visible').and('contain.text', 'Create a new Project Application Request')
  }
  addGeneralInformation(typeOfRequest, projectName, justification, description, location, administration, division, branch) {
    cy.get('.gap-1.text-primaryDark').eq(0).should('be.visible').and('contain.text', '1')
    cy.get('h2[class*="text-darkBlack text-lg font-medium mb-6"]').should('be.visible').and('contain.text', 'General Information') //General Information
    //Type of Request
    cy.get('[class="space-y-2 w-full"] label').eq(0).should('be.visible').and('contain.text', 'Type of Request')
    cy.get('[class="space-y-2 w-full"] button').eq(0).should('be.visible').click()
    cy.get('[class="space-y-2 w-full"] select').eq(0).select(typeOfRequest, { force: true }).should('have.value', typeOfRequest)
    //Project Name
    cy.get('[class="space-y-2 w-full"] label').eq(1).should('be.visible').and('contain.text', 'Project Name')
    cy.get('[class="space-y-2 w-full"] input').should('be.visible').clear().type(projectName)
    //Justification
    cy.get('[class="space-y-2 w-full"] label').eq(2).should('be.visible').and('contain.text', 'Justification')
    cy.get('[class="space-y-2 w-full"] textarea').eq(0).should('be.visible').clear().type(justification)
    //Description
    cy.get('[class="space-y-2 w-full"] label').eq(3).should('be.visible').and('contain.text', 'Description')
    cy.get('[class="space-y-2 w-full"] textarea').eq(1).should('be.visible').clear().type(description)
    //Location
    cy.get('[class="space-y-2 w-full"] label').eq(4).should('be.visible').and('contain.text', 'Location')
    cy.get('[class="space-y-2 w-full"] button').eq(1).should('be.visible').click()
    cy.get('[class="space-y-2 w-full"] select').eq(1).select(location, { force: true }).should('have.value', location)
    //Administration
    cy.get('[class="space-y-2 w-full"] label').eq(5).should('be.visible').and('contain.text', 'Administration')
    cy.get('[class="space-y-2 w-full"] button').eq(2).should('be.visible').click()
    cy.get('[class="space-y-2 w-full"] select').eq(2).select(administration, { force: true }).should('have.value', administration)
    //Division
    cy.get('[class="space-y-2 w-full"] label').eq(6).should('be.visible').and('contain.text', 'Division')
    cy.get('[class="space-y-2 w-full"] button').eq(3).should('be.visible').click()
    cy.get('[class="space-y-2 w-full"] select').eq(3).select(division, { force: true }).should('have.value', division)
    //Branch
    cy.get('[class="space-y-2 w-full"] label').eq(7).should('be.visible').and('contain.text', 'Branch')
    cy.get('[class="space-y-2 w-full"] button').eq(4).should('be.visible').click()
    cy.get('[class="space-y-2 w-full"] select').eq(4).select(branch, { force: true }).should('have.value', branch)
  }
  validateGeneralFieldsError() {
    cy.get('p[class="text-sm font-medium text-red-500"]').eq(0).should('be.visible').and('contain.text', 'Request Type is required')
    cy.get('p[class="text-sm font-medium text-red-500"]').eq(1).should('be.visible').and('contain.text', 'Project Name is required')
    cy.get('p[class="text-sm font-medium text-red-500"]').eq(2).should('be.visible').and('contain.text', 'Justification is required')
    cy.get('p[class="text-sm font-medium text-red-500"]').eq(3).should('be.visible').and('contain.text', 'Description is required')
    cy.get('p[class="text-sm font-medium text-red-500"]').eq(4).should('be.visible').and('contain.text', 'Location is required')
    cy.get('p[class="text-sm font-medium text-red-500"]').eq(5).should('be.visible').and('contain.text', 'Administration is required')
    cy.get('p[class="text-sm font-medium text-red-500"]').eq(6).should('be.visible').and('contain.text', 'Division is required')
    cy.get('p[class="text-sm font-medium text-red-500"]').eq(7).should('be.visible').and('contain.text', 'Branch is required')
  }
  clickContinue() {
    cy.get('button[type="submit"]').should('be.visible').and('contain.text', 'Continue').click() //Continue
  }
  addProjectDetails(difsProjectName, difsProjectNumber, difsCostCenter, difsProgramCode, difsAccountGroup, difsAccountDetail, difsProjectClarification, rate, masterProjectNumber, FAPNumber, STIPNumber, fundingSource) {
    cy.get('.gap-1.text-primaryDark').eq(1).should('be.visible').and('contain.text', '2')
    cy.get('h2[class*="text-darkBlack text-lg font-medium mb-6"]').should('be.visible').and('contain.text','Project Details') //Project Details

    //DIFS Project Name
    cy.get('[class="space-y-2 w-full"] label').eq(0).should('be.visible').and('contain.text', 'DIFS Project Name')
    cy.get('[class="space-y-2 w-full"] input').eq(0).should('be.visible').clear().type(difsProjectName)

    //DIFS Project Number
    cy.get('[class="space-y-2 w-full"] label').eq(1).should('be.visible').and('contain.text', 'DIFS Project Number')
    cy.get('[class="space-y-2 w-full"] input').eq(1).should('be.visible').clear().type(difsProjectNumber)

    //DIFS Cost Center
    cy.get('[class="space-y-2 w-full"] label').eq(2).should('be.visible').and('contain.text', 'DIFS Cost Center')
    cy.get('[class="space-y-2 w-full"] button').eq(0).should('be.visible').click()
    cy.get('[class="space-y-2 w-full"] select').eq(0).select(difsCostCenter, { force: true }).should('have.value', difsCostCenter)

    //DIFS Program Code
    cy.get('[class="space-y-2 w-full"] label').eq(3).should('be.visible').and('contain.text', 'DIFS Program Code')
    cy.get('[class="space-y-2 w-full"] button').eq(1).should('be.visible').click()
    cy.get('[class="space-y-2 w-full"] select').eq(1).select(difsProgramCode, { force: true }).should('have.value', difsProgramCode)

    //DIFS Account Group
    cy.get('[class="space-y-2 w-full"] label').eq(4).should('be.visible').and('contain.text', 'DIFS Account Group')
    cy.get('[class="space-y-2 w-full"] button').eq(2).should('be.visible').click()
    cy.get('[class="space-y-2 w-full"] select').eq(2).select(difsAccountGroup, { force: true }).should('have.value', difsAccountGroup)

    //DIFS Account Details
    cy.get('[class="space-y-2 w-full"] label').eq(5).should('be.visible').and('contain.text', 'DIFS Account Details')
    cy.get('[class="space-y-2 w-full"] button').eq(3).should('be.visible').click()
    cy.get('[class="space-y-2 w-full"] select').eq(3).select(difsAccountDetail, { force: true }).should('have.value', difsAccountDetail)

    //DIFS Project Classification
    cy.get('[class="space-y-2 w-full"] label').eq(6).should('be.visible').and('contain.text', 'DIFS Project Classification')
    cy.get('[class="space-y-2 w-full"] button').eq(4).should('be.visible').click()
    cy.get('[class="space-y-2 w-full"] select').eq(4).select(difsProjectClarification, { force: true }).should('have.value', difsProjectClarification)

    //IDCR
    cy.get('label[for="undefined-form-item"]').should('be.visible').and('contain.text','IDCR')
    cy.get('input[type="checkbox"]').should('exist').uncheck()

    //Rate
    cy.get('[class="space-y-2 w-full"] label').eq(8).should('be.visible').and('contain.text', 'Rate')
    cy.get('[class="space-y-2 w-full"] input').eq(2).should('be.visible').clear().type(rate)

    //Master Project Number
    cy.get('[class="space-y-2 w-full"] label').eq(7).should('be.visible').and('contain.text', 'Master Project Number')
    cy.get('[class="space-y-2 w-full"] button').eq(5).should('be.visible').click()
    cy.get('[class="space-y-2 w-full"] select').eq(5).select(masterProjectNumber, { force: true }).should('have.value', masterProjectNumber)

    //FAP Number
    cy.get('[class="space-y-2 w-full"] label').eq(9).should('be.visible').and('contain.text', 'FAP Number')
    cy.get('[class="space-y-2 w-full"] input').eq(3).should('be.visible').clear().type(FAPNumber)

    //STIP Number
    cy.get('[class="space-y-2 w-full"] label').eq(9).should('be.visible').and('contain.text', 'STIP Number')
    cy.get('[class="space-y-2 w-full"] input').eq(3).should('be.visible').clear().type(STIPNumber)

    //Funding Source
    cy.get('[class="space-y-2 w-full"] label').eq(8).should('be.visible').and('contain.text', 'Funding Source')
    cy.get('[class="space-y-2 w-full"] button').eq(6).should('be.visible').click()
    cy.get('[class="space-y-2 w-full"] select').eq(6).select(fundingSource, { force: true }).should('have.value', fundingSource)
  }
}
