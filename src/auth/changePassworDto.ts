import { IsString } from "class-validator";

export class ChangePassworDto {
    @IsString()
    oldPassword: string;
    @IsString()
    newPassword: string;
}