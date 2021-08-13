import { Test, TestingModule } from '@nestjs/testing';
import { PaginationHelper } from '@helpers/pagination.helper';
import { PaginationRequestDto } from '../../../src/dtos/pagination.dtos';

describe('PaginationHelper', () => {
  it('query', () => {
    const paginationRequestDto: PaginationRequestDto = {
      current: 2,
      pageSize: 10,
    };
    const totalRecords = 31;
    const { skip, take, current, pageSize, totalPages, hasNext } =
      PaginationHelper.query(paginationRequestDto, totalRecords);
    expect(skip).toBe(10);
    expect(take).toBe(10);
    expect(current).toBe(2);
    expect(pageSize).toBe(10);
    expect(totalPages).toBe(4);
    expect(skip).toBe(10);
    expect(hasNext).toBe(true);
  });
});
