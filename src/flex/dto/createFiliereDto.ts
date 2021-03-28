import { IsArray, IsOptional, IsString } from "class-validator";
import { EtudiantDto } from "./etudiant.dto";

export class CreateFiliereDto {
    @IsString()
    readonly nom: string;
}