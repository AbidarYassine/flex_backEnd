import { EventLogEntity } from './../model/event-log.entity';
import { getRepository } from 'typeorm';
import { EventLogDao } from './../dao/event-log.dao';
import { Injectable } from "@nestjs/common";
import { EventLogDto } from '../dto/event-log.dto';
import { EventEntity } from '../model/event.entity';

@Injectable()
export class EventLogService {
    constructor(private eventlogDao: EventLogDao) { }

    async createEventLog(eventLogDto: EventLogDto): Promise<EventLogEntity> {
        const eventlog = new EventLogEntity();

        eventlog.date = eventLogDto.date;
        eventlog.done = eventlog.done;

        eventlog.event = await getRepository(EventEntity).findOne(eventLogDto.eventId);

        return await getRepository(EventLogEntity).save(eventlog);

    }
    async findbyId(id: number): Promise<EventLogEntity> {
        return await getRepository(EventLogEntity).findOne(id, { relations: ['event'] });
    }
    async findAll(): Promise<EventLogEntity[]> {
        return await getRepository(EventLogEntity).find({ relations: ['event'] });
    }
    async delete(id: number) {
        const event = await this.findbyId(id);
        return await getRepository(EventLogEntity).remove(event);
    }
    async findByDateAndEvent(date: string, event_id: number): Promise<EventLogEntity> {
        const existingEvent = await getRepository(EventLogEntity)
            .createQueryBuilder("event-log")
            .where("event-log.date = :date AND event-log.event_id=:event_id", { date: date, event_id: event_id })
            .getOne();
        // existingEvent
        return existingEvent;
    }

}