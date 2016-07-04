/*
 * Start your Feathers server
 */

import chalk from 'chalk';
import start from '../utils/start-server';

// TODO (EK): Possibly check for multiple app files
// and start on different available ports

export default function(program) {
  program
    .command('start')
    .description('start your feathers app')
    // .option('-p, --port <port>', 'set the port to listen on')
    .alias('run')
    .action((args) => {
      start.bind(program)(args)
        .then(response => {
          console.log(chalk.green(response));
        })
        .catch(error => {
          if (error) {
            console.log(chalk.red('There was a problem starting your Feathers app'));
            console.log();
            console.log(error.message);
          }
        });
    });
}
