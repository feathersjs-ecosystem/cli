import request from 'request';
import semver from 'semver';
import chalk from 'chalk';
import pkg from '../../package.json';

const URL = 'https://registry.npmjs.org/feathers-cli';

export default function(args) {
  const program = this;

  return new Promise((resolve, reject) => {
    // If they are using the update command then don't bother
    // checking for updates on startup.
    if (Array.isArray(args) && args.indexOf('update') !== -1) {
      return resolve();
    }

    program.debug('Checking for updates...');

    // Check NPM for latest CLI version and compare to our own.
    request({ url: URL, timeout: 2000 }, function (error, response, body) {
      let data;

      // TODO (EK): Check for latest feathers-generator version

      // Only check versions if we could successfully hit NPM.
      if (!error && response.statusCode === 200) {
        const latestVersion = JSON.parse(body)['dist-tags'].latest;
        const localVersion = pkg.version;

        data = {
          latestVersion: 'v' + latestVersion,
          localVersion: 'v' + localVersion,
          outOfDate: semver.lt(localVersion, latestVersion)
        };

        return resolve(data);
      }

      if (error.code === 'ENOTFOUND') {
        program.debug(chalk.red('Unable to check for latest version. Are you connected to the Internet?'));
      }

      reject(error);
    });
  });
}
