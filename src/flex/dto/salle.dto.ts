import { IsString } from "class-validator";

export class SalleDto {
    @IsString() 
    readonly nom: string;
}