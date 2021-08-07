import { PermissionDto } from '../../access/permission/dtos';

export class MenuDto {
  id: number;
  routeName: string;
  name: string;
  path: string;
  componentPath: string;
  redirect: string;
  title: string;
  icon: string;
  parentId: number;
  level: number;
  hidden: boolean;
  permission: PermissionDto;
  permissionId: number;
  children: MenuDto[];
}
