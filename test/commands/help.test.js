import { expect } from 'chai';
import help from '../../src/commands/help';
import program from 'commander';

describe('command:help', () => {
  it('registers the command', () => {
    help(program);

    const command = program.commands
      .filter(c => c.name() === 'help')
      .reduce(c => !!c);

    expect(command).to.not.equal(undefined);
  });
});
