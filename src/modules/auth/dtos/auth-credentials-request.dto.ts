import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthCredentialsRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'admin',
  })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '888888',
  })
  readonly password: string;
}
