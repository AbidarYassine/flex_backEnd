import { Controller, Post, Get, Body } from '@nestjs/common';
import { ProffesseurDto } from '../dto/proffesseur.dto';
import { Proffesseur } from '../model/proffesseur';
import { ProffesseurService } from '../services/proffesseur.service';

@Controller('proffesseurs')
export class ProffesseurController {
    constructor(private prService: ProffesseurService) { }
    @Post()
    async saveProfe(@Body() dtoProfes: ProffesseurDto) {
        return await this.prService.saveProfesseur(dtoProfes);
    }
    @Get()
    async getAll(): Promise<Proffesseur[]> {
        return await this.prService.getAll();
    }
}
