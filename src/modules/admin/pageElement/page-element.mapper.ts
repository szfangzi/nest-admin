import { PageElement as PageElementModel } from '@prisma/client';
import { PageElementDto } from './dtos/page-element.dto';
import { PageElementResponseDto } from './dtos/page-element-response.dto';
import { PermissionDto } from '../access/permission/dtos';

export class PageElementMapper {
  static toDto(pageElement: PageElementModel): PageElementDto {
    const dto = new PageElementDto();

    dto.id = pageElement.id;
    dto.code = pageElement.code;
    dto.name = pageElement.name;
    return dto;
  }

  static permissionDtoToResponseDto(
    permissionDto: PermissionDto,
  ): PageElementResponseDto {
    const responseDto = new PageElementResponseDto();
    responseDto.id = permissionDto.pageElement.id;
    responseDto.code = permissionDto.pageElement.code;
    responseDto.name = permissionDto.pageElement.name;
    responseDto.permissionId = permissionDto.id;
    return responseDto;
  }
}
