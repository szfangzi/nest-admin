import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { configSwagger } from './config';
import { HttpExceptionsFilter } from './exceptions/';
import { configSession } from '@config/session.config';
import { DataHelper } from '@helpers/data.helper';
import { TimeLoggerInterceptor } from './interceptors/time-logger.interceptor';
import * as helmet from 'helmet';
import { OperationLogInterceptor } from './interceptors/operation-log.interceptor';
import { OperationLogService } from '@admin/operation-log/operation-log.service';
import { OperationService } from '@admin/operation/operation.service';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { readFileSync } from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync('/Users/fangzi/ssl/localhost+2-key.pem'),
    cert: readFileSync('/Users/fangzi/ssl/localhost+2.pem'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  const configService = app.get(ConfigService);
  const prefix = configService.get<string>('API_PREFIX');
  const port = configService.get<number>('API_PORT');

  app.setGlobalPrefix(prefix);

  // 全局API入参校验
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 入参自动类型转换
    }),
  );

  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new TimeLoggerInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
    new OperationLogInterceptor(
      new OperationLogService(),
      new OperationService(),
      new ConfigService(),
    ),
  );

  // 全局异常处理
  app.useGlobalFilters(new HttpExceptionsFilter());

  app.use(helmet());
  app.enableCors();

  configSwagger(app);
  configSession(app);
  await app.listen(port);

  // 根据路由，增量更新权限表(获取所有控制器，过滤掉swagger和路由带/public的)
  // DataHelper.initOperations(app);

  return port;
}
bootstrap().then((port: number) => {
  Logger.log(`Application running on port: ${port}`, 'Main');
});
