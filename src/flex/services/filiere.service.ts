import { ProfesseurService } from './professeur.service';
import { getRepository } from 'typeorm';
import { FilierEntity } from './../model/filiere.entity';
import { EtudaintService } from './etudiant.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FiliereDao } from "../dao/filiere.dao";
import { CreateFiliereDto } from "../dto/createFiliereDto";
import { ProfilService } from './profil.service';

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

    async findByNom(_nom: string, throwException: boolean = false): Promise<FilierEntity> {
        const foundFilere = await getRepository(FilierEntity).findOne({ _nom }, { relations: ['profils'] });
        if (throwException) {
            if (!foundFilere) {
                throw new HttpException(`the branch '${_nom}' not found`, HttpStatus.BAD_REQUEST);
            }
        }

        return foundFilere;
    }
    async preloadByNom(nom: string): Promise<FilierEntity> {
        const existingFil = await getRepository(FilierEntity)
            .createQueryBuilder("filiere")
            .where("filiere.nom = :nom", { nom: nom })
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

}