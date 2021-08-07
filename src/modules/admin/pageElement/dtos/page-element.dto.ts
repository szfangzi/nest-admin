import { PermissionDto } from '../../access/permission/dtos';

export class PageElementDto {
  id: number;
  code: string;
  name: string;
  permission: PermissionDto;
  permissionId: number;
}
