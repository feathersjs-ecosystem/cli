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
    .action((args, callback) => {
      checkForUpdates(vorpal, args, function(error, data){
        if (data && data.outOfDate) {
          vorpal.log(`New version (${chalk.green(data.latestVersion)}) found!`);
          updateCLI(vorpal, args, function(error, response){
            if (!error) {
              process.exit(0);
            }
          });
        }
        else if (data) {
          vorpal.log(`You are already on the latest version.`);
          vorpal.log();
          callback();
        }
      });
    });
}
