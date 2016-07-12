import chalk from 'chalk';
import inquirer from 'inquirer';
import Generator from 'feathers-generator';

export default function(args) {
  const program = this;
  const generator = Generator(args);

  program.debug(`Running '${args.template}' generator with options`, args);
  program.debug(`Using directory: ${args.root}`);

  generator.getQuestions()
    .then(questions => {
      // Get user to answer questions
      return inquirer.prompt(questions);
    })
    .then(answers => {
      // Send answers back to generator
      return generator.generate(answers);
    })
    .then(message => {
      message = message || 'Success!';
      
      console.log(chalk.green(message));
    })
    .catch(error => {
      if (error) {
        console.log(chalk.red('ERROR', error));
      }

      process.exit(1);
    });
}