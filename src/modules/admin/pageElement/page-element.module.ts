import { Module } from '@nestjs/common';
import { PageElementService } from './page-element.service';
import { PageElementController } from './page-element.controller';

@Module({
  controllers: [PageElementController],
  providers: [PageElementService]
})
export class PageElementModule {}
