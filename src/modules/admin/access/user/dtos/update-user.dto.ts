import { UserStatus } from '@admin/access/user/user-status.enum';
import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  password: string;
  status: UserStatus;
  isSuper: boolean;
  roles: {
    connect: { id: number }[];
  };
}

export class UpdateUserRequestDto {
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
