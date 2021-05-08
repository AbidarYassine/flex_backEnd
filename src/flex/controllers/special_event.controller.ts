import { SalleEntity } from './../model/salle.entity';
import { request } from 'express';
import { SpecialEventService } from './../services/event-special.service';
import { SpecialEventDto } from './../dto/special_event.dto';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { SpecialEventDao } from '../dao/special-event.dao';
import { getRepository } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { RolesGuard } from 'src/guards/jwt-auth-prof-guard';
import { UserRole } from '../utils/role-enum';
import { Roles } from '../decorators/role-decorator';

@Controller('specialEvents')
@ApiTags("specialEvents")
@UseGuards(JwtAuthGuard, RolesGuard)
export class SpecialEventController {

    constructor(
        private specialEventService: SpecialEventService,
    ) { }


    @Roles(UserRole.PROFESSEUR_ADMIN)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createEvent(@Body() specialEventDto: SpecialEventDto) {

        const salle = await getRepository(SalleEntity).findOne(specialEventDto.salleId);

        if (!salle) {
            request.statusCode = 404;
            throw new NotFoundException(`Salle not found`);
        }

        return await this.specialEventService.createEvent(specialEventDto);
    }

    @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
    @Get()
    async findAll() {
        return await this.specialEventService.findAll();
    }

    @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
    @Get(':id')
    async findById(@Param('id') id: number) {
        return await this.specialEventService.findById(id);
    }


    @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
    @Get('/nom/:nom')
    async findByNom(@Param('nom') nom: string) {
        return await this.specialEventService.findByNom(nom);
    }

    @Roles(UserRole.PROFESSEUR_ADMIN)
    @Put(':id')
    async updateEvent(@Param('id') id: number, @Body() specialEventDto: SpecialEventDto) {
        const event = await this.specialEventService.findById(id);

        if (!event) {
            request.statusCode = 404;
            throw new NotFoundException(`Special event not found !`);
        }

        const salle = await getRepository(SalleEntity).findOne(specialEventDto.salleId);

        if (!salle) {
            request.statusCode = 404;
            throw new NotFoundException(`Salle not found !`);
        }

        return await this.specialEventService.updateEvent(id, specialEventDto);
    }

    @Roles(UserRole.PROFESSEUR_ADMIN)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        const event = await this.specialEventService.findById(id);

        if (!event) {
            request.statusCode = 404;
            throw new NotFoundException(`Special event not found !`);
        }

        return await this.specialEventService.delete(id);
    }

}