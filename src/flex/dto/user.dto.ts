import { IsEmail, IsString } from "class-validator";

export class UserDto {
    @IsString()
    readonly nom: string;
    @IsString()
    readonly prenom: string;
    @IsEmail()
    readonly email: string;
}