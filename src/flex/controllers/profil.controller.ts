import { profile } from 'node:console';
import { ProfilEntity } from './../model/profil.entity';
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ProfilService } from "../services/profil.service";
import { ProfilDto } from '../dto/profil.dto';

@Controller('profils')
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

}