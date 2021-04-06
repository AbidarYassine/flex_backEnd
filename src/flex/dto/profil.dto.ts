import { IsArray, IsBoolean, IsJSON, IsString } from "class-validator";

export class ProfilDto {
    @IsBoolean()
    readonly open: boolean = false;
    @IsString()
    readonly libelle: string;
    @IsArray()
    readonly filieres: string[];
    @IsArray()
    readonly professeurs: string[];
}