import { IsBoolean } from "class-validator";

export class ProfilDto {
    @IsBoolean()
    open: boolean;
}