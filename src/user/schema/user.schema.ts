import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
// ALTERADO: O caminho agora é relativo para funcionar no Windows/Dist
import { Address } from '../../address/schema/address.schema'; 

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    _id: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, unique: true })
    document: string;

    @Prop({ required: true, select: false }) 
    password: string;

    @Prop()
    phoneNumber: string;

    @Prop({ default: 'MEMBER' })
    role: string;

    @Prop({ default: 'VISITOR' })
    userType: string;

    @Prop()
    birthDate: Date;

    @Prop({ type: Types.ObjectId, ref: 'Cell' })
    cell: Types.ObjectId;

    // Certifique-se que o AddressSchema também está sendo importado se for usar como tipo de Prop
    @Prop({ type: Address })
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