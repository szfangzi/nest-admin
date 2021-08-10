import { UserStatus } from '@admin/access/user/user-status.enum';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  name: string;
  password: string;
  status: UserStatus;
  isSuper: boolean;
  roles: {
    connect: { id: number }[];
  };
}

export class CreateUserRequestDto {
  @IsString()
  @ApiProperty()
  name;

  @IsString()
  @ApiProperty()
  password;
}
