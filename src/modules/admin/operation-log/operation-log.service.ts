import { Injectable } from '@nestjs/common';
import { CreateOperationLogDto } from '@admin/operation-log/dto';
import {
  PaginationHelper,
  PaginationRequestDto,
  PaginationResponseDto,
} from '@helpers/pagination.helper';
import {
  FindOperationLogDto,
  OperationLogResponseDto,
} from '@admin/operation-log/dto';
import { prisma } from '@helpers/index';
import { OperationLogMapper } from '@admin/operation-log/operation-log.mapper';

@Injectable()
export class OperationLogService {
  async pagination(
    paginationRequestDto: PaginationRequestDto,
    findOperationLogDto?: FindOperationLogDto,
  ): Promise<PaginationResponseDto<OperationLogResponseDto[]>> {
    const countParams = {
      where: {
        ...findOperationLogDto,
        deletedAt: null,
      },
    };
    const totalRecords = await prisma.operationLog.count(countParams);
    const { skip, take, current, pageSize, totalPages, hasNext } =
      PaginationHelper.query(paginationRequestDto, totalRecords);
    const whereParams = Object.assign({ skip, take }, countParams);
    const modelResults = await prisma.operationLog.findMany(whereParams);
    const results = modelResults.map((operatorLogModel) => {
      return OperationLogMapper.toDto(operatorLogModel);
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
    createOperationLogDto: CreateOperationLogDto,
  ): Promise<OperationLogResponseDto> {
    return prisma.operationLog.create({
      data: createOperationLogDto,
      include: {
        operation: true,
        operator: true,
      },
    });
  }

  async findAll(
    findOperationLogDto?: FindOperationLogDto,
  ): Promise<OperationLogResponseDto[]> {
    return prisma.operationLog.findMany({
      where: {
        ...findOperationLogDto,
        deletedAt: null,
      },
      include: {
        operation: true,
        operator: true,
      },
    });
  }

  async findOne(id: number): Promise<OperationLogResponseDto> {
    return prisma.operationLog.findUnique({
      where: { id },
      include: {
        operation: true,
        operator: true,
      },
    });
  }
}
