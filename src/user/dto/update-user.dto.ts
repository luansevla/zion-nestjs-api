import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsDateString, ValidateNested, IsBoolean, IsMongoId } from 'class-validator';
import { UpdateAddressDto } from 'src/address/dto/update-address.dto';
import { UpdateCellDto } from 'src/cell/dto/update-cell.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty({ example: '64b8f0c2e1d3a2b4c5d6e7f8', description: 'ID do usuário (gerado automaticamente)' })
    @IsMongoId()
    @IsNotEmpty()
    _id: string;

    @ApiProperty({ example: 'João Silva' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'joao@email.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'Senha@123', description: 'Senha forte do usuário' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: '11999999999' })
    @IsString()
    @IsOptional()
    phoneNumber: string;

    @ApiProperty({ example: 'LEADER', description: 'Papel no sistema (ADMIN, LEADER, etc)' })
    @IsString()
    @IsNotEmpty()
    role: string;

    @ApiProperty({ example: 'MEMBER' })
    @IsString()
    @IsNotEmpty()
    userType: string;

    @ApiProperty({ example: '1990-05-15' })
    @IsDateString()
    @IsOptional()
    birthDate: Date;

    @IsMongoId({ message: 'O ID da célula deve ser um ObjectId válido' })
    @IsOptional()
    cell: string;

    @ApiProperty({ type: UpdateAddressDto })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UpdateAddressDto)
    address: UpdateAddressDto;

    @ApiProperty({ default: true })
    @IsBoolean()
    @IsOptional()
    status: boolean;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    otp: string;

    @ApiProperty({ example: 'Norte 1' })
    @IsString()
    @IsOptional()
    area: string;

    @IsMongoId({ message: 'O ID do líder deve ser um ObjectId válido' })
    @IsOptional()
    leader: string;
}
