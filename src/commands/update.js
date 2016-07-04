/*
 * Self update Feathers CLI or Feathers dependencies
 */

import checkForUpdates from '../utils/check-for-updates';
import updateCLI from '../utils/update-cli';

export default function(vorpal) {
  const chalk = vorpal.chalk;

  vorpal
    .command('update', 'Update feathers-cli')
    .alias('upgrade')
    .action(args => {
      return checkForUpdates(vorpal, args)
        .then(data => {
          if (data && !data.outOfDate) {
            vorpal.log(`You are already on the latest version.`);
            vorpal.log();

            return Promise.resolve();
          }

          vorpal.log(`New version (${chalk.green(data.latestVersion)}) found!`);

          return updateCLI(vorpal, args)
            .then(() => {
              process.exit(0);
            });
        });
    });
}
