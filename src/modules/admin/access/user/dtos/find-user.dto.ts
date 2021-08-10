import { UserStatus } from '@admin/access/user/user-status.enum';

export class FindUserDto {
  id?: number | { in: number[] };
  name?: string;
  status?: UserStatus;
}
