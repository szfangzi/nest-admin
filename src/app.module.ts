import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@auth/auth.module';
import { AdminModule } from '@admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard, LocalGuard } from '@auth/guards/index';
import { AuthService } from '@auth/auth.service';
import { UserService } from '@admin/access/user/user.service';
import { PrismaService } from '@modules/common/services/index';
import { BusinessModule } from '@modules/business/business.module';
import { FileModule } from '@modules/file/file.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mime = require('mime');

const ENV = process.env.NODE_ENV;

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // dest: configService.get<string>('MULTER_DEST'),
        storage: diskStorage({
          destination: function (req, file, cb) {
            cb(null, configService.get<string>('MULTER_DEST'));
          },
          filename: function (req, file, cb) {
            console.log(mime.getExtension(file.mimetype), 'file');
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(
              null,
              `${file.fieldname}-${uniqueSuffix}.${mime.getExtension(
                file.mimetype,
              )}`,
            );
          },
        }),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    AdminModule,
    BusinessModule,
    FileModule,
  ],
  providers: [
    PrismaService,
    UserService,
    AuthService,
    // {
    //   provide: APP_GUARD, // 全局用户登录验证守卫
    //   useClass: LocalGuard,
    // },
    // {
    //   provide: APP_GUARD, // 全局权限验证守卫
    //   useClass: PermissionsGuard,
    // },
  ],
  exports: [ConfigModule, MulterModule],
})
export class AppModule {}
