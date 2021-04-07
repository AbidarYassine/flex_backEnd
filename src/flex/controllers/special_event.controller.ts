import { SalleEntity } from './../model/salle.entity';
import { request } from 'express';
import { SpecialEventService } from './../services/event-special.service';
import { SpecialEventDto } from './../dto/special_event.dto';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { SpecialEventDao } from '../dao/special-event.dao';
import { getRepository } from 'typeorm';

@Controller('specialEvents')
export class SpecialEventController {
    
    constructor(
        private specialEventService: SpecialEventService,
        private specialEventDao: SpecialEventDao,
    ) { }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createEvent(@Body() specialEventDto: SpecialEventDto){

        const salle = await getRepository(SalleEntity).findOne(specialEventDto.salleId);

        if(!salle){
            request.statusCode = 404;
            throw new NotFoundException(`Salle not found`);
        }

        return await this.specialEventService.createEvent(specialEventDto);
    }

    @Get()
    async findAll(){
        return await this.specialEventService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number){
        return await this.specialEventService.findById(id);
    }
    
    
    @Get('/nom/:nom')
    async findByNom(@Param('nom') nom: string){
        return await this.specialEventService.findByNom(nom);
    }

    @Put(':id')
    async updateEvent(@Param('id') id: number, @Body() specialEventDto: SpecialEventDto){
        const event = await this.specialEventDao.findOne(id);

        if(!event){
            request.statusCode = 404;
            throw new NotFoundException(`Special event not found !`);
        }

        const salle = await getRepository(SalleEntity).findOne(specialEventDto.salleId);

        if(!salle){
            request.statusCode = 404;
            throw new NotFoundException(`Salle not found !`);
        }

        return await this.specialEventService.updateEvent(id, specialEventDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        const event = await this.specialEventDao .findOne(id);

        if(!event){
            request.statusCode = 404;
            throw new NotFoundException(`Special event not found !`);
        }

        return await this.specialEventService.delete(id);
    }

}