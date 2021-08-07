import { PermissionDto } from '../../access/permission/dtos';

export class OperationDto {
  id: number;
  path: string;
  method: string;
  name: string;
  permission: PermissionDto;
  permissionId: number;
}
