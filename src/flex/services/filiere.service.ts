import { ProfesseurService } from './professeur.service';
import { getRepository } from 'typeorm';
import { FilierEntity } from './../model/filiere.entity';
import { EtudaintService } from './etudiant.service';
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { FiliereDao } from "../dao/filiere.dao";
import { CreateFiliereDto } from "../dto/createFiliereDto";
import { ProfilService } from './profil.service';
import { request } from 'express';
import { UpdaeFiliere } from '../dto/updateFili';

@Injectable()
export class FiliereService {
    constructor(
        private filierDao: FiliereDao,
        private profService: ProfesseurService,
    ) { }

    async saveFilere(filereDto: CreateFiliereDto): Promise<FilierEntity> {
        const filiereFound = await this.findByNom(filereDto.nom, false);
        if (filiereFound) {
            throw new HttpException(`the branch '${filereDto.nom}' already exists`, HttpStatus.BAD_REQUEST);
        }
        const filiere = new FilierEntity();
        filiere.nom = filereDto.nom;
        return await this.filierDao.save(filiere);
    }

    async findByNom(nom: string, throwException: boolean = false): Promise<FilierEntity> {
        const foundFilere = await getRepository(FilierEntity).findOne({ nom }, { relations: ['profils'] });
        if (throwException) {
            if (!foundFilere) {
                throw new HttpException(`the branch '${nom}' not found`, HttpStatus.BAD_REQUEST);
            }
        }

        return foundFilere;
    }
    async preloadByNom(nom: string): Promise<FilierEntity> {
        const existingFil = await getRepository(FilierEntity)
            .createQueryBuilder("filiere")
            .where("filiere.nom = :nom", { nom })
            .getOne();
        console.log(existingFil);
        if (existingFil) {
            return existingFil;
        }
        throw new HttpException(` ${nom} already exists`, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    async getAll(): Promise<FilierEntity[]> {
        return await this.filierDao.find({ relations: ['profils'] });
    }
    async deleteFiliere(nom: string): Promise<any> {
        const filiere = await this.findByNom(nom);
        console.log(nom, filiere);
        if (!filiere) {
            request.statusCode = 404;
            return new NotFoundException(`Filiere not found !`);
        }
        return await getRepository(FilierEntity).remove(filiere);
    }
    async deleteById(id: string): Promise<any> {
        const filiere = await getRepository(FilierEntity).findOne(id);
        console.log(filiere);
        if (!filiere) {
            request.statusCode = 404;
            return new NotFoundException(`Filiere not found !`);
        }
        return await getRepository(FilierEntity).remove(filiere);
    }

    async updateFiliere(id: string, udateFil: UpdaeFiliere) {
        let filiere = await getRepository(FilierEntity).findOne(id);
        if (!filiere) {
            request.statusCode = 404;
            return new NotFoundException(`Filiere not found !`);
        }
        filiere.nom = udateFil.nom;
        return await getRepository(FilierEntity).save(filiere);
    }

}
