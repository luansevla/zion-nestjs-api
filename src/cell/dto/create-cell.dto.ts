import { IsString, IsNotEmpty, IsBoolean, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDto } from '../../address/dto/create-address.dto';

export class CreateCellDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  name: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  day: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  time: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  area: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  cellType: string;

  @ApiProperty() @IsBoolean() @IsOptional()
  status: boolean;

  @ApiProperty({ type: CreateAddressDto })
  @ValidateNested() // Valida o endereço que vem dentro da célula
  @Type(() => CreateAddressDto) // Converte o objeto plano para a classe DTO
  @IsNotEmpty()
  address: CreateAddressDto;

  @ApiProperty({ type: [String] }) @IsArray() @IsOptional()
  leader: string[];

  @ApiProperty({ type: [String] }) @IsArray() @IsOptional()
  coleader: string[];

  @ApiProperty({ type: [String] }) @IsArray() @IsOptional()
  pastors: string[];
}