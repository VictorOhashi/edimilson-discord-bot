import { Client, Collection } from 'discord.js';
import { ICommand } from './CommandBase';

export type Constructable<T> = new (...args: any[]) => T;

export interface IDiscordClient extends Client {
  commands: Collection<string, ICommand>;
}
