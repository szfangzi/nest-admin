import { PrismaClient, Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../src/services/prisma.service';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

const prisma = new PrismaClient();

async function main() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);
  const prefix = configService.get<string>('API_PREFIX');
  const server = app.getHttpServer();
  const router = server._events.request._router;
  const availableRoutes: [] = router.stack
    .map((layer) => {
      if (layer.route) {
        return {
          path: layer.route?.path,
          method: layer.route?.stack[0].method,
        };
      }
    })
    .filter((item) => {
      return (
        item !== undefined &&
        item.path.includes(prefix) &&
        !item.path.includes('/public/')
      );
    })
    .map((item) => {
      return {
        path: item.path.split(prefix)[1],
        method: item.method.toUpperCase(),
      };
    });

  for (let i = 0; i < availableRoutes.length; i++) {
    const route = availableRoutes[i];
    const operation = await prismaService.operation.findFirst({
      where: route,
    });
    if (!operation) {
      await prismaService.operation.create({
        data: route,
      });
      Logger.verbose(
        '有新接口更新到operation表！',
        'Data.helper init operations',
      );
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
