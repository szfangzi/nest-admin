import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePermissionDto } from '@admin/access/permission/dtos';

export class CreateMenuDto {
  routeName: string;
  path: string;
  componentPath: string;
  redirect: string;
  title: string;
  icon: string;
  parentId: number;
  hidden: boolean;
  permission: {
    create: CreatePermissionDto;
  };
}

export class CreateMenuRequestDto {
  @IsString()
  @ApiProperty()
  routeName;
}
