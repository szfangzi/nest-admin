// import { PermissionMapper } from '../permissions/permission.mapper';
// import { RoleMapper } from '../roles/role.mapper';
import { UserModelWithRelations, UserResponseDto } from './dtos';
import { UserStatus } from './user-status.enum';
import { User as UserModel } from '@prisma/client';
import { RoleMapper } from '../role/role.mapper';

export class UserMapper {
  static toDto(user: UserModel): UserResponseDto {
    const dto = new UserResponseDto();

    dto.id = user.id;
    dto.name = user.name;
    dto.isSuper = user.isSuper;
    dto.status = user.status as UserStatus;
    return dto;
  }

  static toDtoWithRoles(user: UserModelWithRelations): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.name = user.name;
    dto.isSuper = user.isSuper;
    if (user.roles) dto.roles = user.roles.map(RoleMapper.toDto);
    dto.status = user.status as UserStatus;
    return dto;
  }

  static toDtoWithRelations(
    user: UserModelWithRelations,
  ): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.name = user.name;
    dto.isSuper = user.isSuper;
    if (user.roles) dto.roles = user.roles.map(RoleMapper.toDtoWithRelations);
    dto.status = user.status as UserStatus;
    return dto;
  }
  //
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
