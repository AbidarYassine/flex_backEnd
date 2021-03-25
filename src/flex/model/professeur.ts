import { User } from './user';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProfesseurDocument = Professeur & Document;

@Schema()
export class Professeur extends User {
    @Prop()
    admin: boolean;
}

export const ProfesseurSchema = SchemaFactory.createForClass(Professeur);
