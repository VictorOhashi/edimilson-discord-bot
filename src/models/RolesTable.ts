import { RolesPermissions } from '../constants/permissions';

export type RolesTable = {
  id: string;
  server_id: string;
  name: string;
  permission: RolesPermissions;
  users: Array<string>;
};
