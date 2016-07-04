/*
 * Check for an updated version and that the current
 * Node + NPM versions meet the CLI requirements.
 */

import pkg from '../../package.json';

export default function(program) {
  // Expose version.
  program.version(pkg.version, '-v, --version');

  // Make `-v` option case-insensitive.
  process.argv = process.argv.map(arg => (arg === '-V') ? '-v' : arg);

  program
    .command('version')
    .description('output the version')
    .action(program.versionInformation);
}
