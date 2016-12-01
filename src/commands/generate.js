/*
 * Generate things like apps, services,
 * hooks, middleware, models, tests and filters.
 */

import path from 'path';
import inquirer from 'inquirer';
import { existsSync as exists } from 'fs';
import merge from 'lodash.merge';
import generate from '../utils/generate';

export default function (program) {
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
    .option('-m, --mount <path>', 'path to feathers bootstrap json (default is false, which skips)')
    .option('-c, --config <path>', 'path to the config directory (default is false, which skips)')
    .action((template, name, command) => {
      const DEFAULTS = {
        template: 'app',
        path: '.',
        mount: false,
        config: false,
        force: false
      };

      let args = merge(DEFAULTS, { template, name, force: command.force, path: command.path, mount: command.mount });
      args.root = path.resolve('.');
      args.name = args.name || path.parse(args.root).name;

      if (exists(args.root) && !args.force) {
        inquirer.prompt([{
          type: 'confirm',
          name: 'ok',
          message: args.path === '.' ? `Generate ${args.template} in current directory?` : `${args.root} already exists. Continue?`
        }])
        .then(answers => {
          if (answers.ok) {
            generate.bind(program)(args);
          }
        });
      } else {
        generate.bind(program)(args);
      }
    });
}
