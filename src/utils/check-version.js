import packageConfig from '../../package.json';

export default function(vorpal, args, done) {
  vorpal.log(`Current Version: v${packageConfig.version}`);
  vorpal.log();
  done();
}
