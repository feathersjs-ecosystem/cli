import { expect } from 'chai';
import update from '../../src/commands/update';
import program from 'commander';

describe('command:update', () => {
  it('registers the command', () => {
    update(program);

    const command = program.commands
      .filter(c => c.name() === 'update')
      .reduce(c => !!c);

    expect(command).to.not.equal(undefined);
  });
});
