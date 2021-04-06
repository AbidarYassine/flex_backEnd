import { IsBoolean, IsDate, IsDateString, IsNumber } from "class-validator";

export class EventLogDto {

    @IsDateString()
    readonly date: Date;
    @IsBoolean()
    readonly done: boolean = false;
    @IsNumber()
    readonly eventId: number;
}
