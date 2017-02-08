import yeoman from 'yeoman-environment';
import program from 'commander';
import meta from 'generator-feathers/meta';

const env = yeoman.createEnv();

const feathersGenerators = 'generator-feathers/generators';

env.register(require.resolve(`${feathersGenerators}/app`), 'feathers:app');
env.register(require.resolve(`${feathersGenerators}/authentication`), 'feathers:authentication');
env.register(require.resolve(`${feathersGenerators}/connection`), 'feathers:connection');
env.register(require.resolve(`${feathersGenerators}/hook`), 'feathers:hook');
env.register(require.resolve(`${feathersGenerators}/middleware`), 'feathers:middleware');
env.register(require.resolve(`${feathersGenerators}/service`), 'feathers:service');
env.register(require.resolve('generator-feathers-plugin'), 'feathers:plugin');

module.exports = function(argv, generatorOptions = {
  disableNotifyUpdate: true
}) {
  let description = 'Run a generator. Type can be\n';

  Object.keys(meta).forEach(name => {
    description += `\t• ${name} - ${meta[name]}\n`;
  });

  program.version(require('../package.json').version)
    .usage('generate [type]');

  program.command('generate [type]')
  .description(description)
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
