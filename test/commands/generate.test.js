import { expect } from 'chai';
import generate from '../../src/commands/generate';
import program from 'commander';

describe('command:generate', () => {
  let command;

  before(() => {
    generate(program);
    command = program.commands
      .filter(c => c.name() === 'generate')
      .reduce(c => !!c);
  });

  it('registers the command', () => {
    expect(command).to.not.equal(undefined);
  });

  it('has force option', () => {
    const option = command.options
      .filter(o => o.long === '--force')
      .reduce(o => !!o);

    expect(option).to.not.equal(undefined);
  });

  it('has a path option', () => {
    const option = command.options
      .filter(o => o.long === '--path')
      .reduce(o => !!o);

    expect(option).to.not.equal(undefined);
  });
});
