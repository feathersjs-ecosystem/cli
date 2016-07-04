import vorpal from 'vorpal';
import rootCheck from 'root-check';
// import debug from './commands/debug';
// import deploy from './commands/deploy';
import doctor from './commands/doctor';
import generate from './commands/generate';
import shell from './commands/shell';
import start from './commands/start';
import update from './commands/update';
import version from './commands/version';

import checkForUpdates from './utils/check-for-updates';

export default function() {
  const app = vorpal();
  const chalk = app.chalk;
  let args = process.argv;

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

  app.history('feathers');
  app.localStorage('feathers');

  // TODO (EK): Add opt-in analytics reporting
  // using GA + insight. Look at how yeoman does it
  // https://github.com/yeoman/yo/blob/master/lib/cli.js#L172
  

  // Register our commands with Vorpal
  // debug(app);
  // deploy(app);
  doctor(app);
  generate(app);
  shell(app);
  start(app);
  update(app);
  version(app);
  
  // If verbose flag is passed, set it on the app
  // and remove it from the args.
  if (args.indexOf('--verbose') !== -1) {
    app.verbose = true;
    args.splice(args.indexOf('--verbose'));
  }

  // Check to see if we are on the latest CLI version first
  checkForUpdates(app, args).then(data => {
    if (data && data.outOfDate) {
      app.log(chalk.yellow('A newer version of feathers-cli is available.'));
      app.log();
      app.log(`  latest:    ${chalk.green(data.latestVersion)}`);
      app.log(`  installed: ${chalk.red(data.localVersion)}`);
      app.log();
      app.log(`You can update by running ${chalk.bold("'feathers update'")} or ${chalk.bold("'npm install -g feathers-cli'")}.`);
      app.log();
    }
    else if (data && app.verbose) {
      app.log(`Current Version: ${data.localVersion} ${chalk.green('OK')}`);
      app.log();
    }

    // Run a command that was passed or show the help
    if (args.length > 2) {
      app.parse(args);
    }
    else {
      app.execSync('help');
    }
  });
}
