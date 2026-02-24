import { IsString, IsNotEmpty, IsNumber, IsDateString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMeetingDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  cell: string;

  @ApiProperty() @IsDateString() @IsNotEmpty()
  date: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  month: string;

  @ApiProperty() @IsNumber() @IsNotEmpty()
  year: number;

  @ApiProperty() @IsString() @IsNotEmpty()
  theme: string;

  @ApiProperty({ type: [String] }) @IsArray() @IsOptional()
  crew: string[];

  @ApiProperty() @IsNumber() @IsOptional()
  adults: number;

  @ApiProperty() @IsNumber() @IsOptional()
  children: number;

  @ApiProperty() @IsNumber() @IsOptional()
  singles: number;

  @ApiProperty() @IsNumber() @IsOptional()
  offer: number;

  @ApiProperty() @IsNumber() @IsOptional()
  kilo: number;

  @ApiProperty() @IsNumber() @IsOptional()
  kiloItens: number;

  @ApiProperty() @IsString() @IsOptional()
  observations: string;
}