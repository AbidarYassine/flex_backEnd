import { Injectable, NotFoundException } from "@nestjs/common";
import { request } from "express";
import { getRepository } from "typeorm";
import { PorteDao } from "../dao/porte.dao";
import { PorteDto } from "../dto/porte.dto";
import { PortEntity } from "../model/porte.entity";

@Injectable()
export class PorteSerive {

    constructor(private porteDao: PorteDao) {}

    // *** create services ***
    async save(porteDto: PorteDto): Promise<PortEntity> {
        return await this.porteDao.createPorte(porteDto);
    }

    // *** read services ***
    async getAll(): Promise<PortEntity[]> {
        return await this.porteDao.find();
    }

    async getById(id: number): Promise<PortEntity> {
        return await this.porteDao.findOne(id);
    }

    async getByNom(nom: string): Promise<PortEntity | undefined> {
        return await this.porteDao.findOne({ nom });
    }

    // *** update services ***
    async update(porteDto: PorteDto, id:number): Promise<any> {
        const porte = await this.getById(id);
        if(!porte) {
            request.statusCode = 404;
            return new NotFoundException(`No such door with this id : ${id}`);
        }
        porte.nom = porteDto.nom;
        await getRepository(PortEntity).save(porte);
        return porte;
    }
    
    async delete(id: number): Promise<any> {
        const porte = await this.getById(id);
        if(!porte) {
            request.statusCode = 404;
            return new NotFoundException(`No such door with this id : ${id}`);
        }
        await getRepository(PortEntity).remove(porte);
    }

}