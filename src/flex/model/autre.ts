import { User } from './user';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AutreDocument = Autre & Document;

@Schema()
export class Autre extends User {
}

export const AutreSchema = SchemaFactory.createForClass(Autre);