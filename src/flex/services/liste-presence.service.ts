import { getRepository } from 'typeorm';
import { EventLogService } from './event.log.service';
import { ListePresenceEntity } from '../model/liste-presence.entity';
import { ListePresenceDto } from './../dto/liste-presence.dto.ts';
import { Injectable } from "@nestjs/common";
import { ListePresenceDao } from "../dao/liste-presence.dao.ts";
import { Timestamp } from 'rxjs';

@Injectable()
export class ListePresenceService {
    constructor(
        private listPresDao: ListePresenceDao,
        private eventLogService: EventLogService) { }

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
    async getByDate(date: Date): Promise<ListePresenceEntity[]> {
        // .where("user.id = :id OR user.name = :name", { id: 1, name: "Timber" })
        const existingFil = await getRepository(ListePresenceEntity)
            .createQueryBuilder("listePresence")
            .where("listePresence.date = :date", { date: date })
            .getRawMany();
        return existingFil;
    }
}
