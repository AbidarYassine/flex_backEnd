import { IsNumber, IsString } from "class-validator";
import { UserDto } from "./user.dto";

export class EtudiantDto extends UserDto {
    @IsString()
    readonly cne: string;
    @IsNumber()
    readonly filierId: number;
}