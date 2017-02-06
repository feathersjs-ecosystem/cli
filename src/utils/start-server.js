import pkg from '../../package.json';
import { exec } from 'child_process';

export default function(/*args*/) {
  return new Promise((resolve, reject) => {
    console.log(`Starting Feathers app: ${pkg.name}`);
    console.log();

    // TODO (EK): Check to see if we are actually in an app directory
    // Maybe check for a feathers.json file.

    // TODO (EK): Add support for args.port. Possibly just set as
    // an env var if present.

    // TODO (EK): Use program.executeSubCommand instead
    exec(`npm start`, (error, response) => {
      if (error) {
        return reject(error);
      }

      resolve(response);
    });
  });
}
