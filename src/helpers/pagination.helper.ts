import { PaginationRequestDto, PaginationDto } from '../dtos/pagination.dto';

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
