import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Address, AddressSchema } from 'src/address/schema/address.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    _id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, select: false }) // A senha nunca sai no GET por padrão
    password: string;

    @Prop()
    phoneNumber: string;

    @Prop({ default: 'MEMBER' })
    role: string;

    @Prop({ default: 'VISITOR' })
    userType: string;

    @Prop()
    birthDate: Date;

    @Prop({ type: Types.ObjectId, ref: 'Cell' }) // Deve ser apenas o ID
    cell: Types.ObjectId;

    @Prop({ type: AddressSchema }) // Endereço embutido para performance
    address: Address;

    @Prop({ default: true })
    status: boolean;

    @Prop()
    otp: string;

    @Prop()
    area: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    leader: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);