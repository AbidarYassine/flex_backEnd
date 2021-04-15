import { PeriodeService } from './../services/periode.service';
import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { PeriodeDto } from '../dto/periode.dto';
import { PeriodeDao } from '../dao/periode.dao';
import { request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('periodes')
@ApiTags("periodes")
export class PeriodeController {
    constructor(
        private periodeService: PeriodeService,
        private periodeDao: PeriodeDao,
    ) { }

    @Get()
    async findAll() {
        return await this.periodeService.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createEvent(@Body() periodeDto: PeriodeDto) {
        const { dateDeb, dateFin } = periodeDto;

        const debut = dateDeb.split('/').reverse().reduce(
            (accumulateur, valeurCourante) => accumulateur + valeurCourante
        );

        const fin = dateFin.split('/').reverse().reduce(
            (accumulateur, valeurCourante) => accumulateur + valeurCourante
        );

        // console.log("Debut", debut);

        if (debut > fin) {
            throw new HttpException(`The begining date must be before the ending date.`, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return await this.periodeService.createPeriode(periodeDto);
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
        return await this.periodeService.findById(id);
    }

    @Get('/libelle/:libelle')
    async findByNom(@Param('libelle') libelle: string) {
        return await this.periodeService.findByLibelle(libelle);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() periodeDto: PeriodeDto) {
        const periode = this.periodeDao.findOne(id);

        if (!periode) {
            throw new HttpException(`Period not found`, HttpStatus.NOT_FOUND);
        }

        return await this.periodeService.updatePeriode(id, periodeDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const periode = this.periodeDao.findOne(id);

        if (!periode) {
            throw new HttpException(`Period not found`, HttpStatus.NOT_FOUND);
        }

        return await this.periodeService.delete(id);
    }
}