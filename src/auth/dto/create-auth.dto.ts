import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateAuthDto {
    @ApiProperty({ example: 'admin@zion.com' })
    @IsEmail({}, { message: 'E-mail inválido' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsNotEmpty()
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    password: string;
}
