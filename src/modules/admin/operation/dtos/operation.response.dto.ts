import { PermissionResponseDto } from '@admin/access/permission/dtos';

export class OperationResponseDto {
  id: number;
  path: string;
  method: string;
  name: string;
  permission?: PermissionResponseDto;
  permissionId?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
