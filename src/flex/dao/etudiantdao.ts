import { FilierEntity } from '../model/filiere.entity';
import { EtudiantEntity } from './../model/etudiant.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { EtudiantDto } from '../dto/etudiant.dto';
import { NotFoundException } from '@nestjs/common';
@EntityRepository(EtudiantEntity)
export class EtudiantDao extends Repository<EtudiantEntity> {
    async createEtudaint(etudDto: EtudiantDto) {

        const etud = new EtudiantEntity();
       
        etud.nom = etudDto.nom;
        etud.prenom = etudDto.prenom;
        etud.email = etudDto.email;
        etud.cne = etudDto.cne;
        etud.filiere = await getRepository(FilierEntity).findOne(etudDto.filierId);

        await getRepository(EtudiantEntity).save(etud);

        return etud;
    }

}