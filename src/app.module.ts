import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from '@admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard, LocalGuard } from '@auth/guards/index';
import { AuthService } from '@auth/services/auth.service';
import { UserService } from '@access/user/user.service';
import { PrismaService } from '@services/index';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    AdminModule,
  ],
  providers: [
    PrismaService,
    UserService,
    AuthService,
    {
      provide: APP_GUARD, // 全局用户登录验证守卫
      useClass: LocalGuard,
    },
    // {
    //   provide: APP_GUARD, // 全局权限验证守卫
    //   useClass: PermissionsGuard,
    // },
  ],
  exports: [ConfigModule, PrismaService, AuthService],
})
export class AppModule {}
