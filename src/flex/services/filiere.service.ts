import { ProfesseurService } from "./professeur.service";
import { getConnection, getRepository } from "typeorm";
import { FilierEntity } from "./../model/filiere.entity";
import { EtudaintService } from "./etudiant.service";
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { FiliereDao } from "../dao/filiere.dao";
import { CreateFiliereDto } from "../dto/createFiliereDto";
import { ProfilService } from "./profil.service";
import { request } from "express";
import { UpdaeFiliere } from "../dto/updateFili";
import { ProfilEntity } from "../model/profil.entity";
import { EtudiantEntity } from "../model/etudiant.entity";

@Injectable()
export class FiliereService {
  constructor(
    private filierDao: FiliereDao,
    private profService: ProfesseurService
  ) {
  }

  async saveFilere(filereDto: CreateFiliereDto): Promise<FilierEntity> {
    const filiereFound = await this.findByNom(filereDto.nom, false);
    if (filiereFound) {
      throw new HttpException(`the branch '${filereDto.nom}' already exists`, HttpStatus.BAD_REQUEST);
    }
    const filiere = new FilierEntity();
    filiere.nom = filereDto.nom;
    return await this.filierDao.save(filiere);
  }

  async findByNom(nom: string, throwException: boolean = false): Promise<FilierEntity> {
    const foundFilere = await getRepository(FilierEntity).findOne({ nom }, { relations: ["profils"] });
    if (throwException) {
      if (!foundFilere) {
        throw new HttpException(`the branch '${nom}' not found`, HttpStatus.BAD_REQUEST);
      }
    }

    return foundFilere;
  }

  async preloadByNom(nom: string): Promise<FilierEntity> {
    const existingFil = await getRepository(FilierEntity)
      .createQueryBuilder("filiere")
      .where("filiere.nom = :nom", { nom })
      .getOne();
    console.log(existingFil);
    if (existingFil) {
      return existingFil;
    }
    throw new HttpException(` ${nom} already exists`, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  async getAll(): Promise<FilierEntity[]> {
    return await this.filierDao.find({ relations: ["profils"] });
  }

  async deleteFiliere(nom: string): Promise<any> {
    const filiere = await this.findByNom(nom);
    console.log(nom, filiere);
    if (!filiere) {
      request.statusCode = 404;
      return new NotFoundException(`Filiere not found !`);
    }
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(FilierEntity)
      .where("nom = :nom", { nom: nom })
      .execute();
    return filiere;
  }

  async deleteById(id: string): Promise<any> {
    const filiere = await getRepository(FilierEntity).findOne(id, { relations: ["etudiants"] });
    console.log(filiere);
    if (!filiere) {
      request.statusCode = 404;
      return new NotFoundException(`Filiere not found !`);
    }
    // filiere.etudiants = [];
    // filiere.profils = [];
    // await getConnection()
    //   .createQueryBuilder()
    //   .delete()
    //   .from(FilierEntity)
    //   .where("id = :id", { id: +id })
    //   .execute();
    console.log(filiere.etudiants);
    filiere.etudiants.map(etu => etu.filiere = null).forEach(async (etu) => await getRepository(EtudiantEntity).save(etu));
    return getRepository(FilierEntity).remove(filiere);
  }

  async updateFiliere(id: string, udateFil: UpdaeFiliere) {
    let filiere = await getRepository(FilierEntity).findOne(id);
    if (!filiere) {
      request.statusCode = 404;
      return new NotFoundException(`Filiere not found !`);
    }
    filiere.nom = udateFil.nom;
    return await getRepository(FilierEntity).save(filiere);
  }

}
