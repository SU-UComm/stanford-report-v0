/* globals cy Cypress */
// <reference types="cypress" />

import {helpers, tests} from 'cypress/support/tests';
const siteUrl = Cypress.env('SITE_URL');

// Test A11Y
describe(`Global - ${Cypress.env('ENV')}`, () => {
    afterEach(() => {
        helpers.clearAllCookies();
    });

    // For each screen size
    helpers.sizes.forEach((size) => {
        it(`URL: ${Cypress.env('SITE_URL')} available ${size}`, () => {
            // Set viewport size
            if (size) {
                helpers.viewportSize(size);
            }

            // Visit URL
            cy.visit(siteUrl);

            // A11
            tests.a11test();
        });
    });
});
