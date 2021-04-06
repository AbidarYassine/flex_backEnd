import { JourEntity } from './../model/jour.entity';
import { JourDao } from '../dao/jour.dao';
import { Injectable } from "@nestjs/common";

@Injectable()
export class JourService {
    constructor(private jourDao: JourDao) {
        this.insertJours();
    }

    async insertJours() {
        const jours = await this.jourDao.find();

        if (jours.length == 0) await this.jourDao.insertJours();
    }

    async getJour(ordre: number): Promise<JourEntity> {
        return this.jourDao.findOne({ ordre });
    }
}