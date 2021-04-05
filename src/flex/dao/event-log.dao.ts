import { EventEntity } from './../model/event.entity';
import { EventLogDto } from './../dto/event-log.dto';
import { EventLogEntity } from './../model/event-log.entity';
import { EntityRepository, getRepository, Repository } from "typeorm";


@EntityRepository(EventLogEntity)
export class EventLogDao extends Repository<EventLogEntity> {
    async createEventLog(eventLogDto: EventLogDto){
        const eventLog = new EventLogEntity();

        eventLog.date = eventLogDto.date;
        eventLog.done = eventLogDto.done;
        eventLog.event = await getRepository(EventEntity).findOne(eventLogDto.eventId);

        await getRepository(EventLogEntity).save(eventLog);

        return eventLog;
    }
}
