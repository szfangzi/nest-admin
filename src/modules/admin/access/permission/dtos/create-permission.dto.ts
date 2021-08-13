import { PermissionType } from '@admin/access/permission/permission-type.enum';
import { MenuResponseDto } from '@admin/menu/dtos';
import { OperationResponseDto } from '@admin/operation/dtos';
import { PageElementResponseDto } from '@admin/page-element/dtos/page-element-response.dto';

export class CreatePermissionDto {
  type: PermissionType;
  menu?: MenuResponseDto;
  operation?: OperationResponseDto;
  pageElement?: PageElementResponseDto;
}
