import { RoleResponseDto } from '../../role/dtos';
import { Exclude } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '@admin/access/user/user-status.enum';

export class UserDto {
  id?: number;
  name?: string;
  @Exclude()
  password?: string;
  status?: string;
  isSuper?: boolean;
  roles?: RoleResponseDto[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(user: UserDto) {
    Object.assign(this, user);
  }
}
// export class UserWithAllFieldsResponseDto extends UserDto {
//   password: string;
// }
