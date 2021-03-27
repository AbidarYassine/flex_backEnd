import { UserDto } from "./user.dto";

export class ProfesseurDto extends UserDto {
    admin: boolean = false;
}