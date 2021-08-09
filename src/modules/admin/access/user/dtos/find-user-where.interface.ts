import { UserStatus } from '@admin/access/user/user-status.enum';

export class FindUserWhereInterface {
  id?: number | { in: number[] };
  name?: string;
  status?: UserStatus;
}
