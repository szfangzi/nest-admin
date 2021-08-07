import { UnauthorizedException } from '@nestjs/common';
import { ErrorType } from './';

export class InvalidAccountException extends UnauthorizedException {
  constructor() {
    super({
      error: ErrorType.InvalidAccount,
      message: `账户不存在，请输入正确的账号！`,
    });
  }
}
