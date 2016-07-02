import request from 'request';
import semver from 'semver';
import packageConfig from '../../package.json';

const URL = 'https://registry.npmjs.org/feathers-cli'

export default function(vorpal, args, done) {
  const chalk = vorpal.chalk;

  // If they are using the update command then don't bother
  // checking for updates on startup.
  if (Array.isArray(args) && args.indexOf('update') !== -1) {
    return done();
  }

  if (vorpal.verbose) {
    vorpal.log('Checking for updates...');
  }

  // Check Github for latest version and compare to our own.
  request({ url: URL, timeout: 1000 }, function (error, response, body) {
    let data;

    // Only check versions if we could successfully hit Github.
    if (!error && response.statusCode === 200) {
      const latestVersion = JSON.parse(body)['dist-tags'].latest;
      const localVersion = packageConfig.version;

      data = {
        latestVersion: 'v' + latestVersion,
        localVersion: 'v' + localVersion,
        outOfDate: semver.lt(localVersion, latestVersion)
      };
    }
    else if (vorpal.verbose) {
      vorpal.log(chalk.red('Unable to check for latest version. Are you connected to the Internet?'));
    }

    done(error, data);
  })
}
