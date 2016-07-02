import packageConfig from '../../package.json';
import { spawn } from 'child_process';

export default function(vorpal, args, done) {
  const chalk = vorpal.chalk;

  vorpal.log(`Installing latest feathers-cli version...`);
  vorpal.log();
  
  const npm = spawn('npm', ['install', '-g', 'feathers-cli'], {stdio: 'inherit'});

  npm.on('exit', function (code) {
    if (vorpal.verbose) {
      vorpal.log(`npm install feathers-cli exited with code ${code}`);
    }

    if (code === 0) {
      vorpal.log(chalk.green('Update Successful!'));
      return done();
    }

    const error = new Error('There was a problem installing the new feathers-cli version.');
    
    vorpal.log(chalk.red(error.message));
    done(error);
  });
}
