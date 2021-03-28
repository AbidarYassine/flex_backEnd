import { getRepository } from 'typeorm';
import { EtudiantEntity } from './../model/etudiant.entity';
import { EtudaintService } from './etudiant.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FilierDao } from "../dao/filier.dao";
import { CreateFilierDto } from "../dto/createFilierDto";
import { FilierEntity } from '../model/fliere.entity';

@Injectable()
export class FilierService {
    constructor(private filierDao: FilierDao, private etudService: EtudaintService) { }



    async saveFilere(filereDto: CreateFilierDto): Promise<FilierEntity> {
        const foundFilere = await this.findByNom(filereDto.nom);
        if (foundFilere) {
            throw new HttpException(`this filier '${filereDto.nom}' is already existe`, HttpStatus.BAD_REQUEST);
        }
        const filiere = new FilierEntity();
        filiere._nom = filereDto.nom;
        return await this.filierDao.save(filiere);
    }
    async findByNom(nom: string): Promise<FilierEntity> {
        const filier = await getRepository(FilierEntity)
            .createQueryBuilder("filiere")
            .where("filiere.nom = :nom", { nom: nom })
            .getOne();
        return filier;
    }
    async getAll(): Promise<FilierEntity[]> {
        return await this.filierDao.find();
    }

}