import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@auth/decorators/public.decorator';

export class GuardHelper {
  static isPublic(context: ExecutionContext, reflector: Reflector): boolean {
    return reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}
