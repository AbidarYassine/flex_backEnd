import { Injectable, NotFoundException } from "@nestjs/common";
import { request } from "express";
import { getRepository } from "typeorm";
import { SalleDao } from "../dao/salle.dao";
import { SalleDto } from "../dto/salle.dto";
import { SalleEntity } from "../model/salle.entity";


@Injectable()
export class SalleService {

    constructor(private salleDao: SalleDao) {}

    // *** create services ***
    async save(salleDto: SalleDto): Promise<SalleEntity> {
        return await this.salleDao.createPorte(salleDto);
    }

    // *** read services ***
    async getAll(): Promise<SalleEntity[]> {
        return await this.salleDao.find();
    }

    async getById(id: number): Promise<SalleEntity> {
        return await this.salleDao.findOne(id);
    }

    async getByNom(nom: string): Promise<SalleEntity | undefined> {
        return await this.salleDao.findOne({ nom });
    }

    // *** update services ***
    async update(salleDto: SalleDto, id:number): Promise<any> {
        const salle = await this.getById(id);
        if(!salle) {
            request.statusCode = 404;
            return new NotFoundException(`room not found !`);
        }
        salle.nom = salleDto.nom;
        await getRepository(SalleEntity).save(salle);
        return salle;
    }

    // *** delete services ***
    async delete(id: number): Promise<any> {
        const salle = await this.getById(id);
        if(!salle) {
            request.statusCode = 404;
            return new NotFoundException(`room not found !`);
        }
        await getRepository(SalleEntity).remove(salle);
    }

}