import { UserStatus } from '@admin/access/user/user-status.enum';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRequestDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '111111',
  })
  password;

  @IsOptional()
  @IsEnum(UserStatus)
  @ApiProperty({
    example: 'active',
  })
  status;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: false,
  })
  isSuper;

  @IsOptional()
  @IsArray()
  @IsInt({
    each: true,
  })
  @ApiProperty({
    example: [3, 4],
  })
  roles;
}
