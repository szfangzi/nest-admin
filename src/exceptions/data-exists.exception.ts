import { ConflictException } from '@nestjs/common';
import { ErrorType } from './index';

export class DataExistsException extends ConflictException {
  constructor() {
    super({
      error: ErrorType.DataExists,
      message: [`数据已存在，无法重复创建！`],
    });
  }
}
