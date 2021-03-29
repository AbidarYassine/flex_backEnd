import { FilierEntity } from '../model/filiere.entity';
import { EntityRepository, Repository } from "typeorm";
@EntityRepository(FilierEntity)
export class FiliereDao extends Repository<FilierEntity> {

}