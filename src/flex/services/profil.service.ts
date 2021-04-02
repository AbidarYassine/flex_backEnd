import { getRepository } from 'typeorm';
import { ProfilEntity } from './../model/profil.entity';
import { ProfilDto } from './../dto/profil.dto';
import { ProfilDao } from './../dao/profil.dao';
import { Injectable } from "@nestjs/common";
import { FiliereService } from './filiere.service';

@Injectable()
export class ProfilService {
    constructor(
        private profilDao: ProfilDao,
        private filiereService: FiliereService
    ) { }



    async saveProfile(profilDto: ProfilDto): Promise<ProfilEntity> {
        const filieres = await Promise.all(
            profilDto.filieres.map(nom => this.filiereService.findByNom(nom)),
        );
        // console.log(filieres);
        // const question = new Question();
        // question.title = "dogs";
        // question.text = "who let the dogs out?";
        // question.categories = [category1, category2];
        // await connection.manager.save(question);
        // const profil = this.profilDao.create({
        //     ...profilDto,
        //     filieres,
        // });
        // return await this.profilDao.save(profil);
        return new ProfilEntity();
    }
    async findAll(): Promise<ProfilEntity[]> {
        return await this.profilDao.find({
            relations: ['filieres'],
        })
    }
    async findById(id: number): Promise<ProfilEntity> {
        return await this.profilDao.findOne(id, { relations: ['filieres'] });
    }
    // async loadByLib(libille: string): Promise<ProfilEntity> {
    //  const existingProfil
    // }

}