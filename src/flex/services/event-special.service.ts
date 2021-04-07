import { Injectable } from "@nestjs/common";
import { getRepository, Like } from "typeorm";

import { SpecialEventDao } from "../dao/special-event.dao";
import { SpecialEventDto } from "../dto/special_event.dto";
import { SalleEntity } from "../model/salle.entity";
import { SpecialEventEntity } from "../model/special_event.entity";
import { ProfilService } from "./profil.service";


@Injectable()
export class SpecialEventService {

    constructor(
        private specialEventDao: SpecialEventDao,
        private profilsService: ProfilService) { }

    async createEvent(specialEventDto: SpecialEventDto) {

        const specialEvent = new SpecialEventEntity();

        specialEvent.heureDeb = specialEventDto.heureDeb;
        specialEvent.heureFin = specialEventDto.heureFin;
        specialEvent.activated = specialEventDto.activated;
        specialEvent.date = specialEventDto.date;

        specialEvent.nom = specialEventDto.nom;
        specialEvent.desc = specialEventDto.desc;
        specialEvent.salle = await getRepository(SalleEntity).findOne(specialEventDto.salleId);

        const profiles = await Promise.all(
            specialEventDto.profileIds.map(id => this.profilsService.findById(id))
        );

        specialEvent.profiles = profiles;

        return await getRepository(SpecialEventEntity).save(specialEvent);

    }

    async findAll() {
        return await this.specialEventDao.find({ relations: ['profiles'] });
    }

    async findById(id: number) {
        return await this.specialEventDao.findOne(id, { relations: ['profiles'] });
    }

    async findByNom(nom: string) {
        return await this.specialEventDao.find({ where: { _nom: Like(`%${nom}%`) }, relations: ['profiles'] });
    }

    async updateEvent(id: number, specialEventDto: SpecialEventDto) {

        const specialEvent = await this.specialEventDao.findOne(id);

        specialEvent.heureDeb = specialEventDto.heureDeb;
        specialEvent.heureFin = specialEventDto.heureFin;
        specialEvent.activated = specialEventDto.activated;
        specialEvent.date = specialEventDto.date;

        specialEvent.nom = specialEventDto.nom;
        specialEvent.desc = specialEventDto.desc;
        specialEvent.salle = await getRepository(SalleEntity).findOne(specialEventDto.salleId);

        const profiles = await Promise.all(
            specialEventDto.profileIds.map(id => this.profilsService.findById(id))
        );

        specialEvent.profiles = profiles;

        return await getRepository(SpecialEventEntity).save(specialEvent);
    }

    async delete(id: number) {
        const specialEvent = await this.specialEventDao.findOne(id);
        return await getRepository(SpecialEventEntity).remove(specialEvent);
    }


}
