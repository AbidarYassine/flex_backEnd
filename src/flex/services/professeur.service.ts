import { Injectable, NotFoundException } from '@nestjs/common';
import { request } from 'express';
import { getRepository } from 'typeorm';
import { ProfesseurDao } from '../dao/professeur.dao';
import { ProfesseurDto } from '../dto/professeur.dto';
import { ProfesseurEntity } from '../model/professeur.entity';


@Injectable()
export class ProfesseurService {
    constructor(private profeDao: ProfesseurDao) { }

    async saveProfesseur(profesDto: ProfesseurDto): Promise<ProfesseurEntity> {
        return await this.profeDao.createProfesseur(profesDto);
    }
    async update(profesDto: ProfesseurDto, id: number): Promise<any> {
        const professeur = await this.getById(id);
        if (!professeur) {
            request.statusCode = 404;
            return new NotFoundException(`this id ${id} not existe`);
        }
        const { nom, prenom, email, admin } = profesDto;
        professeur.email = email;
        professeur.nom = nom;
        professeur.prenom = prenom;
        professeur.admin = admin;
        await getRepository(ProfesseurEntity).save(professeur);
        return professeur;
    }
    async getAll(): Promise<ProfesseurEntity[]> {
        return await this.profeDao.find();
    }
    async getById(id: number): Promise<ProfesseurEntity> {
        return await this.profeDao.findOne(id);
    }
    async getByEmail(email: string): Promise<any> {
        const prof = await getRepository(ProfesseurEntity)
            .createQueryBuilder("professeur")
            .where("professeur.email=:email", { email: email })
        return prof;
    }
    async delete(id: number): Promise<any> {
        const professeur = await this.getById(id);
        if (!professeur) {
            request.statusCode = 404;
            return new NotFoundException(`this id ${id} not existe`);
        }
        await getRepository(ProfesseurEntity).remove(professeur);
    }
}
