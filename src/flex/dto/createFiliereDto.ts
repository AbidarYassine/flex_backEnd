import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateFiliereDto {
    @IsString()
    readonly nom: string;
}