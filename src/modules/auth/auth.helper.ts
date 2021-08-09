import { User as UserModel } from '@prisma/client';
import { HashHelper } from '@helpers/hash.helper';
import { InvalidPasswordException } from '@exceptions/invalid-password.exception';
import { UserStatus } from '@admin/access/user/user-status.enum';
import { DisabledUserException } from '@exceptions/disabled-user.exception';

export class AuthHelper {
  static async validateUser(password, user: UserModel) {
    const passwordMatch = await HashHelper.compare(password, user.password);
    if (!passwordMatch) {
      throw new InvalidPasswordException();
    }
  }

  static validateUserStatus(user) {
    if (user.status === UserStatus.Disabled) {
      throw new DisabledUserException();
    }
  }
}
