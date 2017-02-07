import yeoman from 'yeoman-environment';
import program from 'commander';

const env = yeoman.createEnv();

const feathersGenerators = 'generator-feathers/generators';

env.register(require.resolve(`${feathersGenerators}/app`), 'feathers:app');
env.register(require.resolve(`${feathersGenerators}/authentication`), 'feathers:authentication');
env.register(require.resolve(`${feathersGenerators}/connection`), 'feathers:connection');
env.register(require.resolve(`${feathersGenerators}/hook`), 'feathers:hook');
env.register(require.resolve(`${feathersGenerators}/middleware`), 'feathers:middleware');
env.register(require.resolve(`${feathersGenerators}/secret`), 'feathers:secret');
env.register(require.resolve(`${feathersGenerators}/service`), 'feathers:service');
env.register(require.resolve('generator-feathers-plugin'), 'feathers:plugin');

module.exports = function(argv, generatorOptions = {
  disableNotifyUpdate: true
}) {
  program.version(require('../package.json').version)
    .usage('generate [type]');

  program.command('generate [type]')
  .alias('g')
  .description(`Run a generator. Type can be
  • app - Create a new Feathers application in the current folder
  • authentication - Set up authentication for the current application
  • connection - Initialize a new database connection
  • hook - Create a new hook
  • middleware - Create an Express middleware
  • plugin - Create a new Feathers plugin
  • secret - Generate a new authentication secret
  • service - Generate a new service
`)
  .action(type => {
    if (!type) {
      program.help();
    } else {
      env.run(`feathers:${type}`, generatorOptions);
    }
  });

  program.command('*').action(() => program.help());
  program.parse(argv);

  if (argv.length === 2) {
    program.help();
  }
};
