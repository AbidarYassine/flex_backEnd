import { IsDateString, IsNumber } from "class-validator";

export class ListePresenceDto {
    @IsDateString()
    readonly date: Date;
    @IsNumber()
    readonly id_event_log: number;
}
