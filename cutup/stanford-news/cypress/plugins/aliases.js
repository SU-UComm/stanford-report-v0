const path = require('path');
const globalAliases = require('../../webpack/config').alias;
globalAliases['cypress'] = path.resolve(__dirname, '../../cypress');
globalAliases['loco'] = path.resolve(__dirname, '../../loco_functions');

console.log(JSON.stringify(globalAliases, null, 2));

module.exports = {
    resolve: {
        alias: globalAliases,
    },
};
