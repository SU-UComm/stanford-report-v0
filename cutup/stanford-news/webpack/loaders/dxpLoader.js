const fs = require('fs');
const path = require('path');
const {getOptions} = require('loader-utils');
const config = require('../config');
const chalk = require('chalk');

/**
 * Invalidate module cache on each require
 * @param {String} module module path
 * @returns {Object} required module
 */
const requireUncached = (module) => {
    delete require.cache[require.resolve(module)];
    return require(module);
};

module.exports = function () {
    const callback = this.async();
    const options = getOptions(this);
    const dataFile = config.dxpComponentsPathPrefix + options.dataFile;
    const componentFile = config.dxpComponentsPathPrefix + options.componentFile;

    console.log('');
    console.log(chalk.cyan('==== Updating DXP Component ===='));
    console.log(`    `, chalk.yellow('Component:'), ' =>', componentFile);
    console.log(`    `, chalk.yellow('Data:'), ' =>', dataFile);
    console.log('');

    // Load component and data sample
    const data = requireUncached(dataFile);
    const component = fs.existsSync(path.resolve(__dirname, componentFile)) ? requireUncached(componentFile) : () => {};

    (async () => {
        const result = await component(data);
        return `module.exports = \`${result}\``;
    })().then(
        (res) => callback(undefined, res),
        (err) => callback(err),
    );
};
