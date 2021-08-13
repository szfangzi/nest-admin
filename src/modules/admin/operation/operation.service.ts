import { Injectable } from '@nestjs/common';
import {
  PaginationHelper,
  PaginationRequestDto,
  PaginationResponseDto,
} from '@helpers/pagination.helper';
import { prisma } from '@helpers/index';
import { OperationMapper } from '@admin/operation/operation.mapper';
import { DataNotFoundException } from '@exceptions/data-not-found.exception';
import {
  CreateOperationDto,
  OperationResponseDto,
  UpdateOperationDto,
} from '@admin/operation/dtos';
import { FindOperationDto } from '@admin/operation/dtos/find-operation.dto';

@Injectable()
export class OperationService {
  async pagination(
    paginationRequestDto: PaginationRequestDto,
    findOperationDto?: FindOperationDto,
  ): Promise<PaginationResponseDto<OperationResponseDto[]>> {
    const countParams = {
      where: {
        ...findOperationDto,
        deletedAt: null,
      },
    };
    const totalRecords = await prisma.operation.count(countParams);
    const { skip, take, current, pageSize, totalPages, hasNext } =
      PaginationHelper.query(paginationRequestDto, totalRecords);
    const whereParams = Object.assign({ skip, take }, countParams);
    const modelResults = await prisma.operation.findMany(whereParams);
    const results = modelResults.map((operationModel) => {
      return OperationMapper.toDto(operationModel);
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
    createOperationDto: CreateOperationDto,
  ): Promise<OperationResponseDto> {
    return prisma.operation.create({
      data: createOperationDto,
      include: {
        permission: true,
      },
    });
  }

  async findAll(
    findOperationDto?: FindOperationDto,
  ): Promise<OperationResponseDto[]> {
    return prisma.operation.findMany({
      where: {
        ...findOperationDto,
        deletedAt: null,
      },
      include: {
        permission: true,
      },
    });
  }

  async findOne(id: number): Promise<OperationResponseDto> {
    return prisma.operation.findUnique({
      where: { id },
      include: {
        permission: true,
      },
    });
  }

  async update(
    id: number,
    updateMenuDto: UpdateOperationDto,
  ): Promise<OperationResponseDto> {
    const menu = await prisma.operation.findUnique({
      where: { id },
    });
    if (!menu) throw new DataNotFoundException();
    return prisma.operation.update({
      where: { id },
      data: updateMenuDto,
    });
  }

  async updateMany(ids: number[], updateMenuDto: UpdateOperationDto) {
    return prisma.operation.updateMany({
      where: { id: { in: ids } },
      data: updateMenuDto,
    });
  }
  //
  async remove(id: number): Promise<OperationResponseDto> {
    const operation = await prisma.operation.findUnique({
      where: { id },
    });
    if (!operation) throw new DataNotFoundException();
    return prisma.operation.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async removeMany(ids: number[]) {
    return await prisma.operation.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
