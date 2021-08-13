import { Injectable } from '@nestjs/common';
import { CreateMenuDto, UpdateMenuDto } from '@admin/menu/dtos';
import { PaginationHelper, prisma } from '@helpers/index';
import { MenuMapper } from '@admin/menu/menu.mapper';
import { MenuResponseDto } from '@admin/menu/dtos';
import {
  PaginationRequestDto,
  PaginationResponseDto,
} from '@helpers/pagination.helper';
import { FindMenuDto } from '@admin/menu/dtos/find-menu.dto';
import { DataNotFoundException } from '@exceptions/data-not-found.exception';

@Injectable()
export class MenuService {
  async pagination(
    paginationRequestDto: PaginationRequestDto,
    findMenuDto?: FindMenuDto,
  ): Promise<PaginationResponseDto<MenuResponseDto[]>> {
    const countParams = {
      where: {
        ...findMenuDto,
        deletedAt: null,
      },
    };
    const totalRecords = await prisma.menu.count(countParams);
    const { skip, take, current, pageSize, totalPages, hasNext } =
      PaginationHelper.query(paginationRequestDto, totalRecords);
    const whereParams = Object.assign({ skip, take }, countParams);
    const modelResults = await prisma.menu.findMany(whereParams);
    const results = modelResults.map((menuModel) => {
      return MenuMapper.toDto(menuModel);
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

  async create(createMenuDto: CreateMenuDto): Promise<MenuResponseDto> {
    return prisma.menu.create({
      data: createMenuDto,
      include: {
        permission: true,
      },
    });
  }

  async findAll(findMenuDto?: FindMenuDto): Promise<MenuResponseDto[]> {
    return prisma.menu.findMany({
      where: {
        ...findMenuDto,
        deletedAt: null,
      },
      include: {
        permission: true,
      },
    });
  }

  async findOne(id: number): Promise<MenuResponseDto> {
    return prisma.menu.findUnique({
      where: { id },
      include: {
        permission: true,
      },
    });
  }

  async update(
    id: number,
    updateMenuDto: UpdateMenuDto,
  ): Promise<MenuResponseDto> {
    const menu = await prisma.menu.findUnique({
      where: { id },
    });
    if (!menu) throw new DataNotFoundException();
    return prisma.menu.update({
      where: { id },
      data: updateMenuDto,
    });
  }

  async updateMany(ids: number[], updateMenuDto: UpdateMenuDto) {
    return prisma.menu.updateMany({
      where: { id: { in: ids } },
      data: updateMenuDto,
    });
  }

  async remove(id: number): Promise<MenuResponseDto> {
    const menu = await prisma.user.findUnique({
      where: { id },
    });
    if (!menu) throw new DataNotFoundException();
    return prisma.menu.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async removeMany(ids: number[]) {
    return await prisma.menu.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
