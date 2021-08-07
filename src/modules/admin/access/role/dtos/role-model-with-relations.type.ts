import {
  Permission as PermissionModel,
  User as UserModel,
  Role as RoleModel,
} from '@prisma/client';

export type RoleModelWithRelations = RoleModel & {
  permissions: PermissionModel[];
  users: UserModel[];
};
