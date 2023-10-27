const glob = require('glob');

/**
 * Build react component entries
 * @param {String} compPath path to components folder
 * @returns {Array} array of component React entries
 */
const buildComponentEntries = (compPath) => {
    const serverEntries = glob.sync(`${compPath}/**/server.jsx`).map((e) => {
        const newEntryName =
            e
                .split('/')
                [e.split('/').length - 2].split('-')
                .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                .join('') + 'Server';
        let newEntry = {};
        newEntry[newEntryName] = {
            import: e,
            filename: `.${e.replace('/server.jsx', '')}/dist/server.js`,

            library: {
                type: 'commonjs2',
                export: 'default',
            },
        };

        return newEntry;
    });

    const clientEntries = glob.sync(`${compPath}/**/client.jsx`).map((e) => {
        const newEntryName =
            e
                .split('/')
                [e.split('/').length - 2].split('-')
                .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                .join('') + 'Client';
        let newEntry = {};
        newEntry[newEntryName] = {
            import: e,
            filename: `.${e.replace('/client.jsx', '')}/dist/client.js`,
        };

        return newEntry;
    });

    return serverEntries.concat(clientEntries);
};

module.exports = {buildComponentEntries};
