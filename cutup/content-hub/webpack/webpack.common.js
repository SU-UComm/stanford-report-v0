/* global */
const chalk = require('chalk');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const config = require('./config');

// Print entry points
console.log(chalk.cyan('==== Entries list ===='));
Object.keys(config.entry).forEach((entryName, i) => {
    console.log(`    ${i + 1}.`, chalk.yellow(entryName), ' =>', config.entry[entryName]);
});
console.log(chalk.cyan('=======================\n'));

// Print aliases
console.log(chalk.cyan('==== Alias list ===='));
Object.keys(config.alias).forEach((aliasName, i) => {
    console.log(`    ${i + 1}.`, chalk.yellow(aliasName), ' =>', config.alias[aliasName]);
});
console.log(chalk.cyan('=======================\n'));

// Pick proper chunks
function pickChunks(name, configChunks) {
    let chunks = new Set(configChunks.allPages);

    configChunks.pages.forEach((item) => {
        if (item?.pages.indexOf(name) !== -1) {
            item.addChunks.forEach((chunk) => {
                chunks.add(chunk);
            });
            item.removeChunks.forEach((chunk) => {
                chunks.delete(chunk);
            });
        }
    });

    return [...chunks];
}

// Our function that generates our html plugins
function generateHtmlPlugins(templateDir) {
    // Read files in /html directory
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir)).filter(function (file) {
        //ignore folder
        return file.indexOf('.html') > -1;
    });

    console.log(chalk.cyan('==== Chunks config ===='));
    return templateFiles.map((item, i) => {
        // Split names and extension
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];

        // Print chunks config
        console.log(`    ${i + 1}.`, chalk.yellow(`${name}.html`), ' =>', pickChunks(name, config.chunks));
        templateFiles.length === i + 1 ? console.log(chalk.cyan('=======================\n')) : '';

        // Create new HTMLWebpackPlugin with options
        return new HtmlWebPackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            chunks: pickChunks(name, config.chunks),
        });
    });
}

const htmlPlugins = generateHtmlPlugins('../src/html');

class WatchForHotHTMLChanges {
    apply(compiler) {
        compiler.hooks.watchRun.tap('WatchForHotHTMLChanges', (comp) => {
            console.log(comp.modifiedFiles);
            if (comp.modifiedFiles) {
                const changedFiles = Array.from(comp.modifiedFiles, (file) => `\n  ${file}`).join('');
                console.log('===============================');
                console.log('FILES CHANGED:', changedFiles);
                console.log('===============================');
            }
        });
    }
}

const copyWebPack = new CopyWebpackPlugin({
    patterns: [
        {
            from: path.resolve(__dirname, '../src/externals'),
            to: 'externals/[name][ext]',
            noErrorOnMissing: true,
        },
        {
            from: 'src/modules/**/inline-*.svg',
            to: 'svg/[name][ext]',
            noErrorOnMissing: true,
        },
        {
            from: 'src/components/**/static/*.*',
            to: 'static/[name][ext]',
            noErrorOnMissing: true,
        },
    ],
});

module.exports = {
    entry: config.entry,
    output: {
        publicPath: config.publicPath,
        path: path.resolve(__dirname, `../${config.buildFolder}`), // Output folder
        filename: 'js/[name].js', // JS output path
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
                // HTML
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false,
                            interpolate: true, // allow HTML snippets with commonJs require tags
                        },
                    },
                ],
            },
            {
                // Inline SVG
                test: /inline-.+\.svg$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },
            {
                // JavaScript and JSX only (no JSON)
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                // Images & fonts
                test: /\.(png|svg|jpg|gif|woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /inline-.+\.svg$/,
                type: 'asset/resource',
                generator: {
                    filename: './mysource_files/[name][ext]',
                },
            },
        ],
    },
    plugins: [new ESLintPlugin({extensions: ['js', 'jsx']})].concat(htmlPlugins).concat(new WatchForHotHTMLChanges()).concat(copyWebPack),
    optimization: {
        minimize: false,
        runtimeChunk: false,
    },
};
