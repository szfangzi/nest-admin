import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// const hardDeleteModelList: string[] = [];

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();

    // database logger middleware
    this.$use(async (params, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      Logger.verbose(
        `Query ${params.model}.${params.action} took ${after - before}ms`,
        'Prisma.service',
      );
      return result;
    });

    // database soft delete middleware
    // this.$use(async (params, next) => {
    //   // 非硬删的都默认软删
    //   if (!hardDeleteModelList.includes(params.model)) {
    //     const deletedAt = new Date();
    //     if (params.action == 'delete') {
    //       // Delete queries
    //       // Change action to an update
    //       params.action = 'update';
    //       params.args['data'] = { deletedAt };
    //     }
    //     if (params.action == 'deleteMany') {
    //       // Delete many queries
    //       params.action = 'updateMany';
    //       if (params.args.data != undefined) {
    //         params.args.data['deletedAt'] = deletedAt;
    //       } else {
    //         params.args['data'] = { deletedAt };
    //       }
    //     }
    //   }
    //   return next(params);
    // });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
