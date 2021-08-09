import * as request from 'supertest';
import { ErrorType, HttpErrorType } from '@exceptions/index';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
const env = process.env.NODE_ENV;
dotenv.config({
  path: path.resolve(process.cwd(), env ? '.env' : '.env.production'),
});
const baseUrl = process.env.API_BASE_URL;
const port = process.env.API_PORT;
const prefix = process.env.API_PREFIX;
const agent = request(`${baseUrl}:${port}${prefix}`);
describe('AuthController (e2e)', () => {
  it('test login', async (done) => {
    const loginRes = await agent
      .post(`/auth/public/login`)
      .send({ name: 'admin', password: '888888' });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.user).toBeDefined();
    expect(loginRes.body.access).toBeDefined();
    expect(loginRes.body.roles).toBeDefined();
    done();
  });

  it('test disabled user login', async (done) => {
    const loginRes = await agent
      .post(`/auth/public/login`)
      .send({ name: 'testDisabled', password: '888888' });
    expect(loginRes.statusCode).toBe(401);
    expect(loginRes.body.errorType).toBe(ErrorType.DisabledUser);
    done();
  });

  it('test login with wrong password', async (done) => {
    const loginRes = await agent
      .post(`/auth/public/login`)
      .send({ name: 'admin', password: '88888' });
    expect(loginRes.statusCode).toBe(401);
    expect(loginRes.body.errorType).toBe(ErrorType.InvalidPassword);
    done();
  });

  it('test login with undefined name', async (done) => {
    let loginRes = await agent
      .post(`/auth/public/login`)
      .send({ name: '', password: '888888' });
    expect(loginRes.statusCode).toBe(400);
    loginRes = await agent
      .post(`/auth/public/login`)
      .send({ name: 'admin', password: '' });
    expect(loginRes.statusCode).toBe(400);
    done();
  });

  it('get userInfo', async (done) => {
    const loginRes = await agent
      .post(`/auth/public/login`)
      .send({ name: 'admin', password: '888888' });
    expect(loginRes.statusCode).toBe(200);
    const cookies = loginRes.get('Set-Cookie');
    const userInfoRes = await agent
      .get(`/auth/userInfo`)
      .set('Cookie', cookies);
    expect(userInfoRes.statusCode).toBe(200);
    expect(userInfoRes.body.user).toBeDefined();
    expect(userInfoRes.body.roles).toBeDefined();
    expect(userInfoRes.body.access).toBeDefined();
    expect(userInfoRes.body.access.routes).toBeDefined();
    expect(userInfoRes.body.access.operations).toBeDefined();
    expect(userInfoRes.body.access.pageElements).toBeDefined();
    done();
  });
});
