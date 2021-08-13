import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../modules/common/services/prisma.service';
import { Logger } from '@nestjs/common';

export class DataHelper {
  static initOperations(app: INestApplication) {
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
    console.log(availableRoutes, 'availableRoutes');
    availableRoutes.forEach(async (route) => {
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
    });
  }
}
