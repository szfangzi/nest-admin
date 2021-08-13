import { UserStatus } from '@admin/access/user/user-status.enum';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserRequestDto {
  @IsOptional()
  @IsInt()
  id;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'admin',
  })
  name;

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
}
