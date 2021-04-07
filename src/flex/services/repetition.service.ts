import { RepetitionDto } from './../dto/repetition.dto';
import { Injectable } from "@nestjs/common";
import { RepetitionDao } from "../dao/repetition.dao";
import { RepetitionEntity } from '../model/repetition.entity';
import { DateTimeFormatter, LocalDate, LocalTime } from '@js-joda/core';
import { DateUtils } from '../utils/dateUtils';
import { TimeUtils } from '../utils/timeUtils';

@Injectable()
export class RepetitionService {
    constructor(
        private repetitionDao: RepetitionDao,
    ) { }

    async createRepetition(repetitionDto: RepetitionDto) {
        return await this.repetitionDao.createRepetition(repetitionDto);
    }

    async findAll() {
        return await this.repetitionDao.find({ relations: ["events", "periodes", "jours", "creneaux"] });
    }

    async findById(repetitionId: number) {
        return await this.repetitionDao.findOne(repetitionId, { relations: ["events", "periodes", "jours", "creneaux"] });
    }

    async delete(repetitionId: number) {
        const repetition = await this.repetitionDao.findOne(repetitionId);
        return await this.repetitionDao.remove(repetition);
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
            && moment.isAfter(hdebut) && moment.isBefore(hfin)) {
                return true;
        } 
        return false;
    }

}