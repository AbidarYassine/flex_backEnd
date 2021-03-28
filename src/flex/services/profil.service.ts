import { ProfilDao } from './../dao/profil.dao';
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProfilService {
    constructor(private profilDao: ProfilDao) { }



    saveProfile() {

    }

}