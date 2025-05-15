const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://bookbox.ch',
    env: {
      apiBaseUrl: 'https://api.bookbox.ch',
      supportFile: 'cypress/support/e2e.ts',
    },
  },
});
