import { IsDateString, IsNumber } from "class-validator";

export class CreateListPresenceDto {
    @IsDateString()
    readonly date: string;
    @IsNumber()
    readonly id_event: number;
}