import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { ConfigService } from '@nestjs/config';
import { TimeLoggerInterceptor } from '../../src/interceptors/time-logger.interceptor';
import { HttpExceptionsFilter } from '@exceptions/http-exceptions.filter';
import { ErrorType } from '@exceptions/index';
import { configSession } from '@config/index';

describe('AuthController (e2e)', () => {
  let app: INestApplication, prefix: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const configService = app.get(ConfigService);
    prefix = configService.get<string>('API_PREFIX');

    app.setGlobalPrefix(prefix);

    // 全局API入参校验
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true, // 入参自动类型转换
      }),
    );

    // 全局API result mapper
    app.useGlobalInterceptors(new TimeLoggerInterceptor());

    // 全局异常处理
    app.useGlobalFilters(new HttpExceptionsFilter());
    configSession(app);
    await app.init();
  });

  it('test login', async (done) => {
    const agent = request(app.getHttpServer());
    const loginRes = await agent
      .post(`${prefix}/auth/public/login`)
      .send({ name: 'admin', password: '888888' });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.user).toBeDefined();
    expect(loginRes.body.access).toBeDefined();
    expect(loginRes.body.roles).toBeDefined();
    done();
  });

  it('test disabled user login', async (done) => {
    const agent = request(app.getHttpServer());
    const loginRes = await agent
      .post(`${prefix}/auth/public/login`)
      .send({ name: 'testDisabled', password: '888888' });
    expect(loginRes.statusCode).toBe(401);
    expect(loginRes.body.errorType).toBe(ErrorType.DisabledUser);
    done();
  });
});
