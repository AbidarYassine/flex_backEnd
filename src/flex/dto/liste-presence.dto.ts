import { IsArray, IsDateString, IsNumber, IsString, isString } from "class-validator";

export class ListePresenceDto {
    @IsDateString()
    readonly date: string;
    @IsNumber()
    readonly id_event_log: number;
    @IsString({ each: true })
    readonly etudiants_cne: string[];

}
