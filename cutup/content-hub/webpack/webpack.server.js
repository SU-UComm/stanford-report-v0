const chalk = require('chalk');
const path = require('path');
const config = require('./config');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

// Handle entries list
let buildEntries = Object.assign({}, config.entry);

// Keep only server builds if required
Object.keys(buildEntries).forEach((entry) => {
    if (buildEntries[entry]?.library?.type !== 'commonjs2') {
        delete buildEntries[entry];
    }
});
console.log(chalk.cyan('==== Entries that will be rebuild ===='));
console.log(buildEntries);

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: buildEntries,
    output: {
        filename: 'js/[name].js', // JS output path,
        path: path.resolve(__dirname, `../${config.buildFolder}`), // Output folder
        publicPath: config.publicPath,
    },
    resolve: {
        alias: config.alias,
    },
    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, './loaders')],
    },
    module: {
        rules: [
            {
                // JavaScript and JSX only (no JSON)
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    plugins: [
        new Dotenv({
            path: `.env`,
        }),
        new ESLintPlugin({extensions: ['js', 'jsx']}),
    ],
    optimization: {
        minimize: true,
        runtimeChunk: false,
    },
};
