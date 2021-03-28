import { Controller, Post, Get, Body, Param, Put, Delete, Query, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { ProfesseurDto } from '../dto/professeur.dto';
import { ProfesseurEntity } from '../model/professeur.entity';
import { ProfesseurService } from '../services/professeur.service';

@Controller('professeurs')
export class ProfesseurController {
    constructor(private prService: ProfesseurService) { }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async saveProf(@Body() dtoProfes: ProfesseurDto) {
        const profFound = await this.getByEmail(dtoProfes.email);
        console.log("Professeur trouvé", profFound);
        if (profFound) {
            throw new HttpException(`Teacher with ${dtoProfes.email} already existe`, HttpStatus.BAD_REQUEST);
        }
        return await this.prService.saveProfesseur(dtoProfes);
    }
    @Put(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async editProf(@Body() dtoProfes: ProfesseurDto, @Param('id') id: number) {
        return await this.prService.update(dtoProfes, id);
    }
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: number) {
        return await this.prService.delete(id);
    }
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(): Promise<ProfesseurEntity[]> {
        return await this.prService.getAll();
    }
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: number): Promise<ProfesseurEntity> {
        return await this.prService.getById(id);
    }
    @Get('email/:email')
    @HttpCode(HttpStatus.OK)
    async getByEmail(@Param('email') email: string): Promise<ProfesseurEntity[]> {
        console.log("find By Email");
        return await this.prService.getByEmail(email);
    }
}
