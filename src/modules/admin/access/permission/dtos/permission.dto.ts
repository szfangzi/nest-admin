import { RoleResponseDto } from '../../role/dtos';
import { MenuDto } from '../../../menu/dtos/menu.dto';
import { OperationDto } from '../../../operation/dtos/operation.dto';
import { PageElementDto } from '../../../pageElement/dtos/page-element.dto';

export class PermissionDto {
  id: number;
  type: string;
  code: string;
  menu?: MenuDto;
  operation?: OperationDto;
  pageElement?: PageElementDto;
  roles?: RoleResponseDto[];
}
