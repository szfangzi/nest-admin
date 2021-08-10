import { Module } from '@nestjs/common';
import { UserService } from '@admin/access/user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [UserService, AuthService],
})
export class AuthModule {}
