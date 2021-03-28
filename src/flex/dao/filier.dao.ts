import { FilierEntity } from './../model/fliere.entity';
import { EntityRepository, Repository } from "typeorm";
@EntityRepository(FilierEntity)
export class FilierDao extends Repository<FilierEntity> {

}