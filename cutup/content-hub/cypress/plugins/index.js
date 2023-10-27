// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const dotenvPlugin = require('cypress-dotenv');
const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const webpackConfig = require('./aliases');

module.exports = (on, config) => {
    // Add webpath aliases
    const webpackPreprocessorConfig = {
        webpackOptions: webpackConfig,
    };
    on('file:preprocessor', webpackPreprocessor(webpackPreprocessorConfig));

    // Handle env files
    console.log(`Cypress env file: ${config.env.ENVFILE}`);
    config = dotenvPlugin(config, {path: config.env.ENVFILE}, true);
    return config;
};
