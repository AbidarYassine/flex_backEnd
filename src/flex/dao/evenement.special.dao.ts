import { EntityRepository, Repository } from "typeorm";
import { EvenementSpecailEntity } from "../model/evenement-specail.entity";
@EntityRepository(EvenementSpecailEntity)
export class EvenementSpecialDao extends Repository<EvenementSpecailEntity> { }
