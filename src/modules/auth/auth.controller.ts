import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Req,
  Session,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthCredentialsRequestDto } from './dtos';
import { Public } from './decorators/public.decorator';
import { UserInfoDto } from '@auth/dtos/user-info.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/public/login') // 方便DataHelper.initOperations过滤掉不需要创建权限的路由
  @HttpCode(200)
  async login(
    @Req() request: Request,
    @Body() authCredentialsDto: AuthCredentialsRequestDto,
  ): Promise<UserInfoDto> {
    return await this.authService.login(authCredentialsDto);
  }

  @Get('/userInfo')
  @HttpCode(200)
  async getUserInfo(@Session() session): Promise<UserInfoDto> {
    return this.authService.getUserInfo(session.userInfo.user.id);
  }

  @Public()
  @Get('/public/logout')
  async logout(@Session() session, @Res() response: Response) {
    session.destroy(null);
    response.clearCookie('connect.sid');
    return response.status(200).send();
  }
}
