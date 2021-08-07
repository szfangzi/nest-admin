import { Operation as OperationModel } from '@prisma/client';
import { OperationDto } from './dtos/operation.dto';
import { PermissionDto } from '../access/permission/dtos';
import { PageElementResponseDto } from '../pageElement/dtos/page-element-response.dto';
import { OperationResponseDto } from './dtos/operation.response.dto';

export class OperationMapper {
  static toDto(operation: OperationModel): OperationDto {
    const dto = new OperationDto();

    dto.id = operation.id;
    dto.name = operation.name;
    dto.path = operation.path;
    dto.method = operation.method;
    return dto;
  }

  static permissionDtoToResponseDto(
    permissionDto: PermissionDto,
  ): OperationResponseDto {
    const responseDto = new OperationResponseDto();
    responseDto.id = permissionDto.operation.id;
    responseDto.path = permissionDto.operation.path;
    responseDto.method = permissionDto.operation.method;
    responseDto.name = permissionDto.operation.name;
    responseDto.permissionId = permissionDto.id;
    return responseDto;
  }
}
