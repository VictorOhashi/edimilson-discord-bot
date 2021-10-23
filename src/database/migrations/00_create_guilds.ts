import { Knex } from 'knex';

export const GUILDS_TABLE = 'guilds';

export async function up(knex: Knex) {
  return knex.schema.createTable(GUILDS_TABLE, (table) => {
    table.string('id').primary().notNullable();
    table.string('name').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(GUILDS_TABLE);
}
