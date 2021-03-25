import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProffesseurDocument = Proffesseur & Document;

@Schema()
export class Proffesseur {
    @Prop()
    nom: string;

    @Prop()
    prenom: string;

    @Prop()
    email: string;
}

export const ProffesseurSchema = SchemaFactory.createForClass(Proffesseur);