import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ConfigService } from '@nestjs/config';
import { match } from 'node-match-path';
import { UserInfoDto } from "@auth/dtos/user-info.dto";
import { GuardHelper } from "@auth/guards/guard.helper";

const urlWhiteList = ['/e2e/userInfo', '/e2e/refreshToken'];

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 无需登录无需配置权限，直接通过
    if (GuardHelper.isPublic(context, this.reflector)) return true;
    const url = this.getOperationUrl(context);
    if (this.isUrlWhiteList(url)) return true;
    const userInfo = context.switchToHttp().getRequest().userInfo;
    if (userInfo.user.isSuper) return true;
    const isMatch = this.matchPermissions(url, userInfo, context);
    console.log(isMatch, 'isMatch');
    if (!isMatch) throw new ForbiddenException('没有权限！');
    return true;
  }

  matchPermissions(
    url: string,
    user: UserInfoDto,
    context: ExecutionContext,
  ): boolean {
    if (!user) return false;
    const method = context.switchToHttp().getRequest().method;
    const operations = user.access.operations;
    return operations.some(
      (operation) =>
        operation.method === method && match(operation.path, url).matches,
    );
  }

  getOperationUrl(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();
    const API_PREFIX = this.configService.get<string>('API_PREFIX');
    return request.path.split(API_PREFIX)[1];
  }

  isUrlWhiteList(url) {
    return urlWhiteList.includes(url);
  }

  isPublic(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}
