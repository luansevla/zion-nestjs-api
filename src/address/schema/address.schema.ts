import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AddressDocument = Address & Document;

@Schema({ timestamps: true })
export class Address {
  @ApiProperty({ example: 'Rua das Flores', description: 'Nome da rua ou logradouro' })
  @Prop({ required: true })
  street: string;

  @ApiProperty({ example: '123', description: 'Número do imóvel' })
  @Prop({ required: true })
  number: string;

  @ApiProperty({ example: 'Apt 42', required: false })
  @Prop()
  complement: string;

  @ApiProperty({ example: 'Centro' })
  @Prop({ required: true })
  neighborhood: string;

  @ApiProperty({ example: 'São Paulo' })
  @Prop({ required: true })
  city: string;

  @ApiProperty({ example: 'SP' })
  @Prop({ required: true, uppercase: true, maxlength: 2 })
  state: string;

  @ApiProperty({ example: '01001-000' })
  @Prop({ required: true })
  zipCode: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);