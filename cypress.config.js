const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1440,  // Set your desired width
  viewportHeight: 1080,  // Set your desired height
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://financialinsightsassistant-web-app-erghcdakd5ahdycs.canadacentral-01.azurewebsites.net/',
    users: {
      user1: {
        username: "qatesting7212@gmail.com",
        password: "Crown7212@"
      },
      user2: {
        username: "",
        password: ""
      }
    },
    pageLoadTimeout: 60000,
    defaultCommandTimeout: 60000,
    experimentalMemoryManagement: true,
    experimentalInteractiveRunEvents: true,
    experimentalSessionAndOrigin: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    chromeWebSecurity: false,
  },
});
