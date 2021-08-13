import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShulouService } from './shulou.service';
import { CreateShulouDto } from './dto/create-shulou.dto';
import { UpdateShulouDto } from './dto/update-shulou.dto';

@Controller('shulou')
export class ShulouController {
  constructor(private readonly shulouService: ShulouService) {}

  @Post()
  create(@Body() createShulouDto: CreateShulouDto) {
    return this.shulouService.create(createShulouDto);
  }

  @Get()
  findAll() {
    return this.shulouService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shulouService.findOne(+id);
  }

  // 取证
  @Patch('ajQz/:id')
  ajQz(@Param('id') id: string, @Body() updateShulouDto: UpdateShulouDto) {
    return this.shulouService.update(+id, updateShulouDto);
  }

  // 注销抵押
  @Patch('ajZxdy/:id')
  ajZxdy(@Param('id') id: string, @Body() updateShulouDto: UpdateShulouDto) {
    return this.shulouService.update(+id, updateShulouDto);
  }

  // 抵押
  @Patch('ajDy/:id')
  ajDy(@Param('id') id: string, @Body() updateShulouDto: UpdateShulouDto) {
    return this.shulouService.update(+id, updateShulouDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shulouService.remove(+id);
  }
}
