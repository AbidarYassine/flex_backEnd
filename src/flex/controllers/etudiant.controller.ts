import { EtudiantEntity } from './../model/etudiant.entity';
import { Controller, Post, Get, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { EtudiantDto } from '../dto/etudiant.dto';
import { ProfesseurDto } from '../dto/professeur.dto';
import { ProfesseurEntity } from '../model/professeur.entity';
import { EtudaintService } from '../services/etudiant.service';
import { ProfesseurService } from '../services/professeur.service';

@Controller('etudaints')
export class EtudaintController {
    constructor(private etuService: EtudaintService) { }
    @Post()
    async saveEtud(@Body() dtoEtudiant: EtudiantDto) {
        return await this.etuService.saveEtudaint(dtoEtudiant);
    }
    @Put(':id')
    async editEtu(@Body() dtoEtudiant: EtudiantDto, @Param('id') id: number) {
        return await this.etuService.update(dtoEtudiant, id);
    }
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.etuService.delete(id);
    }
    @Get()
    async getAll(): Promise<EtudiantEntity[]> {
        return await this.etuService.getAll();
    }
    @Get(':id')
    async getById(@Param('id') id: number): Promise<EtudiantEntity> {
        return await this.etuService.getById(id);
    }
    @Get('/cne/')
    async getByCne(@Query('cne') cne: string): Promise<EtudiantEntity[]> {
        return await this.etuService.getByCne(cne);
    }
}
