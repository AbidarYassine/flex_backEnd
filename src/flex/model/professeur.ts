import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProfesseurDocument = Professeur & Document;

@Schema()
export class Professeur {
    @Prop()
    nom: string;

    @Prop()
    prenom: string;

    @Prop()
    email: string;
}

export const ProfesseurSchema = SchemaFactory.createForClass(Professeur);
