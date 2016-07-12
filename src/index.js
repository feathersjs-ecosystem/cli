import Debug from 'debug';
import program from 'commander';
import chalk from 'chalk';
import rootCheck from 'root-check';
// import debug from './commands/debug';
// import deploy from './commands/deploy';
import doctor from './commands/doctor';
import generate from './commands/generate';
import help from './commands/help';
import start from './commands/start';
import update from './commands/update';
import version from './commands/version';
import checkForUpdates from './utils/check-for-updates';

const debug = Debug('feathers-cli');

export default function() {
  let args = process.argv;
  program.debug = debug;

  // Check to see if command was run as root and try to downgrade permissions.
  // If that fails show an error and exit out. We don't want to create files as root.
  rootCheck(`
    ${chalk.red("Easy with the 'sudo'.")}
    
    Since feathers is a user command, there is no need to execute it with root permissions.
    If you're having permission errors when using feathers without sudo, please spend a few
    minutes learning more about how your system should work and make any necessary repairs.

    Two quick solutions are to change where npm stores global packages by putting ~/npm/bin
    in your PATH and running: ${chalk.bold('npm config set prefix ~/npm')} or simply using NVM to manage
    your node environment. See https://github.com/creationix/nvm.
  `);

  // TODO (EK): Add opt-in analytics reporting
  // using GA + insight. Look at how yeoman does it
  // https://github.com/yeoman/yo/blob/master/lib/cli.js#L172
  

  // Register our commands with commander
  // debug(program);
  // deploy(program);
  doctor(program);
  generate(program);
  help(program);
  start(program);
  update(program);
  version(program);

  // Check to see if we are on the latest CLI version first
  checkForUpdates.bind(program)(args).then(data => {
    if (data && data.outOfDate) {
      console.log(chalk.yellow('A newer version of feathers-cli is available.'));
      console.log();
      console.log(`  latest:    ${chalk.green(data.latestVersion)}`);
      console.log(`  installed: ${chalk.red(data.localVersion)}`);
      console.log();
      console.log(`You can update by running ${chalk.bold("'feathers update'")} or ${chalk.bold("'npm install -g feathers-cli'")}.`);
      console.log();
    }
    else if (data) {
      program.debug(`Current Version: ${data.localVersion} ${chalk.green('OK')}`);
    }

    run();
  })
  .catch(error => {
    if (error) {
      program.debug(chalk.red('Error checking for updates:', error.message));
    }

    run();
  });

  const run = () => {
    program.parse(args);
    
    // Show help if no other command was called
    if (!program.args.length) {
      program.help();
    }
  };

  // Add some extra padding
  process.on('exit', function () {
    console.log();
  });
}
