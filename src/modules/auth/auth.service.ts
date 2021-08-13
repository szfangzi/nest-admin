import { Inject, Injectable } from '@nestjs/common';
import { AuthCredentialsRequestDto } from './dtos';
import { ModuleRef, REQUEST } from '@nestjs/core';
import { InvalidAccountException } from '@exceptions/index';
import { UserMapper } from '@admin/access/user/user.mapper';
import { UserDto, UserModelWithRelations } from '@admin/access/user/dtos';
import { UserService } from '@admin/access/user/user.service';
import { PermissionMapper } from '@admin/access/permission/permission.mapper';
import { User as UserModel } from '@prisma/client';
import { UserInfoDto } from '@auth/dtos/user-info.dto';
import { AuthHelper } from '@auth/auth.helper';

@Injectable()
export class AuthService {
  @Inject(REQUEST) request;
  constructor(private moduleRef: ModuleRef) {}

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

    // user model map to response dtos
    // const userDto = UserMapper.toDto(user);
    const userDto = new UserDto(user);
    const { roles = [] } = UserMapper.toDtoWithRelations(user);
    const { routes, operations, pageElements } =
      PermissionMapper.toAccessResponseDto(roles);
    const mappedRoles = roles.map(({ id, name }) => ({ id, name }));

    const userInfo: UserInfoDto = new UserInfoDto({
      user: userDto,
      access: {
        routes,
        operations,
        pageElements,
      },
      roles: mappedRoles,
    });
    this.request.session.userInfo = userInfo;
    return userInfo;
  }
}
