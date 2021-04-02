import { EntityRepository, Repository } from "typeorm";
import { CreneauEntity } from '../model/creneau.entity';
@EntityRepository(CreneauEntity)
export class CreneauDao extends Repository<CreneauEntity> {

}