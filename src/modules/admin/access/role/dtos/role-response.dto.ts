import { UserResponseDto } from '../../user/dtos';
import { PermissionDto } from '../../permission/dtos';

export class RoleResponseDto {
  id: number;
  name: string;
  users?: UserResponseDto[];
  permissions?: PermissionDto[];
}
