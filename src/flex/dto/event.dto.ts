import { IsArray } from 'class-validator';
import { EventBaseDto } from './event_base.dto';

export class EventDto extends EventBaseDto {
    @IsArray()
    readonly repetitionIds: number[];
}