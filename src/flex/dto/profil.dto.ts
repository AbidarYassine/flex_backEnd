import { FiliereDao } from './../dao/filiere.dao';
import { IsArray, IsBoolean, IsJSON, IsString } from "class-validator";
import { CreateFiliereDto } from './createFiliereDto';

export class ProfilDto {
    @IsBoolean()
    readonly open: boolean = false;
    @IsString()
    readonly libelle: string;
    @IsArray()
    readonly filieres: string[];
}