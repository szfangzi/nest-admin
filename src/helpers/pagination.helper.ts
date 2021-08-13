import { Type } from 'class-transformer';
import { IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationHelper {
  static query(
    { current, pageSize }: PaginationRequestDto,
    totalRecords: number,
  ): PaginationDto {
    const skip = (current - 1) * pageSize;
    const take = pageSize;
    const totalPages = Math.ceil(totalRecords / take);
    const hasNext = current < totalPages;
    return {
      skip,
      take,
      current,
      pageSize,
      totalPages,
      totalRecords,
      hasNext,
    };
  }
}

export class PaginationRequestDto {
  @Type(() => Number)
  @IsPositive({
    message: 'current必须是正数！',
  })
  @ApiProperty({ example: 1 })
  current: number;

  @Type(() => Number)
  @IsPositive({
    message: 'pageSize必须是正数！',
  })
  @ApiProperty({ example: 10 })
  pageSize: number;
}

export class PaginationDto {
  skip: number;
  take: number;
  current: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  hasNext: boolean;
}

export class PaginationResponseDto<T> {
  current: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  hasNext: boolean;
  results: T;
}
