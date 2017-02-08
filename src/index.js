import yeoman from 'yeoman-environment';
import program from 'commander';
import meta from 'generator-feathers/meta';

const env = yeoman.createEnv();

const feathersGenerators = 'generator-feathers/generators';

Object.keys(meta).forEach(name => {
  env.register(require.resolve(`${feathersGenerators}/${name}`), `feathers:${name}`);
});

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
