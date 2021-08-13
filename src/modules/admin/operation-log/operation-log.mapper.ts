import { OperationLog as OperationLogModel } from '@prisma/client';
import { OperationLogModelWithRelations } from '@admin/operation-log/dto/operation-log-model-with-relations.type';
import { OperationLogResponseDto } from '@admin/operation-log/dto/operation-log-response.dto';
import { OperationMapper } from '@admin/operation/operation.mapper';
import { UserMapper } from '@admin/access/user/user.mapper';

export class OperationLogMapper {
  static toDto(operationLog: OperationLogModel): OperationLogResponseDto {
    const dto = new OperationLogResponseDto();
    dto.remark = operationLog.remark;
    dto.businessType = operationLog.businessType;
    dto.businessId = operationLog.businessId;
    return dto;
  }

  static toDtoWithRelations(
    operationLog: OperationLogModelWithRelations,
  ): OperationLogResponseDto {
    const dto = OperationLogMapper.toDto(operationLog);
    dto.operation = OperationMapper.toDto(operationLog.operation);
    dto.operator = UserMapper.toDto(operationLog.operator);
    return dto;
  }
}
