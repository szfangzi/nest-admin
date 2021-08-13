import { PermissionResponseDto } from '@admin/access/permission/dtos';

export class PageElementResponseDto {
  id: number;
  code: string;
  name: string;
  permission?: PermissionResponseDto;
  permissionId?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
