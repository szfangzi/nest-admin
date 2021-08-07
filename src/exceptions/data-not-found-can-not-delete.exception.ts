import { NotFoundException } from '@nestjs/common';
import { ErrorType } from './index';

export class DataNotFoundCanNotDeleteException extends NotFoundException {
  constructor() {
    super({
      error: ErrorType.DataNotFoundCannotBeDeleted,
      message: `数据不存在, 无法删除！`,
    });
  }
}
