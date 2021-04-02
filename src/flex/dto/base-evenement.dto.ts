import { IsString } from "class-validator";

export class BaseEvenementDto {
    @IsString()
    readonly nom: string;
    @IsString()
    readonly desc: string;
}
