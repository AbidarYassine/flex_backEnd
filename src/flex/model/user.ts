import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    nom: string;

    @Prop()
    prenom: string;

    @Prop()
    email: string;

    // 1: pour Professeur
    // 2: pour Etudiant
    // 3: pour Autre
    @Prop()
    type: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
