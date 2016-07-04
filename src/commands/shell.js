/*
 * Drop into an interactive shell
 */

const providers = [
  'heroku'
];

 export default function(vorpal) {
  const chalk = vorpal.chalk;

  vorpal
    .command('shell', 'Drop into an interactive shell')
    .action((args, callback) => {
        vorpal.log(`
      ######## ########    ###    ######## ##     ## ######## ########   ######  
      ##       ##         ## ##      ##    ##     ## ##       ##     ## ##    ## 
      ##       ##        ##   ##     ##    ##     ## ##       ##     ## ##       
      ######   ######   ##     ##    ##    ######### ######   ########   ######  
      ##       ##       #########    ##    ##     ## ##       ##   ##         ## 
      ##       ##       ##     ##    ##    ##     ## ##       ##    ##  ##    ## 
      ##       ######## ##     ##    ##    ##     ## ######## ##     ##  ######
        `);

        vorpal.log(`  Welcome to the Feathers interactive shell.`);
        vorpal.log(`  Type ${chalk.bold("'exit'")} to quit, ${chalk.bold("'help'")} for a list of commands.`);

        vorpal
          .delimiter('feathers$')
          .show();

        callback();
    });
 }