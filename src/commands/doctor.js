/*
 * Check that Node + NPM versions meet the CLI requirements
 * and that we have basic system requirements.
 */
 import checkEnvironment from '../utils/check-environment';

 export default function(program) {
  program
    .command('doctor')
    .description('check your system for potential problems.')
    .alias('dr')
    .action(checkEnvironment.bind(program));
 }
