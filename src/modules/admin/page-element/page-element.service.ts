import { Injectable } from '@nestjs/common';
import { CreatePageElementDto } from './dtos/create-page-element.dto';
import { UpdatePageElementDto } from './dtos/update-page-element.dto';
import {
  PaginationHelper,
  PaginationRequestDto,
  PaginationResponseDto,
} from '@helpers/pagination.helper';
import { prisma } from '@helpers/index';
import { DataNotFoundException } from '@exceptions/data-not-found.exception';
import { PageElementResponseDto } from '@admin/page-element/dtos/page-element-response.dto';
import { FindPageElementDto } from '@admin/page-element/dtos/find-page-element.dto';
import { PageElementMapper } from '@admin/page-element/page-element.mapper';

@Injectable()
export class PageElementService {
  async pagination(
    paginationRequestDto: PaginationRequestDto,
    findPageElementDto?: FindPageElementDto,
  ): Promise<PaginationResponseDto<PageElementResponseDto[]>> {
    const countParams = {
      where: {
        ...findPageElementDto,
        deletedAt: null,
      },
    };
    const totalRecords = await prisma.pageElement.count(countParams);
    const { skip, take, current, pageSize, totalPages, hasNext } =
      PaginationHelper.query(paginationRequestDto, totalRecords);
    const whereParams = Object.assign({ skip, take }, countParams);
    const modelResults = await prisma.pageElement.findMany(whereParams);
    const results = modelResults.map((pageElementModel) => {
      return PageElementMapper.toDto(pageElementModel);
    });
    return {
      current,
      pageSize,
      totalPages,
      totalRecords,
      hasNext,
      results,
    };
  }

  async create(
    createPageElementDto: CreatePageElementDto,
  ): Promise<PageElementResponseDto> {
    return prisma.pageElement.create({
      data: createPageElementDto,
      include: {
        permission: true,
      },
    });
  }

  async findAll(
    findPageElementDto?: FindPageElementDto,
  ): Promise<PageElementResponseDto[]> {
    return prisma.pageElement.findMany({
      where: {
        ...findPageElementDto,
        deletedAt: null,
      },
      include: {
        permission: true,
      },
    });
  }

  async findOne(id: number): Promise<PageElementResponseDto> {
    return prisma.pageElement.findUnique({
      where: { id },
      include: {
        permission: true,
      },
    });
  }

  async update(
    id: number,
    updateMenuDto: UpdatePageElementDto,
  ): Promise<PageElementResponseDto> {
    const menu = await prisma.pageElement.findUnique({
      where: { id },
    });
    if (!menu) throw new DataNotFoundException();
    return prisma.pageElement.update({
      where: { id },
      data: updateMenuDto,
    });
  }

  async updateMany(ids: number[], updateMenuDto: UpdatePageElementDto) {
    return prisma.pageElement.updateMany({
      where: { id: { in: ids } },
      data: updateMenuDto,
    });
  }
  //
  async remove(id: number): Promise<PageElementResponseDto> {
    const pageElement = await prisma.pageElement.findUnique({
      where: { id },
    });
    if (!pageElement) throw new DataNotFoundException();
    return prisma.pageElement.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async removeMany(ids: number[]) {
    return await prisma.pageElement.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
