import { EntityRepository, Repository } from "typeorm";
import { ProfilEntity } from "../model/profil.entity";
@EntityRepository(ProfilEntity)
export class ProfilDao extends Repository<ProfilEntity> {

}