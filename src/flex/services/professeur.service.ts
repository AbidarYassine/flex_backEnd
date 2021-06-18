import { CreateProfesseurDto } from "src/flex/dto/createProfesseur.dto";
import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { request } from "express";
import { getRepository } from "typeorm";
import { ProfilDao } from "../dao/profil.dao";
import { ProfesseurDto } from "../dto/professeur.dto";
import { ProfesseurEntity } from "../model/professeur.entity";
import { UserRole } from "../utils/role-enum";
import * as bcrypt from "bcrypt";


@Injectable()
export class ProfesseurService {
  constructor() {
  }

  async saveProfesseur(profesDto: CreateProfesseurDto): Promise<ProfesseurEntity> {
    const prof = new ProfesseurEntity();
    prof.nom = profesDto.nom;
    prof.prenom = profesDto.prenom;
    prof.email = profesDto.email;
    prof.salt = await bcrypt.genSalt();
    prof.admin = profesDto.admin;
    if (profesDto.admin) {
      prof.role = UserRole.PROFESSEUR_ADMIN;
    }
    prof.password = await bcrypt.hash(profesDto.password, prof.salt);
    try {
      await getRepository(ProfesseurEntity).save(prof);
    } catch (e) {
      throw new ConflictException(`Email is already used !! `);
    }
    delete prof.salt;
    delete prof.password;
    return prof;

  }

  async update(profesDto: ProfesseurDto, id: number): Promise<any> {
    const professeur = await this.getById(id);
    if (!professeur) {
      request.statusCode = 404;
      return new NotFoundException(`Professor not found !`);
    }
    const { nom, prenom, email, admin } = profesDto;
    professeur.email = email;
    professeur.nom = nom;
    professeur.prenom = prenom;
    professeur.admin = admin;
    await getRepository(ProfesseurEntity).save(professeur);
    return professeur;
  }

  async getAll(): Promise<ProfesseurEntity[]> {
    const profs = await getRepository(ProfesseurEntity).find({ relations: ["profils"] });
    profs.map(p => delete p.password && delete p.salt);
    return profs;

  }

  async getById(id: number): Promise<ProfesseurEntity> {
    return await getRepository(ProfesseurEntity).findOne(id, { relations: ["profils"] });
  }

  async getByEmail(email: string): Promise<any> {
    const foundProf = getRepository(ProfesseurEntity).findOne({ email }, { relations: ["profils"] });
    if (!foundProf) {
      throw new NotFoundException(`Professeur not found !`);
    }
    return foundProf;
  }

  async delete(id: number): Promise<any> {
    const professeur = await this.getById(id);
    if (!professeur) {
      request.statusCode = 404;
      throw new NotFoundException(`Professor not found !`);
    }
    return await getRepository(ProfesseurEntity).remove(professeur);
  }
}
