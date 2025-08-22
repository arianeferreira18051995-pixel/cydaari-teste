const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "rt6hfk",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
