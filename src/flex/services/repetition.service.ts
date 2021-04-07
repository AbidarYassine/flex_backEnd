import { EventEntity } from './../model/event.entity';
import { getRepository } from 'typeorm';
import { RepetitionDto } from './../dto/repetition.dto';
import { Injectable } from "@nestjs/common";
import { RepetitionDao } from "../dao/repetition.dao";
import { RepetitionEntity } from '../model/repetition.entity';
import { LocalDate, LocalTime } from '@js-joda/core';
import { DateUtils } from '../utils/dateUtils';
import { TimeUtils } from '../utils/timeUtils';

@Injectable()
export class RepetitionService {
    constructor(
        // private eventService: EventService,
        private repetitionDao: RepetitionDao,
    ) { }

    async createRepetition(repetitionDto: RepetitionDto) {
        return await this.repetitionDao.createRepetition(repetitionDto);
    }

    async findAll() {
        return await this.repetitionDao.find({ relations: ["event", "periode", "jour", "creneau"] });
    }

    async findById(repetitionId: number) {
        return await this.repetitionDao.findOne(repetitionId, { relations: ["event", "periode", "jour", "creneau"] });
    }

    async delete(repetitionId: number) {
        const repetition = await this.repetitionDao.findOne(repetitionId);
        return await this.repetitionDao.remove(repetition);
    }

    async findByEventId(eventId: number){
        const event = await getRepository(EventEntity).findOne(eventId);
        return await this.repetitionDao.find({where:{event}, relations: ["event", "periode", "jour", "creneau"]})
    }


    isRepetitionOnNow(rep: RepetitionEntity): boolean {
        // get today order : new Date().getDay()

        const { dateDeb, dateFin } = rep.periode;

        // Date Fromat jj/mm/aaaa
        const today = LocalDate.now();
        const moment = LocalTime.now();

        const hdebut = TimeUtils.stringToLocalTime(rep.creneau.heureDeb);
        const hfin = TimeUtils.stringToLocalTime(rep.creneau.heureFin);

        const debut = DateUtils.stringtoLocalDate(dateDeb);
        const fin = DateUtils.stringtoLocalDate(dateFin);

        if (today.isAfter(debut) && today.isBefore(fin)
            && rep.jour.ordre == new Date().getDay()
            && moment.isAfter(hdebut) && moment.isBefore(hfin)
        ) {
            // console.log("Repeating now");
            return true;
        }
        // console.log("Not Repeating now");
        return false;
    }

}