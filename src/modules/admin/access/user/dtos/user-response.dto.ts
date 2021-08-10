import { RoleResponseDto } from '../../role/dtos';

export class UserResponseDto {
  id: number;
  name: string;
  roles?: RoleResponseDto[];
  isSuper: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export class UserWithAllFieldsResponseDto extends UserResponseDto {
  password: string;
}
