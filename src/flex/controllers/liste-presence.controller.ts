import { EventLogService } from './../services/event.log.service';
import { ListePresenceEntity } from '../model/liste-presence.entity';
import { ListePresenceService } from './../services/liste-presence.service';
import { Body, Controller, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Post } from "@nestjs/common";
import { ListePresenceDto } from '../dto/liste-presence.dto';
import { EventService } from '../services/event.service';
import { Get } from '@nestjs/common';
import { CreateListPresenceDto } from '../dto/createListPresence.dto';


@Controller("liste-presences")
export class ListePresenceController {
    constructor(
        private listPresService: ListePresenceService,
        private eventService: EventService,
        private eventlogService: EventLogService

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
    // @Get("/date/:date")
    // @HttpCode(HttpStatus.OK)
    // async getByDate(@Param("date") date: string): Promise<any> {
    //     return await this.listPresService.getByDateAndEventLog(date);
    // }
    @Get("/:date/:event_log_id")
    @HttpCode(HttpStatus.OK)
    async getByDateAndEventLog(@Param("date") date: string, @Param("event_log_id") event_log_id: number): Promise<any> {
        return await this.listPresService.getByDateAndEventLog(date, event_log_id);
    }
    @Post("/:id/cne/:cne")
    @HttpCode(HttpStatus.OK)
    async AddEtuToListPresence(@Param("cne") cne: string, @Param("id") id: number): Promise<any> {
        return await this.listPresService.addEtudaintToList(cne, id);
    }
    @Post("event")
    async saveListPresenceWithEvent(@Body() createlistPres: CreateListPresenceDto) {
        const event = await this.eventService.findById(createlistPres.id_event);
        if (!event) {
            throw new NotFoundException("Event Not Found !!");
        }
        return await this.listPresService.saveListPresenceWithEvent(createlistPres.date, event);
    }
}
