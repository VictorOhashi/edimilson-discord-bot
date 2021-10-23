import * as dotenv from 'dotenv';
dotenv.config();

import { Client as DiscordClient, Intents } from 'discord.js';
import { IDiscordClient } from './src/types';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/rest/v9';
import commands from './src/commands';
import InteractionException from './src/exceptions/InteractionException';

const client = new DiscordClient({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
}) as IDiscordClient;

client.commands = commands.commandsCollection;

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN ?? '');

rest
  .put(
    Routes.applicationGuildCommands('627266195208273920', '598308629468413953'),
    { body: commands.commands },
  )
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    if (command.hasSubCommands) {
      const subCommandName = interaction.options.getSubcommand();

      const subCommand = command.subCommands?.get(subCommandName);
      if (subCommand) {
        await subCommand(interaction);
      }
    } else {
      await command.execute(interaction);
    }
  } catch (error) {
    console.error(error);

    if (error instanceof InteractionException) {
      await interaction.reply({
        content: error.message,
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.BOT_TOKEN);
