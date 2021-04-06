import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { request } from 'express';
import { getRepository } from 'typeorm';
import { ProfilDao } from '../dao/profil.dao';
import { ProfesseurDto } from '../dto/professeur.dto';
import { ProfesseurEntity } from '../model/professeur.entity';
import { FiliereService } from './filiere.service';


@Injectable()
export class ProfesseurService {
    constructor(
    ) { }

    async saveProfesseur(profesDto: ProfesseurDto): Promise<ProfesseurEntity> {
        const prof = new ProfesseurEntity();
        prof.nom = profesDto.nom;
        prof.prenom = profesDto.prenom;
        prof.email = profesDto.email;
        prof.admin = profesDto.admin;
        return await getRepository(ProfesseurEntity).save(prof);
    }

    async update(profesDto: ProfesseurDto, id: number): Promise<any> {
        const professeur = await this.getById(id);
        if (!professeur) {
            request.statusCode = 404;
            return new NotFoundException(`Professor not found !`);
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
        return await getRepository(ProfesseurEntity).find({ relations: ['profils'] });
    }

    async getById(id: number): Promise<ProfesseurEntity> {
        return await getRepository(ProfesseurEntity).findOne(id, { relations: ['profils'] });
    }

    async getByEmail(_email: string): Promise<any> {
        const foundProf = getRepository(ProfesseurEntity).findOne({ _email }, { relations: ['profils'] });
        if (!foundProf) {
            throw new NotFoundException(`Professeur not found !`);
        }
        return foundProf
    }

    async delete(id: number): Promise<any> {
        const professeur = await this.getById(id);
        if (!professeur) {
            request.statusCode = 404;
            throw new NotFoundException(`Professor not found !`);
        }
        return await getRepository(ProfesseurEntity).remove(professeur);
    }
}
