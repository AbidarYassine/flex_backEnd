import { Roles } from './../decorators/role-decorator';
import { RolesGuard } from './../../guards/jwt-auth-prof-guard';

import { UseGuards } from '@nestjs/common';
import { Controller, Post, Get, Body, Param, Put, Delete, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { ProfesseurDto } from '../dto/professeur.dto';
import { ProfesseurEntity } from '../model/professeur.entity';
import { ProfesseurService } from '../services/professeur.service';
import { User } from '../decorators/user.logged';
import { UserRole } from '../utils/role-enum';
import { CreateProfesseurDto } from '../dto/createProfesseur.dto';

@Controller('professeurs')
@ApiTags("professeurs")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfesseurController {
    constructor(private prService: ProfesseurService) { }


    // just le role PROFESSEUR_ADMIN qui accede a cette route
    @Roles(UserRole.PROFESSEUR_ADMIN)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async saveProf(@Body() dtoProfes: CreateProfesseurDto) {
        const profFound = await this.getByEmail(dtoProfes.email);
        if (profFound) {
            throw new HttpException(`Teacher with ${dtoProfes.email} already exists`, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return await this.prService.saveProfesseur(dtoProfes);
    }


    @Put(':id')
    @Roles(UserRole.PROFESSEUR_ADMIN)
    @HttpCode(HttpStatus.ACCEPTED)
    async editProf(@Body() dtoProfes: ProfesseurDto, @Param('id') id: number) {
        return await this.prService.update(dtoProfes, id);
    }

    @Delete(':id')
    @Roles(UserRole.PROFESSEUR_ADMIN)
    @HttpCode(HttpStatus.ACCEPTED)
    async delete(@Param('id') id: number) {
        return await this.prService.delete(id);
    }
    // les  deux role  accede a cette route
    @Get()
    @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
    @HttpCode(HttpStatus.OK)
    async getAll(): Promise<ProfesseurEntity[]> {
        return await this.prService.getAll();
    }

    @Get(':id')
    @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: number): Promise<ProfesseurEntity> {
        return await this.prService.getById(id);
    }



    @Get('email/:email')
    @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
    @HttpCode(HttpStatus.OK)
    async getByEmail(@Param('email') email: string): Promise<ProfesseurEntity[]> {
        return await this.prService.getByEmail(email);
    }
}
