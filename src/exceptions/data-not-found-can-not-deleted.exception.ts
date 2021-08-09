import { NotFoundException } from '@nestjs/common';
import { ErrorType } from './index';

export class DataNotFoundCanNotDeletedException extends NotFoundException {
  constructor() {
    super({
      error: ErrorType.DataNotFoundCannotBeDeleted,
      message: `数据不存在, 无法删除！`,
    });
  }
}
