import { getRepository } from 'typeorm';
import { EtudiantEntity } from './../model/etudiant.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EtudiantDao } from '../dao/etudiant.dao';
import { EtudiantDto } from '../dto/etudiant.dto';
@Injectable()
export class EtudaintService {
    constructor(private etudDao: EtudiantDao) { }
    async saveEtudaint(etudDto: EtudiantDto): Promise<EtudiantEntity> {
        return await this.etudDao.createEtudaint(etudDto);
    }
    async update(etudDto: EtudiantDto, id: number): Promise<any> {
        const etudaint = await this.getById(id);
        if (!etudaint) {
            return new NotFoundException(`Etudiant not found !`);
        }
        const { nom, prenom, email, cne } = etudDto;
        etudaint.email = email;
        etudaint.nom = nom;
        etudaint.prenom = prenom;
        etudaint.cne = cne;
        await getRepository(EtudiantEntity).save(etudaint);
        return etudaint;
    }
    async getAll(): Promise<EtudiantEntity[]> {
        return await this.etudDao.find({ relations: ["filiere"] });
    }
    async getById(id: number): Promise<EtudiantEntity> {
        return await this.etudDao.findOne(id, { relations: ["filiere"] });
    }
    async getByCne(cne: string): Promise<any> {
        return this.etudDao.findOne({ cne }, { relations: ["filiere"] });
    }
    async getByEmail(email: string): Promise<any> {
        return this.etudDao.findOne({ email }, { relations: ["filiere"] });
    }


    async delete(id: number): Promise<any> {
        const etudaint = await this.getById(id);
        if (!etudaint) {
            return new NotFoundException(`Student not found !`);
        }

        return await getRepository(EtudiantEntity).remove(etudaint);
    }


}
