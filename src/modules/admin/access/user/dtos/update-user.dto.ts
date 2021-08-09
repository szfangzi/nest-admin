import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  password;

  @IsString()
  @ApiProperty()
  status;

  @IsBoolean()
  @ApiProperty()
  isSuper;
}
