import { Module } from '@nestjs/common';
import { PrismaService } from '@modules/common/services/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CommonModule {}
