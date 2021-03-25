import { Controller, Post, Get, Body } from '@nestjs/common';
import { ProfesseurDto } from '../dto/professeur.dto';
import { Professeur } from '../model/professeur';
import { ProfesseurService } from '../services/professeur.service';

@Controller('professeurs')
export class ProfesseurController {
    constructor(private prService: ProfesseurService) { }
    @Post()
    async saveProfe(@Body() dtoProfes: ProfesseurDto) {
        return await this.prService.saveProfesseur(dtoProfes);
    }
    @Get()
    async getAll(): Promise<Professeur[]> {
        return await this.prService.getAll();
    }
}
