import { UserDto } from '@admin/access/user/dtos';
import { AccessResponseDto } from './access-response.dto';

export class UserInfoDto {
  user: UserDto;
  access: AccessResponseDto;
  roles: {
    id: number;
    name: string;
  }[];

  constructor(partial: Partial<UserInfoDto>) {
    Object.assign(this, partial);
  }
}
