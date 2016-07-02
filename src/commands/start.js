/*
 * Start your Feathers server
 */

import start from '../utils/start-server';

// TODO (EK): Possibly check for multiple app files
// and start on different available ports

export default function(vorpal) {
  vorpal
    .command('start', 'Start your feathers app')
    .alias('run')
    .action((args, callback) => {
      start(vorpal, args, callback);
    });
}
