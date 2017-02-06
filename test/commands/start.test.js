import { expect } from 'chai';
import start from '../../src/commands/start';
import program from 'commander';

describe('command:start', () => {
  it('registers the command', () => {
    start(program);

    const command = program.commands
      .filter(c => c.name() === 'start')
      .reduce(c => !!c);

    expect(command).to.not.equal(undefined);
  });
});
