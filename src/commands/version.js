/*
 * Check for an updated version and that the current
 * Node + NPM versions meet the CLI requirements.
 */

import checkVersion from '../utils/check-version';

export default function(vorpal) {
  vorpal
    .command('version', 'get the feathers-cli version')
    .alias('--version')
    .alias('-v')
    .action((args, callback) => {
      checkVersion(vorpal, args, callback);
    });
}
