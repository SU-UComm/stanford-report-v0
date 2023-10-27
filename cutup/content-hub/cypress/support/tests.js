/* globals Cypress cy */

// Test helpers
export const helpers = {
    // Screen sizes for tests
    sizes: ['iphone-6', [1200, 720]],

    /**
     * Set viewport size
     * @param {string|array} size viewport size
     */
    viewportSize: (size) => {
        if (Cypress._.isArray(size)) {
            cy.viewport(size[0], size[1]);
        } else {
            cy.viewport(size);
        }
    },

    /**
     * Clear all cookies
     */
    clearAllCookies: () => {
        if (Cypress.isBrowser('firefox')) {
            cy.getCookies({log: false}).then((cookies) => {
                cookies.forEach((cookie) => cy.clearCookie(cookie.name, {log: false}));
            });
            cy.log('clearCookies');
        } else {
            cy.clearCookies();
        }
    },

    /**
     * Matrix login
     * @param {string} siteUrl site url
     * @param {string} pageUrl page url that will be appended to siteUrl
     * @param {string} login login name
     * @param {string} password password
     */
    matrixLogin: (siteUrl, pageUrl, login, password) => {
        if (siteUrl !== Cypress.env('localURL')) {
            pageUrl = pageUrl === '/' ? '' : pageUrl;

            cy.visit(siteUrl + pageUrl + '/_login', {failOnStatusCode: false});

            cy.get('#SQ_LOGIN_USERNAME').type(login).should('have.value', login);
            cy.get('#SQ_LOGIN_PASSWORD').type(password).should('have.value', password);
            cy.get('#login_form_login_prompt').submit();

            pageUrl = pageUrl === '' ? '/' : pageUrl;
            cy.location('pathname').should('eq', pageUrl);
        } else {
            cy.visit(siteUrl + pageUrl);
        }
    },
};

// Tests
export const tests = {
    /**
     * A11y test
     * @param {string|array} size viewport size - optional
     * @param {string} url url to visit - optional
     * @param {boolean} inject injectAxe() ? - optional
     * @param {boolean} a11y checkA11y() ? - optional
     */
    a11test: (size, url, inject, a11y) => {
        // Set viewport size if required
        if (size) {
            helpers.viewportSize(size);
        }

        // Visit URL if required
        if (url) {
            cy.visit(url);
        }

        // Inject Axe
        let injectFlag = inject === undefined ? true : inject;
        if (injectFlag) {
            cy.injectAxe();
        }

        // Test A11y
        let a11yFlag = a11y === undefined ? true : a11y;
        if (a11yFlag) {
            cy.wait(500).checkA11y();
        }
    },
};
