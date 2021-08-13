import { UpdatePermissionDto } from '@admin/access/permission/dtos';

export class UpdateMenuDto {
  routeName?: string;
  path?: string;
  componentPath?: string;
  redirect?: string;
  title?: string;
  icon?: string;
  parentId?: number;
  hidden?: boolean;
  permission?: {
    connect: UpdatePermissionDto;
  };
}
