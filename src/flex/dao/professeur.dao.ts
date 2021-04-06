import { EntityRepository, getRepository, Repository } from 'typeorm';
import { ProfesseurEntity } from './../model/professeur.entity';
@EntityRepository(ProfesseurEntity)
export class ProfesseurDao extends Repository<ProfesseurEntity> {
}