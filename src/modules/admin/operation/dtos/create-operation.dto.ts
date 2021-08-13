import { CreatePermissionDto } from '@admin/access/permission/dtos';

export class CreateOperationDto {
  path: string;
  method: string;
  name: string;
  permission: {
    create: CreatePermissionDto;
  };
}
