import { Operation as OperationModel } from '@prisma/client';
import { OperationResponseDto } from './dtos/operation.response.dto';
import { PermissionResponseDto } from '@admin/access/permission/dtos/permission-response.dto';

export class OperationMapper {
  static toDto(operation: OperationModel): OperationResponseDto {
    const dto = new OperationResponseDto();

    dto.id = operation.id;
    dto.name = operation.name;
    dto.path = operation.path;
    dto.method = operation.method;
    return dto;
  }

  static permissionDtoToResponseDto(
    permissionResponseDto: PermissionResponseDto,
  ): OperationResponseDto {
    const responseDto = new OperationResponseDto();
    responseDto.id = permissionResponseDto.operation.id;
    responseDto.path = permissionResponseDto.operation.path;
    responseDto.method = permissionResponseDto.operation.method;
    responseDto.name = permissionResponseDto.operation.name;
    responseDto.permissionId = permissionResponseDto.id;
    return responseDto;
  }
}
