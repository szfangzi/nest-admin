import { Module } from '@nestjs/common';
import { UserService } from '@access/user/user.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '@services/prisma.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [UserService, AuthService, PrismaService],
  exports: [AuthService, PrismaService],
})
export class AuthModule {}
