const glob = require('glob');
const path = require('path');

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
        helpers: path.resolve(__dirname, '../src/helpers'),
        images: path.resolve(__dirname, '../src/images'),
    },
    entry: {
        global: glob.sync('./src/**/global.js'),
        reactApp: './src/modules/_ReactApp/render.jsx',
        reactComponentsClient: glob.sync('./src/components/**/client.jsx'),
        reactScaffoldServer: {
            import: './src/components/su-react_component/src/component/server.jsx',
            filename: '../src/components/su-react_component/src/component/dist/server.js',

            library: {
                type: 'commonjs2',
                export: 'default',
            },
        },
        reactScaffoldClient: {
            import: './src/components/su-react_component/src/component/client.jsx',
            filename: '../src/components/su-react_component/src/component/dist/client.js',
        },
    },
    chunks: {
        allPages: ['global'],
        pages: [
            {
                pages: ['reactApp'],
                addChunks: ['reactApp'],
                removeChunks: [],
            },
        ],
    },
    rewrites: [
        {from: /^\/$/, to: '/reactRouter.html'},
        {from: /./, to: '/reactRouter.html'},
    ],
};
