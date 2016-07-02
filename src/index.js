import vorpal from 'vorpal';
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

  app.history('feathers');
  app.localStorage('feathers');
  
  // debug(app);
  // deploy(app);
  doctor(app);
  generate(app);
  shell(app);
  start(app);
  update(app);
  version(app);

  let args = process.argv;
  
  // If verbose flag is passed, set it on the app
  // and remove it from the args.
  if (args.indexOf('--verbose') !== -1) {
    app.verbose = true;
    args.splice(args.indexOf('--verbose'));
  }

  // Check for any updates first
  checkForUpdates(app, args, function(error, data){
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
