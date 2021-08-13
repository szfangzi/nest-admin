import { UpdatePermissionDto } from '@admin/access/permission/dtos';

export class UpdateOperationDto {
  path?: string;
  method?: string;
  name?: string;
  permission?: {
    connect: UpdatePermissionDto;
  };
}
