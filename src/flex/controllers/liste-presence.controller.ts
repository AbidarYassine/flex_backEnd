import { ListePresenceEntity } from '../model/liste-presence.entity';
import { ListePresenceService } from './../services/liste-presence.service';
import { Body, Controller, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Post } from "@nestjs/common";
import { ListePresenceDto } from '../dto/liste-presence.dto.ts';
import { EventService } from '../services/event.service';
import { Get } from '@nestjs/common';


@Controller("liste-presences")
export class ListePresenceController {
    constructor(
        private listPresService: ListePresenceService,
        private eventService: EventService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async saveListPresence(@Body() listPreDto: ListePresenceDto): Promise<ListePresenceEntity> {
        const event = this.eventService.findById(listPreDto.id_event_log);
        if (!event) {
            throw new NotFoundException("Event Not Found!!");
        }
        return await this.listPresService.saveList(listPreDto);
    }
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(): Promise<ListePresenceEntity[]> {
        return await this.listPresService.getAll();
    }
    @Get("/id/:id")
    @HttpCode(HttpStatus.OK)
    async getById(@Param("id") id: number): Promise<ListePresenceEntity> {
        const listPre = await this.listPresService.getById(id);
        if (!listPre) {
            throw new NotFoundException("List Presence Not Found");
        }
        return listPre;
    }
    @Get("/date/:date")
    @HttpCode(HttpStatus.OK)
    async getByDate(@Param("date") date: Date): Promise<any> {
        return await this.listPresService.getByDate(date);
    }
}
