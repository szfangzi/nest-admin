import { UnauthorizedException } from '@nestjs/common';
import { ErrorType } from './';

export class LoginExpiredException extends UnauthorizedException {
  constructor() {
    super({
      error: ErrorType.LoginExpired,
      message: '登录超时, 请重新登录！',
    });
  }
}
