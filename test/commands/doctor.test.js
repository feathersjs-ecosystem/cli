import { expect } from 'chai';
import doctor from '../../src/commands/doctor';
import program from 'commander';

describe('command:doctor', () => {
  it('registers the command', () => {
    doctor(program);

    const command = program.commands
      .filter(c => c.name() === 'doctor')
      .reduce(c => !!c);

    expect(command).to.not.equal(undefined);
  });
});
