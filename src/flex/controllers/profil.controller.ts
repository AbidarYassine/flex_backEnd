import { profile } from 'node:console';
import { ProfilEntity } from './../model/profil.entity';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { ProfilService } from "../services/profil.service";
import { ProfilDto } from '../dto/profil.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { RolesGuard } from 'src/guards/jwt-auth-prof-guard';
import { Roles } from '../decorators/role-decorator';
import { UserRole } from '../utils/role-enum';

@Controller('profils')
@ApiTags("profils")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfilController {
    constructor(private profilService: ProfilService) { }

    @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllProfil(): Promise<ProfilEntity[]> {
        return this.profilService.findAll();
    }

    @Roles(UserRole.PROFESSEUR_ADMIN)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() profileDto: ProfilDto): Promise<ProfilEntity> {
        console.log(profileDto);
        return this.profilService.saveProfile(profileDto);
    }

    @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
    @Get('/libelle/:libelle')
    @HttpCode(HttpStatus.OK)
    async getProfilByLibelle(@Param('libelle') libelle: string): Promise<ProfilEntity> {
        return this.profilService.loadByLib(libelle, true);
    }
    @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
    @Get('/id/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id') id: number): Promise<ProfilEntity> {
        return this.profilService.findById(id);
    }

}