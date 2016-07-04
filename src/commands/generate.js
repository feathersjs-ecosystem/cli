/*
 * Generate things like apps, services,
 * hooks, middleware, models, tests and filters.
 */

import path from 'path';
import { existsSync as exists } from 'fs';
import merge from 'lodash.merge';
import generators from 'feathers-generator';

const autocompletes = [
  'app',
  'filter',
  'hook',
  'middleware',
  'model',
  'secret',
  'service',
  'plugin'
];

export default function(vorpal) {
  const chalk = vorpal.chalk;

  vorpal
    .command('generate [template] [name]', `Allows you to automatically generate a:
      - app
      - hook
      - service
      - filter
      - model
      - middleware
      - plugin

      Defaults to an app when an argument isn't provided.`)
    .alias('g')
    .alias('-g')
    .option('-f, --force', 'Force file overwrite.')
    .option('-p, --path <path>', 'That path to output to. Default is the current working directory.')
    .autocomplete(autocompletes)
    // .help(function(args) {
    //   // TODO (EK): Add more descriptive help
    // })
    .action(args => {
      const DEFAULTS = {
        template: 'app',
        // name: path.relative('..', process.cwd()),
        options: {
          path: '.',
          force: false
        }
      };

      args = merge(DEFAULTS, args);

      const outputDirectory = path.resolve(args.options.path);

      if (vorpal.verbose) {
        vorpal.log('Running generator with options', args);
      }

      if (exists(outputDirectory) && !args.options.force) {
        return vorpal.activeCommand.prompt([{
          type: 'confirm',
          name: 'ok',
          message: args.path === '.' ? `Generate ${args.template} in current directory?` : `${outputDirectory} already exists. Continue?`
        }])
        .then(answers => {
          vorpal.log('answers', answers);
          
          if (answers.ok) {
            if (vorpal.verbose) {
              vorpal.log(`Using directory: ${outputDirectory}`);
            }
            // run();
            
            vorpal.log();
          }
        }).catch(e => {
          console.log('ERROR', e)
        });
      }
      else {
        vorpal.log('Running with new dir');
        // run();
      }
    });
}
