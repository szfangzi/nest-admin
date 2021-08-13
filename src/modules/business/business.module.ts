import { Module } from '@nestjs/common';
import { ShulouModule } from '@modules/business/shulou/shulou.module';

@Module({
  imports: [ShulouModule],
})
export class BusinessModule {}
