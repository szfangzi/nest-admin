import { RoleResponseDto } from '../../role/dtos';
import { MenuResponseDto } from '@admin/menu/dtos';
import { OperationResponseDto } from '@admin/operation/dtos';
import { PageElementResponseDto } from '@admin/page-element/dtos/page-element-response.dto';

export class PermissionResponseDto {
  id: number;
  type: string;
  menu?: MenuResponseDto;
  operation?: OperationResponseDto;
  pageElement?: PageElementResponseDto;
  roles?: RoleResponseDto[];
}
