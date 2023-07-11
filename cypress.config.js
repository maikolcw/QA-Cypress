const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      default_name: 'John',
      default_phone: '604-123-4567',
      default_email: "john@email.com",
      correct_name: "Jane",
      correct_phone: "604-111-1111",
      correct_email: "jane@email.com",
      column_name: "Name",
      column_phone: "Phone",
      column_email: "Email",
      column_actions: "Actions",
    },
  },
});
