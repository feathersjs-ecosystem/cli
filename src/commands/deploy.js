/*
 * Deploy your Feathers server
 */

/*
const providers = [
  'heroku'
];
*/

 export default function(vorpal) {
  const chalk = vorpal.chalk;

  vorpal
    .command('deploy', 'Deploy your Feathers app')
    .action((/*args, callback*/) => {
        // TODO (EK):
        // 1. Prompt for provider
        // 2. Generate copy appropriate template files (ie. Procfile, app.json)
        // 3. Update production.json for appropriate ENV VARS

        this.log();
        this.log(chalk.red('Deployment is not available yet.'));
    });
 }
