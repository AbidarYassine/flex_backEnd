import { IsBoolean, IsDate, IsDateString, IsNumber, IsString } from "class-validator";

export class EventLogDto {

    @IsString()
    date: string;
    @IsBoolean()
    done: boolean = false;
    @IsNumber()
    eventId: number;

    setDate(date: string) {
        this.date = date;
    }
    setEventId(id: number) {
        this.eventId = id;
    }
}
