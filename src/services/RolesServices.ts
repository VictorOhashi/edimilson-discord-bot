import { Guild, Role, RoleData } from 'discord.js';
import { RolesPermissions } from '../constants/permissions';
import db from '../database/connection';
import { RolesTable } from '../models/RolesTable';

export type CreateOptions = {
  name: string;
  permission?: RolesPermissions;
  roleConfig?: RoleData;
};

export type UpdateOptions = {
  id: string;
} & CreateOptions;

export default class RolesServices {
  guild: Guild;

  constructor(guild: Guild) {
    this.guild = guild;
  }

  async get(userId: string) {
    const userRoles = await db<RolesTable>('roles')
      .where({ server_id: this.guild.id })
      .andWhere('users', 'like', `%${userId}%`);

    return userRoles;
  }

  async getById(userId: string) {
    const roles = await db<RolesTable>('roles').where({
      server_id: this.guild.id,
      id: userId,
    });

    return roles[0];
  }

  async create({ name, permission, roleConfig }: CreateOptions) {
    const trx = await db.transaction();

    let createdRole: Role | undefined;

    try {
      createdRole = await this.guild.roles.create({
        ...roleConfig,
        name,
      });

      await trx<RolesTable>('roles').insert({
        id: createdRole.id,
        server_id: this.guild.id,
        name: createdRole.name,
        permission,
      });

      await trx.commit();

      return createdRole;
    } catch (error) {
      await createdRole?.delete();
      await trx.rollback();
      throw { message: 'Error when creating new role', error };
    }
  }

  async update({ id, name, permission, roleConfig }: UpdateOptions) {
    const trx = await db.transaction();

    const role = await this.guild.roles.fetch(id);

    try {
      if (roleConfig) {
        await role!.edit(roleConfig);
      }

      if (permission) {
        await trx<RolesTable>('roles')
          .update({ name, permission })
          .where('id', id);
        await trx.commit();
      }

      return role;
    } catch (error) {
      await trx.rollback();
      throw { message: 'Error when updating role', error };
    }
  }
}
