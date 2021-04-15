import { profile } from 'node:console';
import { ProfilEntity } from './../model/profil.entity';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ProfilService } from "../services/profil.service";
import { ProfilDto } from '../dto/profil.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('profils')
@ApiTags("profils")
export class ProfilController {
    constructor(private profilService: ProfilService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllProfil(): Promise<ProfilEntity[]> {
        return this.profilService.findAll();
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() profileDto: ProfilDto): Promise<ProfilEntity> {
        console.log(profileDto);
        return this.profilService.saveProfile(profileDto);
    }
    @Get('/libelle/:libelle')
    @HttpCode(HttpStatus.OK)
    async getProfilByLibelle(@Param('libelle') libelle: string): Promise<ProfilEntity> {
        return this.profilService.loadByLib(libelle, true);
    }
    @Get('/id/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id') id: number): Promise<ProfilEntity> {
        return this.profilService.findById(id);
    }

}