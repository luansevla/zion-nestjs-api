import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCellDto } from './create-cell.dto';
import { Types } from 'mongoose';
import { UpdateAddressDto } from 'src/address/dto/update-address.dto';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class UpdateCellDto extends PartialType(CreateCellDto) {
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
  @Type(() => UpdateAddressDto) // Converte o objeto plano para a classe DTO
  @IsNotEmpty()
  address: UpdateAddressDto;

  @ApiProperty({ type: [String] }) @IsArray() @IsOptional()
  leader: string[];

  @ApiProperty({ type: [String] }) @IsArray() @IsOptional()
  coleader: string[];

  @ApiProperty({ type: [String] }) @IsArray() @IsOptional()
  pastors: string[];
}
