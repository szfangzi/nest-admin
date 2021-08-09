import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  Session,
} from '@nestjs/common';
import { AuthCredentialsRequestDto } from '../dtos';
import { ContextId, ContextIdFactory, ModuleRef, REQUEST } from '@nestjs/core';
import {
  DisabledUserException,
  ErrorType,
  InvalidAccountException,
  LoginExpiredException,
} from '@exceptions/index';
import { HashHelper } from '@helpers/hash.helper';
import { InvalidPasswordException } from '@exceptions/invalid-password.exception';
import { UserStatus } from '@admin/access/user/user-status.enum';
import { UserMapper } from '@admin/access/user/user.mapper';
import { UserModelWithRelations } from '@admin/access/user/dtos';
import { UserService } from '@admin/access/user/user.service';
import { PermissionMapper } from '@admin/access/permission/permission.mapper';
import { User as UserModel } from '@prisma/client';
import { UserInfoDto } from '@auth/dtos/user-info.dto';
import { AuthHelper } from '@auth/auth.helper';

@Injectable()
export class AuthService implements OnModuleInit {
  @Inject(REQUEST) request;
  private contextId: ContextId;
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    this.contextId = ContextIdFactory.create();
  }

  async login({
    name,
    password,
  }: AuthCredentialsRequestDto): Promise<UserInfoDto> {
    // 获取用户信息
    const user: UserModel = await this.moduleRef
      .get(UserService)
      .findOneByName(name);

    if (!user) throw new InvalidAccountException();

    // check name password validate
    await AuthHelper.validateUser(password, user);

    return await this.getUserInfo(user.id);
  }

  async getUserInfo(id: number): Promise<UserInfoDto> {
    const user: UserModelWithRelations = await this.moduleRef
      .get(UserService)
      .findUserWithRelations(id);

    if (!user) {
      throw new InvalidAccountException();
    }

    // user maybe have disabled status
    AuthHelper.validateUserStatus(user);

    // user model map to response dto
    const userDto = UserMapper.toDto(user);
    const { roles = [] } = UserMapper.toDtoWithRelations(user);
    const { routes, operations, pageElements } =
      PermissionMapper.toAccessResponseDto(roles);
    const mappedRoles = roles.map(({ id, name }) => ({ id, name }));

    const userInfo: UserInfoDto = {
      user: userDto,
      access: {
        routes,
        operations,
        pageElements,
      },
      roles: mappedRoles,
    };

    this.request.session.userInfo = userInfo;

    return userInfo;
  }
}
