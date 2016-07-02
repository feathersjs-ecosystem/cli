/*
 * Check that Node + NPM versions meet the CLI requirements
 * and that we have basic system requirements.
 */
 import checkEnvironment from '../utils/check-environment';

 export default function(vorpal) {
  vorpal
    .command('doctor', 'Check your system for potential problems.')
    .action((args, callback) => {
      checkEnvironment(vorpal, args, callback);
    });
 }
