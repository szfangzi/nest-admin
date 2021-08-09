import { Module } from '@nestjs/common';
import { UserService } from '@admin/access/user/user.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { CommonModule } from '@modules/common/common.module';
import { PrismaService } from '@modules/common/services';

@Module({
  imports: [CommonModule],
  controllers: [AuthController],
  providers: [UserService, AuthService, PrismaService],
})
export class AuthModule {}
