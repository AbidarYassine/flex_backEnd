import { ProfesseurDto } from './../dto/professeur.dto';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { ProfesseurEntity } from './../model/professeur.entity';
@EntityRepository(ProfesseurEntity)
export class ProfesseurDao extends Repository<ProfesseurEntity> {

    async createProfesseur(profDto: ProfesseurDto) {
        const prof = new ProfesseurEntity();
        prof.nom = profDto.nom;
        prof.prenom = profDto.prenom;
        prof.email = profDto.email;
        prof.admin = profDto.admin;
        await getRepository(ProfesseurEntity).save(prof);
        return prof;
    }

}