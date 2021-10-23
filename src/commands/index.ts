import { sync } from 'glob';
import path from 'path';

import { Collection } from 'discord.js';

import { Command } from '../types/Command';
import { ICommand } from '../types/CommandBase';

const commands = sync(path.join(__dirname, './*.command.ts'))
  .map((file) => {
    const commandFile = require(file).default;

    if (!commandFile) return;

    const command = new commandFile();
    if (command instanceof Command) {
      return command.command;
    }
  })
  .filter(Boolean) as ICommand[];

const commandsCollection = new Collection<string, ICommand>();

for (const command of commands) {
  if (command) {
    commandsCollection.set(command.data.name, command);
  }
}

export default {
  commandsCollection,
  commands: commands.map((c) => c.data.toJSON()),
};
