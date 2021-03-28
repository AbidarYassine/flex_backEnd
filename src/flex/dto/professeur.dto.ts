import { IsBoolean } from "class-validator";
import { UserDto } from "./user.dto";

export class ProfesseurDto extends UserDto {
    @IsBoolean()
    readonly admin: boolean = false;
}