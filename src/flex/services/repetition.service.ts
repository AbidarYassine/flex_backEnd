import { RepetitionDto } from './../dto/repetition.dto';
import { Injectable } from "@nestjs/common";
import { RepetitionDao } from "../dao/repetition.dao";

@Injectable()
export class RepetitionService{
    constructor(
        private repetitionDao: RepetitionDao,
    ){}

    async createRepetition(repetitionDto: RepetitionDto){
        return await this.repetitionDao.createRepetition(repetitionDto);
    }

    async findAll(){
        return await this.repetitionDao.find({relations: ["events", "periodes", "jours", "creneaux"]});
    }

    async findById(repetitionId: number){
        return await this.repetitionDao.findOne(repetitionId, {relations: ["events", "periodes", "jours", "creneaux"]});
    }

    async delete(repetitionId: number){
        const repetition = await this.repetitionDao.findOne(repetitionId);
        return await this.repetitionDao.remove(repetition);
    }
}