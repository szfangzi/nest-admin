import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

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
