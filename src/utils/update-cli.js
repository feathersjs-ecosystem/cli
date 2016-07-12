import { spawn } from 'child_process';

export default function(args) {
  const program = this;

  return new Promise((resolve, reject) => {
    program.debug(`Running 'npm install -g feathers-cli'...`);
    
    const npm = spawn('npm', ['install', '-g', 'feathers-cli'], {stdio: 'inherit'});

    npm.on('close', function (code) {
      program.debug(`'npm install -g feathers-cli' exited with code ${code}`);

      if (code === 0) {
        return resolve();
      }

      reject(new Error('There was a problem installing the new feathers-cli version.'));
    });
  });
}
