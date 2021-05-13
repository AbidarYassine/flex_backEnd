import { IsArray, IsBoolean, IsString } from "class-validator";
import { ProfesseurDto } from "./professeur.dto";
import { UserDto } from "./user.dto";

export class CreateProfesseurDto extends ProfesseurDto {
    @IsBoolean()
    readonly admin: boolean = false;
    @IsString()
    readonly password: string;
}