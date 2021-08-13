import { RoleResponseDto } from '../../role/dtos';
import { MenuResponseDto } from '@admin/menu/dtos';
import { OperationResponseDto } from '@admin/operation/dtos';
import { PermissionType } from '@admin/access/permission/permission-type.enum';
import { PageElementResponseDto } from '@admin/page-element/dtos/page-element-response.dto';

export class PermissionDto {
  id: number;
  type: PermissionType;
  menu?: MenuResponseDto;
  operation?: OperationResponseDto;
  pageElement?: PageElementResponseDto;
  roles?: RoleResponseDto[];
}
