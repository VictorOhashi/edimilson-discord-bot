import { SlashCommandSubcommandBuilder } from '@discordjs/builders';
import { CommandBase } from './CommandBase';

export abstract class SubCommand extends CommandBase {
  buildCommand(builder: SlashCommandSubcommandBuilder) {
    let commandBuilder = builder
      .setName(this.commandName)
      .setDescription(this.commandDescription);

    this.buildArgs(commandBuilder);

    return commandBuilder;
  }
}
