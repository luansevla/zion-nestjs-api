import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Address, AddressSchema } from 'src/address/schema/address.schema';

export type CellDocument = Cell & Document;

@Schema({ timestamps: true })
export class Cell {
    @ApiProperty({ example: 'Célula Ebenézer' })
    @Prop({ required: true })
    name: string;

    @ApiProperty({ example: 'Quarta-feira' })
    @Prop({ required: true })
    day: string;

    @ApiProperty({ example: '20:00' })
    @Prop({ required: true })
    time: string;

    @ApiProperty({ example: 'Zona Sul' })
    @Prop({ required: true })
    area: string;

    @ApiProperty({ example: 'Adultos' })
    @Prop({ required: true })
    cellType: string;

    @ApiProperty({ default: true })
    @Prop({ default: true })
    status: boolean;

    // Relacionamento de Objeto Embutido (Embedded)
    @ApiProperty({ type: () => Address })
    @Prop({ type: AddressSchema, required: true })
    address: Address;

    // Relacionamentos por Referência (ObjectId)
    @ApiProperty({ type: [String], description: 'IDs dos Líderes' })
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] }) // Supondo que exista um model User
    leader: Types.ObjectId[];

    @ApiProperty({ type: [String], description: 'IDs dos Colíderes' })
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
    coleader: Types.ObjectId[];

    @ApiProperty({ type: [String], description: 'IDs dos Pastores' })
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
    pastors: Types.ObjectId[];
}

export const CellSchema = SchemaFactory.createForClass(Cell);