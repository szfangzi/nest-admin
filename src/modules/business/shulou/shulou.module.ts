import { Module } from '@nestjs/common';
import { ShulouService } from './shulou.service';
import { ShulouController } from './shulou.controller';

@Module({
  controllers: [ShulouController],
  providers: [ShulouService],
})
export class ShulouModule {}
