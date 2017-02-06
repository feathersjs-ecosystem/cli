import { expect } from 'chai';
import version from '../../src/commands/version';
import program from 'commander';

describe('command:version', () => {
  it('registers the command', () => {
    version(program);

    const command = program.commands
      .filter(c => c.name() === 'version')
      .reduce(c => !!c);

    expect(command).to.not.equal(undefined);
  });
});
