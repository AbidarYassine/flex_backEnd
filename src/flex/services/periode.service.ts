import { Injectable } from '@nestjs/common';
import { getRepository, Like } from 'typeorm';
import { PeriodeDao } from "../dao/periode.dao";
import { PeriodeDto } from "../dto/periode.dto";
import { PeriodeEntity } from "../model/periode.entity";

@Injectable()
export class PeriodeService{
    constructor(
        private periodeDao: PeriodeDao,
    ){}

    async createPeriode(periodeDto: PeriodeDto){
        const periode = new PeriodeEntity();
        periode.libelle = periodeDto.libelle;
        periode.dateDeb = periodeDto.dateDeb;
        periode.dateFin = periodeDto.dateFin;

        return await getRepository(PeriodeEntity).save(periode);
    }

    async findAll(){
        return this.periodeDao.find();
    }

    async findById(id: number){
        return this.periodeDao.findOne(id);
    }

    async findByLibelle(libelle: string){
        return this.periodeDao.find({ libelle: Like(`%${libelle}%`) });
    }

    async updatePeriode(id: number, periodeDto: PeriodeDto){
        const periode = await this.periodeDao.findOne(id);

        periode.libelle = periodeDto.libelle;
        periode.dateDeb = periodeDto.dateDeb;
        periode.dateFin = periodeDto.dateFin;

        return await getRepository(PeriodeEntity).save(periode);
    }

    async delete(id: number){
        const periode = await this.periodeDao.findOne(id);

        return await getRepository(PeriodeEntity).remove(periode);
    }
}