import { EtudiantEntity } from './../model/etudiant.entity';
import { Controller, Post, Get, Body, Param, Put, Delete, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { EtudiantDto } from '../dto/etudiant.dto';
import { EtudaintService } from '../services/etudiant.service';
import { FilierEntity } from '../model/filiere.entity';
import { getRepository } from 'typeorm';

@Controller('etudiants')
export class EtudiantController {
    constructor(private etuService: EtudaintService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async saveEtud(@Body() dtoEtudiant: EtudiantDto) {
        const etudFound = await this.getByCne(dtoEtudiant.cne);
        
        const filiere = await getRepository(FilierEntity).findOne(dtoEtudiant.filierId);
        
        if (!filiere) {
            throw new HttpException(`Filiere not found !`, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        if (etudFound) {
            throw new HttpException(`Student with ${dtoEtudiant.cne} already exists`, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return await this.etuService.saveEtudaint(dtoEtudiant);
    }

    @Put(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async editEtu(@Body() dtoEtudiant: EtudiantDto, @Param('id') id: number) {
        return await this.etuService.update(dtoEtudiant, id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async delete(@Param('id') id: number) {
        return await this.etuService.delete(id);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(): Promise<EtudiantEntity[]> {
        return await this.etuService.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: number): Promise<EtudiantEntity> {
        return await this.etuService.getById(id);
    }
    
    @Get('cne/:cne')
    @HttpCode(HttpStatus.OK)
    async getByCne(@Param('cne') cne: string): Promise<EtudiantEntity> {
        return await this.etuService.getByCne(cne);
    }
}
