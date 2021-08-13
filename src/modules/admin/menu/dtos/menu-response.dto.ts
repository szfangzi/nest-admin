import { PermissionResponseDto } from '@admin/access/permission/dtos';

export class MenuResponseDto {
  id: number;
  routeName: string;
  path: string;
  componentPath: string;
  redirect: string;
  title: string;
  icon?: string;
  parentId?: number;
  hidden?: boolean;
  permission?: PermissionResponseDto;
  permissionId?: number;
  children?: MenuResponseDto[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
