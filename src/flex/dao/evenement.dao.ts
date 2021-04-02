import { EntityRepository, Repository } from "typeorm";
import { EvenementEntity } from '../model/evenement.entity';
@EntityRepository(EvenementEntity)
export class EvenementDao extends Repository<EvenementEntity> { }
