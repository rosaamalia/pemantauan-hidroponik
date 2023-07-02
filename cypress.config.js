const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    video: false,
    capture: "runner",
    defaultCommandTimeout: 50000,
  },
  numTestsKeptInMemory: 0,
  watchForFileChanges: false,
});
