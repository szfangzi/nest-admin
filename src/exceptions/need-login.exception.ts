import { UnauthorizedException } from '@nestjs/common';
import { ErrorType } from './';

export class NeedLoginException extends UnauthorizedException {
  constructor() {
    super({
      error: ErrorType.NeedLogin,
      message: '请登录！',
    });
  }
}
