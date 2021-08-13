import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dtos/create-file.dto';
import { prisma } from '@helpers/index';
import { unlinkSync } from 'fs';
import { join } from 'path';
import { File as FileModel } from '@prisma/client';
import { DataNotFoundException } from '@exceptions/data-not-found.exception';

@Injectable()
export class FileService {
  async create(createFileDto: CreateFileDto) {
    return await prisma.file.create({
      data: createFileDto,
    });
  }

  async findOne(id: number) {
    return await prisma.file.findUnique({ where: { id } });
  }

  async remove(id: number) {
    const file: FileModel = await this.findOne(id);
    if (!file) throw new DataNotFoundException();
    let deletedFile: FileModel;
    try {
      deletedFile = await prisma.file.delete({ where: { id } });
      unlinkSync(join(process.cwd(), file.path));
    } catch (err) {
      throw err;
    }
    return deletedFile;
  }
}
