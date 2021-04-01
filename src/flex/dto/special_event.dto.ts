import { IsBoolean } from 'class-validator';
import { EventBaseDto } from './event_base.dto';

export class SpecialEventDto extends EventBaseDto{
    readonly date: Date;

    @IsBoolean()
    readonly activated: boolean
}