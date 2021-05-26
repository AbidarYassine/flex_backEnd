import { FilierEntity } from "./../model/filiere.entity";
import { profile } from "node:console";
import { getRepository, getConnection } from "typeorm";
import { ProfilEntity } from "./../model/profil.entity";
import { ProfilDto } from "./../dto/profil.dto";
import { ProfilDao } from "./../dao/profil.dao";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FiliereService } from "./filiere.service";
import { ProfesseurService } from "./professeur.service";
import { ProfesseurEntity } from "../model/professeur.entity";
import { EtudaintService } from "./etudiant.service";
import { AddFiliereProfesseurDto } from "../dto/AddFiliereProfesseurDto";

@Injectable()
export class ProfilService {
  constructor(
    private profilDao: ProfilDao,
    private filiereService: FiliereService,
    private profService: ProfesseurService,
    private etudiantService: EtudaintService
  ) {
  }

  async saveProfile(profilDto: ProfilDto): Promise<ProfilEntity> {
    const profileFound = await this.loadByLib(profilDto.libelle);
    if (profileFound) {
      throw new HttpException(`this branch '${profilDto.libelle}' already exist`, HttpStatus.NOT_FOUND);
    }
    const filieres = await Promise.all(
      profilDto.filieres.map(nom => this.filiereService.findByNom(nom, true))
    );
    const professeurs = await Promise.all(
      profilDto.professeurs.map(email => this.profService.getByEmail(email))
    );
    console.log(professeurs);
    console.log(filieres);
    if (!filieres.includes(undefined) && !professeurs.includes(undefined)) {
      const profil = new ProfilEntity();
      profil.libelle = profilDto.libelle;
      profil.open = profilDto.open;
      profil.filieres = filieres;
      profil.professeurs = professeurs;
      console.log(profil);
      return await getRepository(ProfilEntity).save(profil);
    } else {
      throw new HttpException(`Element not found `, HttpStatus.NOT_FOUND);
    }

  }

  async updateProfile(id: number, profilDto: ProfilDto): Promise<ProfilEntity> {
    const profileFound = await this.findById(id);
    if (!profileFound) {
      throw new HttpException(`this branch '${profilDto.libelle}' not found`, HttpStatus.NOT_FOUND);
    }
    // find all fil by nom

    // const filieres = await Promise.all(
    //   profilDto.filieres.map(nom => this.filiereService.findByNom(nom, true))
    // );
    // const professeurs = await Promise.all(
    //   profilDto.professeurs.map(email => this.profService.getByEmail(email))
    // );
    const {
      found_filieres,
      found_professeurs
    } = await this.getFilAndProf(profilDto.filieres, profilDto.professeurs);
    if (!found_filieres.includes(undefined) && !found_professeurs.includes(undefined)) {
      profileFound.libelle = profilDto.libelle;
      profileFound.open = profilDto.open;
      profileFound.filieres = found_filieres;
      profileFound.professeurs = found_professeurs;
      console.log(profileFound);
      return await getRepository(ProfilEntity).save(profileFound);
    } else {
      throw new HttpException(`Element not found `, HttpStatus.NOT_FOUND);
    }

  }

  async findAll(): Promise<ProfilEntity[]> {
    return await this.profilDao.find({
      relations: ["filieres", "professeurs"]
    });
  }

  async findById(id: number): Promise<ProfilEntity> {
    return await this.profilDao.findOne(id, { relations: ["filieres", "professeurs"] });
  }

  async deleteById(id: number): Promise<Partial<ProfilEntity>> {
    const profile = await this.profilDao.findOne(id, { relations: ["filieres", "professeurs"] });
    if (!profile) {
      throw new HttpException(`profile not found ${id}`, HttpStatus.NOT_FOUND);
    }
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(ProfilEntity)
      .where("id = :id", { id: id })
      .execute();
    return profile;
  }

  async loadByLib(libelle: string, throwException: boolean = false): Promise<ProfilEntity> {
    const foundProfil = await getRepository(ProfilEntity).findOne({ libelle }, { relations: ["filieres", "professeurs"] });
    if (throwException) {
      if (!foundProfil) {
        throw new HttpException(`this branch '${libelle}' not found`, HttpStatus.BAD_REQUEST);
      }
    }
    return foundProfil;
  }

  async isUserInProfile(userId: number, profileId: number): Promise<boolean> {
    const profile = await this.findById(profileId);
    // console.log("Profs", profile.professeurs);
    let found = false;
    profile.professeurs.forEach(p => {
      if (p.id == userId) {
        found = true;
        return;
      }
    });
    if (found) return found;

    profile.autres.forEach(a => {
      if (a.id == userId) {
        found = true;
        return;
      }
    });
    if (found) return found;

    const etudiant = await this.etudiantService.getById(userId);
    if (etudiant) {
      return await this.isFiliereInProfile(etudiant.filiere, profileId);
    }

    return found;
  }


  async isProfesseurInProfile(prof: ProfesseurEntity, profileId: number): Promise<boolean> {
    const profile = await this.findById(profileId);
    // console.log("Profs", profile.professeurs);
    let found = false;
    profile.professeurs.forEach(p => {
      if (p.id == prof.id) {
        found = true;
        return;
      }
    });

    return found;
  }

  async isFiliereInProfile(filiere: FilierEntity, profileId: number): Promise<boolean> {
    const profile = await this.findById(profileId);
    // console.log("Profs", profile.professeurs);
    let found = false;
    profile.filieres.forEach(f => {
      if (f.id == filiere.id) {
        found = true;
        return;
      }
    });

    return found;
  }

  async addFiliereAndProfToProfile(id: number, addFilProflDto: AddFiliereProfesseurDto) {
    const profileFound = await this.findById(id);
    if (!profileFound) {
      throw new HttpException(`this branch not found`, HttpStatus.NOT_FOUND);
    }
    const {
      found_filieres,
      found_professeurs
    } = await this.getFilAndProf(addFilProflDto.filieres, addFilProflDto.professeurs);
    console.log(found_filieres);
    console.log(found_professeurs);
    return null;
  }

  async getFilAndProf(filieres: string[], professeurs: string[]) {
    const found_filieres = await Promise.all(
      filieres.map(nom => this.filiereService.findByNom(nom, true))
    );
    //find all prof by email
    const found_professeurs = await Promise.all(
      professeurs.map(email => this.profService.getByEmail(email))
    );
    return { found_filieres, found_professeurs };
  }


}
