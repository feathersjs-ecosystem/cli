/*
 * Generate things like apps, services,
 * hooks, middleware, models, tests and filters.
 */

import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { existsSync as exists } from 'fs';
import merge from 'lodash.merge';
import Generator from 'feathers-generator';

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

      let args = merge(DEFAULTS, { template, name, force: command.force, path: command.path });
      args.root = path.resolve(args.path);
      
      const run = function() {
        program.debug(`Running '${args.template}' generator with options`, args);
        program.debug(`Using directory: ${args.root}`);
        
        const generator = Generator(args);

        generator.getQuestions()
          .then(questions => {
            // Get user to answer questions
            return inquirer.prompt(questions);
          })
          .then(answers => {
            // Send answers back to generator
            return generator.generate(answers);
          })
          .then(dependencies => {
            // npm install dependencies
            // { devDependencies: [], dependencies: [] }
          })
          .catch(error => {
            if (error) {
              console.log(chalk.red('ERROR', error));
            }

            process.exit(1);
          });
      }

      if (exists(args.root) && !args.force) {
        inquirer.prompt([{
          type: 'confirm',
          name: 'ok',
          message: args.path === '.' ? `Generate ${args.template} in current directory?` : `${args.root} already exists. Continue?`
        }])
        .then(answers => {
          if (answers.ok) {
            run();
          }
        });
      }
      else {
        // We are using a new directory so use the root directory
        // name as the default name.
        args.name = path.parse(args.root).name;

        run();
      }
    });
}
