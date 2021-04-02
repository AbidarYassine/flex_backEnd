import { IsString } from "class-validator";

export class CreneauDto {
    @IsString()
    readonly heureDeb: string;
    @IsString()
    readonly heureFin: string;
}