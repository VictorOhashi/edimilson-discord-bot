import { Knex } from 'knex';
import { USERS_TABLE } from './01_create_users';
import { ROLES_TABLE } from './02_create_roles';

export const USERS_ROLES_TABLE = 'users_roles';

export async function up(knex: Knex) {
  return knex.schema.createTable(USERS_ROLES_TABLE, (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable(USERS_TABLE);
    table
      .integer('role_id')
      .references('id')
      .inTable(ROLES_TABLE)
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(USERS_ROLES_TABLE);
}
