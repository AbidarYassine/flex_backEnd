import { EvenementLogEntity } from './../model/evenement-log.entity';
import { EntityRepository, Repository } from "typeorm";
@EntityRepository(EvenementLogEntity)
export class EvenementLogDao extends Repository<EvenementLogEntity> { }
