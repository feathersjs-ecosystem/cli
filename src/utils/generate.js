import chalk from 'chalk';
import inquirer from 'inquirer';
import generator from 'feathers-generator';

export default function(args) {
  const program = this;

  const errorHandler = function(error) {
    console.log(chalk.red('ERROR', error));
    process.exit(1);
  };

  const prompt = function(error, questions, callback) {
    if (error) {
      return errorHandler(error);
    }

    inquirer.prompt(questions).then(callback).catch(errorHandler);
  };

  const done = function(error, message) {
    if (error) {
      return errorHandler(error);
    }
    
    message = message || 'Success!';
    console.log(chalk.green(message));    
  };

  program.debug(`Running '${args.template}' generator with options`, args);
  program.debug(`Using directory: ${args.root}`);

  generator(prompt, done, args);
}