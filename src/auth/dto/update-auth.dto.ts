import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
    @ApiProperty({ example: 'admin@zion.com' })
    @IsEmail({}, { message: 'E-mail inválido' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsNotEmpty()
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    password: string;
}
