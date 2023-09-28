const glob = require('glob');
const path = require('path');
const entryHelpers = require('./helpers/entries');

module.exports = {
    buildFolder: 'build',
    host: '127.0.0.1',
    port: 4000,
    watchFiles: ['./src/**/*.*'],
    devServerClient: {
        logging: 'info',
        overlay: {errors: true, warnings: false},
    },
    dxpComponentsPathPrefix: '../../src/components',
    dxpComponentsWatchPath: './src/components',
    dxpComponentsGlobalWatchPath: './src/jsx',
    dxpComponentsNamespace: 'stanford-components',
    dxpComponentsNamePrefix: 'su-',
    publicPath: '/',
    proxy: {
        // '/api': {
        //     target: 'https://domain.tld:80',
        //     changeOrigin: true
        // }
    },
    alias: {
        cypress: path.resolve(__dirname, '../cypress/'),
        nodeModules: path.resolve(__dirname, '../node_modules/'),
        src: path.resolve(__dirname, '../src/'),
        modules: path.resolve(__dirname, '../src/modules'),
        jsx: path.resolve(__dirname, '../src/jsx'),
        helpers: path.resolve(__dirname, '../src/helpers'),
        images: path.resolve(__dirname, '../src/images'),
    },
    entry: Object.assign(
        {
            global: glob.sync('./src/**/global.js'),
            tailwind: glob.sync('./src/js/tailwind.js'),
            reactApp: './src/modules/_ReactApp/render.jsx',
            reactComponentsClient: glob.sync('./src/components/**/client.jsx'),
        },
        ...entryHelpers.buildComponentEntries('./src/components'),
    ),
    chunks: {
        allPages: ['global'],
        pages: [
            {
                pages: ['reactApp'],
                addChunks: ['reactApp'],
                removeChunks: [],
            },
            {
                pages: ['searchPage', 'videosPage', 'bestBets', 'podcastsPage', 'autocomplete', 'savedItemsPage', 'basicStory'],
                addChunks: ['tailwind'],
                removeChunks: [],
            },
            {
                pages: ['su-react_component', 'su-scaffold'],
                addChunks: ['tailwind'],
                removeChunks: [],
            },
        ],
    },
    rewrites: [
        {from: /^\/$/, to: '/reactRouter.html'},
        {from: /./, to: '/reactRouter.html'},
    ],
};
