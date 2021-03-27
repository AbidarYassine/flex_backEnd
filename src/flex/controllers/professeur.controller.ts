import { Controller, Post, Get, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ProfesseurDto } from '../dto/professeur.dto';
import { ProfesseurEntity } from '../model/professeur.entity';
import { ProfesseurService } from '../services/professeur.service';

@Controller('professeurs')
export class ProfesseurController {
    constructor(private prService: ProfesseurService) { }
    @Post()
    async saveProf(@Body() dtoProfes: ProfesseurDto) {
        return await this.prService.saveProfesseur(dtoProfes);
    }
    @Put(':id')
    async editProf(@Body() dtoProfes: ProfesseurDto, @Param('id') id: number) {
        return await this.prService.update(dtoProfes, id);
    }
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.prService.delete(id);
    }
    @Get()
    async getAll(): Promise<ProfesseurEntity[]> {
        return await this.prService.getAll();
    }
    @Get(':id')
    async getById(@Param('id') id: number): Promise<ProfesseurEntity> {
        return await this.prService.getById(id);
    }
    @Get('/email/')
    async getByEmail(@Query('email') email: string): Promise<ProfesseurEntity[]> {
        console.log("find By Email");
        return await this.prService.getByEmail(email);
    }
}
