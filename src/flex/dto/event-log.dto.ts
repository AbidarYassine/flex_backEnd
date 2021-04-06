import { IsBoolean, IsDate, IsNumber } from "class-validator";

export class EventLogDto {
    @IsDate()
    readonly date: Date;
    @IsBoolean()
    readonly done: boolean;
    @IsNumber()
    readonly eventId: number;
}
