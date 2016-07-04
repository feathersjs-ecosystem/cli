/*
 * Check for an updated version and that the current
 * Node + NPM versions meet the CLI requirements.
 */

import getVersion from '../utils/get-cli-version';

export default function(vorpal) {
  vorpal
    .command('version', 'get the feathers-cli version')
    .alias('--version')
    .alias('-v')
    .action((args, callback) => {
      getVersion(vorpal, args, function(error, version) {
        vorpal.log(`Current Version: ${version}`);
        vorpal.log();
      });
    });
}
