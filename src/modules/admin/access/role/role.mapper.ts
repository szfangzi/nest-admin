// import { PermissionMapper } from '../permissions/permission.mapper';
// import { RoleMapper } from '../roles/role.mapper';
import { RoleResponseDto } from './dtos/index';
import {
  User as UserModel,
  Role as RoleModel,
  Permission as PermissionModel,
} from '@prisma/client';
import { UserMapper } from '../user/user.mapper';
import { PermissionMapper } from '../permission/permission.mapper';
import { Logger } from '@nestjs/common';
import { RoleModelWithRelations } from './dtos/role-model-with-relations.type';

export class RoleMapper {
  static toDto(role: RoleModel): RoleResponseDto {
    const dto = new RoleResponseDto();
    dto.id = role.id;
    dto.name = role.name;
    return dto;
  }

  static toDtoWithRelations(role: RoleModelWithRelations): RoleResponseDto {
    const dto = new RoleResponseDto();
    dto.id = role.id;
    dto.name = role.name;
    if (role.users) dto.users = role.users.map(UserMapper.toDto);
    if (role.permissions)
      dto.permissions = role.permissions.map(
        PermissionMapper.toDtoWithRelations,
      );
    return dto;
  }

  // static toCreateEntity(dtos: CreateUserRequestDto): UserEntity {
  //   const entity = new UserEntity();
  //   entity.username = dtos.username;
  //   entity.firstName = dtos.firstName;
  //   entity.lastName = dtos.lastName;
  //   entity.password = dtos.password;
  //   entity.permissions = Promise.resolve(dtos.permissions.map(id => new PermissionEntity({ id })));
  //   entity.roles = Promise.resolve(dtos.roles.map(id => new RoleEntity({ id })));
  //   entity.status = UserStatus.Active;
  //   entity.isSuperUser = false;
  //   return entity;
  // }
  //
  // static toUpdateEntity(
  //   entity: UserEntity,
  //   dtos: UpdateUserRequestDto
  // ): UserEntity {
  //   entity.username = dtos.username;
  //   entity.firstName = dtos.firstName;
  //   entity.lastName = dtos.lastName;
  //   entity.permissions = Promise.resolve(dtos.permissions.map(id => new PermissionEntity({ id })));
  //   entity.roles = Promise.resolve(dtos.roles.map(id => new RoleEntity({ id })));
  //   entity.status = dtos.status;
  //   return entity;
  // }
}
