const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const replace = require('replace-in-file');
const config = require('../../webpack/config.js');

/**
 * Capitalise string
 * @param {String} str string to capitalise
 * @returns {String} capitalised string
 */
const stringToCamelcase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Create standard DXP component from scaffold
 * @param {String} srcDir source directory
 * @param {Object} options component options
 */
const copyScaffold = (srcDir, options) => {
    const dest = `${config.dxpComponentsWatchPath}/${config.dxpComponentsNamePrefix}${options.name.toLowerCase().replace(/\s/g, '-')}`;
    const comelcaseName = options.name
        .toLowerCase()
        .split(' ')
        .map((e) => stringToCamelcase(e))
        .join('');

    if (!fs.existsSync(dest)) {
        fs.cpSync(`./scripts/newModule/${srcDir}`, dest, {recursive: true});
        if (options.type === 'React') {
            fs.renameSync(`${dest}/jsx/ComponentName.jsx`, `${dest}/jsx/${comelcaseName}.jsx`);
        }
        replace.sync({
            files: `${dest}/**/*.*`,
            from: /\{NAME\}/g,
            to: options.name,
        });
        replace.sync({
            files: `${dest}/**/*.*`,
            from: /\{NAME_lowercase\}/g,
            to: options.name.toLowerCase().replace(/\s/g, '-'),
        });
        replace.sync({
            files: `${dest}/**/*.*`,
            from: /\{NAME_camelcase\}/g,
            to: comelcaseName,
        });
        replace.sync({
            files: `${dest}/**/*.*`,
            from: /\{DESCRIPTION\}/g,
            to: options.description,
        });
        replace.sync({
            files: `${dest}/**/*.*`,
            from: /\{NAMESPACE\}/g,
            to: config.dxpComponentsNamespace,
        });
    } else {
        console.log(`😱 Directory (${chalk.yellow(dest)}) already exists. Aborting ...`);
    }

    console.log(`New module path: ${chalk.yellow(dest)}`);
};

console.log(chalk.cyan(`┌────────────────────────┐`));
console.log(chalk.cyan('│'), chalk.green(` Create new component `), chalk.cyan('│'));
console.log(chalk.cyan(`├────────────────────────┘`));

inquirer
    .prompt([
        {
            type: 'list',
            name: 'type',
            message: 'What type of component you want to create ?',
            choices: ['Standard', 'React'],
        },
        {
            type: 'input',
            name: 'name',
            message: "What's the module name ?",
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide short module description:',
        },
    ])
    .then((answers) => {
        switch (answers.type) {
            case 'Standard':
                copyScaffold('scaffolds/newModule', answers);
                break;
            case 'React':
                copyScaffold('scaffolds/newReactModule', answers);
                break;
            default:
                console.log(chalk.yellow(`Type "${answers.type}" is not supported.`));
        }
    })
    .catch((error) => {
        console.error(`😡 error: ${error}`);
    });
