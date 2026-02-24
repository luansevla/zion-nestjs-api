import { 
  IsString, 
  IsEmail, 
  IsNotEmpty, 
  IsEnum, 
  IsOptional, 
  IsBoolean, 
  IsDateString, 
  ValidateNested 
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateAddressDto } from '../../address/dto/create-address.dto';
import { CreateCellDto } from '../../cell/dto/create-cell.dto';

export class CreateUserDto {
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

  @ApiProperty({ type: CreateCellDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCellDto)
  cell: CreateCellDto;

  @ApiProperty({ type: CreateAddressDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

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

  @ApiProperty({ description: 'ID do líder direto' })
  @IsString()
  @IsOptional()
  leader: string;
}