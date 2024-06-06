import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    fixturesFolder: false,
    viewportWidth: 700,
    viewportHeight: 500,
    setupNodeEvents(on, config) {
      require('@bahmutov/cypress-code-coverage/plugin')(on, config);
      return config;
    },
  },
});
