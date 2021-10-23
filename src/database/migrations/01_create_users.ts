import { Knex } from 'knex';

export const USERS_TABLE = 'users';

export async function up(knex: Knex) {
  return knex.schema.createTable(USERS_TABLE, (table) => {
    table.string('id').primary().notNullable();
    table.string('name').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(USERS_TABLE);
}
