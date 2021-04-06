import { IsNumber, IsString } from "class-validator";

export class PorteDto {
    @IsString()
    readonly nom: string;

    @IsNumber()
    salleId: number;
}