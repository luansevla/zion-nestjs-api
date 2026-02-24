import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsDateString, ValidateNested, IsBoolean } from 'class-validator';
import { UpdateAddressDto } from 'src/address/dto/update-address.dto';
import { UpdateCellDto } from 'src/cell/dto/update-cell.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
    
      @ApiProperty({ type: UpdateCellDto, required: false })
      @IsOptional()
      @ValidateNested()
      @Type(() => UpdateCellDto)
      cell: UpdateCellDto;
    
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
    
      @ApiProperty({ description: 'ID do líder direto' })
      @IsString()
      @IsOptional()
      leader: string;
}
