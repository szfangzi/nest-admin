import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dtos/create-file.dto';
import { UpdateFileDto } from './dtos/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { Public } from '@auth/decorators/public.decorator';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const createFileDto = new CreateFileDto();
    createFileDto.name = file.filename;
    createFileDto.mimetype = file.mimetype;
    createFileDto.path = file.path;
    return await this.fileService.create(createFileDto);
  }

  @Public()
  @Get('download/:id')
  async downloadFile(@Param('id') id: number, @Res() res: Response) {
    const file = await this.fileService.findOne(id);
    res.setHeader('content-type', 'image/jpeg');
    // res.setHeader('Content-Disposition', 'attachment; filename=a1.jpg');
    const responseFile = createReadStream(join(process.cwd(), file.path));
    responseFile.pipe(res);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.fileService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.fileService.remove(id);
  }
}
