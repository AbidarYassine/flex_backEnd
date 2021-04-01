import { EtudaintService } from './etudiant.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FiliereDao } from "../dao/filiere.dao";
import { CreateFiliereDto } from "../dto/createFiliereDto";
import { FilierEntity } from '../model/filiere.entity';

@Injectable()
export class FiliereService {
    constructor(private filierDao: FiliereDao, private etudService: EtudaintService) { }

    async saveFilere(filereDto: CreateFiliereDto): Promise<FilierEntity> {
        const foundFilere = await this.findByNom(filereDto.nom);
        if (foundFilere) {
            throw new HttpException(`this branch '${filereDto.nom}' already exists`, HttpStatus.BAD_REQUEST);
        }
        const filiere = new FilierEntity();
        filiere._nom = filereDto.nom;
        return await this.filierDao.save(filiere);
    }
    async findByNom(nom: string): Promise<FilierEntity> {
        return this.filierDao.findOne({ nom });
    }
    async getAll(): Promise<FilierEntity[]> {
        return await this.filierDao.find();
    }

}