import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type MeetingDocument = Meeting & Document;

@Schema({ timestamps: true })
export class Meeting {
  @ApiProperty({ type: String, description: 'ID da Célula' })
  @Prop({ type: Types.ObjectId, ref: 'Cell', required: true })
  cell: Types.ObjectId;

  @ApiProperty({ example: '2024-03-20' })
  @Prop({ required: true })
  date: Date;

  @ApiProperty({ example: 'Março' })
  @Prop({ required: true })
  month: string;

  @ApiProperty({ example: 2024 })
  @Prop({ required: true })
  year: number;

  @ApiProperty({ example: 'A Importância da Oração' })
  @Prop({ required: true })
  theme: string;

  @ApiProperty({ type: [String], description: 'Participantes presentes' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  crew: Types.ObjectId[];

  @ApiProperty({ example: 10 })
  @Prop({ default: 0 })
  adults: number;

  @ApiProperty({ example: 2 })
  @Prop({ default: 0 })
  children: number;

  @ApiProperty({ example: 3 })
  @Prop({ default: 0 })
  singles: number;

  @ApiProperty({ example: 150.50 })
  @Prop({ default: 0 })
  offer: number;

  @ApiProperty({ example: 5.5, description: 'Quilos de alimentos coletados' })
  @Prop({ default: 0 })
  kilo: number;

  @ApiProperty({ example: 3, description: 'Quantidade de itens coletados' })
  @Prop({ default: 0 })
  kiloItens: number;

  @ApiProperty({ example: 'Reunião abençoada com visita.' })
  @Prop()
  observations: string;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);