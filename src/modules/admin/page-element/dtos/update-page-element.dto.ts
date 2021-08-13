import { UpdatePermissionDto } from '@admin/access/permission/dtos';

export class UpdatePageElementDto {
  name?: string;
  code?: string;
  permission?: {
    connect: UpdatePermissionDto;
  };
}
