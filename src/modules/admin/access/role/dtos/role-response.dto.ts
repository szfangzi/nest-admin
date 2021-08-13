import { UserDto } from '../../user/dtos';
import { PermissionResponseDto } from '../../permission/dtos';

export class RoleResponseDto {
  id: number;
  name: string;
  users?: UserDto[];
  permissions?: PermissionResponseDto[];
}
