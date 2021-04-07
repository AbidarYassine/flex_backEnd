import { profile } from 'node:console';
import { getRepository } from 'typeorm';
import { ProfilEntity } from './../model/profil.entity';
import { ProfilDto } from './../dto/profil.dto';
import { ProfilDao } from './../dao/profil.dao';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FiliereService } from './filiere.service';
import { ProfesseurService } from './professeur.service';
import { ProfesseurEntity } from '../model/professeur.entity';

@Injectable()
export class ProfilService {
    constructor(
        private profilDao: ProfilDao,
        private filiereService: FiliereService,
        private profService: ProfesseurService,
    ) { }

    async saveProfile(profilDto: ProfilDto): Promise<ProfilEntity> {
        const profileFound = await this.loadByLib(profilDto.libelle);
        if (profileFound) {
            throw new HttpException(`this branch '${profilDto.libelle}' already exist`, HttpStatus.NOT_FOUND);
        }
        const filieres = await Promise.all(
            profilDto.filieres.map(nom => this.filiereService.findByNom(nom, true)),
        );
        const professeurs = await Promise.all(
            profilDto.professeurs.map(email => this.profService.getByEmail(email)),
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
    async findAll(): Promise<ProfilEntity[]> {
        return await this.profilDao.find({
            relations: ['filieres', 'professeurs'],
        })
    }
    async findById(id: number): Promise<ProfilEntity> {
        return await this.profilDao.findOne(id, { relations: ['filieres', 'professeurs'] });
    }
    async loadByLib(_libelle: string, throwException: boolean = false): Promise<ProfilEntity> {
        const foundProfil = await getRepository(ProfilEntity).findOne({ _libelle }, { relations: ['filieres', 'professeurs'] });
        if (throwException) {
            if (!foundProfil) {
                throw new HttpException(`this branch '${_libelle}' not found`, HttpStatus.BAD_REQUEST);
            }
        }
        return foundProfil;
    }

    isProfesseurInProfile(prof: ProfesseurEntity, profile: ProfilEntity): boolean {
        return profile.professeurs.includes(prof);
    }

}