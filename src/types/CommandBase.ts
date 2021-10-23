import { SlashCommandBuilder } from '@discordjs/builders';
import { SharedSlashCommandOptions } from '@discordjs/builders/dist/interactions/slashCommands/mixins/CommandOptions';
import { SharedNameAndDescription } from '@discordjs/builders/dist/interactions/slashCommands/mixins/NameAndDescription';
import { CommandInteraction, Collection } from 'discord.js';

export enum ArgType {
  string,
  number,
}

export type Arg = {
  name: string;
  description: string;
  required?: boolean;
  type: ArgType;
};

export interface CommandBuilder
  extends SharedNameAndDescription,
    SharedSlashCommandOptions {}

export type ExecuteCommand = (interaction: CommandInteraction) => Promise<void>;

export type ICommand = {
  data: SlashCommandBuilder;
  subCommands?: Collection<string, Function>;
  hasSubCommands: boolean;
  execute: ExecuteCommand;
};

export abstract class CommandBase {
  abstract commandName: string;
  abstract commandDescription: string;

  abstract args?: Arg[];

  abstract run: ExecuteCommand;

  protected buildArgs(commandBuilder: CommandBuilder) {
    if (this.args) {
      this.args.forEach((arg) => {
        const handleOption = <T>(option: T | any): T =>
          option
            .setName(arg.name)
            .setDescription(arg.description)
            .setRequired(arg.required ?? false);

        switch (arg.type) {
          case ArgType.string:
            commandBuilder.addStringOption((o) => handleOption<typeof o>(o));
            break;
          case ArgType.number:
            commandBuilder.addNumberOption((o) => handleOption<typeof o>(o));
            break;
        }
      });
    }
  }
}
