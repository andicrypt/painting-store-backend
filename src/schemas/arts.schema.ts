import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ArtDocument = Art & Document;

@Schema()
export class Art {
    
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    imageUrl: string;

}

export const ArtSchema = SchemaFactory.createForClass(Art);