import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@auth/auth.module';
import { AdminModule } from '@admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard, LocalGuard } from '@auth/guards/index';
import { AuthService } from '@auth/services/auth.service';
import { UserService } from '@admin/access/user/user.service';
import { PrismaService } from '@modules/common/services/index';
import { CommonModule } from '@modules/common/common.module';

const ENV = process.env.NODE_ENV;

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    AuthModule,
    AdminModule,
    CommonModule,
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
  exports: [ConfigModule, CommonModule],
})
export class AppModule {}
