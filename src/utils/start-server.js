import packageConfig from '../../package.json';
import { exec } from 'child_process';

export default function(vorpal, args, done) {
  const chalk = vorpal.chalk;

  vorpal.log(`Starting Feathers app: ${packageConfig.name}`);
  vorpal.log();

  // TODO (EK): Check to see if we are actually in an app directory
  // Maybe check for a feathers.json file.

  // TODO (EK): Might want to switch this to spawn a process instead
  exec(`npm start`, (error, response) => {
    if (error) {
      vorpal.log(chalk.red('There was a problem starting your Feathers app'));
      vorpal.log();
      vorpal.log(error.message);

      return done(error);
    }

    vorpal.log(chalk.green(response));
    done(null, response);
  });
}
