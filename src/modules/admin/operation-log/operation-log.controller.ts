import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OperationLogService } from './operation-log.service';
import { CreateOperationLogDto } from './dto/create-operation-log.dto';

@Controller('operation-logs')
export class OperationLogController {
  constructor(private readonly operationLogService: OperationLogService) {}

  // @Post()
  // create(@Body() createOperationLogDto: CreateOperationLogDto) {
  //   return this.operationLogService.create(createOperationLogDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.operationLogService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.operationLogService.findOne(+id);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.operationLogService.remove(+id);
  // }
}
