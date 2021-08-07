import { UnauthorizedException } from '@nestjs/common';
import { ErrorType } from './';

export class DisabledUserException extends UnauthorizedException {
  constructor() {
    super({
      error: ErrorType.DisabledUser,
      message: `账号已被禁用，请与管理员联系启用账户！`,
    });
  }
}
