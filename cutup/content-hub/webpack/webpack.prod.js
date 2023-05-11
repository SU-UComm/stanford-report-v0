const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const config = require('./config');

module.exports = (env) => {
    // Handle entries list
    let buildEntries = Object.assign({}, config.entry);
    delete common.entry;

    // Keep only server builds if required
    if (env.serverOnly) {
        Object.keys(buildEntries).forEach((entry) => {
            if (buildEntries[entry]?.library?.type !== 'commonjs2') {
                delete buildEntries[entry];
            }
        });
        console.log(buildEntries);
    }

    return merge(common, {
        entry: buildEntries,
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
        plugins: env.serverOnly
            ? [
                  new Dotenv({
                      path: `.env`,
                  }),
              ]
            : [
                  new Dotenv({
                      path: `.env`,
                  }),
                  new MiniCssExtractPlugin({
                      filename: 'css/[name].css',
                      chunkFilename: 'css/[name].css',
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
