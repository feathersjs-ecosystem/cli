import pkg from '../../package.json';

export default function(vorpal, args, done) {
  done(null, `v${pkg.version}`);
}
