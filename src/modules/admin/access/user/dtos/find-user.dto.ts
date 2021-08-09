import { Type } from 'class-transformer';
import { IsInt, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '@admin/access/user/user-status.enum';

export class FindUserDto {
  @Type(() => Number)
  @IsInt()
  @ApiProperty({ example: 1 })
  id?;

  @IsString()
  @ApiProperty({ example: 'admin' })
  name?;

  @IsEnum(UserStatus)
  @ApiProperty({ example: 'disabled' })
  status?;
}
