import { NotFoundException } from '@nestjs/common';
import { ErrorType } from './index';

export class DataNotFoundCanNotUpdatedException extends NotFoundException {
  constructor() {
    super({
      error: ErrorType.DataNotFoundCannotBeUpdated,
      message: `数据不存在, 无法更新！`,
    });
  }
}
