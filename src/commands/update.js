/*
 * Self update Feathers CLI or Feathers dependencies
 */

import chalk from 'chalk';
import checkForUpdates from '../utils/check-for-updates';
import updateCLI from '../utils/update-cli';

export default function(program) {

  program
    .command('update')
    .description('update the feathers-cli')
    .alias('upgrade')
    .action(args => {
      checkForUpdates.bind(program)(args)
        .then(data => {
          if (data && !data.outOfDate) {
            console.log(`You are already on the latest version.`);
            console.log();

            return Promise.reject();
          }

          console.log(`New version (${chalk.green(data.latestVersion)}) found!`);
          Promise.resolve();
        })
        .then(() => {
          console.log(`Installing latest feathers-cli version...`);
          console.log();

          return updateCLI.bind(program)(args);
        })
        .then(() => {
          console.log(chalk.green('Update Successful!'));
        })
        .catch(error => {
          if (error) {
            console.log(chalk.red(error.message));
          }
        });
    });
}
