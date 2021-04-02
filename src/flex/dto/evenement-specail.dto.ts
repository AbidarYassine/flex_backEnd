import { IsBoolean, IsDate, IsString } from "class-validator";
import { BaseEvenementDto } from "./base-evenement.dto";

export class EvenementSpecailDto extends BaseEvenementDto {
    @IsDate()
    readonly date: Date;
    @IsBoolean()
    readonly validated: boolean;
    @IsString()
    readonly heureDeb: string;
    @IsString()
    readonly heureFin: string;
}
