import { UserStatus } from '../user-status.enum';
import { RoleResponseDto } from '../../role/dtos';

export class UserResponseDto {
  id: number;
  name: string;
  roles?: RoleResponseDto[];
  isSuper: boolean;
  status: UserStatus;
}
