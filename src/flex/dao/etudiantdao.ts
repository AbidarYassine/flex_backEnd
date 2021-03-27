import { EtudiantEntity } from './../model/etudiant.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { EtudiantDto } from '../dto/etudiant.dto';
@EntityRepository(EtudiantEntity)
export class EtudiantDao extends Repository<EtudiantEntity> {
    async createProfesseur(etudDto: EtudiantDto) {
        const etud = new EtudiantEntity();
        etud.nom = etudDto.nom;
        etud.prenom = etudDto.prenom;
        etud.email = etudDto.email;
        etud.cne = etudDto.cne;
        await getRepository(EtudiantEntity).save(etud);
        return etud;
    }

}