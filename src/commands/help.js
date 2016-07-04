/*
 * Display help
 */

export default function(program) {
  // TODO (EK): Handle help
  
  // program.help(() => {
  //   console.log('custom help');
  // }, '-a, --alp')
  
  // program.on('--help', function(){
  //   console.log('  Examples:');
  //   console.log('');
  //   console.log('    $ custom-help --help');
  //   console.log('    $ custom-help -h');
  //   console.log('');
  // });

  program
    .command('help')
    .description('display help menu')
    .action(() => {
      program.help();
    });
}
