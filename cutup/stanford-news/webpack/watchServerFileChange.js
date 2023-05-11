const fs = require('fs');
const chalk = require('chalk');
const {exec} = require('child_process');

console.log(chalk.cyan(`┌─────────────────────────────────┐`));
console.log(chalk.cyan('│'), chalk.green(` Watching for JSX file changes `), chalk.cyan('│'));
console.log(chalk.cyan(`└─────────────────────────────────┘`));

let fsWait = false;

fs.watch('./src/components', {recursive: true, interval: 1000}, (event, filename) => {
    if (filename) {
        if (fsWait) return;
        fsWait = setTimeout(() => {
            fsWait = false;
        }, 100);

        if (filename.indexOf('.jsx') !== -1) {
            const component = filename.replace(/\/.+|\\.+/g, '');
            const cmd = `npx webpack --config webpack/webpack.server.js --env component=${component}`;
            console.log(`File modified in component ${chalk.green('→')} ${chalk.yellow(component)}`);
            console.log(chalk.gray(`[${new Date().toTimeString().split(' ')[0]}]`), chalk.cyan(`☕ Starting: ${chalk.blue(cmd)}`));

            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    console.error(`😡 error: ${error.message}`);
                    return;
                }

                if (stderr) {
                    console.error(`😡 stderr: ${stderr}`);
                    return;
                }

                console.log(chalk.gray(`[${new Date().toTimeString().split(' ')[0]}]`), chalk.cyan(`😃 Finished: ${chalk.blue(cmd)}`));
            });
        }
    }
});
