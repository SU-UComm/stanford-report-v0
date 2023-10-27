const chalk = require('chalk');
const path = require('path');
const config = require('./config');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
    // Clone entries list
    let buildEntries = Object.assign({}, config.entry);

    if (!env.component) {
        // Rebuild all server builds
        Object.keys(buildEntries).forEach((entry) => {
            if (buildEntries[entry]?.library?.type !== 'commonjs2') {
                delete buildEntries[entry];
            }
        });
        console.log(chalk.cyan('==== Building all server bundles ===='));
        console.log(chalk.yellow(JSON.stringify(buildEntries, null, 2)));
    } else {
        // Rebuild specific server build
        Object.keys(buildEntries).forEach((entry) => {
            if (buildEntries[entry]?.library?.type !== 'commonjs2') {
                delete buildEntries[entry];
            }
            if (buildEntries[entry]?.import?.indexOf(env.component) === -1) {
                delete buildEntries[entry];
            }
        });
        console.log(chalk.cyan('==== Bundles that will be rebuild ===='));
        console.log(chalk.yellow(JSON.stringify(buildEntries, null, 2)));
    }
    return {
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
};
