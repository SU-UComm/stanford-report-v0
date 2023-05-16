const fs = require('fs');
const chalk = require('chalk');
const {exec} = require('child_process');
const config = require('../../webpack/config');

const componentsPath = config.dxpComponentsWatchPath;
const globalPath = config.dxpComponentsGlobalWatchPath;

console.log(chalk.cyan(`┌─────────────────────────────────┐`));
console.log(chalk.cyan('│'), chalk.green(` Watching for JSX file changes `), chalk.cyan('│'));
console.log(chalk.cyan(`├─────────────────────────────────┘`));
console.log(chalk.cyan(`├─ Component path: ${chalk.yellow(componentsPath)}`));
console.log(chalk.cyan(`└─ Global path: ${chalk.yellow(globalPath)}`));

let fsWaitC = false;
let fsWaitG = false;

// Watch for changes in components
fs.watch(componentsPath, {recursive: true, interval: 1000}, (event, filename) => {
    if (filename) {
        if (fsWaitC) return;
        fsWaitC = setTimeout(() => {
            fsWaitC = false;
        }, 100);

        if (filename.indexOf('.jsx') !== -1) {
            const component = filename.replace(/\/.+|\\.+/g, '');
            const cmd = `npx webpack --config webpack/webpack.server.js --env component=${component}`;
            console.log(`File modified in component ${chalk.green('→')} ${chalk.yellow(component)}`);
            console.log(chalk.gray(`[${new Date().toTimeString().split(' ')[0]}]`), chalk.cyan(`☕ Rebuilding (${chalk.yellow(component)}): ${chalk.blue(cmd)}`));

            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    console.error(`😡 error: ${error.message}`);
                    return;
                }

                if (stderr) {
                    console.error(`😡 stderr: ${stderr}`);
                    return;
                }

                console.log(chalk.gray(`[${new Date().toTimeString().split(' ')[0]}]`), chalk.cyan(`😃 Finished (${chalk.yellow(component)}): ${chalk.blue(cmd)}`));
            });
        }
    }
});

// Watch for changes in global jsx
fs.watch(globalPath, {recursive: true, interval: 1000}, (event, filename) => {
    if (filename) {
        if (fsWaitG) return;
        fsWaitG = setTimeout(() => {
            fsWaitG = false;
        }, 100);

        if (filename.indexOf('.jsx') !== -1) {
            const cmd = `npx webpack --config webpack/webpack.server.js`;
            console.log(`File modified in global JSX ${chalk.green('→')} ${chalk.yellow(filename)}`);
            console.log(chalk.gray(`[${new Date().toTimeString().split(' ')[0]}]`), chalk.cyan(`☕ Rebuilding all server bundles: ${chalk.blue(cmd)}`));

            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    console.error(`😡 error: ${error.message}`);
                    return;
                }

                if (stderr) {
                    console.error(`😡 stderr: ${stderr}`);
                    return;
                }

                console.log(chalk.gray(`[${new Date().toTimeString().split(' ')[0]}]`), chalk.cyan(`😃 Finished rebuilding all server bundles: ${chalk.blue(cmd)}`));
            });
        }
    }
});
