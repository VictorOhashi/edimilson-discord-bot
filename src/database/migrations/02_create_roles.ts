import { Knex } from 'knex';
import { GUILDS_TABLE } from './00_create_guilds';

export const ROLES_TABLE = 'roles';

export async function up(knex: Knex) {
  return knex.schema.createTable(ROLES_TABLE, (table) => {
    table.string('id').primary().notNullable();
    table.string('name').notNullable();
    table.integer('permission').defaultTo(0);
    table
      .string('guild_id')
      .notNullable()
      .references('id')
      .inTable(GUILDS_TABLE)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ROLES_TABLE);
}
