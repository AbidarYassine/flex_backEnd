import { DateUtils } from "./../utils/dateUtils";
import { TimeUtils } from "./../utils/timeUtils";
import { LocalTime } from "@js-joda/core";
import { LocalDate } from "@js-joda/core";
import { SalleService } from "./salle.service";
import { Injectable, NotFoundException } from "@nestjs/common";
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
    private profilsService: ProfilService,
    private salleService: SalleService
  ) {
  }

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
    return await this.specialEventDao.find({ relations: ["profiles"] });
  }

  async findById(id: number) {
    return await this.specialEventDao.findOne(id, { relations: ["profiles"] });
  }

  async findBySalle(salle: SalleEntity): Promise<SpecialEventEntity[]> {
    return await this.specialEventDao.find({ where: { salle }, relations: ["profiles"] });
  }

  async findByNom(nom: string) {
    return await this.specialEventDao.find({ where: { nom: Like(`%${nom}%`) }, relations: ["profiles"] });
  }

  async updateEvent(__id: number, specialEventDto: SpecialEventDto) {

    const specialEvent = await this.specialEventDao.findOne(__id);

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
    if (!specialEvent) {
      throw new NotFoundException("Event Not Found");
    }
    return await getRepository(SpecialEventEntity).remove(specialEvent);
  }

  async goingOnSpecialEvents(salleId: number): Promise<SpecialEventEntity[]> {

    const salle = await this.salleService.getById(salleId);
    const specialEvents = await this.specialEventDao.find({
      where: { salle, activated: true },
      relations: ["profiles"]
    });

    const result = [];

    for (let i = 0; i < specialEvents.length; i++) {
      const { date, heureDeb, heureFin } = specialEvents[i];

      // Date Fromat jj/mm/aaaa
      const today = LocalDate.now();
      const moment = LocalTime.now();

      const hdebut = TimeUtils.stringToLocalTime(heureDeb).minusMinutes(30);
      const hfin = TimeUtils.stringToLocalTime(heureFin);

      const eventDate = DateUtils.stringtoLocalDate(date);

      if (
        today.isEqual(eventDate)
        && moment.isAfter(hdebut) && moment.isBefore(hfin)
      ) {
        result.push(specialEvents[i]);
      }
    }

    // console.log("Result", result);
    return result;
  }

}
