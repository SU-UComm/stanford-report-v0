const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const config = require('./config');

module.exports = (env) => {
    return merge(common, {
        mode: 'production',
        devtool: 'source-map',
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
                path: `.env`,
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[name].css',
            }),
            new CleanWebpackPlugin({
                cleanAfterEveryBuildPatterns: [config.buildFolder],
                verbose: true,
            }),
        ],
        optimization: {
            minimize: env.minify === 'true' ? true : false,
        },
    });
};
