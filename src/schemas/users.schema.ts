import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
    ADMIN, USER
}

@Schema()
export class User {
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    email: string;

    @Prop()
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
