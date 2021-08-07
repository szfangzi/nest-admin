import { UnauthorizedException } from '@nestjs/common';
import { ErrorType } from './';

export class InvalidPasswordException extends UnauthorizedException {
  constructor() {
    super({
      error: ErrorType.InvalidPassword,
      message: '密码错误！',
    });
  }
}
