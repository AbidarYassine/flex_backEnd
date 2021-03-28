import { EtudiantEntity } from './../model/etudiant.entity';
import { Controller, Post, Get, Body, Param, Put, Delete, Query, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { EtudiantDto } from '../dto/etudiant.dto';
import { ProfesseurDto } from '../dto/professeur.dto';
import { ProfesseurEntity } from '../model/professeur.entity';
import { EtudaintService } from '../services/etudiant.service';
import { ProfesseurService } from '../services/professeur.service';

@Controller('etudaints')
export class EtudaintController {
    constructor(private etuService: EtudaintService) { }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async saveEtud(@Body() dtoEtudiant: EtudiantDto) {
        const etudFound = this.getByCne(dtoEtudiant.cne);
        if (etudFound) {
            throw new HttpException(`student with ${dtoEtudiant.cne} already existe`, HttpStatus.BAD_REQUEST);
        }
        return await this.etuService.saveEtudaint(dtoEtudiant);
    }
    @Put(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async editEtu(@Body() dtoEtudiant: EtudiantDto, @Param('id') id: number) {
        return await this.etuService.update(dtoEtudiant, id);
    }
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
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
    async getByCne(@Param('cne') cne: string): Promise<EtudiantEntity[]> {
        return await this.etuService.getByCne(cne);
    }
}
