import packageConfig from '../../package.json';
import { spawn } from 'child_process';

export default function(vorpal, args) {
  const chalk = vorpal.chalk;

  return new Promise((resolve, reject) => {
    vorpal.log(`Installing latest feathers-cli version...`);
    vorpal.log();
    
    const npm = spawn('npm', ['install', '-g', 'feathers-cli'], {stdio: 'inherit'});

    npm.on('close', function (code) {
      if (vorpal.verbose) {
        vorpal.log(`npm install -g feathers-cli exited with code ${code}`);
      }

      if (code === 0) {
        vorpal.log(chalk.green('Update Successful!'));
        return resolve();
      }

      const error = new Error('There was a problem installing the new feathers-cli version.');
      
      vorpal.log(chalk.red(error.message));
      reject(error);
    });
  });
}
