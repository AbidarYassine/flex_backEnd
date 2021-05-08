import { FilierEntity } from '../model/filiere.entity';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { CreateFiliereDto } from "../dto/createFiliereDto";
import { FiliereService } from "../services/filiere.service";
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { RolesGuard } from 'src/guards/jwt-auth-prof-guard';
import { Roles } from '../decorators/role-decorator';
import { UserRole } from '../utils/role-enum';

@Controller('filieres')
@ApiTags("filieres")
@UseGuards(JwtAuthGuard, RolesGuard)
export class FiliereControlller {
    constructor(private filierService: FiliereService) { }

    @Roles(UserRole.PROFESSEUR_ADMIN)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async saveFilere(@Body() filereDto: CreateFiliereDto): Promise<FilierEntity> {
        return this.filierService.saveFilere(filereDto);
    }
    @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
    @Get('nom/:nom')
    @HttpCode(HttpStatus.OK)
    async findByNom(@Param('nom') nom: string): Promise<FilierEntity> {
        return await this.filierService.findByNom(nom, true);
    }
    @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<FilierEntity[]> {
        return await this.filierService.getAll();
    }

    @Roles(UserRole.PROFESSEUR_ADMIN)
    @Delete('nom/:nom')
    @HttpCode(HttpStatus.OK)
    async deleteFiliere(@Param('nom') nom: string) {
        return await this.filierService.deleteFiliere(nom);
    }

}