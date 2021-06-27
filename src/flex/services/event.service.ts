import { getRepository, Like } from "typeorm";
import { SalleEntity } from "./../model/salle.entity";
import { EventDao } from "./../dao/event.dao";
import { ProfilService } from "./profil.service";
import { EventEntity } from "./../model/event.entity";
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { EventDto } from "../dto/event.dto";
import { SalleService } from "./salle.service";
import { RepetitionService } from "./repetition.service";
import { SpecialEventService } from "./event-special.service";

@Injectable()
export class EventService {
  constructor(
    private profilsService: ProfilService,
    private repetitionService: RepetitionService,
    private special_event: SpecialEventService,
    private eventDao: EventDao,
    private salleService: SalleService
  ) {
  }

  async createEvent(eventDto: EventDto) {
    const event = new EventEntity();

    event.nom = eventDto.nom;
    event.desc = eventDto.desc;

    event.salle = await getRepository(SalleEntity).findOne(eventDto.salleId);

    const profiles = await Promise.all(
      eventDto.profileIds.map(id => this.profilsService.findById(id))
    );

    const repetitions = await Promise.all(
      eventDto.repetitionIds.map(id => this.repetitionService.findById(id))
    );

    event.profiles = profiles;
    event.repetitions = repetitions;

    return await getRepository(EventEntity).save(event);

  }

  async findAll() {
    // return await this.eventDao.find();
    return await this.eventDao.find({ relations: ["profiles", "repetitions"] });
  }

  async findById(id: number) {
    return await this.eventDao.findOne(id, { relations: ["profiles", "repetitions", "eventLogs"] });
  }

  async findByNom(nom: string) {
    return await this.eventDao.find({ where: { nom: Like(`%${nom}%`) }, relations: ["profiles", "repetitions"] });
  }

  async updateEvent(_id: number, eventDto: EventDto) {
    const event = await this.eventDao.findOne(_id);

    event.nom = eventDto.nom;
    event.desc = eventDto.desc;
    event.salle = await getRepository(SalleEntity).findOne(eventDto.salleId);

    const profiles = await Promise.all(
      eventDto.profileIds.map(id => this.profilsService.findById(id))
    );

    const repetitions = await Promise.all(
      eventDto.repetitionIds.map(id => this.repetitionService.findById(id))
    );

    event.profiles = profiles;
    event.repetitions = repetitions;

    return await getRepository(EventEntity).save(event);
  }

  async delete(id: number) {
    const event = await this.eventDao.findOne(id);
    if (!event) {
      throw  new NotFoundException("Event Not found");
    }

    return await getRepository(EventEntity).remove(event);
  }

  async goingOnEvents(salleId: number): Promise<EventEntity[]> {

    const salle = await this.salleService.getById(salleId);
    const events = await this.eventDao.find({ where: { salle }, relations: ["profiles", "repetitions"] });

    const result = [];

    for (let i = 0; i < events.length; i++) {
      const repetitions = await this.repetitionService.findByEventId(events[i].id);
      repetitions.forEach(rep => {
        if (this.repetitionService.isRepetitionOnNow(rep)) {
          result.push(events[i]);
        }
      });
    }

    // console.log("Result", result);
    return result;
  }

  // GetBysalle done.
  // Getbyfiliere
  async findBySalle(salleId: number): Promise<any> {
    const salle = await this.salleService.getById(salleId);
    if (!salle) {
      throw new HttpException(`room not found`, HttpStatus.NOT_FOUND);
    }
    const events = await this.eventDao.find({ where: { salle }, relations: ["profiles", "repetitions", "salle"] });
    const special_event = await this.special_event.findBySalle(salle);
    return {
      events,
      special_event
    };
  }

}
