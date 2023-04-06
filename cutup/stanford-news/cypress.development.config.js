const {defineConfig} = require('cypress');

module.exports = defineConfig({
    blockHosts: ['*fonts.googleapis.com', '*addthis.com'],
    video: false,
    env: {
        ENVFILE: '.env.development',
    },
    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {
            return require('./cypress/plugins/index.js')(on, config);
        },
        baseUrl: 'http://127.0.0.1:3000',
        specPattern: './src//**/__cypress__/*.spec.js',
    },
});
