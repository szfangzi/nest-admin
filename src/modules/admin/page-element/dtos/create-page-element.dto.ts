import { CreatePermissionDto } from '@admin/access/permission/dtos';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePageElementDto {
  code: string;
  name: string;
  permission: {
    create: CreatePermissionDto;
  };
}

export class CreatePageElementRequestDto {
  @IsString()
  @ApiProperty()
  name;
}
