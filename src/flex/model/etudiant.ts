import { User } from './user';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type EtudiantDocument = Etudiant & Document;

@Schema()
export class Etudiant extends User {
    @Prop()
    cne: string;
}

export const EtudiantSchema = SchemaFactory.createForClass(Etudiant);

