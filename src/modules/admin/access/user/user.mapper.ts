import { UserDto, UserModelWithRelations } from './dtos';
import { User as UserModel } from '@prisma/client';
import { RoleMapper } from '../role/role.mapper';

export class UserMapper {
  static toDto(user: UserModel): UserDto {
    return new UserDto(user);
  }

  static toDtoWithRoles(user: UserModelWithRelations): UserDto {
    const dto = UserMapper.toDto(user);
    if (user.roles) dto.roles = user.roles.map(RoleMapper.toDto);
    return dto;
  }

  static toDtoWithRelations(user: UserModelWithRelations): UserDto {
    const dto = UserMapper.toDto(user);
    if (user.roles) dto.roles = user.roles.map(RoleMapper.toDtoWithRelations);
    return dto;
  }
}
