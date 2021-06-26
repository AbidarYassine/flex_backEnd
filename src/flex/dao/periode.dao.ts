import { PeriodeEntity } from "./../model/periode.entity";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { JourEntity } from "../model/jour.entity";

@EntityRepository(PeriodeEntity)
export class PeriodeDao extends Repository<PeriodeEntity> {

  async insertPeriode() {

  }

}
