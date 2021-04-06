import { EventLogEntity } from './../model/event-log.entity';
import { EventService } from './../services/event.service';
import { EventLogDto } from './../dto/event-log.dto';
import { EventLogService } from './../services/event.log.service';
import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Post } from "@nestjs/common";

@Controller("event-log")
export class EventLogController {
    constructor(
        private eventLogService: EventLogService,
        private eventService: EventService
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async saveEventLog(@Body() eventLogDto: EventLogDto): Promise<EventLogEntity> {
        const event = this.eventService.findById(eventLogDto.eventId);
        if (!event) {
            throw new NotFoundException(`Event not found`);
        }
        return await this.eventLogService.createEventLog(eventLogDto);
    }
    @Get("/id/:id")
    @HttpCode(HttpStatus.OK)
    getById(@Param('id') id: number): Promise<EventLogEntity> {
        const eventlog = this.eventLogService.findbyId(id);
        if (!eventlog) {
            throw new NotFoundException(`Event Log not found`);
        }
        return eventlog;
    }
    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(): Promise<EventLogEntity[]> {
        return this.eventLogService.findAll();
    }
    @Delete("/id/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id") id: number) {
        return this.eventLogService.delete(id);
    }

}