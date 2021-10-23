import { SlashCommandBuilder } from '@discordjs/builders';
import { Collection } from 'discord.js';

import { CommandBase, ExecuteCommand, ICommand } from './CommandBase';
import { SubCommand } from './SubCommand';

export abstract class Command extends CommandBase {
  subCommands?: SubCommand[];

  private buildCommand() {
    const commandBuilder = new SlashCommandBuilder()
      .setName(this.commandName)
      .setDescription(this.commandDescription);

    if (!this.subCommands || this.subCommands.length == 0) {
      this.buildArgs(commandBuilder);
    }

    return commandBuilder;
  }

  private get commandBuilder(): SlashCommandBuilder {
    const commandBuilder = this.buildCommand();

    if (this.subCommands) {
      this.subCommands.forEach((subCommand) => {
        if (subCommand instanceof SubCommand) {
          commandBuilder.addSubcommand((b) => subCommand.buildCommand(b));
        }
      });
    }

    return commandBuilder;
  }

  get command(): ICommand {
    const subCommands = new Collection<string, ExecuteCommand>();
    this.subCommands?.forEach((subCommand) => {
      subCommands.set(subCommand.commandName, subCommand.run);
    });

    return {
      data: this.commandBuilder,
      execute: this.run,
      subCommands,
      hasSubCommands: Boolean(this.subCommands && this.subCommands.length > 0),
    };
  }
}
