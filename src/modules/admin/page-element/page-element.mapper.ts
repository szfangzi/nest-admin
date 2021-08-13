import { PageElement as PageElementModel } from '@prisma/client';
import { PageElementResponseDto } from './dtos/page-element-response.dto';
import { PermissionResponseDto } from '@admin/access/permission/dtos/permission-response.dto';

export class PageElementMapper {
  static toDto(pageElement: PageElementModel): PageElementResponseDto {
    const dto = new PageElementResponseDto();

    dto.id = pageElement.id;
    dto.code = pageElement.code;
    dto.name = pageElement.name;
    return dto;
  }

  static permissionDtoToResponseDto(
    permissionResponseDto: PermissionResponseDto,
  ): PageElementResponseDto {
    const responseDto = new PageElementResponseDto();
    responseDto.id = permissionResponseDto.pageElement.id;
    responseDto.code = permissionResponseDto.pageElement.code;
    responseDto.name = permissionResponseDto.pageElement.name;
    responseDto.permissionId = permissionResponseDto.id;
    return responseDto;
  }
}
