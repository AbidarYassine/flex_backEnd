import { IsArray, IsBoolean, IsString } from "class-validator";
import { ProfesseurDto } from "./professeur.dto";
import { UserDto } from "./user.dto";

export class LoginProfDto {
    @IsString()
    readonly email: string;
    @IsString()
    readonly password: string;


}