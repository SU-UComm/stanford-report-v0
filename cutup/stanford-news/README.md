# Table of contents
[[_TOC_]]

# Features
This boilerplate is based on [Squiz Webpack Boilerplate](https://gitlab.squiz.net/boilerplate/webpack-boilerplate/wikis/home).
The main differences are:
* Webpack version upgraded to 5+
* Most of the dependencies have been upgraded to the latest version
* You can create multiple, independent React apps within one repo. Each of them will have a separate JS/CSS chunk.
* Jest unit testing
* Cypress E2E testing
* Tailwind
* Storybook
* DXP Component Service development support:
    * webpack dev server integration
    * custom loader created to support async building of the component

# Requirements
This version is tested under:
* Node v16
* NPM 9

# Docs

## Webpack config file
Some of the webpack options can be configured using **/webpack/config.js**
* buildFolder - folder to build to using npm run build(-min) commands
* host - host to run the dev sever on
* port - dev server port
* watchFiles - array of files to watch by devServer
* devServerClient - devServer client configuration
* dxpComponentsPathPrefix - dxp component service path relative to the dxpLoader location
* publicPath - webpack [Public Path](https://webpack.js.org/guides/public-path/)
* alias - webpack aliases used in imports
* entry - webpack [entry points](https://webpack.js.org/concepts/entry-points/)
* chunks - chunks configuration lets you specify which chunks should be used in which html page template
* rewrites - [rewrites](https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback) to be used with things like [React Router](https://reactrouter.com/docs/en/v6/getting-started/overview)

## Commands
* audit - npm audit on production dependencies
* test - jest tests
* test:coverage - generate jest tests coverage
* test:all - run jest test and cypress:ci:dev
* build - build output files to buildFolder
* build-min - build output files to buildFolder minified
* dev - run serve:no-open, dxp and loco
* devServe - run serve and loco
* dxp - default dxp-next build
* serve - dev server with opening the browser window on start
* serve:no-open - dev server without opening the browser window on start
* lint - lint css and js
    * lint:js - lint js only
    * lint:css - lint css only
* format - run prettier
* cypress:install - install cypress localy
* cypress:install:save - install cypress and save it in package.json if you wanna run CI tests
* cypress:verify - verify cypress installation
* cypress:dev - run cypress tests using cypress.development.config.js
* cypress:prod - run cypress tests using cypress.production.config.js config
* cypress:ci:dev - run headless cypress tests using cypress.development.json config
* cypress:ci - run headless cypress tests using cypress.json config
* loco - run loco dev proxy
* storybook - run storybook and serve:no-open
* build-storybook: [build storybook](https://storybook.js.org/docs/react/sharing/publish-storybook#build-storybook-as-a-static-web-application) as a static web application

# Tailwind
Tailwind configuration can be found in ***./tailwind.config.js***

It is configured to look for tailwind entries in:
* './src/html/**/*.html' - to get styles from html files
* './src/components/\*\*/previews/\*\*/*.html' - to get styles from dxp component previews
* './src/components/**/main.js' - to get styles from dxp components
* './src/components/**/manifest.json' - to get styles from data structure
* './src/modules/**/*.jsx' - to get styles from React components

Main entry file can be found in ***./src/css/input.css** which is included in ***./src/js/global.js*** which is one of the webpack entry files.

# React
## Using Contexts and Reducers
[Contexts](https://reactjs.org/docs/context.html) and [Reducers](https://reactjs.org/docs/hooks-reference.html#usereducer) are used to set and get application data being the source of truth for all initial configurations and data being input by the user while using the app. This is similar to using [Redux](https://redux.js.org/) but without a need for external library.

There are two contexts present:
* AppState - this is used to store initial data like translations, application steps etc. This data is stored in localStorage
* DataState - this is where data input from the user is stored

Example code can be found in [ReactContexts](http://127.0.0.1:3000/reactContexts.html)

## Property validation
[prop-types](https://www.npmjs.com/package/prop-types) is used for that. It comes in handy when debuging as is considered good practice overall.

```
import React from 'react';
import PropTypes from 'prop-types';
[...]

export const SomeModule = (props) => {
    [...]

    return (
        <div className="someModule">
            [...]
        </div>
    )
}

PrevNext.propTypes = {
    name:  PropTypes.string,
    status: PropTypes.bool
}
```

## Styled Components
[Emotion](https://emotion.sh/docs/introduction) is used for styled components.

Example can be found in [ReactExamples](http://127.0.0.1:3000/reactExamples.html). It shows how you can create a styled component using scss variables.

# Other
## Linting
When using VSCode with ESLint and stylelint extensions installed JS/CSS errors should be highlighted in the editor. In addition for CI there are two separte commands:
* npm run lint:js - will lint js/jsx
* npm run lint:css - will lint css/scss

## Prettier
It is recommended to use prettier. This can be done by running:
```
npm run format
```
If you are using **VSCode** there is an easier way - install [Prettier  plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

## Env variables
Environment variables are stored in
* .env - PROD
* .env.development - DEV/localhost

Webpack uses **dotenv-webpack** package to access those variables.
Cypress uses **cypress-dotenv** package to use environment variables.

Example can be found in **ReactExamples**

# Loco
[Loco](https://www.npmjs.com/package/loco-server) can be used to
* proxy requests - example **./loco_functions/return_json.js**
* mock data - example **./loco_functions/scaffold.js**

To start run
```
npm run loco
```
which will make functions from **./loco_functions/{name}.js** available under **127.0.0.1:8888/{name}**

# Testing
## Jest - Unit testing
* Test are located in **\_\_tests\_\_** folder and/or **./src/modules/\*\*/\_\_jest\_\_**
* [identity-obj-proxy](https://jestjs.io/docs/webpack#mocking-css-modules) is used to mock scss/css imports of variables used in styled components.

Run
```
npm run test
```
to run all test
```
npm run:coverage
```
to see/generate test coverage.

## Cypress - E2E testing
[Cypress](https://www.cypress.io/) is used as an E2E testing tool.

Run
```
npm run cypress:install
```

or

```
npm run cypress:install:save
```

or install globaly before use.
### Cypress Commands
```
npm run cypress:dev
```
runs cypress using cypress.development.json
```
npm run cypress:prod
```
runs cypress using cypress.json
```
npm run cypress:ci
```
runs cypress headless using cypress.json

### Cypress related files
* ./cypress.json - PROD env configuration
* ./cypress.development.json - DEV env configuration
* ./cypress/ - main folder

### Test location
Test are located in **./src/modules/\*\*/\_\_cypress\_\_/*.spec.js**

### Env variables
Cypress uses **cypress-dotenv** package to use environment variables Example usage of **SITE_URL** variable:
```
Cypress.env('SITE_URL')
```

# VSCode useful plugins
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - to highlight js/jsx errors
* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - to apply proper formating on save
* [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - to highlight SCSS/CSS errors

# Gitabl CI
Gitlab continuous integration flow consists of two stages:
* build - in this stage npm packages are being installed, lint and jest tests run and after that build-min creates the deploy folder
* deploy - deploy folder is being pushed to a separate repository to be used in Matrix via GitBridge

Additional configuration needs to be done on GitLab side under **Settings => CI/CD => Variables**:
* BUILD_REPOSITORY
```
git@gitlab.squiz.net:XXX/YYY/ZZZ.git
```
* SSH_KNOWN_HOSTS
```
# gitlab.squiz.net:22 SSH-2.0-OpenSSH_5.3
gitlab.squiz.net ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAt4E9aVQ/yd31Su8zW1RrlJ/lP81wldfF7hILuOBuUQ5SUZPPOiKAnT71k98V6W+PyLKjJJEYaQEUdOMsXijP3PfuZtx24XDVFHGh5V8w/RLf+0Df68wCEWNVCWPw2Lc6tB2iJyYlb1dJW3ZauzRyoA79stS+q0DOH3C+ogu6CdlAmrYAlen5pUEmB8wQFxGmsUu8VreeEss64NR6LiLHeRg6k6CfNWx1LfV6aQO0DG4nE6G9VB4n1QRtSTKSlGTBAM+gNiAj0RmZ8q+N0TDwK2tU9Wv7TSgPSeSfn0PaZRhvh1EN1qhl2B/NgOMKu1kTFaWxBk7SSK4IA+GxQ5GoYw==
# gitlab.squiz.net:22 SSH-2.0-OpenSSH_5.3
```
* SSH_PRIVATE_KEY
```
-----BEGIN OPENSSH PRIVATE KEY-----
{KEY FOR BUILD_REPOSITORY GOES HERE}
-----END OPENSSH PRIVATE KEY-----
```
