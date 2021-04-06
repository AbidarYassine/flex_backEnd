import { getRepository, Like } from 'typeorm';
import { SalleEntity } from './../model/salle.entity';
import { EventDao } from './../dao/event.dao';
import { ProfilService } from './profil.service';
import { EventEntity } from './../model/event.entity';
import { Injectable } from "@nestjs/common";
import { EventDto } from '../dto/event.dto';
import { RepetitionDao } from '../dao/repetition.dao';

@Injectable()
export class EventService { 
    constructor(
        private profilsService: ProfilService,
        private repetitionDao: RepetitionDao,
        private eventDao: EventDao,
    ) { }

    async createEvent(eventDto: EventDto){
        const event = new EventEntity();

        event.nom = eventDto.nom;
        event.desc = eventDto.desc;

        event.salle = await getRepository(SalleEntity).findOne(eventDto.salleId);

        const profiles = await Promise.all(
            eventDto.profileIds.map(id => this.profilsService.findById(id))
        );

        const repetitions = await Promise.all(
            eventDto.repetitionIds.map(id => this.repetitionDao.findOne(id))
        );

        event.profiles = profiles;
        event.repetitions = repetitions;

        return await getRepository(EventEntity).save(event);

    }

    async findAll(){
        // return await this.eventDao.find();
        return await this.eventDao.find({ relations: ['profiles', 'repetitions'] });
    }

    async findById(id: number){
        return await this.eventDao.findOne(id, {relations: ['profiles', 'repetitions']});
    }

    async findByNom(nom: string){
        return await this.eventDao.find({where:{ _nom : Like(`%${nom}%`) }, relations: ['profiles', 'repetitions']});
    }

    async updateEvent(id: number, eventDto: EventDto){
        const event = await this.eventDao.findOne(id);
        
        event.nom = eventDto.nom;
        event.desc = eventDto.desc;
        event.salle = await getRepository(SalleEntity).findOne(eventDto.salleId);

        const profiles = await Promise.all(
            eventDto.profileIds.map(id => this.profilsService.findById(id))
        );

        const repetitions = await Promise.all(
            eventDto.repetitionIds.map(id => this.repetitionDao.findOne(id))
        );

        event.profiles = profiles;
        event.repetitions = repetitions;

        return await getRepository(EventEntity).save(event);
    }

    async delete(id: number){
        const event = await this.eventDao.findOne(id);

        return await getRepository(EventEntity).remove(event);
    }
}
