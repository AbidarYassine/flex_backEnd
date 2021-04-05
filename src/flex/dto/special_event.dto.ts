import { IsBoolean, IsDate, IsString } from 'class-validator';
import { EventBaseDto } from './event_base.dto';

export class SpecialEventDto extends EventBaseDto{
    @IsDate()
    readonly date: Date;

    @IsString()
    readonly heureDeb: string;
    @IsString()
    readonly heureFin: string;

    @IsBoolean()
    readonly activated: boolean
}