import { IsArray, IsOptional, IsString } from "class-validator";
import { EtudiantDto } from "./etudiant.dto";

export class CreateFilierDto {
    @IsString()
    readonly nom: string;

}