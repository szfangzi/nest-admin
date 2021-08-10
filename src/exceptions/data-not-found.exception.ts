import { NotFoundException } from '@nestjs/common';
import { ErrorType } from './index';

export class DataNotFoundException extends NotFoundException {
  constructor() {
    super({
      error: ErrorType.DataNotFound,
      message: `数据不存在！`,
    });
  }
}

export class DataNotFoundCanNotDeletedException extends NotFoundException {
  constructor() {
    super({
      error: ErrorType.DataNotFoundCannotBeDeleted,
      message: `数据不存在, 无法删除！`,
    });
  }
}

export class DataNotFoundCanNotUpdatedException extends NotFoundException {
  constructor() {
    super({
      error: ErrorType.DataNotFoundCannotBeUpdated,
      message: `数据不存在, 无法更新！`,
    });
  }
}
