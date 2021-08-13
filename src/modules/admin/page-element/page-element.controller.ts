import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PageElementService } from './page-element.service';
import { CreatePageElementDto } from './dtos/create-page-element.dto';
import { UpdatePageElementDto } from './dtos/update-page-element.dto';

@Controller('page-elements')
export class PageElementController {
  constructor(private readonly menuService: PageElementService) {}

  // @Post()
  // create(@Body() createMenuDto: CreatePageElementDto) {
  //   return this.menuService.create(createMenuDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.menuService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.menuService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMenuDto: UpdatePageElementDto) {
  //   return this.menuService.update(+id, updateMenuDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.menuService.remove(+id);
  // }
}
