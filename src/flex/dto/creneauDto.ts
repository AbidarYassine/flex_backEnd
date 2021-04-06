import { IsNumber, IsString } from "class-validator";

export class CreneauDto {

    @IsNumber()
    readonly ordre: number;
    @IsString()
    readonly heureDeb: string;
    @IsString()
    readonly heureFin: string;
}