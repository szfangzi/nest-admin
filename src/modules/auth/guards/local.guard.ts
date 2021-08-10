import {
  Injectable,
  ExecutionContext,
  Logger,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import {
  DisabledUserException,
  ErrorType,
  HttpErrorType,
} from '@exceptions/index';
import { ModuleRef, Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { UserStatus } from '@admin/access/user/user-status.enum';
import { User as UserModel } from '@prisma/client';
import { UserService } from '@admin/access/user/user.service';
import { ConfigService } from '@nestjs/config';
import { GuardHelper } from '@auth/guards/guard.helper';
import { NeedLoginException } from '@exceptions/need-login.exception';
import { AuthHelper } from '@auth/auth.helper';

@Injectable()
export class LocalGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * 判断是否公共接口、超级管理员、token非空
   * @param context {ExecutionContext}
   * @returns super.canActivate(context)
   */
  async canActivate(context: ExecutionContext) {
    // 无需登录无需配置权限，直接通过
    if (GuardHelper.isPublic(context, this.reflector)) return true;
    // 根据session判断登录状态
    this.validateLoginStatus(context);
    // 根据status判断用户状态
    const user = context.switchToHttp().getRequest().session.userInfo;
    AuthHelper.validateUserStatus(user);
    // 全部校验通过
    return true;
  }

  validateLoginStatus(context: ExecutionContext) {
    if (!context.switchToHttp().getRequest().session.userInfo) {
      throw new NeedLoginException();
    }
  }
}
