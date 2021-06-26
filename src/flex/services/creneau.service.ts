import { CreneauEntity } from "./../model/creneau.entity";
import { CreneauDao } from "../dao/creneau.dao";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreneauService {
  constructor(private creneauDao: CreneauDao) {
    this.insertCreneaux();
  }

  async insertCreneaux() {
    const creaneaux = await this.creneauDao.find();

    if (creaneaux.length == 0) await this.creneauDao.insertCreneaux();
  }

  async getCreneau(ordre: number): Promise<CreneauEntity> {
    return this.creneauDao.findOne({ ordre });
  }

  async getAll(): Promise<CreneauEntity[]> {
    return this.creneauDao.find();
  }
}
