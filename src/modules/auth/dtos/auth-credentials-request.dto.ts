import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthCredentialsRequestDto {
  @IsNotEmpty({
    message: '账号不能为空！',
  })
  @ApiProperty({
    example: 'admin',
  })
  readonly name: string;

  @IsNotEmpty({
    message: '密码不能为空！',
  })
  @ApiProperty({
    example: '888888',
  })
  readonly password: string;
}
