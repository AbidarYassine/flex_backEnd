import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { ProfesseurDto } from '../dto/professeur.dto';
import { Professeur } from '../model/professeur';
import { ProfesseurService } from '../services/professeur.service';

@Controller('professeurs')
export class ProfesseurController {
    constructor(private prService: ProfesseurService) { }
    @Post()
    async saveProf(@Body() dtoProfes: ProfesseurDto) {
        return await this.prService.saveProfesseur(dtoProfes);
    }
    @Put()
    async editProf(@Body() dtoProfes: ProfesseurDto) {
        return await this.prService.update(dtoProfes);
    }
    @Delete()
    async delete(@Body() dtoProfes: ProfesseurDto) {
        return await this.prService.delete(dtoProfes);
    }
    @Get()
    async getAll(): Promise<Professeur[]> {
        return await this.prService.getAll();
    }
    @Get(':id')
    async getById(@Param('id') id: string): Promise<Professeur[]> {
        return await this.prService.getById(id);
    }
    @Get('/email/:email')
    async getByEmail(@Param('email') email: string): Promise<Professeur[]> {
        return await this.prService.getByEmail(email);
    }
}
