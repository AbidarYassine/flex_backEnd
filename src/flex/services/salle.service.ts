import { Injectable, NotFoundException, HttpException } from "@nestjs/common";
import { request } from "express";
import { exception } from "node:console";
import { getRepository } from "typeorm";
import { SalleDao } from "../dao/salle.dao";
import { SalleDto } from "../dto/salle.dto";
import { SalleEntity } from "../model/salle.entity";


@Injectable()
export class SalleService {

    constructor(private salleDao: SalleDao) { }

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
    async update(salleDto: SalleDto, id: number): Promise<any> {
        const salle = await this.getById(id);
        const salleNom = await this.getByNom(salleDto.nom);
        if (!salle) {
            request.statusCode = 404;
            return new NotFoundException(`Room not found !`);
        }
        if (salleNom) {
            request.statusCode = 401;
            return new HttpException(`Room with the same name already exists !`, 401);
        }
        salle.nom = salleDto.nom;
        await getRepository(SalleEntity).save(salle);
        return salle;
    }

    // *** delete services ***
    async delete(id: number): Promise<any> {
        const salle = await this.getById(id);
        if (!salle) {
            request.statusCode = 404;
            return new NotFoundException(`Room not found !`);
        }
        return await getRepository(SalleEntity).remove(salle);
    }

}
