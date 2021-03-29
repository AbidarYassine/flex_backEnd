import { IsString } from "class-validator";

export class PorteDto {
    @IsString()
    readonly nom: string;
}