import { IsBoolean, IsDate } from "class-validator";

export class EvenementLogDto {
    @IsDate()
    readonly date: Date;
    @IsBoolean()
    readonly done: boolean;
}
