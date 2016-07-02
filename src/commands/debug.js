/*
 * Interactive REPL with your app mounted 
 * as an available variable.
 */

 export default function(vorpal) {
  const chalk = vorpal.chalk;

  // vorpal
  //   .mode('debug')
  //   .description('Enters the user into a REPL session.')
  //   .delimiter('$feathers:debug:')
  //   .action(function(command, callback) {
  //     this.log(eval(command));
  //   });

  vorpal
    .command('debug', 'Drop into an interactive REPL with your app as the context')
    .action((args, callback) => {
        // TODO (EK):
        // 1. Look at using Vantage https://github.com/dthree/vantage

        this.log();
        this.log(chalk.red('Live debugging is not available yet.'));
    });
 }