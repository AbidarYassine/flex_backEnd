import { IsNumber, IsString } from "class-validator";

export class JourDto{

    @IsNumber()
    readonly ordre: number

    @IsString()
    readonly nom: string;
}