import * as session from 'express-session';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const configSession = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const secret = configService.get<string>('SESSION_SECRET');
  const maxAge = Number(configService.get<number>('SESSION_MAX_AGE'));

  app.use(
    session({
      secret,
      resave: true,
      saveUninitialized: false,
      cookie: { maxAge },
    }),
  );
};
