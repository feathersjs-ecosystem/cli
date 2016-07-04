/*
 * Generate things like apps, services,
 * hooks, middleware, models, tests and filters.
 */

import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { existsSync as exists } from 'fs';
import merge from 'lodash.merge';
import generators from 'feathers-generator';

export default function(program) {
  program
    .command('generate [template] [name]')
    .description('generate a template')
    .usage(`app my-app

      Automatically generate an:
        - app
        - hook
        - service
        - filter
        - model
        - middleware
        - plugin

      (defaults to an app template)
    `)
    .alias('g')
    .option('-f, --force', 'force file overwrites')
    .option('-p, --path <path>', 'output path (default is the current working directory)')
    .action((template, name, command) => {
      const DEFAULTS = {
        template: 'app',
        name: path.relative('..', process.cwd()),
        path: '.',
        force: false
      };

      const args = merge(DEFAULTS, { template, name, force: command.force, path: command.path });
      const outputDirectory = path.resolve(args.path);

      program.debug(`Running '${args.template}' generator with options`, args);

      if (exists(outputDirectory) && !args.force) {
        inquirer.prompt([{
          type: 'confirm',
          name: 'ok',
          message: args.path === '.' ? `Generate ${args.template} in current directory?` : `${outputDirectory} already exists. Continue?`
        }])
        .then(answers => {
          console.log('answers', answers);
          
          if (answers.ok) {
            program.debug(`Using directory: ${outputDirectory}`);
            // run();
            
            console.log();
          }
        });
      }
      else {
        console.log('Running with new dir');
        // run();
      }
    });
}
