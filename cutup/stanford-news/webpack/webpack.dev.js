/* global */
//const path = require('path');
const chalk = require('chalk');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('./config');
const exec = require('child_process').exec;

class createProductionBuild {
    apply(compiler) {
        compiler.hooks.watchRun.tap('RebuildProdBuild', (comp) => {
            if (comp.modifiedFiles) {
                console.log(chalk.cyan('==== Starting server only production build ===='));
                exec('npm run build -- --env serverOnly', (err, stdout, stderr) => {
                    if (stdout) console.log(stdout);
                    if (stderr) console.log(stderr);
                    console.log(chalk.cyan('==== Finished server only production build ===='));
                });
            }
        });
    }
}

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-source-map',
    devServer: {
        proxy: config.proxy,
        setupMiddlewares: (middlewares, devServer) => {
            // // Redirect POST requests to GET
            // devServer.app.post('*', (req, res) => {
            //     res.redirect(req.originalUrl);
            // });

            return middlewares;
        },
        watchFiles: config.watchFiles,
        hot: true,
        client: config.devServerClient,
        host: config.host,
        port: config.port,
        historyApiFallback: {
            rewrites: config.rewrites,
        },
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'icss',
                            },
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                    'import-glob-loader',
                ],
            },
        ],
    },
    plugins: [
        new Dotenv({
            path: `.env.development`,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        }),
        new createProductionBuild(),
    ],
});
