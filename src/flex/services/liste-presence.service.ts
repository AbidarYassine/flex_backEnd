import { EventLogEntity } from './../model/event-log.entity';
import { EventEntity } from './../model/event.entity';
import { CreateListPresenceDto } from './../dto/createListPresence.dto';
import { EtudiantEntity } from './../model/etudiant.entity';
import { EtudaintService } from './etudiant.service';
import { getConnection, getRepository } from 'typeorm';
import { EventLogService } from './event.log.service';
import { ListePresenceEntity } from '../model/liste-presence.entity';
import { ListePresenceDto } from '../dto/liste-presence.dto';
import { Injectable } from "@nestjs/common";
import { ListePresenceDao } from "../dao/liste-presence.dao.ts";
import { Timestamp } from 'rxjs';
import { EventService } from './event.service';
import { EventLogDto } from '../dto/event-log.dto';

@Injectable()
export class ListePresenceService {
    constructor(
        private listPresDao: ListePresenceDao,
        private eventLogService: EventLogService,
        private etudService: EtudaintService,


    ) { }

    async saveList(listPresDto: ListePresenceDto) {
        const listpres = new ListePresenceEntity();
        const eventlog = await this.eventLogService.findbyId(listPresDto.id_event_log);
        listpres.date = listPresDto.date;
        listpres.eventlog = eventlog;
        await getRepository(ListePresenceEntity).save(listpres);
        return listpres;
    }
    async getAll(): Promise<ListePresenceEntity[]> {
        return await this.listPresDao.find({ relations: ['eventlog'] });
    }
    async getById(id: number): Promise<ListePresenceEntity> {
        return await this.listPresDao.findOne(id, { relations: ['eventlog'] });
    }
    async getByDateAndEventLog(date: string, event_log_id: number): Promise<ListePresenceEntity> {
        const existingList = await getRepository(ListePresenceEntity)
            .createQueryBuilder("listePresence")
            .where("listePresence.date = :date AND listePresence.event_log_id=:event_log_id", { date: date, event_log_id: event_log_id })
            .getOne();
        return existingList;
    }
    async addEtudaintToList(cne: string, id_list_presence: number) {
        const etudiant = await this.etudService.getByCne(cne);
        const listPres = await this.listPresDao.findOne(id_list_presence, { relations: ['etudiants'] });
        listPres.etudiants.push(etudiant);
        return await this.listPresDao.save(listPres);
    }
    async saveListPresenceWithEvent(
        date: string,
        eventEntity: EventEntity,
    ) {
        let eventLog = await this.eventLogService.findByDateAndEvent(date, eventEntity.id);
        if (!eventLog) {
            const eventLogDto = new EventLogDto();
            eventLogDto.setDate(date);
            eventLogDto.setEventId(eventEntity.id);
            eventLogDto.done = false;
            eventLog = await this.eventLogService.createEventLog(eventLogDto);
        }
        let listPresence = await this.getByDateAndEventLog(date, eventLog._id);
        if (!listPresence) {
            const listpres = new ListePresenceEntity();
            listpres.date = date;
            listpres.eventlog = eventLog;
            return await getRepository(ListePresenceEntity).save(listpres);
        }
        return listPresence;
    }
}
