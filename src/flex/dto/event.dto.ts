import { EventBaseDto } from './event_base.dto';
import { IsNumber } from 'class-validator';

export class EventDto extends EventBaseDto{
    @IsNumber()
    readonly jour: number
}