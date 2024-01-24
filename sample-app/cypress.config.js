const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000', // update to 'http://[YOUR_LOCAL_IP]:5000/' for "production" runs
  },
});
