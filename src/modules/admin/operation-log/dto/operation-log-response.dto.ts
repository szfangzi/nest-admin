import { OperationResponseDto } from '@admin/operation/dtos';
import { UserDto } from '@admin/access/user/dtos';

export class OperationLogResponseDto {
  id: number;
  remark: string;
  businessType: string;
  businessId: number;
  operation: OperationResponseDto;
  operationId: number;
  operator: UserDto;
  operatorId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
