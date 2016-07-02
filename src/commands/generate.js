/*
 * Generate things like apps, services,
 * hooks, middleware, models, tests and filters.
 */

// import generators from 'feathers-generator';

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
  vorpal
    .command('generate [module] [name]', `Allows you to automatically generate a:
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
    .autocomplete(autocompletes)
    // .help(function(args) {
    //   // TODO (EK): Add more descriptive help
    // })
    .action(function (args, callback) {
      // TODO (EK): Check for args to see which type of generator we are going to call
      // 1. look up generator
      // 2. Read in existing config
      // 3. Read in generator meta.json
      // 4. Prompt user accordingly
      // 5. Copy template files with answers
      // 6. re-write existing config, package.json and feathers.json files
      // 7. install npm modules
      this.log();

      this.log('Running generator', args);

      callback();
    });
}
