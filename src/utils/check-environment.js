import semver from 'semver';
import { execSync } from 'child_process';
import pkg from '../../package.json';
import chalk from 'chalk';

// Parse version number from strings such as 'v4.2.0' or `>=4.0.0'
export function parseVersionNumber(versionString) {
  return versionString.toString().replace(/[^\d\.]/g, '');
}

export default function(/*args*/) {
  const program = this;
  const minNodeVersion = parseVersionNumber(pkg.engines.node);
  const currentNodeVersion = parseVersionNumber(process.version);
  const minNpmVersion = parseVersionNumber(pkg.engines.npm);
  let currentNpmVersion = 0;

  // try to detect npm version
  try {
    program.debug(`Running 'npm --version'...`);
    currentNpmVersion = parseVersionNumber(execSync('npm --version'));
  } catch (e) {
    program.debug(chalk.red('Error running npm --version', e));
  }

  if (!currentNpmVersion) {
    console.log(chalk.red(`Unable to detect npm version. Do you have NPM installed?\n`));
  }

  // Ensure minimum supported node version is used
  if (semver.gt(minNodeVersion, currentNodeVersion)) {
    console.log(chalk.yellow(`You should upgrade node to >=${minNodeVersion} to use feathers-cli`));
  }
  else {
    // TODO (EK): Only enable if "verbose" mode
    console.log(`NodeJS version: v${currentNodeVersion} ${chalk.green('OK')}`);
  }

  // Suggest NPM upgrade if minimum version not present
  if (semver.gt(minNpmVersion, currentNpmVersion)) {
    console.log(chalk.yellow(`You should upgrade npm to >=${minNpmVersion}. feathers-cli works best with recent versions of npm. Do this by running "npm install -g npm".`));
  }
  else {
    // TODO (EK): Only enable if "verbose" mode
    console.log(`NPM version: v${currentNpmVersion} ${chalk.green('OK')}`);
  }

  // TODO (EK): Check GCC version

  console.log();
}
