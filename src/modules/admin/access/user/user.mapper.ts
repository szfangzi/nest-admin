import { UserModelWithRelations, UserResponseDto } from './dtos';
import { UserStatus } from './user-status.enum';
import { User as UserModel } from '@prisma/client';
import { RoleMapper } from '../role/role.mapper';
import { UserModelWithRoles } from '@admin/access/user/dtos/user-model-with-relations.type';

export class UserMapper {
  static toDto(user: UserModel): UserResponseDto {
    const dto = new UserResponseDto();

    dto.id = user.id;
    dto.name = user.name;
    dto.isSuper = user.isSuper;
    dto.status = user.status as UserStatus;
    return dto;
  }

  static toDtoWithRoles(user: UserModelWithRoles): UserResponseDto {
    const dto = UserMapper.toDto(user);
    if (user.roles) dto.roles = user.roles.map(RoleMapper.toDto);
    return dto;
  }

  static toDtoWithRelations(user: UserModelWithRelations): UserResponseDto {
    const dto = UserMapper.toDto(user);
    if (user.roles) dto.roles = user.roles.map(RoleMapper.toDtoWithRelations);
    return dto;
  }
}
