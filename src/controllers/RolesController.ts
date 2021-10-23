import { ColorResolvable, Guild } from 'discord.js';
import { RolesPermissions } from '../constants/permissions';
import RolesServices, {
  CreateOptions,
  UpdateOptions,
} from '../services/RolesServices';

export default class RolesController {
  rolesServices: RolesServices;

  guild: Guild;

  constructor(guild: Guild) {
    this.guild = guild;
    this.rolesServices = new RolesServices(guild);
  }

  async get(userId: string) {
    const userRoles = await this.rolesServices.get(userId);

    if (userRoles.length == 0) {
      return {
        roles: [],
        highestPermission: RolesPermissions.default,
      };
    }

    let highestPermission = RolesPermissions.default;
    userRoles.forEach((role) => {
      if (role.permission > highestPermission) {
        highestPermission = role.permission;
      }
    });

    return {
      roles: userRoles,
      highestPermission,
    };
  }

  async getById(roleId: string) {
    return await this.rolesServices.getById(roleId);
  }

  async create({ name, permission, roleConfig }: CreateOptions) {
    try {
      await this.rolesServices.create({ name, permission, roleConfig });
    } catch (error) {
      throw { message: 'Error when creating new role', error };
    }
  }

  async update({ id, name, permission, roleConfig }: UpdateOptions) {
    try {
      await this.rolesServices.update({ id, name, permission, roleConfig });
    } catch (error) {
      throw { message: `Error when updating role ${name}`, error };
    }
  }

  async createColorRole(userId: string, color?: ColorResolvable) {
    const actualColor = color ? color : 'RANDOM';

    const roleAlreadyExist = await this.getById(userId);

    try {
      const role = roleAlreadyExist
        ? await this.update({
            id: userId,
            name: userId,
            roleConfig: { color: actualColor },
          })
        : await this.create({
            name: userId,
            roleConfig: {
              color: actualColor,
              position: this.guild.roles.highest.position,
            },
          });
      return role;
    } catch (error) {
      throw { message: `Error when setting color role`, error };
    }
  }
}
