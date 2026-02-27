import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class ActivateUserDto {
  @ApiProperty({ example: 'joao@email.com', description: 'E-mail do usuário cadastrado' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456', description: 'Código de 6 dígitos enviado por e-mail' })
  @IsString()
  @IsNotEmpty()
  @Length(6, 6, { message: 'O código OTP deve ter exatamente 6 dígitos' })
  otp: string;
}