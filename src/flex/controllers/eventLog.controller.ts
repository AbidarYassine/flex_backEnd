import { UserRole } from './../utils/role-enum';
import { RolesGuard } from './../../guards/jwt-auth-prof-guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { EventLogEntity } from './../model/event-log.entity';
import { EventService } from './../services/event.service';
import { EventLogDto } from './../dto/event-log.dto';
import { EventLogService } from './../services/event.log.service';
import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Post } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/role-decorator';

@Controller("event-log")
@ApiTags("event-log")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.PROFESSEUR_ADMIN)
export class EventLogController {
    constructor(
        private eventLogService: EventLogService,
        private eventService: EventService
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async saveEventLog(@Body() eventLogDto: EventLogDto): Promise<EventLogEntity> {
        const event = await this.eventService.findById(eventLogDto.eventId);
        if (!event) {
            throw new NotFoundException(`Event not found`);
        }
        const eventLog = await this.eventLogService.findByDateAndEvent(eventLogDto.date, eventLogDto.eventId);
        if (eventLog) {
            throw new NotFoundException(`EventLog already exists`);
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
    @Get("date/:date/event-id/:event_id")
    async findByDate(@Param("date") date: string, @Param("event_id") event_id: number) {
        const eventLog = await this.eventLogService.findByDateAndEvent(date, event_id);
        if (!eventLog) {
            throw new NotFoundException(`event ${event_id} log not found by ${date} !!`);
        }
        return eventLog;
    }

}