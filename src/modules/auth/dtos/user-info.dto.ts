import { UserResponseDto } from '@admin/access/user/dtos';
import { AccessResponseDto } from './access-response.dto';

export class UserInfoDto {
  user: UserResponseDto;
  access: AccessResponseDto;
  roles: {
    id: number;
    name: string;
  }[];
}
